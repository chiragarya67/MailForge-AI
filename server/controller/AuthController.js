import User from "../model/userModel.js" 
import sendEmail from '../utils/sendEmail.js'
import jwt from 'jsonwebtoken'

const generateAuthToken = function(id) {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

export const signup = async (req, res, next)=>{
    try {
        const {username, password, email} = req.body
        
        if(!username || !email || !password ){
          return res.status(400).json({message: 'all fields are required'})
        }

        if(password.length < 6) {
             return res.status(400).json({message: 'Password must be at least 6 characters'})
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"Email already in use"})
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpire = new Date(Date.now() + 10 * 60 * 1000)

        const user = await User.create({ username, email, password, otp, otpExpire })
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id,
            user: { username: user.username, email: user.email },
        })
 
        try {
            await sendEmail ({
                to: email,
                subject: "Your Mailforge verification code",
                text: `Your OTP code is ${otp}. It is valid for 10 minutes. If you do not see this email in your inbox, please check your spam or junk folder.`
            })
        } catch (err) {
            console.log("sending otp error", err)
        } 

   } catch (error) {
       return res.status(500).json({message:"Error registering user", error: error.message})
}    }

export const login = async (req, res)=>{
    try {
         const {email, password} = req.body; 
        if(!email || !password) {
            return res.status(400).json({message: "Email and password are required"})
        }
        const user = await User.findOne({email}).select('+password +isverify');
        if(!user) {
            return res.status(400).json({message: "User not found."})
        } 
        if(!user.isverify){
            return res.status(400).json({message: "User not verified, please verify your email."})
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"})
        }
        const token = generateAuthToken(user._id)
        return res.status(200).json({message: "Login successful", token, user: {username : user.username, email: user.email} })


    } catch (error) {
        return res.status(500).json({message: "Error logging in", error: error.message})
    } 
}

export const verifyEmail = async (req, res)=>{
    try {
     const { otp, email} = req.body;
      if(!otp || !email){
       return res.status(400).json({message: "email and otp required"})
     }
     
     const user = await User.findOne({email}).select('+otp +otpExpire')
     if(!user){
        return res.status(400).json({message: "User not found"})
     }
     if(user.isverify){
        return res.status(400).json({message: "User is already verified"})
     }
     if(user.otp !== otp){
        return res.status(400).json({message: "invalid Otp"})
     }
     if(user.otpExpire < new Date()){
        return res.status(400).json({message: "Otp has expired"})
     }
     
     user.isverify = true;
     await user.save();
     const token = generateAuthToken(user._id);
     return res.status(200).json({
         token,
         message: "User verified successfully",
         user: { username: user.username, email: user.email },
     })

    } catch (error) {
        return res.status(500).json({message: "Error verifying OTP", error: error.message})

    }
}