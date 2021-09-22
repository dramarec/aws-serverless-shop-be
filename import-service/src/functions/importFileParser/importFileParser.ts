import 'source-map-support/register';
import * as AWS from "aws-sdk";
import * as csvParser from 'csv-parser'

import { BUCKET } from '@libs/constants';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const importFileParser = async (event) => {
    console.log("🔥🚀 importFileParser ===> event:", event);

    try {
        const S3 = new AWS.S3({ region: "eu-west-1" })

        const records = event.Records;

        for (const record of records) {
            const key = record.s3.object.key
            const s3Stream = S3.getObject({
                Bucket: BUCKET,
                Key: key,
            }).createReadStream()

            s3Stream
                .pipe(csvParser())
                .on('data', data => console.log(data))
                .on('end', async () => {
                    console.log(`🔥🚀 copy from => ${BUCKET}/${key}`)

                    await S3.copyObject({
                        Bucket: BUCKET,
                        CopySource: `${BUCKET}/${key}`,
                        Key: key.replace('uploaded', 'parsed'),
                    }).promise()

                    console.log(`🔥🚀 copied into => ${BUCKET}/${key.replace('uploaded', 'parsed')}`)

                    await S3.deleteObject({
                        Bucket: BUCKET,
                        Key: key,
                    }).promise();

                    console.log(`🔥🚀 file deleted from => ${BUCKET}/${key}`);
                });

        }

    } catch (error) {
        console.log("🔥🚀 importFileParser ===> error", error);
        return formatJSONResponse({
            message: error.message,
        }, 500)
    }
}

export const main = middyfy(importFileParser);
