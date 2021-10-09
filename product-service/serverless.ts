import type { AWS } from '@serverless/typescript';

import * as functions from '@functions/index'

const serverlessConfiguration: AWS = {
  service: 'shop-info-service',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-dotenv-plugin'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          'Ref': 'SNSTopic'
        },
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_DATABASE: process.env.PG_DATABASE,
      PG_USERNAME: process.env.PG_USERNAME,
      PG_PASSWORD: process.env.PG_PASS,
      SNS_ARN: {
        Ref: 'SNSTopic',
      },
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic',
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'dramarecsky@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          },
          FilterPolicy: {
            price: [{ numeric: ['>', 20] }],
            success: ['true'],
          },
        },
      },
      SNSSubscription2: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'dramarectest@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          },
          FilterPolicy: {
            price: [{ numeric: ['<', 20] }],
            success: ['false'],
          },
        },
      },
    },
  },
  functions
};

module.exports = serverlessConfiguration;
