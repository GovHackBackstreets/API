const express = require('express');
const morgan = require('morgan');
const qrlogic = require('./src/logic/qr.js');
const database = require('./src/logic/queries.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('./src/services/mongo.js')
const inputs = require('./src/models/inputs')
const t = require('tcomb-validation');
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

    app.put('/scan/:id', (req, res) => {
        const input = {
            id: req.param.id,
            location: req.body.location,
            supplier: req.body.supplier
        }
        const result = t.validate(input, inputs.step)
        if (result.isValid()) {
            mongo.updatePassport(db, 'passport', input.id, input, (response) => {
                res.status(response.status).send(response.message)
            })
        } else {
            res.status(400).send(result.errors)
        }
    })

    app.get('/scan/:id', (req, res) => {
        mongo.getPassport(db, 'passport', input.id, (response) => {
            res.status(response.status).send(response.message)
        })
    })

    app.post('/createPassport', (req, res) => {
        const input = req.body
        console.log(input)
        const result = t.validate(input, inputs.passport)
        if (result.isValid) {
            mongo.createPassport(db, 'passport', input, (response) => {
                res.status(response.status).send(response.message)
            })
        } else {
            res.status(400).send(result.errors)
        }
    })
});


app.listen(port, () => {
    console.log(`api is listening at port : ${port}`);
});