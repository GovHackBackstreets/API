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
        console.log(stuff)
        if (Array.isArray(stuff)){
            db.collection(collection).insertMany(stuff, function (err, r) {
                if(err){
                    done(err)
                }
                console.log(r)
               
                done(r)
            });
        } else {
            db.collection(collection).insertOne(stuff, function (err, r) {
                if(err){
                    done(err)
                }
                console.log(r)
                
                done(r)
            });
        }
    
}


module.exports = {
    insert:insert,
    connect:connect
}