import request from 'supertest';
import {app} from "../app";

import createConnection from "../database";

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Who are you Example?",
            description: "Are you Example Slim Shady?"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    })

    it("Should be abe to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Who are you Example2?",
            description: "Are you Example Slim Shady2?"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.lenght).toBe(2);
    })
})