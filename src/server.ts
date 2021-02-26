import 'reflect-metadata';
import express from 'express';
import "./database";
import { router } from './routes';

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

app.listen(3333, () => console.log("Server is running!"));