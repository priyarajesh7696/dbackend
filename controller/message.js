import UserModel from '../models/user.js'
import Auth from '../helper/auth.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import mongoose from '../models/index.js'
import MessageModel from '../models/message.js'

const getMessage = async(req,res)=>{
    try {
      
        let users = await MessageModel.find({},{password:0})
      
        res.status(200).send({
            message:"User data fetch successful",
            users
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error throw"
        })
    }
}

const creatMessage = async(req,res)=>{
   
    try {

    //    console.log(req.body)
                let newMessage = await MessageModel.create(req.body)
                
                res.status(200).send({
                    message:"Message Added Successfully",
                    newMessage
                })
            // }
            // else
            // {
            //     //if email is found respond error message
            //     res.status(400).send({
            //         message:`User with ${req.body.email} already exists`
            //     })
            // }    
        // } catch (error) {
        //     res.status(500).send({
        //         message:"Internal Server Error",
        //         error:error.message
        //     })
        // }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


export default {
   getMessage,
   creatMessage
    }