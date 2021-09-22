import 'source-map-support/register';
import * as AWS from "aws-sdk";

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';


const importProductsFile = async (event) => {

    const BUCKET = process.env.BUCKET_NAME;
    const PATH = process.env.CATALOG_PATH;

    try {
        const fileName = event.queryStringParameters.name;

        if (!fileName) {
            return formatJSONResponse({
                message: 'fileName is empty',
            }, 400);
        }

        const filePath = `${PATH}${fileName}`;

        const S3 = new AWS.S3({ region: "eu-west-1" });

        const params = {
            Bucket: BUCKET,
            Key: filePath,
            Expires: 60,
            ContentType: "text/csv",
        };

        const result = await S3.getSignedUrlPromise("putObject", params)

        const newRes = formatJSONResponse(result)

        return newRes

    } catch (error) {
        console.log("🔥🚀 ===> importProductsFile ===> error", error);
        return formatJSONResponse({
            message: error.message,
        }, 500)
    }
}

export const main = middyfy(importProductsFile);
