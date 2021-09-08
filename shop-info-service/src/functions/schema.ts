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

        // favorite: {
        //     type: 'boolean'
        // },
        // ingredients: {
        //     type: 'array',
        //     items: {
        //         type: 'string'
        //     },
        //     minItems: 1
        // }

    },
    required: ['name', 'description', 'price', 'count']
} as const;