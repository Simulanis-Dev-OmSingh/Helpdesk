import React,{useState} from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from "axios"
import { apiURL } from '../env';
import { useNavigate } from "react-router-dom"

const LoginPage = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate()

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      console.log("Email:", email);
      console.log("Password:", password);
      let bodyData = {
        email,
        password
      }
      let res = await axios.post(`${apiURL}/api/admin/login`, bodyData)
      console.log(res)
      console.log(res.status)
      if(res.status == 200){
        navigate("/home")
      }


      setShowAlert(true);
    } catch (error) {
       console.log(error);
    }
  };



  return (

    <>
    <div >
      <div className='justify-content-center d-flex flex-row '>

      <h1>Login</h1>
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
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            // value={email}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
          <a href="/resetpassword">Forgot password?</a>
        </div>


        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
            />
        </div>
      </form>
            </div>

  </div>
    </>
  );


}

export default LoginPage