import mongoose from "mongoose"
//no need to import dotenv and call dotenv.config() cause it's already done in the entry point(index.js)

//database connection
export const connectDb = async () =>{

    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`); 
        //Backticks are used instead of quotes (' or ") to create a template literal.
        //template literal allows embedding variables or expressions inside a string.
        //Inside the backticks, ${} is used to embed JavaScript expressions, such as variables, directly into the string.
    }
    catch(error){
        console.log("MongoDB connection error: ",error);
    }

}