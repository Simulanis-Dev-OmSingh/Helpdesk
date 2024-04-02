import { createNewAdmin,resetPassword ,login} from "../utils/admin.js"
import bcrypt from "bcrypt"


export const createAdmin = async (req,res) =>{
    console.log("REACHED CREATE ADMIN in CONTROLLER")
    try{
        const password = process.env.DEFAULT_PASSWORD
        console.log("MY DEFAULT PASSWORD IS",password)

        let encryptedPassword =  bcrypt.hashSync(password,10)

        const {name ,email , department , superadmin} = req.body
        const data = {
            name ,
            email ,
            department ,
            // password ,
            password : encryptedPassword,
            superadmin
        }
         let response = await createNewAdmin({data})
         res.status(200).json({
            status : true,
            message : response
         })


    }catch(err){
        console.log("ERROR CREATING ADMIN")
        console.log(err)
        res.status(402).json({
            status : false ,
            message:"ERROR OCCURED WHILE CREATING NEW ADMIN"
        })
    }

}

export const loginUser = async (req,res) =>{
    const {email , password} = req.body
    console.log("LOGIN USER ", email , password)
    try{
        let response =  await login({email , password})
        return res.status(200).json({
            status: true,
            message: response
        })
    }catch(error){
        console.log(error)
        return res.status(402).json({
            status: false,
            message: error.message
        })
    }

}

export const forgetPassword = async (req,res) =>{
    try{
        const {email , password } = req.body
        console.log("LOGIN USER ", email , password)
        let encryptedPassword = bcrypt.hashSync(password,10)

        let response = await resetPassword({email , encryptedPassword})

        res.status(200).json({
            status : true ,
            message:response
        })


    }catch(err){
        console.log("ERROR CREATING NEW PASSWORD")
        console.log(err)
        res.status(402).json({
            status : false ,
            message:"ERROR CREATING NEW PASSWORD"
        })
    }

}