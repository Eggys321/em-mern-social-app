require("dotenv/config")
const express = require("express");
const app = express();
const port =  process.env.PORT || 5782;
const connect = require('./config/DB');
const authRoute = require('./routes/authRoute');
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute")
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");



app.use(helmet());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('common'));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

app.use('/api/v1/auth',authLimiter,authRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/posts',postRoute)

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });

const requiredEnvVars = ["MONGODB_URL", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);
if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variable(s): ${missingEnvVars.join(", ")}. Server cannot start.`
  );
  process.exit(1);
}

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




app.get('/',(req,res)=>{
    res.status(200).json({success:true,message:"Em server is live"})
})

app.use((req,res)=>{
    res.status(404).json({success:false,message:"route doesnt exist"})
})