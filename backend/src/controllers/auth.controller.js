import cloudinary from "../lib/cloudinary.js";
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
export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        // search for user credentials from database. if exists, store them as an oject.
        const user = await User.findOne({email});
        
        // if user doesn't exist return error message as json format.
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
            
        }
        
        // check whether the password is correct. if not return error message.
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});

        }
        // generate jwt token
        generateToken(user._id,res);

        // return the user credentials
        return res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            totalScore:user.totalScore
        });

        
    
    } catch (error) {
        console.log("Error in login controller",error.message);
        return res.status(500).json({message:"Internal server error"})
        
    }
}

// logout logic
export const logout = (req,res) => {
    try {
        // clear the cookies
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully."});

    } catch (error) {
        console.log("Error in logout controller",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

//update profile logic
export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"Profile picture required."})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        return res.status(200).json(updatedUser);


    } catch (error) {
        console.log("Error in updateProfile controller.")
        return res.status(500).json({message:"Internal server error"});
        
    }
}
// check auth logic
export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller.")
        return res.status(500).json({message:"Internal server error"});
    }
}

// increase score logic
export const increaseScore = async (req, res) => {
    try {
        // Retrieve the user ID from the protected route
        const userId = req.user._id;
        
        // Find the user in the database
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Increase the user's total score by 10
        user.totalScore += 10;

        // Save the updated user
        const updatedUser = await user.save();

        return res.status(200).json({
            message: "Score increased by 10",
            totalScore: updatedUser.totalScore,
        });

    } catch (error) {
        console.log("Error in increaseScore controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
