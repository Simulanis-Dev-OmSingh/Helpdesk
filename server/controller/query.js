import QueryUtils from "../utils/query.js";

export const createQuery = async (req,res) =>{
    console.log("req.body.data",req.body.data)
    console.log("req.body",req.body)
    const {name , email ,contact , title , description , origin , priority} = req.body.data
    try{
        let data  = {
            name ,
            email ,
            contact
        }
        console.log("DATA" , data)
        let response = await QueryUtils.createUser({data})
        console.log("response.id")
        console.log(response.uuid)
        data = {
            userid : response.uuid,
            title ,
            description ,
            origin ,
            priority
        }
        response = await QueryUtils.createQuery({data})

        res.status(200).json({
            status:true,
            message: {
                msg : "New Ticket Generated ",
                response}

        })

    }catch(err){
        console.log("error occured while creating new user")
        console.log(err)
        res.status(400).json({
            status:false,
            message: "error occured while creating new user"

        })
    }

}



export const getAllQueries = async (req,res) =>{
    try{
        let response = await QueryUtils.getAllQueries()
        res.status(200).json({
            status:true,
            message: response

        })
    }catch(err){
        console.log("error occured while fetching all queries")
        console.log(err)
        res.status(400).json({
            status:false,
            message: "error occured while fetching all queries"

        })
    }

}

export const getAllUsers = async (req , res) =>{
    try{
        let response = await QueryUtils.getAllUsers()
        res.status(200).json({
            status:true,
            message: response

        })
    }catch(err){
        console.log("error occured while fetching all Users")
        console.log(err)
        res.status(400).json({
            status:false,
            message: {
                msg : "error occured while fetching all User",
                error : err
            }


        })
    }
}

export const getQuery = async (req,res) =>{

    try {
        let response = await QueryUtils.getQuery({ "uuid" : req.query.uuid})
        console.log("response",response)



        res.status(200).json({
            status:true,
            message:{ msg: "Got query",
            response
}        })

    } catch (error) {
        console.log("error occured while fetching Specific Query")
        console.log(error)
        res.status(400).json({
            status:false,
            message: {
                msg : "error occured while fetching Specific Query",
                error : error
            }
    })

}
}

export const getUserDetails = async(req , res) =>{
    try{
        console.log("req.query.userid",req.query.userid)
        let response = await QueryUtils.getUserDetails(req.query.userid)
        res.status(200).json({
            status:true,
            message: {
                msg : "GOT USER DETAILS",
                response
            }
        })
    }catch(err){
        console.log("error occured while fetching all Users")
        console.log(err)
        res.status(400).json({
            status:false,
            message: {
                msg : "error occured while fetching all User",
                error : err
            }


        })
    }
}

export const updateQuery = async (req,res) =>{
    try{
        console.log("first",req.body)
        let {uuid , priority , status ,type} = req.body.data
        // console.log(queryid , priority , status )
        let response = await QueryUtils.updateQuery({uuid , priority , status , type})
        res.status(200).json({
            status:true,
            message: {
                msg : "UPDATED QUERY DETAILS",
                response
            }
        })
    }catch(err){
        console.log("error occured while updating Query")
        console.log(err)
        res.status(400).json({
            status:false,
            message: {
                msg : "error occured while updating query",
                error : err
            }


        })
    }
}