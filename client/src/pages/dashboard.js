import React, { useEffect, useState } from 'react'
import axios from "axios"
import { apiURL } from '../env'
import Table from 'react-bootstrap/Table';
import ShowTable from '../utils/tickettable.js';



const Dashboard = () => {

  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])
  
  
  const fetchUserData = async () => {

    let res = await axios.get(`${apiURL}/api/ticket/get-all-users`)
    // console.log("GET USERS DATA",res.data.message)
    setUsers(res.data.message)

  }

  const fetchData = async () => {
    let res = await axios.get(`${apiURL}/api/ticket/get-all-tickets`)

    setTickets(res.data.message)
    res.data.message.forEach((obj) => {

      fetchUserData(obj["userid"])
    })
    // console.log("fetch User data called")
  }

  const fetchAdminData = async () =>{

  }


  useEffect(() => {
    fetchData()
    fetchUserData()
    fetchAdminData()
  }, [])


  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <h4>All tickets</h4>
        <table>

        </table>
        {/* {console.log(tickets, users)} */}
        <Table striped bordered hover size="sm">
          <thead>
            <th>Qurey Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Assigned</th>
            <th>Date</th>
          </thead>
          <tbody>

            <ShowTable props={{ tickets, users }} />
          </tbody>

        </Table>
      </div>
    </>
  )
}

export default Dashboard