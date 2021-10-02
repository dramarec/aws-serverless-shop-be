import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import type { AWS } from "@serverless/typescript";
import { Handler } from 'aws-lambda';

import { apiGatewayResponseMiddleware } from './middleware';

export const middyfy = (handler: Handler) => {
  return middy(handler)
  .use(middyJsonBodyParser())
  .use(apiGatewayResponseMiddleware({
    enableErrorLogger: process.env.IS_OFFLINE === 'true'
  }));
}

export type AWSFunction = AWS['functions'][0];