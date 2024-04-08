import prisma from "./database.js";

 const createUser = ({data}) =>{
    return prisma.user.create({
        data:data
    })
}

 const createQuery = ({data}) =>{
    return prisma.query.create({
        data:data
    })
}

 const getAllQueries = () =>{
    return prisma.query.findMany()
}

 const getAllUsers = () =>{
    return prisma.user.findMany()
}

 const getQuery = async ({uuid}) =>{


    return prisma.query.findFirst({
        where :{
            uuid : uuid
        }
    });


}

 const getUserDetails = ({userid}) =>{
    return prisma.user.findFirst({
        where:{
            uuid : userid
        }
    })
}

const updateQuery = ({uuid , priority , status , type}) =>{
    return prisma.query.update({
        where:{
            uuid
        },
        data:{
            priority ,
            status,
            type
        }
    })

}

export default {
    createUser ,
    createQuery ,
    getAllQueries ,
    getAllUsers ,
    getQuery ,
     getUserDetails,
     updateQuery
}
