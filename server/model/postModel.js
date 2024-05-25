const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        maxlength:1000,
        trim:true
    },
    imagePath:{
        type:String,
    },
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User",}],
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        text:{type:String,required:true,trim:true},
        createdAt:{type:Date,default:Date.now},
    }]
},{timestamps:true});

const POST = mongoose.model("Post",postSchema);

module.exports = POST