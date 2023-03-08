import request from 'supertest';
import express from 'express';
import router from '../routes/PrinterRoutes'
import { expect } from 'expect';

const app = express();
app.use('/', router);

const server = request(app);

const patchInfo = {serial_number: "A5C01234567", model_id: 2}
const createBody = {serial_number: "A5C02105645", details:"-", model_id: 1, status_id:1}

describe("Printer routes test", ()=>{

    test("Get all prinnters without paggination", async()=>{
        const res = await server.get("/printers");
        expect(res.status).toBe(200);
    })

    test("Get all printers with paggination", async() =>{
        const res = await server.get("/printers?page=1&limit=1&filterBy=brand&search=canon");
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].serial_number).toBe("NHLA546");
    })

    test("Get all printers with incorrect paggination data for page and limit but corect search filter", async() =>{
        const res = await server.get("/printers?page=as&limit=as&filterBy=brand&search=canon")
        expect(res.status).toBe(200);
        expect(res.body.data[0].model.printer_brand.name).toBe("Canon");
    })

    test("Delete printer by id", async () =>{
        let res = await server.delete("/printer/1");
        expect(res.body.deletedPrintersCount).toBe(1);
    })

    test("Delete printer by id that does not exists", async() =>{
        let res = await server.delete("/printer/1212331");
        expect(res.body.deletedPrintersCount).toBe(0)
    })

    test("Get printers by client id succesfull", async () => {
        const res = await server.get("/printers/client/1");
        expect(res.status).toBe(200);
    })

    test("Update printer, succesfull", async() =>{
        server.patch("/printer/1").set('Accept', 'application/json')
        .send(patchInfo)
        .expect(200)
        .end(function (err,res){
            expect(res.body.model_id).toBe(patchInfo.model_id);
            expect(res.body.serial_number).toBe(patchInfo.serial_number);
        })
    })
    
    test("Create printer", async()=>{
        server.post("/printer").set('Accept', 'application/json')
        .send(createBody)
        .expect(200)
    })

    test("Create printer with missing required data", async()=>{
        server.post("/printer").set('Accept', 'application/json')
        .send({serial_number: "A5C02105645", details:"-"})
        .expect(500)
    })

    test("Create printer with wrong data type", async()=>{
        server.post("/printer").set('Accept', 'application/json')
        .send({serial_number: "A5C02105645", details:"-" ,model_id: "1a", status_id:"1b"})
        .expect(500)
    })

})