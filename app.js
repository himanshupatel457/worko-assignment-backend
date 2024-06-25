const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig.js');
const router = require('./routes/user.routes.js');
const cors = require('./middlewares/cors.js');
dotenv.config();

const app = express();



app.use(cors);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDB();
app.use('/api/v1/worko/user',router);

module.exports = app;