import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

// signup logic
export const signup = async (req,res) => {
    const {fullName,email,password} = req.body;
    try{
        //form validation
        if(!password || !fullName || !email){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        // password validation
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters."});
        }
        
        // email validation
        const user = await User.findOne({email});

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
            await newUser.save();
            generateToken(newUser._id,res);
            

            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
                totalScore:newUser.totalScore
            })
        }
        else{
            return res.status(400).json({message:"Invalid user data."})
        }

    }
    catch(error){
        console.log("Error in signup controller",error.message);
        return res.status(500).json({message:"internal Server Error"})
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

//43:44