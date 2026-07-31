 import express from 'express'
 import { login, signup, verifyEmail } from "../controller/AuthController.js"
 const authRouter = express.Router()

 authRouter.post("/register", signup)
 authRouter.post("/login", login)
 authRouter.post("/verifymail", verifyEmail)
 


 export default authRouter
 