import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers([
   '1.1.1.1',
   '8.8.8.8'
])

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("monngoDb connected successfully")
    } catch (error) {
         console.log("mongo err ", error.message)
    }
}

export default connectDB;