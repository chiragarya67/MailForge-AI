import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import authRouter from "./routes/authRoutes.js"
import aiRoutes from './routes/aiRoutes.js'
import connectDB from "./config/db.js"
import path from "path"



const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended : "true"}));
app.use(cors({
   origin: process.env.FRONTEND_URL || true,
}))
app.use(express.static(path.join(__dirname, "client/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.get("/", (req,res)=>{
   res.send("Server is working!")
})

app.use('/api/auth', authRouter)
app.use('/api/ai', aiRoutes);

app.listen(PORT, async ()=>{
   await connectDB()
   console.log(`server running on http://localhost:${PORT}`)
})
