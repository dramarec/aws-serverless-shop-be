import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from '../../resources/schema';
import productList from '../../resources/productList.json';

const getProductsList:
    ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
        try {
            return formatJSONResponse(200, {
                productList
            });

        } catch (error) {
            throw new Error(`Error in getAllProducts: ${error}`)
        }
    };

export const main = middyfy(getProductsList)