import prisma from "./database.js";

export const createUser = ({data}) =>{
    return prisma.user.create({
        data:data
    })
}

export const createQuery = ({data}) =>{
    return prisma.query.create({
        data:data
    })
}

export const allQueries = () =>{
    return prisma.query.findMany()
}

