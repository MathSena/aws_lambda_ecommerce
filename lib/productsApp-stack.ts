import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs'
import * as cdk from 'aws-cdk-lib'
import * as dynadb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import * as ssm from 'aws-cdk-lib/aws-ssm'

export class ProductsAppStack extends cdk.Stack {
  readonly productsFetchHandler: lambdaNodeJS.NodejsFunction
  readonly productsAdminHandler: lambdaNodeJS.NodejsFunction
  readonly productsDbd: dynadb.Table

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.productsDbd = new dynadb.Table(this, 'ProductsDbd', {
      tableName: 'products',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'id',
        type: dynadb.AttributeType.STRING
      },
      billingMode: dynadb.BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1
    })

    //Products Layer
    const productsLayerArn = ssm.StringParameter.valueForStringParameter(
      this,
      'ProductsLayerVersionArn'
    )

    const productsLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'ProductsLayerVersionArn',
      productsLayerArn
    )

    this.productsFetchHandler = new lambdaNodeJS.NodejsFunction(
      this,
      'ProductsFetchFunction',
      {
        functionName: 'ProductsFetchFunction',
        entry: 'lambda/products/productsFetchFunction.ts',
        handler: 'handler',
        memorySize: 128,
        timeout: cdk.Duration.seconds(5),
        bundling: {
          minify: true,
          sourceMap: false
        },

        environment: {
          PRODUCTS_DDB: this.productsDbd.tableName
        },
        layers: [productsLayer],
        tracing: lambda.Tracing.ACTIVE,
        insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_119_0
      }
    )

    this.productsDbd.grantReadData(this.productsFetchHandler)

    this.productsAdminHandler = new lambdaNodeJS.NodejsFunction(
      this,
      'ProductsAdminFunction',
      {
        functionName: 'ProductsAdminFunction',
        entry: 'lambda/products/productsAdminFunction.ts',
        handler: 'handler',
        memorySize: 128,
        timeout: cdk.Duration.seconds(5),
        bundling: {
          minify: true,
          sourceMap: false
        },

        environment: {
          PRODUCTS_DDB: this.productsDbd.tableName
        },
        layers: [productsLayer],
        tracing: lambda.Tracing.ACTIVE,
        insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_119_0
      }
    )

    this.productsDbd.grantWriteData(this.productsAdminHandler)
  }
}
