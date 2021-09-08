import { handlerPath } from '@libs/handlerResolver';
import schema from '../../resources/schema';

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
}