import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux';
import LoginPage from "./loginpage";
import ResetPassword from "./resetpassword";
import Dashboard from "./dashboard";
import EditTicket from "./editTicket";
import CreateTicket from "./createTicket";
import CreateAdmin from "./createAdmin";

const AppRoutes = () => {
  const [adminData,setAdminData] = useState({})
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('adminData'))
    setAdminData(data)
  },[])

    return (

        adminData !== null? (
            <Routes>
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/update-ticket" element={<EditTicket />}/>
                <Route path="/create-ticket" element={< CreateTicket/>}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
              </Routes>
        ) : (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>
        )



  )
}

export default AppRoutes