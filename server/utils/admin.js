import prisma from "./database.js"
import bcrypt from "bcrypt"
const createAdmin = async ({data}) =>{
    return prisma.admins.create({
        data:data
    })
}

const forgetPassword = ({email , encryptedPassword}) =>{
    return prisma.admins.update({
        where:{email},
        data:{
            password : encryptedPassword
        }
    })
}

 const login = async ({email , password}) =>{
    const findEmail =await  prisma.admins.findFirst({
        where:{
            email
        }
    })
    if(findEmail){
        console.log(bcrypt.hashSync(password,10))
        console.log(findEmail.password)
        let comparedPass = bcrypt.compareSync(password,findEmail.password)
        console.log("comparedPass",comparedPass)
        if(comparedPass){
            return {
                status : 200,
                msg : findEmail
            }
                

        }else{
            console.log("INCORRECT PASSWORD")
            return {
                status : 402,
                msg : "INCORRECT PASSWORD"
            }
        }

    }else{
        console.log("incorrect Email")
        return {
            status : 402,
            msg : "INCORRECT EMAIL"
        }
    }
}


 const getAdmin = ({adminid}) =>{
    return prisma.admins.findFirst({
        where:{
            adminid
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
    getAllAdmin
}