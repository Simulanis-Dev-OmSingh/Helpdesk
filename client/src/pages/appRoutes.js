import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux';
import LoginPage from "./loginpage";
import ResetPassword from "./resetpassword";
import Dashboard from "./dashboard";
import EditTicket from "./editTicket";
import CreateTicket from "./createTicket";
import CreateAdmin from "./createAdmin";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const AppRoutes = () => {
  const [sideBar,setSideBar] = useState(false)

    return (

<>

      <Navbar sideBar={sideBar} setSideBar={setSideBar} />
          <div className="d-flex p-2">
            <Sidebar sideBar={sideBar} />
            <div id="content">
            <Routes>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/update-ticket" element={<EditTicket />}/>
                <Route path="/create-ticket" element={< CreateTicket/>}/>
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to={`/home`} />}  />
              </Routes>

            </div>
          </div>
</>
        )




}

export default AppRoutes