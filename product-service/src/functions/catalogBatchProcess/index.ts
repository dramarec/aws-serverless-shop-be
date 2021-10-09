import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/catalogBatchProcess.main`,
    events: [
        {
            sqs: {
                batchSize: 5,
                arn: {
                    'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
                },
            },
        },
    ],
};