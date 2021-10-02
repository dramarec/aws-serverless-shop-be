import { handlerPath } from '@libs/handlerResolver';
import { AWSFunction } from '@libs/lambda';

export default {
    handler: `${handlerPath(__dirname)}/getProductsById.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{id}',
                cors: true,
                request: {
                    parameters: {
                        paths: {
                            id: true
                        }
                    }
                }
            }
        }
    ]
} as AWSFunction;