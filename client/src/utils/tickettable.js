import React, { useEffect, useState } from 'react'
import {Users} from "./tableutils"
import { useNavigate } from 'react-router-dom'
const ShowTable = ({ props }) => {

    const [users ,setUsers] = useState([])
    const [tickets , setTickets] = useState([])
    const navigate = useNavigate()
  
    const Admin = (adminid) =>{
    }

    useEffect(()=>{
        setTickets(props.tickets)
        setUsers(props.users)
    })

    
    
    return (
        
    
        tickets.map((current) => {
        // console.log("props.users",props.users) 
        
          let data = Users( current.userid)
         
          let date = current.createdAt.slice(0, 10).split("-").reverse().join("/")
          let assignedPerson = Admin(current.assignedTo)
          return (
            <tr>
  
              <td>{current.queryid}</td>
              <td>{current.title}</td>
              <td>{current.description}</td>
              <td>{current.status}</td>
              <td>{current.priority}</td>
              {/* <td>{data[0].name}</td>
              <td>{data[0].email}</td>
              <td>{data[0].contact}</td> */}
              <td>name</td>
              <td>email.gmail.com</td>
              <td>8888888888</td>
              <td>{current.assignedTo}</td>
              <td>{date}</td>
              <td><div>
                <button onClick={()=>{
                   { navigate(`/update-ticket`,{state:{"queryid" : current.queryid}})}
                }}>EDIT</button>
              
                </div></td>
            </tr>
            // console.log(current)
          )
  
        })
    );
}

export default ShowTable

