require("dotenv/config")
const express = require("express");
const app = express();
const port = 5782;
const connect = require('./config/DB');

// server and DB connection
connect()
.then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`EM-Server is connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log("can not connect to the EM server");
    }
})
.catch((error)=>{
    console.log("invalid database connection...", error);
})




// routes
app.get('/',(req,res)=>{
    res.status(200).json({success:true,message:"Em server is live"})
})

app.use((req,res)=>{
    res.status(404).json({success:false,message:"route doesnt exist"})
})