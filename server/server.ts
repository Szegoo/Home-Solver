import express, { Request, Response } from "express";
const next = require("next");
import { ApolloServer } from "apollo-server-express";
import typeDefs from './grapqhl/schema';
import resolvers from './grapqhl/resolvers';
import mongoose from 'mongoose';
import { uploadImage, resizeImage } from './controllers/taskController';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
require('dotenv').config();
console.log(process.env.MONGODB);

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to db");
});

app.prepare().then(() => {
    const server = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    apolloServer.applyMiddleware({ app: server });
    server.post('/api/image',
        uploadImage,
        resizeImage
    )
    server.get("*", (req: Request, res: Response) => {
        return handle(req, res);
    });
    server.listen(port, (err?: any) => {
        if (err) throw err;
        console.log(`> Launched on http://localhost:${port}`);
    });
})