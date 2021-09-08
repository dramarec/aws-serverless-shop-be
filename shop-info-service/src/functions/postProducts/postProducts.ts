import 'source-map-support/register';

import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { srvsPostProducts } from 'src/services/srvsPostProducts';
import schema from '../../resources/schema';

const postProducts: ValidatedEventAPIGatewayProxyEvent<typeof schema>
    = async (event) => {
        console.log("🔥🚀 ===> postProducts ===> event", event);

        try {
            const value = event.body;
            const result = await srvsPostProducts(value)
            console.log("🔥🚀 ===> postProducts ===> result", result);

            return formatJSONResponse(
                200,
                result
            );

        } catch (error) {
            throw new Error(`Error in postProducts: ${error}`)
        }
    }

export const main = middyfy(postProducts);