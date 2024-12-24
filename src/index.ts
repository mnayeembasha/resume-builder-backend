import express from 'express';
import { MONGO_URL, PORT } from './config';
import userRouter from './routes/user';
import cors from 'cors';
import { connectDb } from './db';
const app= express();

app.use(express.json());
connectDb(MONGO_URL as string);
const corsOptions = {
    // origin: "http://localhost:5173",
    // methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));


app.use("/api/v1/user",userRouter);





app.get("/",(req,res)=>{
    res.json({message:"Welcome to Home Page"});
});

app.get("*",(req,res)=>{
    res.status(404).json({message:"Invalid Route | Page Not Found"});
})

app.listen(PORT);