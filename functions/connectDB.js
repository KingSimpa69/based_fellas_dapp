import { MongoClient } from 'mongodb'

async function connectDb() {

    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);

    return await client.connect();
}

export default connectDb;
