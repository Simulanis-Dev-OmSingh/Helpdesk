import React,{useState} from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from "axios"
import { apiURL } from '../env';
import { useNavigate } from "react-router-dom"


const LoginPage = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [err , setErr] = useState("")
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
      console.log(res.data.message)
      if(res.data.message.email != undefined){
        let adminData = {
          loggedIn : true,
          adminid: res.data.message.uuid,
          department: res.data.message.department,
          email : res.data.message.email,
          name : res.data.message.name,
          superadmin : res.data.message.superadmin,

        }
        localStorage.setItem('adminData',JSON.stringify(adminData))
        
        navigate("/home")
      }else{
        setShowAlert(true)
        setErr(res.data.message)
      }


      setShowAlert(true);
    } catch (error) {
       console.log(error);
    }
  };



  return (

    <>

      <div className='justify-content-center d-flex flex-column '>

      <h1>Login</h1>
      <h2>{showAlert ? err  : <></>}</h2>
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
            value="Login"
            className="btn btn-primary"
            />
        </div>
      </form>
            </div>


    </>
  );


}

export default LoginPage