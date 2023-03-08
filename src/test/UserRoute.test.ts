import request from 'supertest';
import express from 'express';
import router from '../routes/UserRoutes'
import { ApiSettings } from '../constants/ApiSettings';
import UserType from '../models/User/User';
import { expect } from 'expect';

const app = express();
app.use('/', router);

const server = request(app);

const createBody = { first_name: "Mirko", last_name: "Mirkovic", email: "mirko@bestcopy.hr", password:'abcde', role_id: 2 }
 
describe("User routes test", ()=>{

    test("Create user:succes", async()=>{
        server.post("/user").set('Accept', 'application/json')
        .send(createBody)
        .expect(201)
    })

    test("Create user, with unvalid data", ()=>{
        server.post("/user").set('Accept', 'application/json')
        .send({ first_name: "Mirko", last_name: "Mirkovic", email: "mirko@bestcopy.hr", password:'abcde', role_id: "a" })
        .expect(500)
    })

    test("Cretae user, with empty data", ()=>{
        server.post("/user").set('Accept', 'application/json')
        .send({})
        .expect(400)
    })

    test("Update user, success", ()=>{
        server.patch("/user/1").set('Accept','application/json')
        .send({last_name: "Perić", email: "pero@bestcopy.hr"})
        .expect(1)
    })

    test("Update user, invalid mail", ()=>{
        server.patch("/user/1").set('Accept','application/json')
        .send({last_name:"Perić", email: "pero_bestcopy.hr"})
        .expect(500)
    })

    test("Update user, invalid first and last name", ()=>{
        server.patch("/user/1").set('Accept','application/json')
        .send({first_name:"Perić1", last_name: "pero_bestcopy.hr"})
        .expect(500)
    })

    test("Update user, invalid role", ()=>{
        server.patch("/user/1").set('Accept','application/json')
        .send({first_name:"Perić1", role_id: 3})
        .expect(500)
    })

    test("Get all users without paggiantion", async()=>{
        const res = await server.get("/users")
        expect(res.status).toBe(200);
    })

    test("Get all users with whole paggiantion", async()=>{
        const res = await server.get("/users?page=1&limit=10&filterBy=user_name&search=Stepanic")
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].first_name).toBe("Patrik");
    })

    test("Get all users with wrong paggiantion", async()=>{
        const res = await server.get("/users?page=dad&limit=asdasdas&filterBy=saddasda&search=asacasdsada")
        expect(res.status).toBe(200)
    })

    test("Delete user, success", async()=>{
        const res = await server.delete("/user/1")
        expect(res.status).toBe(200)
        expect(res.body.user[0].first_name).toBe("null")
        expect(res.body.user[0].last_name).toBe("null")
    })

    test("Delete user, with unexisiting id", async()=>{
        const res = await server.delete("/user/3215")
        expect(res.status).toBe(400)
    })
})