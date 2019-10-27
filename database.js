const mongoClient = require("mongodb").MongoClient;
const objectID = require('mongodb').ObjectID;
const dbname = "todoDemo";
const url = "mongodb+srv://DemoUser:Demoman@todocluster-2ha5l.mongodb.net/test?retryWrites=true&w=majority";
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology: true};
const state={
    db: null
}
const connect = (callback) =>{
    if(state.db)
    callback();
    else
    mongoClient.connect(url,mongoOptions,(err,client)=>{
        if(err){callback(err)}
        else
        state.db = client.db(dbname);
        callback();
    })
}
const getPrimaryKey = (_id)=>{
    return objectID(_id);
}
const getDB = () =>{
    return state.db;
}

module.exports = {getDB,getPrimaryKey,connect};