import type { AWS } from '@serverless/typescript';

import getProductsById from '@functions/getProductsById';
import getProductsList from '@functions/getProductsList';
import postProducts from '@functions/postProducts';

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
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_DATABASE: process.env.PG_DATABASE,
      PG_USERNAME: process.env.PG_USERNAME,
      PG_PASSWORD: process.env.PG_PASS,
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { getProductsList, getProductsById, postProducts },
};

module.exports = serverlessConfiguration;
