import { handlerPath } from '@libs/handlerResolver';
import { AWSFunction } from '@libs/lambda';
import schema from '../schema';

export default {
    handler: `${handlerPath(__dirname)}/postProducts.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'products',
                cors: true,
                request: {
                    schemas: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
} as AWSFunction;