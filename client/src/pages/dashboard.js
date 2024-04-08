import React, { useEffect, useState } from 'react'
import axios from "axios"
import { apiURL } from '../env'
import Table from 'react-bootstrap/Table';
import ShowTable from '../utils/tickettable.js';
import { useSelector } from 'react-redux';



const Dashboard = () => {
  // const adminData = useSelector(state=>state.adminData)
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])
  const adminData = JSON.parse(localStorage.getItem('adminData'))
  console.log("MY ADMIN DATA IS",adminData)

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
        {
          tickets.length<=0 ? (<h4>No Tickets to solve</h4>) : (
            <Table striped bordered hover size="sm">
          <thead>
            <th>Qurey Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>User Email</th>
            <th>Origin</th>
            <th>Assigned</th>
            <th>Date</th>
            <th>Actions</th>
          </thead>
          <tbody>

            <ShowTable props={{ tickets, users }} />
          </tbody>

        </Table>
          )
        }
        {/* {console.log(tickets, users)} */}

      </div>
    </>
  )
}

export default Dashboard