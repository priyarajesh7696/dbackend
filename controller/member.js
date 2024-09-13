import UserModel from '../models/user.js'
import Auth from '../helper/auth.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import MemberModel from '../models/member.js'
const getAllMembers = async(req,res)=>{
    try {
        let users = await MemberModel.find({},{password:0})
      
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
const getMemberById = async(req,res)=>{
    try {
        let user = await MemberModel.findById({_id:req.params.id},{password:0})
        res.status(200).send({
            message:"User data fetch successful",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}
const createMember = async(req,res)=>{
    try {
        try { 
            //check if the email exists in db
            const user = await MemberModel.findOne({email:req.body.email})
            if(!user)
            {
                //if email not found create the user
                //create hash for password
                req.body.password = await Auth.createHash(req.body.password)
                let newUser = await MemberModel.create(req.body)
                res.status(200).send({
                    message:"User Added Successfully",
                    newUser
                })
            }
            else
            {
                //if email is found respond error message
                res.status(400).send({
                    message:`User with ${req.body.email} already exists`
                })
            }    
        } catch (error) {
            res.status(500).send({
                message:"Internal Server Error",
                error:error.message
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
const login = async(req,res)=>{
 
        const {email,password} = req.body
       
        const user = await MemberModel.findOne({email:email})
        //check if the user exists
        if(user)
        {
            //compare the input password and hash
            if(await Auth.hashCompare(password,user.password))
            {
                //create token
                const token = await Auth.createToken({
                    name:user.name,
                    email:user.email,
                    role:user.role
                })
                console.log("hi")
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    role:user.role,
                    id:user._id
                })
            }
            else
            {
                res.status(400).send({
                    message:`Incorrect Password`
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`
            })
        }
   
}
export default {
    getAllMembers,
    getMemberById,
    createMember,
    login
    
    

}