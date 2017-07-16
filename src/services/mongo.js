const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient;
const t = require('tcomb-validation');
const inputs = require('../models/inputs.js');

function connect(url, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        }
        console.log('db is conected');
        callback(db)
    })
}

function insert(db, collection, stuff, done) {
    if (Array.isArray(stuff)) {
        db.collection(collection).insertMany(stuff, function (err, r) {
            if (err) {
                done({ status: 500, message: err })
            }

            done({ status: 200, message: r })
        });
    } else {
        db.collection(collection).insertOne(stuff, function (err, r) {
            if (err) {
                done({ status: 500, message: err })
            }

            done({ status: 200, message: r })
        });
    }
}

function updatePassport(db, collection, select, stuff, done) {

    const entry = {
        date: Math.round((new Date()).getTime() / 1000),
        facilityName: stuff.facilityName,
        locationName: stuff.supplier,
        geoloc: stuff.location,
        postCode: 'placeholder',
        physicalQuality: stuff.physicalQuality,
        chemicalContaminents: stuff.chemicalContaminents,
        microbialSafety: stuff.microbialSafety,
        temperatureControl: stuff.temperatureControl
    }

    console.log({ "itemID": select })
        db.collection(collection).updateOne({ "itemId": select }, { $push: { stamps: entry } }, (err, doc) => {
            if (err) {
                done({ status: 500, message: err })
            }
            done({ status: 200, message: doc })
        })
}

function getPassport(db, collection, select, done) {
    console.log({ "itemId": select })
    db.collection(collection).findOne({ "itemId": select }, (err, doc) => {
        if (err) {
            done({ status: 500, message: err })
        }
        done({ status: 200, message: doc })
    })
}

function createPassport(db, collection, stuff, done) {
    db.collection(collection).insertOne(stuff, (err, doc) => {
        if (err) {
            done({ status: 500, message: err })
        }
        done({ status: 200, message: doc })
    })
}



module.exports = {
    insert: insert,
    connect: connect,
    getPassport: getPassport,
    updatePassport: updatePassport,
    createPassport: createPassport
}