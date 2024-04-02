import React, { useEffect, useState } from 'react'
import axios from "axios"
import { apiURL } from '../env'
const Dashboard = () => {

  const [tickets , setTickets] = useState([])

  const fetchData = async () => {
    let res = await axios.get(`${apiURL}/api/ticket/get-all-tickets`)
    console.log(res)
    console.log(res.data.message)
    setTickets(res.data.message)
  }

  useEffect (()=>{
    fetchData()
  },[])

  return (
    <>
    <div>
    <h1>Dashboard</h1>
    <h4>All tickets</h4>
    <table>

    </table>
    {console.log("ticket",tickets[0])}
    {tickets[0]}
    </div>
    </>
  )
}

export default Dashboard