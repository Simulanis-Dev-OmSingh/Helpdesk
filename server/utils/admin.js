import { error } from "console";
import prisma from "./database.js"
import bcrypt from "bcrypt";

const findAdmin = async({email})=>{
      return await prisma.admins.findFirst({
        where:{
            email
        }
      })
}

const createAdmin = async ({ data }) =>{
    return prisma.admins.create({
         data:data
    })
}

const forgetPassword = ({email , encryptedPassword}) =>{

    return prisma.admins.update({
        where:{
            email
        },
        data:{
            password : encryptedPassword
        }
    })
}

 const login = async ({email , password}) =>{

    const findEmail = await prisma.admins.findFirst({
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


 const getAdmin = ({uuid}) =>{
    return prisma.admins.findFirst({
        where:{
            uuid
        }
    })
}


 const getAllAdmin = () =>{
    return prisma.admins.findMany()
}

export default {
    createAdmin,
    forgetPassword ,
    login ,
    getAdmin ,
    getAllAdmin,
    findAdmin
}