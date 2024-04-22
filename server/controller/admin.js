import { error } from "console";
import generator from "generate-password";
import AdminUtils from "../utils/admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../utils/database.js";
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

export const createAdmin = async (req,res) =>{
    try{
        console.log(req.body)
        const {name ,email , department , superAdmin} = req.body;

        const findAdmin = await AdminUtils.findAdmin({email})

        if(findAdmin){
            return res.status(422).json({
                status : false,
                message : "This email already exist."
            })
        }

        const password = generator.generate({
            length:5,
            numbers : true,
            uppercase : false,
            excludeSimilarCharacters : true
        });

        console.log("password is ",password)
        let encryptedPassword =  bcrypt.hashSync(password,10)

        const data = {
            name ,
            email ,
            department,
            password : encryptedPassword,
            superadmin : superAdmin
        }

        let response =  await AdminUtils.createAdmin({ data });
        delete response.password
        delete response.superadmin

            //  Email Send Start
    let smtpTransport = nodemailer.createTransport({
        host : process.env.NODEMAILER_SERVICE_HOST,
        service: process.env.NODEMAILER_SERVICE,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        }
      });
    var html = fs.readFileSync('template/newadmin.html', { encoding: 'utf-8' });
    var template = handlebars.compile(html);
    // smtpTransport.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));
    var replacements = {

        email: email,
        password: password,    };
    var htmlToSend = template(replacements);
    let recipients = email
    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: recipients,
        subject: `Congratulations You have gained access of Ticketing System`,
        html: htmlToSend
      }
      smtpTransport.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log(err)
          res.json({ error: true })
        }
        else {
          res.json({ error: false })
        }
      })
      smtpTransport.close();
      //  Email Send end

        return res.status(200).json({
            status : true,
             data : response
            })


    }catch(error){
        console.log(error)
        return res.status(422).json({
            status : false ,
            message: error.message
        })
    }

}

export const login = async (req,res) =>{

    const {email , password} = req.body;

    try{
        let response =  await AdminUtils.login({email , password});
        delete response.password;

        let data = {
            uuid : response.uuid,
            email : response.email
        }

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign(data,secretKey)

        return res.status(200).json({
            status:true,
            data: {...response, token}
        });
    }catch(error){
        console.log(error.message)
        return res.status(422).json({
            status: false,
            message: error.message
        })
    }

}

export const forgetPassword = async (req,res) =>{
    try{
        const {email , password ,newPassword } = req.body;

        let authorized = await await AdminUtils.login({email , password});
        console.log(authorized)
        if(authorized){
            let encryptedPassword = bcrypt.hashSync(newPassword,10)
            let response = await AdminUtils.forgetPassword({email , encryptedPassword})
            res.status(200).json({
                status : true ,
                data : response
            })
        }


    }catch(error){

        res.status(422).json({
            status : false ,
            message: error.message
        })
    }

}


export const  getAdmin = async (req ,res) =>{
    try{
        let uuid = req.query.uuid
        let response =  await AdminUtils.getAdmin({uuid})
        return res.status(200).json({
            status:true,
            data : response

        })
    }catch(error){

        return res.status(422).json({
            status: false,
            message: error.message
        })
    }
}

export const getAllAdmin = async (req,res) =>{

    try{
        let response =  await AdminUtils.getAllAdmin()

        return res.status(200).json({
            status:true,
            data : response

        })
    }catch(error){

        return res.status(422).json({
            status: false,
            message: error.message
        })
    }
}

export const isAuthorized = async (req,res) =>{
    res.status(200).json({status : true , data : "Authorized"})
}

export const userDetails = async(req, res) =>{
    try {
        const { userId} = req;

        let userData = await prisma.admins.findFirst({
            where :{
                uuid : userId
            }
        });

        delete userData.password

        return res.status(200).json({
            status : false,
            data : userData
        });

    } catch (error) {
        return res.status(422).json({
            status : false,
            message : error
        })
    }
}