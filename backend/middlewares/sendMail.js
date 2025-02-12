import { createTransport } from "nodemailer";


export const sendMail = async(text) =>{
     
    const transporter = createTransport({
        host: process.env.SMPT_HOST,
        port:  process.env.SMPT_PORT,
        auth: {
          user: process.env.SMPT_USER,
          pass: process.env.SMPT_PASSWORD
        }
      })
      
  
    await transporter.sendMail({subject : "contact request from portfolio",to : process.env.MY_MAIL, from : process.env.MY_MAIL , text })
}