import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import productList from '../../resources/productList.json'

jest.mock('@libs/lambda');

describe('=> Unit testing getProductsById func', () => {
    let main;
    let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

    beforeEach(async () => {
        mockedMiddyfy = mocked(middyfy);
        mockedMiddyfy.mockImplementation((handler: Handler) => {
            return handler as never;
        });

        main = (await import('./handler')).main;
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('=> should return products with id:"b7k2383fd" ', async () => {
        const event = {
            pathParameters: {
                id: "b7k2383fd"
            }
        } as any;

        const { id } = event.pathParameters;

        const productById = productList.find(el => el.id === id);

        const actual = await main(event);

        expect(actual.body).toEqual(JSON.stringify({ productById }));
    });
});