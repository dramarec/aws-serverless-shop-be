import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from '../../resources/schema';
import { srvsGetProductsList } from 'src/services/srvsGetProductsList';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema>
    = async () => {
        try {
            const productList = await srvsGetProductsList()

            if (!productList || productList.length === 0) {
                return formatJSONResponse(500, {
                    message: 'server error'
                })
            }

            return formatJSONResponse(200, {
                productList
            });

        } catch (error) {
            throw new Error(`error in getAllProducts: ${error} !`)
        }
    };

export const main = middyfy(getProductsList)