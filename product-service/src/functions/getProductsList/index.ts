import { handlerPath } from '@libs/handlerResolver';
import { AWSFunction } from '@libs/lambda';

export default {
    handler: `${handlerPath(__dirname)}/getProductsList.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products',
                cors: true,
            }
        }
    ]
}as AWSFunction;