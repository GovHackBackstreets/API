const express = require('express');
const morgan = require('morgan');
const qrlogic = require('./src/logic/qr.js');
const database = require('./src/logic/queries.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('./src/services/mongo.js')
const app = express();

const port = process.env.PORT || 3000;

const driver = 'mongodb://master:master@ds161012.mlab.com:61012/heroku_x1kdd5jr'

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

mongo.connect(driver, (db) => {
    app.post('/picture', qrlogic.Parse);

    app.get('/stuff/:id', database.getStuff);
    app.post('/createSupplier', (req, res) => {
        const input = req.body;
        mongo.insert(db, 'supplier', input, (status) => {
            res.status(200).send(status)
        });
    })
});


app.listen(port, () => {
    console.log(`api is listening at port : ${port}`);
});