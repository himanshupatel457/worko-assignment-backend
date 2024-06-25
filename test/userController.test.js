

const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/user.routes.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1/worko/user', userRoutes);

jest.setTimeout(50000);

beforeAll(async () => {
    const url = process.env.MONGO_DB_URI;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Controller', () => {
    describe('Create User', () => {
        it('should create a user', async () => {
            const res = await request(app)
                .post('/api/v1/worko/user/')
                .set('Authorization', 'Basic ' + Buffer.from('admin:admin').toString('base64')) // Add basic auth
                .send({
                    email: 'test457@example.com',
                    name: 'John Doe',
                    age: 30,
                    city: 'City',
                    zipCode: '12345'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });
    });

    describe('Get Users', () => {
        it('should get all users', async () => {
            const res = await request(app)
                .get('/api/v1/worko/user/')
                .set('Authorization', 'Basic ' + Buffer.from('admin:admin').toString('base64')); 
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true); 
        });

        it('should get a user by ID', async () => {
            const userId = process.env.ID; 
            const res = await request(app)
                .get(`/api/v1/worko/user/${userId}`)
                .set('Authorization', 'Basic ' + Buffer.from('admin:admin').toString('base64')); // Add basic auth
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('Update User', () => {
        it('should update a user', async () => {
            const userId = process.env.ID; 
            const res = await request(app)
                .put(`/api/v1/worko/user/${userId}`)
                .set('Authorization', 'Basic ' + Buffer.from('admin:admin').toString('base64')) // Add basic auth
                .send({
                    email: 'test21234@example.com',
                    name: 'Jane Doe',
                    age: 25,
                    city: 'New City',
                    zipCode: '54321'
                });
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('Delete User', () => {
        it('should soft delete a user', async () => {
            const userId = process.env.DEL_ID; // Replace with a valid user ID
            const res = await request(app)
                .delete(`/api/v1/worko/user/${userId}`)
                .set('Authorization', 'Basic ' + Buffer.from('admin:admin').toString('base64')); // Add basic auth
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('User deleted successfully');
        });
    });
});














