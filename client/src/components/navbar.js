import React, { useEffect } from 'react'
import { UseSelector, useSelector } from 'react-redux'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
const Navbar = ({sideBar,setSideBar}) => {
  const adminData = localStorage.getItem('token')
  useEffect(()=>{},[adminData])
  return (

      adminData ? (<>

        <div className='m-0 p-0 bg-secondary text-white d-flex'>
          <div className='d-flex' onClick={() => setSideBar(!sideBar)}>
        {sideBar ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon/>}
        <h4>WELCOME BACK {adminData.name}</h4>
          </div>
        </div>
        </>) :(
          <div className='m-0 p-0 bg-secondary text-white d-flex '>
            <div className="d-flex align-content-center " onClick={() => setSideBar(!sideBar)}>
            {sideBar ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon/>}
          </div>

          <h4>SIMULANIS TICKETING SYSTEM</h4>

          </div>
        )


  )
}

export default Navbar