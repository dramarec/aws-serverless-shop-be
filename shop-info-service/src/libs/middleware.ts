import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { formatJSONResponse } from './apiGateway';
import MiddlewareFunction = middy.MiddlewareFunction;

export const apiGatewayResponseMiddleware = (
    options: { enableErrorLogger?: boolean } = {}
) => {

    const after: MiddlewareFunction<APIGatewayProxyEvent, any>
        = async (request) => {
            console.log("🔥🚀 ===> const after ===> request:", request);

            if (!request.event?.httpMethod
                || request.response === undefined
                || request.response === null
            ) {
                return;
            }

            const existingKeys = Object.keys(request.response);

            const isHttpResponse
                = existingKeys.includes('statusCode')
                && existingKeys.includes('headers')
                && existingKeys.includes('body');

            if (isHttpResponse) {
                return;
            }

            request.response = formatJSONResponse(undefined, request.response);
        }

    const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult>
        = async (request) => {
            console.log("🔥🚀 ===> const onError ===> request:", request);

            const { error } = request;
            let statusCode = 500;

            if (options.enableErrorLogger) {
                console.error(error);
            }

            request.response = formatJSONResponse(statusCode, { message: error.message });
        }

    return {
        after,
        onError,
    };
}