const USER = require('../model/userModel');


// registration
const registration = async(req,res)=>{
    try {
        const {userName,email,password,confirmPassword} = req.body;

        if(!userName || !email || !password || !confirmPassword ){
            res.status(400).json({success:false,message:"all fields are required to register..."})
            return;
        };
        if(password !== confirmPassword){
            res.status(400).json({success:false,message:"password and confirm password must match"});
            return;
        }

        const user = await USER.create({...req.body});
        res.status(201).json({success:true,message:"registration successful", user})

    } catch (error) {
        if(error.code === 11000){
            res.status(403).json({success:false,message:"Email already in use"})
            return;
        }
        console.log(error.message);
        res.status(500).json(error.message)
    }
}



module.exports = {
    registration
}