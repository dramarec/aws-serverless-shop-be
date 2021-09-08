import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from '../schema';
import { srvsGetProductsById } from 'src/services/srvsGetProductsById';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema>
    = async (event) => {
        try {
            const { id } = event.pathParameters

            const productById = await srvsGetProductsById(id);

            if (!productById || productById.length === 0) {
                return formatJSONResponse(404, {
                    status: 'not found',
                    message: `product with id:${id} not found`
                });
            }

            return formatJSONResponse(200, {
                productById
            });

        } catch (error) {
            throw new Error(`error in getProductsById: ${error} !`)
        }

    };

export const main = middyfy(getProductsById)