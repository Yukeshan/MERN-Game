import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"

//we should have this method to use variables from .env files
dotenv.config();

//create express server
const app = express();

//get port number from .env file
const PORT = process.env.PORT;

app.use(express.json()); 

// use cookie-parser which allows to parse the cookie.
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))


app.use("/api/auth", authRoutes);



//start the server and listen to port 3001
app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
    connectDb();
})

///01:00:50