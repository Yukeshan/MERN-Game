import { generateToken } from "../lib/utils";
import User from "../models/user.model";
import bcrypt, { genSalt } from "bcryptjs"

// signup logic
export const signup = async (req,res) => {
    const {fullName,email,password} = req.body;
    try{
        // password validation
        if(password.lengt<6){
            return res.status(400).json({message:"Password must be at least 6 characters."});
        }
        
        // email validation
        const user = User.findOne({email});

        if(user){
            return res.status(400).json({message:"Email already exist."})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName, // fullName:fullName - both are same, so i made it shorter as fullName
            email, // email:email - both are same, so i made it shorter as email
            password:hashedPassword
        })
        if (newUser){
            // generate jwt token
            generateToken(newUser._id,res);
        }
        else{
            return res.status(400).json({message:"Invalid user data."})
        }

    }
    catch(error){

    }
}

// login logic
export const login = (req,res) => {
    res.send("login route");
}

// logout logic
export const logout = (req,res) => {
    res.send("logout route");
}