import 'source-map-support/register';
import * as AWS from "aws-sdk";
import * as csvParser from 'csv-parser'

import { BUCKET } from '@libs/constants';
console.log("🔥🚀 ===> BUCKET", BUCKET);
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const importFileParser = async (event) => {
    console.log("🔥🚀 importFileParser ===> event:", event);

    const S3 = new AWS.S3({ region: "eu-west-1" })
    const sqs = new AWS.SQS()

    try {
        const records = event.Records;

        for (const record of records) {
            const key = record.s3.object.key
            const s3Stream = S3.getObject({
                Bucket: BUCKET,
                Key: key,
            }).createReadStream()

            s3Stream
                .pipe(csvParser())
                .on('data', data => {
                    console.log('product parsed from csv: ', data)
                    sqs.sendMessage({
                        QueueUrl: process.env.SQS_URL,
                        MessageBody: JSON.stringify(data)
                    }, (error, data) => {
                        if (error) {
                            console.log('Error in SQS send message: ', error)
                        } else {
                            console.log('Data in SQS send message: ', data)
                        }
                    })
                })
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

        return formatJSONResponse({
            response: {
                message: 'Data has been sent to SQS.'
            },
        });

    } catch (error) {
        console.log("🔥🚀 importFileParser ===> error", error);
        return formatJSONResponse({
            message: error.message,
        }, 500)
    }
}

export const main = middyfy(importFileParser);
