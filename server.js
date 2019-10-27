const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');
const port = (process.env.PORT || 5000);

const db = require('./database');
const collection = "todo";

db.connect((err)=>{
    
    if(err){console.log("unable to connect to database");
    process.exit(1);
}
else{
    app.listen(port,()=>{
        console.log("connected");
    });
}
})

//update current database
app.put('/:id',(req,res)=>{
    const todoID = req.params.id;//gets id of requested todo
    const userInput = req.body;//gets new update
    db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(todoID)},{$set:{todo: userInput.todo}},{returnOriginal :false},(err,result)=>{
    if(err)
    console.log(err);
    else
    res.json(result);//displays result if edited
})
})

//delete something from database
app.delete('/:id',(req,res)=>{
    const todoID = req.params.id;//gets id of requested todo
    db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(todoID)},(err,result)=>{
    if(err)
    console.log(err);
    else
    res.json(result);//displays result if deleted
})
})

//insert into database
app.post('/',(req,res)=>{
    const userInput = req.body;//gets the new insert
    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
    if(err)
        console.log(err);
    else
        res.json({result:result, document: result.ops[0]});//displays result if inserted
})
})
//load client
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/src/index.js'));
})

//easy to view page
app.get('/getTodos',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
    if(err){console.log(err)}
    else{
        console.log(documents);
        res.json(documents);
    }
});
})
