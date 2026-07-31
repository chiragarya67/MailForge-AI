import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import authRouter from "./routes/authRoutes.js"
import aiRoutes from './routes/aiRoutes.js'
import connectDB from "./config/db.js"



const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended : "true"}));
app.use(cors({
   origin: process.env.FRONTEND_URL || true,
}))

app.get("/", (req,res)=>{
   res.send("Server is working!")
})

app.use('/api/auth', authRouter)
app.use('/api/ai', aiRoutes);

app.listen(PORT, async ()=>{
   await connectDB()
   console.log(`server running on http://localhost:${PORT}`)
})