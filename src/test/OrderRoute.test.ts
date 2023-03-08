import request from 'supertest';
import express from 'express';
import router from '../routes/OrderRoutes'
import { ApiSettings } from '../constants/ApiSettings';
import { createOrderBody, invalidCreateOrderBody, updateOrderBody } from './models/Order';

const app = express();
app.use('/', router);

const server = request(app);

describe("Order routes tests", () => {

    test("Get all orders without filters", async () => {
        const res = await server.get("/orders");

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(ApiSettings.DEFAULT_OBJECTS_PER_PAGE);
    })

    test("Get all orders using filters", async () => {
        const res = await server.get("/orders?page=1&limit=4&filterBy=username&search=patrik");

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].user.first_name).toBe("Patrik");
    })

    test("Get all orders using wrong filters - should return empty array", async () => {
        const res = await server.get("/orders?page=1&limit=4&filterBy=jskdfh&search=dsligfblasdaskldfhjls");

        expect(res.status).toBe(200);
        expect(res.body.data).toBe(undefined);
    })

    test("Get order should return order", async () => {
        const res = await server.get("/order/1");

        expect(res.status).toBe(200);
    })
    test("Should return 500 for invalid id", async () => {
        const res = await server.get("/order/-1");

        expect(res.status).toBe(500);
    })

    test("Update order by id", async () => {
        server.patch("/order/2").set('Accept', 'application/json')
            .send(updateOrderBody)
            .expect(200)
    })

    test("Expect 500 for updating order with invalid data", async () => {
        server.patch("/order/2").set('Accept', 'application/json')
            .send({ status: {id: -1} })
            .expect(500)
    })

    test("creating order", ()=>{
        server.post("/order/create").set('Accept', 'application/json')
            .send(createOrderBody)
            .expect(200)
    })

    test("Expect 500 for creating order with invalid data", async () => {
        server.post("/order/create").set('Accept', 'application/json')
            .send(invalidCreateOrderBody)
            .expect(500)
    })
})