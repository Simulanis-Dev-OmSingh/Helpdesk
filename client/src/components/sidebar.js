import React, { useState } from "react";
import "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/adminSlice";

const Sidebar = ({sideBar}) => {
  const adminData = JSON.parse(localStorage.getItem('adminData'))
  const [sidebar,setSidebar] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  console.log("IN SIDE BAR",adminData)

  return (
    sideBar ?
    ( <>
      {adminData!== null ?
      (
      <div>
        <ul style={{ listStyle: "none", padding: 0 ,width:"200px" }}>
        <li
        onClick={() => {
          navigate(`/home`);
        }}
        >
        Home
        </li>
        <li
            onClick={() => {
              navigate(`/create-ticket`);
            }}
            >
            Create Ticket
            </li>

            <li
            onClick={() => {
              navigate(`/home`);
            }}
          >
          Update Ticket
          </li>

          <li
            onClick={() => {
              navigate(`/resetpassword`);
            }}
          >
            Reset Password
            </li>
            <li onClick={()=>{localStorage.removeItem("adminData"); navigate(`/login`)} }>
            Logout
            </li>
            </ul>
            </div>
            ) :
      (
      <div
      className="d-flex border border-secondary"
      style={{ width: "300px" }}
      >
      <ul style={{ listStyle: "none", padding: 0 }}>
      <li
      onClick={() => {
        navigate(`/login`);
      }}
      >
      Login
      </li>
      </ul>
      </div>
  )}
  </>):(<></>)
  )
    };

export default Sidebar;
