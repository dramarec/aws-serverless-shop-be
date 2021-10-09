import 'source-map-support/register';
import { SNS } from 'aws-sdk';
import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from '@libs/apiGateway';

import { IProp } from 'src/types';
import { srvsPostProducts } from 'src/services/srvsPostProducts';


const catalogBatchProcess = async (event: IProp) => {
    console.log("🔥🚀 ===> = ===> event", event);

    const sns = new SNS({ region: "eu-west-1" });

    try {
        const products = event.Records.map(({ body }) => JSON.parse(body))

        await Promise.all(products.map(
            value => srvsPostProducts(value)
        ))

        for (const product of products) {
            sns.publish({
                Subject: 'Products added',
                Message: JSON.stringify(product),
                MessageAttributes: {
                    "price": {
                        DataType: "Number",
                        StringValue: product.price
                    }
                },
                TopicArn: process.env.SNS_ARN
            }, (err) => {
                if (err) {
                    console.log('Error in sns: ', err)
                } else {
                    console.log('Send email with products: ', product);
                }
            })
        }

        return formatJSONResponse({
            response: {
                message: 'Data has been sent to SQS.'
            },
        }, 200)


    } catch (error) {
        console.log("ERROR ===> catalogBatchProcess:", error);
        formatJSONResponse({
            message: error.message,
        }, 500)
        throw new Error(`error in catalogBatchProcess: ${error} !`)

    }
}


export const main = middyfy(catalogBatchProcess);