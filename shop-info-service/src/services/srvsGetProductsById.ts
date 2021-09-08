import { Client } from 'pg';
import { dbOptions } from '@libs/dbOptions';

export const srvsGetProductsById = async (id) => {
    console.log("🔥🚀 ===> srvsGetProductsById ===> id", id);
    const client = new Client(dbOptions);
    
    try {
        await client.connect();
        const { rows: result } = await client.query(`
            select p.id, p.title, p.description, p.image, p.price, stocks.count
            from products p 
            left outer join stocks
            on p.id = stocks.stock_id
            where p.id='${id}'`
        );

        return result;
    } catch (error) {
        throw new Error(`=> srvsGetProductsById: ${error}...`);
    } finally {
        client.end();
    }
}

