import { Client } from 'pg';
import { dbOptions } from '@libs/dbOptions';

export const srvsPostProducts = async (value) => {
    const client = new Client(dbOptions);
    const { title, description, price, count } = value
    const index = Math.ceil(Math.random() * (100 - 1) + 1)
    const image = `https://source.unsplash.com/random?sig=${index}`

    try {
        await client.connect();
        await client.query('BEGIN')

        const resultProduct = await client.query(
            'insert into products(title, description, image, price) values($1, $2, $3, $4) returning id',
            [title, description, image, price]
        );

        const idProduct = resultProduct?.rows[0].id

        await client.query(
            'insert into stocks (stock_id, count) values ($1, $2)',
            [idProduct, count]
        );

        const { rows: result } = await client.query(
            'select p.id, p.title, p.description, p.image, p.price, stocks.count from products p left outer join stocks on p.id = stocks.stock_id where p.id = $1',
            [idProduct]
        );
        
        console.log("🔥🚀 ===> srvsPostProducts ===> result", result);
        await client.query('COMMIT')
        return result
    } catch (error) {
        throw new Error(`srvsPostProducts => ${error}...`);
    } finally {
        client.end();
    }
}
