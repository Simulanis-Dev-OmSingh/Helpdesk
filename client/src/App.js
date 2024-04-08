import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import LoginPage from "./pages/loginpage";
import ResetPassword from "./pages/resetpassword";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import EditTicket from "./pages/editTicket";
import CreateTicket from "./pages/createTicket";
import CreateAdmin from "./pages/createAdmin";

function App() {
  return (
    <>
      <div className="p-2">
        <Router>
          <Navbar />
          <div className="d-flex">
            <Sidebar />
            <div id="content">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/home" element={<Dashboard/>}/>
                <Route path="/update-ticket" element={<EditTicket />}/>
                <Route path="/create-ticket" element={< CreateTicket/>}/>
                <Route path="/create-admin" element={< CreateAdmin/>}/>
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
