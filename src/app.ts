import 'reflect-metadata';
import express from 'express';
import createConnection from "./database";
import { router } from './routes';

createConnection();
const app = express();

/*
    GET => search
    POST => save
    PUT => change
    DELETE => DELETE
    PATCH => specific change
*/

app.use(express.json());
app.use(router);

export { app };