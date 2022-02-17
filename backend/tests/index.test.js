const express = require('express')
const app = express()
const supertest = require("supertest");
const generateToken = require('../token');
describe('System Intergration test',()=>{
    it("POST /BuyToken", async ()=> {
        await supertest(app).post("/BuyToken")
            .send({ money: "300", meter: "02030405" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(201);
    });
    it("POST /BuyToken failure", async ()=> {
        await supertest(app).post("/BuyToken")
            .send({ money: "30", meter: "02030405" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(400);
    });
    it("POST /BuyToken failure", async ()=> {
        await supertest(app).post("/BuyToken")
            .send({ money: "300", meter: "020405" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(400);
    });
    it("POST /UseToken", async ()=> {
        await supertest(app).post("/UseToken")
            .send({token:"010304056"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(201);
    });
    it("POST /UseToken failure", async ()=> {
        const mock = jest.fn()
        await supertest(app).post("/UseToken")
            .send({token:"010304050"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(201);
    });
    it("POST /UseToken failure", async ()=> {
        const mock = jest.fn()
        await supertest(app).post("/UseToken")
            .send({token:"0103040506"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(400);
    });
    it("generates token", async ()=>{
  expect(typeof(generateToken())).tobe('number')      
    })
})