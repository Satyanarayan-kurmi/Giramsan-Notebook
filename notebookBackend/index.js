const connectToMongo = require('./db');
const express = require('express')
var cors=require('cors');
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

connectToMongo();
const PORT = process.env.PORT || 5000;

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

__dirname=path.resolve();
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,'../notebook/build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../notebook','build','index.html'));
  })
}
else{
  app.get("/",(req,res)=>{
    res.send("Backend is running");
  });
}


app.listen(PORT,()=> {
    console.log(`Example app listening at http://localhost:${PORT}`)
})