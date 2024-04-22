import React, { useEffect, useState } from 'react'
import axios from "axios"
import { apiURL} from '../env'
import Table from 'react-bootstrap/Table';
import ShowTable from '../utils/tickettable.js';
import { useSelector } from 'react-redux';
import Filter from '../utils/filter.js';

const Dashboard = () => {
  let token = localStorage.getItem("token")
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])


  const fetchData = async () => {
    let {data} = await axios.get(`${apiURL}/api/ticket/get-all-tickets`,{
      headers:{
        authorization : `Bearer ${token}`
      }
    })
    setTickets(data.data);
  }

  useEffect(() => {
    if(token){
      fetchData()
    }
  }, [token])


  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <div className='d-flex align-items-center  justify-content-between'>
        <h4>All tickets</h4>
        <div className=''>
          <Filter/>
        </div>
        </div>

        {
          tickets.length > 0 ?
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
              <th>Solved By</th>
              <th>Actions</th>
            </thead>
            <tbody>

              <ShowTable props={{ tickets, users }} />
            </tbody>

          </Table>
           :
         <h4>No Tickets to solve</h4>
        }


      </div>
    </>

  )
}

export default Dashboard