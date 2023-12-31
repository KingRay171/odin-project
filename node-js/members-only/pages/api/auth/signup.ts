import { MongoClient } from 'mongodb';
import {hash} from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { username, password, secret } = req.body;
        console.log(req.body)
        //Validate
        if (!username || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        //Connect with database
        const client = await MongoClient.connect(
            process.env.MONGODB_URI as string
        );
        const db = client.db();
        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ username });
        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }
        //Hash password
        const status = await db.collection('users').insertOne({
            username,
            password: await hash(password, 12),
            clubMember: secret === "nido"
        });
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close DB connection
        client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
