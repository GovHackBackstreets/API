const express = require('express');
const morgan = require('morgan');
const qrlogic = require('./src/logic/qr.js');
const database = require('./src/logic/queries.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

app.post('/picture', qrlogic.Parse);

app.get('/stuff/:id', database.getStuff);
app.post('/createSupplier',database.createSupplier)

app.listen(port, () => {
    console.log(`api is listening at port : ${port}`);
});