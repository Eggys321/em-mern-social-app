require("dotenv/config")
const express = require("express");
const app = express();
const port = 5782;
const connect = require('./config/DB');
const authRoute = require('./routes/authRoute');
const userRoute = require("./routes/userRoute")
const cors = require("cors");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");


// custom middlewares
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('common'));

// app.use(
//     fileUpload({
//       useTempFiles: true,
//       tempFileDir: "/tmp/",
//     })
//   );



// API's

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });

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