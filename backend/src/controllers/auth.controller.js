import User from "../models/user.model";
import bcrypt from "bcryptjs"

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