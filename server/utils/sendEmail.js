import nodemailer from 'nodemailer'
    
const sendEmail = async (option) =>{
    try {
        if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS){
        throw new Error('email credentials are not set in env')
     }
         
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    })
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: option.to,
        subject : option.subject,
        text: option.text,
        html : `<p>${option.text}</p>`
    }
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully ")
   
} catch (error) {
      console.log("error sending mail :", error)
      throw error;
    }
}

export default sendEmail



