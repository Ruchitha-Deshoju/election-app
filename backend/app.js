const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const participantRouter = require('./routes/participant')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/new-campaign-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())
app.use(participantRouter)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT')
    next();
})

module.exports = app;