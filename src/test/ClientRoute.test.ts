import request from 'supertest';
import express from 'express';
import router from '../routes/ClientRoutes'
import { ApiSettings } from '../constants/ApiSettings';
import ClientType from '../models/Client/Client';


const app = express();
app.use('/', router);

const server = request(app);

const createBody = { name: "AG04 Innovative Solutions", erp: "2523", oib:"32847901111", address: "Zvonimirova 69", post_code: 10000, city:"Zagreb", country:"Hrvatska" }
const patchBody = { name: "AG04 New Age", oib: "12345678911" }

describe("Client routes tests", () => {

    test("creating client", ()=>{
        server.post("/client").set('Accept', 'application/json')
            .send(createBody)
            .expect(200)
    })

    test("creating client with missing data", ()=>{
        server.post("/client").set('Accept', 'application/json')
        .send({id: 1, name: "AG04 Innovative Solutions", erp: 2523, oib:"3284790", address: "Zvonimirova 69", post_code: 10000})
        .expect(500)
    })

    test("Get client info by id", async () => {
        const res = await server.get("/client/1");
        expect(res.status).toBe(200);
    })

    test("Should return 400 for invalid id", async () => {
        const res = await server.get("/client/-1");
        expect(res.status).toBe(400);
    })

    test("Get all clients without pagination", async() =>{
        const res = await server.get("/clients");
        expect(res.status).toBe(200);
    })

    test("Get all clients with pagination", async() =>{
        const res = await server.get("/clients?page=1&limit=1&filterBy=name&search=AG");
        expect(res.status).toBe(200);
    })

    test("Get all clients using wrong filter returning 200/empty array", async() =>{
        const res = await server.get("/clients?page=abc&limit=1&filterBy=shdb&search=fdcghdfgh");
        expect(res.status).toBe(200);
        expect(res.body.data).toBe(undefined);
    })

    test("Update client done well", async()=>{
        server.patch("/client/1").set('Accept','application/json')
        .send(patchBody)
        .expect(200)
    })

    test("Expect 500 for updating client with invalid data type", async () => {
        server.patch("/client/1").set('Accept', 'application/json')
            .send({ name: 111 })
            .expect(500)
    })

    test("Expect 500 for updating client with incorrect data", async () => {
        server.patch("/client/1").set('Accept', 'application/json')
            .send({ oib: "1010101010" })
            .expect(500)
    })


})