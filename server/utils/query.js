import  prisma from "./database.js";

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

 const getAllQueries = async () =>{
    return await prisma.query.findMany({
        include:{
            user : true
        }
    })
}

 const getAllUsers = async () =>{
    return await prisma.user.findMany({})
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

 const getUserDetails = async ({userid}) =>{
    return await prisma.user.findFirst({
        where:{
            uuid : userid
        }
    })
}

const updateQuery = async ({uuid , priority , status , type , assignedTo}) =>{
    let data = await prisma.admins.findFirst({
        where : {
            email : assignedTo
        }
    })
    // console.log("QUERY",data.id)
    assignedTo = data.id
    // console.log(assignedTo)
    return await prisma.query.update({
        where:{
            uuid
        },
        data:{
            priority ,
            status,
            type,
            assignedTo,
        }
    })

}



const filterQueries = async ({data}) =>{
    return await prisma.query.findMany({
        ...data
    })
}


const markAsSolved = async ({uuid  , email}) =>{
    return await prisma.query.update({
        where:{
            uuid
        },
        data:{
            solvedBy : email
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
    updateQuery,
    filterQueries,
    markAsSolved
}
