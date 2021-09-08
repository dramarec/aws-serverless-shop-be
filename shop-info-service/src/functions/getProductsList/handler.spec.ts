import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import productList from '../../resources/productList.json'

jest.mock('@libs/lambda');

describe('Unit testing getProductsList func', () => {
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

    it('should return array of object', async () => {
        const actual = await main(productList);
        expect(actual.body).toEqual(JSON.stringify({ productList }));
    });
});