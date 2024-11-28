import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js";

//we should have this method to use variables from .env files
dotenv.config();

//create express server
const app = express();

const PORT = process.env.PORT;

//attach the router with base path
app.use("/api/auth", authRoutes);

//start the server and listen to port 3001
app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
    connectDb();
})

///20:20