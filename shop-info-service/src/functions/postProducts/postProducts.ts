import 'source-map-support/register';

import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { srvsPostProducts } from 'src/services/srvsPostProducts';
import schema from '../schema';

const postProducts
    : ValidatedEventAPIGatewayProxyEvent<typeof schema>
    = async (event) => {
        console.log("🔥🚀 ===> postProducts ===> event:", event);

        try {
            const { title, description, price, count } = event.body;

            const value = {
                title: title,
                description: description,
                price: price,
                count: count
            }

            if (!title || title === ' ' || title === undefined) {
                return formatJSONResponse(400, { message: 'invalid title' });
            }
            if (!description || description === ' ' || description === undefined) {
                return formatJSONResponse(400, { message: 'invalid description' });
            }
            if (!price || typeof price !== 'number' || price === undefined) {
                return formatJSONResponse(400, { message: 'invalid price' });
            }
            if (!count || typeof count !== 'number' || count === undefined || count < 1) {
                return formatJSONResponse(400, { message: 'invalid count' });
            }

            const result = await srvsPostProducts(value)

            return formatJSONResponse(200, result);

        } catch (error) {
            throw new Error(`error in postProducts: ${error} !`)
        }
    }

export const main = middyfy(postProducts);