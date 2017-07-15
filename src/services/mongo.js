const Promise = require('bluebird')
const mongo = require('mongodb').MongoClient;


const driver = 'mongodb://tomcats:cats@ds161012.mlab.com:61012/heroku_x1kdd5jr'

function connect(url, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err
        }

        callback(db, function () {
            db.close();
        })
    })
}

function create(db, close){
    
}