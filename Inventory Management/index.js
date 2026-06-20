const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.use(express.json());

require('dotenv').config();

const bookschema = new mongoose.Schema({bookName: {type: String, required: true}});
const BookModel = mongoose.model("Book", bookschema);

app.post("/books", async (req, res)=>{
    const newBook = await BookModel.create(req.body);
    res.status(201).json(newBook);
});  

app.listen(port, ()=>{console.log(`server is running on port ${port}`)});
const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error connecting to database", err);
});