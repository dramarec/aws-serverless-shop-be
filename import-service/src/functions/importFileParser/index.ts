import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/importFileParser.main`,
    events: [
        {
            s3: {
                bucket: '${env:BUCKET_NAME}',
                event: 's3:ObjectCreated:*',
                rules: [
                    {
                        prefix: '${env:CATALOG_PATH}'
                    }
                ],
                existing: true
            }
        }
    ]
}