import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from '../../resources/schema';
import { srvsGetProductsList } from 'src/services/srvsGetProductsList';
// import productList from '../../resources/productList.json';

const getProductsList:
    ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
        try {
            const productList = await srvsGetProductsList()
            console.log("🔥🚀 ===> = ===> productList", productList);

            if(!productList || productList.length === 0){
                return formatJSONResponse(500,{
                        status: 'server error',
                        message: 'products not found'             
                })
            }

            return formatJSONResponse(200, {
                productList
            });

        } catch (error) {
            throw new Error(`Error in getAllProducts: ${error}`)
        }
    };

export const main = middyfy(getProductsList)