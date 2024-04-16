import prisma from "./database.js";

 const createUser = async({data}) =>{
    return await prisma.user.upsert({
          where :{
            email : data.email
          },
          update  : {},
          create :{
            ...data
          }
    });
}

 const createQuery = async({data}) =>{
    return await prisma.query.create({
        data:{
            title : data.title,
            description : data.description,
            origin : data.origin,
            applicationId : data.applicationId,
            priority : data.priority,
            user :{
                connect :{
                    uuid :data.uuid
                }
            }
        }
    })
}

 const getAllQueries = () =>{
    return prisma.query.findMany({
        include:{
            user : true
        }
    })
}

 const getAllUsers = () =>{
    return prisma.user.findMany()
}

 const getQuery = async ({uuid}) =>{
    return await prisma.query.findFirst({
        where :{
            uuid : uuid
        },
        include : {
            user : true
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
