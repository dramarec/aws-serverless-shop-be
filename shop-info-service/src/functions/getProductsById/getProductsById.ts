import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import productList from '../../resources/productList.json';
import schema from '../../resources/schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema>
    = async (event) => {
        try {
            const { id } = event.pathParameters
            const productById = productList.find(el => el.id === id);

            if (!productById) {
                return formatJSONResponse(404, {
                    status: 'not found',
                    message: `product with id:${id} not found`
                });
            }

            return formatJSONResponse(200, {
                productById
            });

        } catch (error) {
            throw new Error(`Error in getProductsById: ${error}`)
        }

    };

export const main = middyfy(getProductsById)