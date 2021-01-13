const environment = require("../config/environment");

const request = require('supertest')
const mongoose = require('mongoose')
const dbHandler = require('../tests/db-handler');
const ContactModel = require('../models/contact.model');
const { first } = require("lodash");

let bodyParser = require("body-parser");
const app = require('express')();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('../api-routes'));

// It's just so easy to connect to the MongoDB Memory Server 
// By using mongoose.connect
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('ContactController', () => {
    it('should return empty array on empty database', async done => {
        let res = await request(app).get('/contacts')
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(0)
        done();
    });

    it('should create contact', async done => {
        const firstName = 'henk';
        let res = await request(app)
                    .post('/contacts')
                    .send({ 'firstName': firstName, 'lastName': 'test2', 'mobile': '12345566'})
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.firstName).toBe(firstName);

        let foundContact = await ContactModel.find({ firstName: firstName });
        expect(foundContact).toHaveLength(1);

        done();
    });
  });