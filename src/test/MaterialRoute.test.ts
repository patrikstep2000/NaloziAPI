import request from 'supertest';
import express from 'express';
import router from '../routes/MaterialRoutes'

const app = express();
app.use('/', router);

const server = request(app);

describe("Material routes tests", () => {

    test("Get all materials without filters", async () => {
        const res = await server.get("/materials");
        expect(res.status).toBe(200);
    })

    test("Get all materials using filters", async () => {
        const res = await server.get("/materials?page=1&limit=5&filterBy=type&search=Dijelovi");

        expect(res.status).toBe(200);
        expect(res.body.data[0].type.name).toBe("Dijelovi");
    })

    test("Get all materials using filters", async () => {
        const res = await server.get("/materials?page=1&limit=5&filterBy=material&search=gumice");

        expect(res.status).toBe(200);
        expect(res.body.data[0].id).toBe(1);
        expect(res.body.data[0].name).toBe("Gumice Konica/Ineo");
    })

    test("Get all materials using filters wrong", async () => {
        const res = await server.get("/materials?page=112ccc&limit=5ss&filterBy=material&search=gsdadaxcacc2222umice");

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(0);
    })




})