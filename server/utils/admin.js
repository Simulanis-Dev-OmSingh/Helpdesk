import prisma from "./database.js"
import bcrypt from "bcrypt"
export const createNewAdmin = async ({data}) =>{
    return prisma.admins.create({
        data:data
    })
}

export const resetPassword = ({email , encryptedPassword}) =>{
    return prisma.admins.update({
        where:{email},
        data:{
            password : encryptedPassword
        }
    })
}

export const login = async ({email , password}) =>{
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
            return findEmail

        }else{
            console.log("INCORRECT PASSWORD")
            return "INCORRECT PASSWORD"
        }

    }else{
        console.log("incorrect Email")
        return "INCORRECT EMAIL"
    }
}