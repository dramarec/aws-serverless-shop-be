import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from '../schema';
import { srvsGetProductsList } from 'src/services/srvsGetProductsList';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema>
    = async () => {
        try {
            const productList = await srvsGetProductsList()

            if (!productList || productList.length === 0) {
                return formatJSONResponse({
                    message: 'server error'
                }, 500)
            }

            return formatJSONResponse({ productList }, 200);
        } catch (error) {
            formatJSONResponse({
                message: error.message,
            }, 500)
            throw new Error(`error in getAllProducts: ${error} !`)
        }
    };

export const main = middyfy(getProductsList)