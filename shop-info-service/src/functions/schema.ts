export default {
    type: "object",
    properties: {
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        image: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        count: {
            type: 'number'
        },
    },
    required: ['title', 'description', 'price', 'count']
} as const;