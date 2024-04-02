import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../env';
const ResetPassword = () => {




  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate()

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      console.log("Email:", email);
      console.log("Password:", password);
      if(password == password2){

          let bodyData = {
            email,
            password
          }
          let res = await axios.post(`${apiURL}/api/admin/resetpassword`, bodyData)
          console.log(res)
          console.log(res.status)
        //   if(res.status == 200){
        //     navigate("/home")
        // }
        setShowAlert(true);


      }else{
        console.log("PASSWORD DOES NOT MATCH")
      }


    } catch (error) {
       console.log(error);
    }
  };



  return (

    <>
    <div className=''>
      <div className=''>

      <h1>Reset Password</h1>
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
          <label>Enter New Password: </label>
          <input
            type="password"
            className="form-control"
            // value={email}
            onChange={(e) => setPassword(e.target.value)}
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