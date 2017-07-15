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
            db.collection(collection).insertMany(stuff, function (err, r) {
                console.log(r)
                db.close()
                done()
            });
        } else {
            db.collection(collection).insertOne(stuff, function (err, r) {
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