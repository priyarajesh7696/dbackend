
import UserModel from '../models/user.js'
import MemberModel from '../models/member.js'
import Auth from '../helper/auth.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import mongoose from '../models/index.js'
import otp from '../models/otp.js'


const emailSend = async (req, res) => {
    console.log(req.body)
    const { email } = req.body
  
    try {
      const data = await UserModel.findOne({ email: email })
      // console.log(data)
      if (data === null) {

        res.status(409).send({ message: 'Email was not found' })
      }
       else {
        const userName = data.name
  console.log(userName)
        let otpcode = Math.floor(Math.random() * 10000 + 1)
        console.log(otpcode)
       
        let otpData = new otp({
          email: email,
          code: otpcode,
          expiresIn: new Date().getTime() + 300 * 1000,
        })
        // console.log(otpResponse)
        // console.log(email,otpcode,expiresIn)
       

        const otpResponse = await otpData.save()
        console.log(otpResponse)
         mailer(userName, email, otpcode)
   
  
        const message = `The mail with the OTP has been sent. Please check inbox`
  
      res.status(200).send({ data: data, message: message })
      }
    } catch (error) {
      res.status(409).send({ message: error.message })
    }
  }
  
const verifyCode = async (req, res) => {
    const { code } = req.body
    console.log(code)
    try {
      const data = await otp.findOne({ code: code })
  
      if (data === null) {
        res.status(409).send({ message: 'Invalid OTP' })
      } else {
        const currentTime = new Date().getTime()
        const expiresIn = parseInt(data.expiresIn)
  
        if (expiresIn < currentTime) {
          res.status(409).send({ data: data, message: 'Code is expired.' })
        } else {
          res.status(200).send({ data: data, message: 'Code is valid' })
        }
      }
    } catch (error) {
      res.status(409).send({ message: error.message })
    }
  }
  
const resetPassword = async (req, res) => {
    const { email, otp: otpCode, password, confirmPassword } = req.body
  
    try {
      let data = await otp.findOne({ code: otpCode })
  
      if (data) {
        const user = await UserModel.findOne({ email: email })
        if (user) {
          if (password !== confirmPassword)
            return res.status(400).send({ message: "Passwords don't match" })
  
          const newHashedPassword = await bcrypt.hash(password, 10)
  
          const result = await UserModel.findOneAndUpdate(
            { email: user.email },
            { $set: { password: newHashedPassword } },
            { new: true },
          )
  
          data.deleteOne({ code: otpCode })
  
          res
            .status(200)
            .send({ data: result, message: 'Password changed successfully' })
        } else {
          res.status(409).send({ message: 'User not found.' })
        }
      } else {
        res.status(409).send({ message: 'Could not find OTP in the database.' })
      }
    } catch (error) {
      res.status(409).send({ message: error.message })
    }
  }
  
  // Nodemailer Configurations to send Email
  const mailer = async (userName, email, otp) => {
    try {
      console.log(userName)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
  secure: true,
        auth: {
         
          user: "rajeshpriyait123@gmail.com",
      pass: process.env.smtp_password,
        },
        // tls:{rejectUnauthorized: false} 
      })
  
      const mailOptions = {
        from: "rajeshpriyait123@gmail.com",
        to: email,
        subject: 'Link to Reset Password',
        html: `<p>Hi ${userName}, Your verification code to reset your password is ${otp}.</p>`,
      }

  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
        } else {
          console.log(`Mail has been sent:- ${info.response}`)
        }
      })
    } catch (error) {
      res.status(500).send({ message: "error" })
    }
  }



export default {
emailSend,
resetPassword,
verifyCode
}