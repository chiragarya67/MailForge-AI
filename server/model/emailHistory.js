import mongoose from "mongoose";

const EmailHistorySchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    prompt:{ 
        type: String,
        required: true
    },
    subject : {
        type: String,
        required: true
    },
    emailBody : {
        type: String,
        required: true
    },
    LinkedInDM : {
        type: String,
        required: true
    },
    followUpEmail : {
        type: String,
        required: true
    },

})

const EmailHistory = mongoose.model('EmailHistory', EmailHistorySchema)
export default EmailHistory