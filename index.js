const express = require('express');
const morgan = require('morgan');
const qrlogic = require('./src/logic/qr.js');
const database = require('./src/logic/queries.js')
const bodyParser = require('body-parser')
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.post('/picture',qrlogic.Parse);

app.get('/stuff/:id',database.getStuff);


app.listen(3000,()=>{
    console.log('api is listening at port : 3000!')
})