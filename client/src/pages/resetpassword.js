import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiURL ,token} from '../env';

import { useSelector } from 'react-redux';
const ResetPassword = () => {
  
  
  
  
  const user = useSelector(state=>state.user)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [error , setError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async(e) => {
    e.preventDefault()
    try {

      if(newPassword == password2){

          let bodyData = {
            email,
            password,
            newPassword
          }
          let res = await axios.post(`${apiURL}/api/admin/resetpassword`, bodyData ,{headers:{
            authorization : `Bearer ${user.token}`
          }})
          console.log(res)
          console.log(res.status)
          if(res.data.data){
            navigate("/home")
        }else{
          console.log("Something went wrong")
        }



      }else{
        console.log("PASSWORD DOES NOT MATCH")
        setError("PASSWORD DOES NOT MATCH")
        setShowAlert(true);
      }


    } catch (error) {
       console.log(error.response.data.message);
       setError(error.response.data.message)
        setShowAlert(true);
    }
  };



  return (

    <>
    <div className=''>
      <div className=''>
      {showAlert ? error : <h1>Reset Password</h1>}

      <form onSubmit={onSubmit} >

        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="form-group">
          <label>Enter Old Password: </label>
          <input
            type="password"
            className="form-control"
            // value={email}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className="form-group">
          <label>Enter New Password: </label>
          <input
            type="password"
            className="form-control"
            // value={email}
            onChange={(e) => setNewPassword(e.target.value)}
            />
        </div>
        <div className="form-group">
          <label>Confirm Password: </label>
          <input
            type="password"
            className="form-control"
            // value={email}
            onChange={(e) => setPassword2(e.target.value)}
            />
        </div>
        <div>
          <a href="/login">Login</a>
        </div>


        <div className="form-group">
          <input
            type="submit"
            value="Change Password"
            className="btn btn-primary"
            />
        </div>
      </form>
            </div>

  </div>
    </>
  );



}

export default ResetPassword