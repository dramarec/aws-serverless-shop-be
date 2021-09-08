import { handlerPath } from '@libs/handlerResolver';

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
}