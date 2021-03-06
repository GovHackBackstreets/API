const express = require('express');
const morgan = require('morgan');
const qrlogic = require('./src/logic/qr.js');
const database = require('./src/logic/queries.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('./src/services/mongo.js')
const inputs = require('./src/models/inputs')
const t = require('tcomb-validation');
const Promise = require('bluebird')
const app = express();
const port = process.env.PORT || 3000;

const driver = 'mongodb://master:master@ds161012.mlab.com:61012/heroku_x1kdd5jr'

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('static'));

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
        const body = req.body
        const input = {
            id: parseInt(req.params.id),
            location: body.location,
            supplier: body.supplier,
            facilityName:body.facilityName,
            physicalQuality: body.physicalQuality,
            chemicalContaminents: body.chemicalContaminents,
            microbialSafety: body.microbialSafety,
            temperatureControl: body.temperatureControl,
            FSA:body.FSA
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
        console.log(req.params.id)
        mongo.getPassport(db, 'passport', parseInt(req.params.id), (response) => {
            res.status(response.status).send(response.message)
        })
    })

    app.get('/scan/all/:id', (req, res) => {

        const getPassport = (id) => {
            return new Promise(function (resolve, reject) {
                mongo.getPassport(db, 'passport', id, (response) => {
                    if (response.status === 500) { 
                        console.log('cant get stuff from db')
                        reject(response.message); }
                    else {
                        resolve(response.message)
                    }
                })
            })
        }
        var array = []
        function getPassports(id) {
            return getPassport(id)
                .then(item => {
                    array.push(item)
                    if (item.links.length === 0) {
                        console.log(item)
                        Promise.resolve(item)
                    } else {
                        return Promise.all(item.links.map(function (linkId) {
                            console.log('looking for '+linkId)
                            return getPassports(linkId)
                        }));
                    }
                }).then((subItems) => {
                    console.log('------');
                    console.log(subItems)
                    return subItems
                });
        }

        getPassports(parseInt(req.params.id))
            .then((data) => {
                console.log('---sending---');
                res.status(200).send(array)
            })

    })


    app.post('/createPassport', (req, res) => {
        const input = req.body
        console.log(input)
        const result = t.validate(input, inputs.Passport)
        if (result.isValid()) {
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