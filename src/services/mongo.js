const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient;


const driver = 'mongodb://heroku_x1kdd5jr@ds161012.mlab.com:61012/heroku_x1kdd5jr'

function connect(url, collection, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        }
        var col = db.collection(collection);
        callback(db)
    })
}

function insert(collection, stuff,done) {
    connect(driver, collection, (db) => {
        if (Array.isArray(stuff)){
            col.insertMany(stuff, function (err, r) {
                console.log(r)
                db.close()
                done()
            });
        } else {
            col.insertOne(stuff, function (err, r) {
                console.log(r)
                db.close()
                done()
            });
        }
    })
}


module.exports = {
    insert:insert
}