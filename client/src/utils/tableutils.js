import React, { useEffect, useState } from 'react'
import axios from "axios"
import { apiURL } from '../env'

let users= []

const fetchUserData = async () => {

    // let res = await axios.get(`${apiURL}/api/ticket/get-all-users`)
    // // console.log("GET USERS DATA",res.data.message)
    // users = res.data.message
}

export const Users = async ({userid}) => {
    // if(users.length == 0 ){
    //     await fetchUserData()
    //     // console.log("FETCHING DATA")
    // }
    // // console.log("MY USER",users)

    //     const mydata = [];

//     users.forEach(current => {
//       if (current.uuid == userid) {
//         let data = {
//           "name": current.name,
//           "email": current.email,
//           "contact": current.contact
//         };
//         mydata.push(data);
//       }
//     });

//   return mydata


}


