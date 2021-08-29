export default {
    type: "object",
    properties: {
        name: {
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
        favorite: {
            type: 'boolean'
        },
        ingredients: {
            type: 'array',
            items: {
                type: 'string'
            },
            minItems: 1
        }

    },
    required: ['name', 'description', 'price']
} as const;