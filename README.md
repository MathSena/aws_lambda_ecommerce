
# Projeto de Conclusão da Disciplina de SERVERLESS ARCHITECTURE - FIAP

## Contexto

O projeto é referente a criação de duas Lambda functions na AWS + Banco de Dados (DynamoDB) na qual uma é referente a leitura de produtos e a outra a atualização e cadastro de produtos através de uma API Gateway

## Integrantes do Grupo

- RM 344702 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/mathsena07/">Matheus Sena</a>
- RM 344028 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/guilherme-andrade-guimar%C3%A3es/">Guilherme Andrade</a>
- RM 344433 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/vinicius-roxo-brand%C3%A3o-19ba1115a/">Vinicius Roxo</a>
- RM 344536 - <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/lucca-braz-a31755b5">Lucca Braz</a>

## Utilização



### Endpoints

- GET todos os produtos Produtos
```
[https://ygk96o66n8.execute-api.us-east-1.amazonaws.com/products](https://3qo8twq519.execute-api.us-east-1.amazonaws.com/prod/products)
```

- GET  Produtos
```
[https://ygk96o66n8.execute-api.us-east-1.amazonaws.com/products](https://3qo8twq519.execute-api.us-east-1.amazonaws.com/prod/products)
```


- POST Produtos
```
[https://ygk96o66n8.execute-api.us-east-1.amazonaws.com/products](https://3qo8twq519.execute-api.us-east-1.amazonaws.com/prod/products)

    {
        "model": "Model6",
        "productUrl": "https://cdn.mall.adeptmind.ai/https%3A%2F%2Fimages.footballfanatics.com%2Fatlanta-falcons%2Fwomens-nike-black-john-fitzpatrick-atlanta-falcons-game-player-jersey_pi5110000_ff_5110424-fde142411be51dfd31b4_full.jpg%3F_hv%3D2_large.jpg",
        "code": "COD04",
        "price": 40.5,
        "productName": "Atlanta Falcon Panthers Jersey"
    }
```

### Postman

Na pasta `postman`, na raiz do projeto, está a collection para ser importada localmente.

## Arquitetura

![arquitetura]



# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

