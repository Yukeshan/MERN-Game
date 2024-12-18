import mongoose from "mongoose";

//create user schema
const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        fullName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        profilePic:{
            type:String,
            default:""
        },
        totalScore:{
            type:Number,
            default:0
        },
    },
    {
        timestamps:true //to show things such as created at and updated at
    }
);

// create user model
const User = mongoose.model("User",userSchema);

export default User;