import React,{useState} from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from "axios"
import { apiURL } from '../env';
import { useNavigate } from "react-router-dom"
import {useDispatch , useSelector} from 'react-redux'
import { userToken } from '../store/slice/userSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [error , setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const onSubmit = async(e) => {
    e.preventDefault()
    try {

      let bodyData = {
        email,
        password
      }
      let {data} = await axios.post(`${apiURL}/api/admin/login`, bodyData);


      localStorage.setItem('token', data.data.token)
      dispatch(userToken( data.data.token ))



      } catch (error) {
        setShowAlert(error.response.data.message)
        console.log();
        // setError(error)
        // setShowAlert(true);
    }
  };



  return (

    <>

      <div className='justify-content-center d-flex flex-column '>


      <h2>{showAlert ? showAlert  : <h1>Login</h1>}</h2>
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