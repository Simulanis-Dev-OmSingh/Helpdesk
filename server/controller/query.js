import { createUser ,createQuery , allQueries } from "../utils/query.js";

export const createNewQuery = async (req,res) =>{
    const {name , email ,contact , title , description , origin , priority} = req.body
    try{
        let data  = {
            name ,
            email ,
            contact
        }
        let response = await createUser({data})
        console.log("response.id")
        console.log(response.uuid)
        data = {
            userid : response.uuid,
            title ,
            description ,
            origin ,
            priority
        }
        response = await createQuery({data})

        res.status(200).json({
            status:true,
            message: response

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
        let response = await allQueries()
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