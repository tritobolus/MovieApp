import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoute from './Routes/authRoute.js'
import movieRoute from './Routes/movieRoute.js'
import customMovieRoute from './Routes/customMovieRoute.js'
import dotenv from "dotenv";

dotenv.config();

const app = express()
app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true,               
    })
);
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoute)
app.use('/movie', movieRoute)
app.use('/customMovie', customMovieRoute)

app.get("/", (req,res) => {
    res.send("Hello im from backend!!")
})
app.listen(5000, () => console.log("Server is runing..."))

