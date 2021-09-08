import { Client } from 'pg';
import { dbOptions } from '@libs/dbOptions';

export const srvsGetProductsList = async () => {
    const client = new Client(dbOptions);

    try {
        await client.connect();
        const { rows: result } = await client.query(`
            select p.id, p.title, p.description, p.image, p.price, stocks.count
            from products p 
            left outer join stocks
            on p.id = stocks.stock_id`
        );
        console.log("🔥🚀 ===> srvsGetProductsList ===> result", result);
        return result;

    } catch (error) {
        throw new Error('=> srvsGetProductsList error...');
    } finally {
        client.end();
    }
}
