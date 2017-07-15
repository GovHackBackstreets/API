const Promise = require('bluebird')
const MongoClient = require('mongodb').MongoClient;

function connect(url, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        }
        callback(db)
    })
}

function insert(db, collection, stuff,done) {
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
    
}


module.exports = {
    insert:insert,
    connect:connect
}