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

 const getQuery = async ({queryid}) =>{
    

    return prisma.query.findFirst({
        where :{
            queryid : queryid
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

const updateQuery = ({queryid , priority , status , type}) =>{
    return prisma.query.update({
        where:{
            queryid
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
