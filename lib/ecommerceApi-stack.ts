import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as cwlogs from 'aws-cdk-lib/aws-logs'
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs'
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

interface EcommerceApiStackProps extends cdk.StackProps {
  productsFetchHandler: lambdaNodeJS.NodejsFunction
  productsAdminHandler: lambdaNodeJS.NodejsFunction
}

export class EcommerceApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
    super(scope, id, props)

    const logGroup = new cwlogs.LogGroup(this, 'ECommerceApiLogs')
    const api = new apigateway.RestApi(this, 'EcommerceAPI', {
      restApiName: 'ECommerceApi',
      cloudWatchRole: true,
      deployOptions: {
        accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          caller: true,
          user: true
        })
      }
    })

    const productsFetchIntegration = new apigateway.LambdaIntegration(
      props.productsFetchHandler
    )

    const productsResource = api.root.addResource('products')
    productsResource.addMethod('GET', productsFetchIntegration)

    const productsIdResource = productsResource.addResource('{id}')
    productsIdResource.addMethod('GET', productsFetchIntegration)

    const productsAdminIntegration = new apigateway.LambdaIntegration(
      props.productsAdminHandler
    )

    productsResource.addMethod('POST', productsAdminIntegration)
    productsIdResource.addMethod('PUT', productsAdminIntegration)
    productsIdResource.addMethod('DELETE', productsAdminIntegration)
  }
}
