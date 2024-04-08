import AdminUtils from "../utils/admin.js"
import bcrypt from "bcrypt"


export const createAdmin = async (req,res) =>{
    // console.log("REACHED CREATE ADMIN in CONTROLLER")
    try{
        const password = process.env.DEFAULT_PASSWORD
        // console.log("MY DEFAULT PASSWORD IS",password)

        let encryptedPassword =  bcrypt.hashSync(password,10)
        console.log(req.body?.data,"----------------------------------------------------------------------")
        const {name ,email , department , superadmin} = req.body.data
        const data = {
            name ,
            email ,
            department ,
            // password ,
            password : encryptedPassword,
            superadmin
        }
         let response = await AdminUtils.createAdmin({data})
         res.status(200).json({
            status : true,
            message : {
                msg : "NEW ADMIN CREATED DEFAULT PASSWORD IS \"PASSWORD\" ",
                response
            }

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

export const login = async (req,res) =>{
    const {email , password} = req.body
    console.log("LOGIN USER ", email , password)
    try{
        let response =  await AdminUtils.login({email , password})
        return res.status(200).json({
            status:true,
            message: response.msg

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

        let response = await AdminUtils.forgetPassword({email , encryptedPassword})

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


export const  getAdmin = async (req ,res) =>{
    try{
        let uuid = req.query.uuid
        let response =  await AdminUtils.getAdmin({uuid})
        return res.status(200).json({
            status:true,
            message: {
                msg : "GOT ADMIN DETAILS",
                response
            }

        })
    }catch(error){
        console.log("ERROR OCCURED WHILE FETCHING ADMIN DETAILS")
        console.log(error)
        return res.status(402).json({
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
            message: {
                msg : "GOT ALL ADMIN DETAILS",
                response
            }

        })
    }catch(error){
        console.log("ERROR OCCURED WHILE FETCHING ADMIN DETAILS")
        console.log(error)
        return res.status(402).json({
            status: false,
            message: error.message
        })
    }
}