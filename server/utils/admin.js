import { error } from "console";
import prisma from "./database.js"
import bcrypt from "bcrypt";

const findAdmin = async({email})=>{
      return await await prisma.admins.findFirst({
        where:{
            email
        }
      })
}

const createAdmin = async ({ data }) =>{
    return await prisma.admins.create({
         data:data
    })
}

const forgetPassword = async  ({email , encryptedPassword}) =>{

    return await prisma.admins.update({
        where:{
            email
        },
        data:{
            password : encryptedPassword
        }
    })
}

 const login = async ({email , password}) =>{

    const findEmail = await await prisma.admins.findFirst({
        where: {
            email
        }
    });

    if(!findEmail){
        throw new Error("Email Not found")
    }

    let comparedPass = bcrypt.compareSync(password,findEmail.password)

    if(!comparedPass){
            throw new Error("Password is wrong.")
        }

    return findEmail;

    }


 const getAdmin = async  ({uuid}) =>{
    return await prisma.admins.findFirst({
        where:{
            uuid
        }
    })
}


 const getAllAdmin = async  () =>{
    return await prisma.admins.findMany()
}

const getRecipients = async  ()=>{
    return await prisma.admins.findMany({
        where:{
            superadmin : true
        },select:{
            email : true
        }
    })
}

export default {
    createAdmin,
    forgetPassword ,
    login ,
    getAdmin ,
    getAllAdmin,
    findAdmin,
    getRecipients
}