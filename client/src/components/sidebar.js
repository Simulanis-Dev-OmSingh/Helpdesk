import React from 'react'
import "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()
  


  return (
    <>

      <div className='d-flex border border-secondary' style={{ width: "300px" }}>
        <ul style={{ listStyle: "none" , padding: 0 }}>
          <li onClick={() => { navigate(`/home`) }}>Home</li>
          <li onClick={() => { navigate(`/create-ticket`) }}>Create Ticket</li>
          <li onClick={() => { navigate(`/create-admin`) }}>Create Admin</li>
          <li onClick={() => { navigate(`/home`) }}>Update Ticket</li>
          <li onClick={() => { navigate(`/login`) }}>Login</li>
          <li onClick={() => { navigate(`/resetpassword`) }}>Reset Password</li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar