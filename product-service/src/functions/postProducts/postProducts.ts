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
                return formatJSONResponse({ message: 'invalid title' }, 400);
            }
            if (!description || description === ' ' || description === undefined) {
                return formatJSONResponse({ message: 'invalid description' }, 400);
            }
            if (!price || typeof price !== 'number' || price === undefined) {
                return formatJSONResponse({ message: 'invalid price' }, 400);
            }
            if (!count || typeof count !== 'number' || count === undefined || count < 1) {
                return formatJSONResponse({ message: 'invalid count' }, 400);
            }

            const result = await srvsPostProducts(value)

            return formatJSONResponse(result, 200);

        } catch (error) {
            formatJSONResponse({
                message: error.message,
            }, 500)
            throw new Error(`error in postProducts: ${error} !`)
        }
    }

export const main = middyfy(postProducts);