import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store/store";
import { apiURL ,token} from "./env";
import { useEffect, useState } from "react";
import axios from "axios"
import AppRoutes from "./pages/appRoutes";
import LoginPage from "./pages/loginpage";
import {useDispatch , useSelector} from 'react-redux'
import { userData, userToken } from "./store/slice/userSlice";
import CreateAdmin from "./pages/createAdmin";

const App =() => {

  const user = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const [isLoggedin , setIsLoggedin] = useState(false)

  let token = localStorage.getItem("token")

  const getUserDetails = async() =>{
      try {
        let {data} = await axios.get(`${apiURL}/api/user/details`, {
          headers :{
            "Authorization" : `Bearer ${token}`
          }
        });

        dispatch(userData( data.data ));
        dispatch(userToken( token ));
        setIsLoggedin(true);
      } catch (error) {

      }

  }

  useEffect(()=>{
    token && getUserDetails()
  },[token])

  useEffect(()=>{

  },[user.loading])


  return (
    <>


      <div className="p-0">
        <Router>
          { isLoggedin ?
            <AppRoutes/>
              :
              <>
              <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path='*' element={<Navigate to={`/login`} />} />
                <Route path='/createAdmin' element={<CreateAdmin/>} />
              </Routes>
              </>
          }

        </Router>
      </div>

</>
  );
}

export default App;
