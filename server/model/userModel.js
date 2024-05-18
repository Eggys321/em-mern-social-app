const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:[true,"username already in use"]
    },
    email:{
        type:String,
        required:[true,"Email address is required"],
        unique:[true,"Email already in use"],
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:[true, "Please enter a password"],
        minlength:[8,"Minimum password length must be 8 chrs"]
    },
    profilePhoto:{
        type:String,
        default:"https://media.istockphoto.com/id/850937512/photo/words-boy-and-girl-on-bright-backgrounds.webp?b=1&s=170667a&w=0&k=20&c=WQvEeQhk-LBnFjMdB_sVhEBPzTNBuvYeWYfU7W4aYqc="
    },
    bio:{
        type:String,
        default:"Hi, I am new here..."
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    location:{
        type:String,
        default:"location"

    },
    occupation:{
        type:String,
        default:"occupation"

    },
    x:{
        type:String,
        default:"x account"
    },
    linkedIn:{
        type:String,
        default:"linkedIn account"

    },
    followers:[{type:mongoose.Schema.ObjectId,ref:"User"}],
    following:[{type:mongoose.Schema.ObjectId,ref:"User"}],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    
},{timestamps:true});

// hashing password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

// password comparison
userSchema.methods.comparePassword = async function(userPassword){
    const isCorrect = await bcrypt.compare(userPassword, this.password);
    return isCorrect;
}

// generate jwt token
userSchema.methods.generateToken = async function(params){
    let token = jwt.sign({userId:this._id,userName:this.userName},process.env.JWT_SECRET,{
        expiresIn: '24h',
      });

    return token;
}

// generating reset password token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
  };

const USER = mongoose.model('User',userSchema);

module.exports = USER;