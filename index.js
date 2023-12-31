const express=require('express');
require('dotenv/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const PORT=process.env.PORT;
const routes = require('./routes/index');
require('./config/db');
const { responseHandler } = require('./helper/responseHandler');
const app=express();
app.use(cors());
app.use(responseHandler());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/v1', routes);
const server = app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at ${PORT}`);
});
module.exports = server;