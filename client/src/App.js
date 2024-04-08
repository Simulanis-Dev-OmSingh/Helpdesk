import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useState } from "react";

import AppRoutes from "./pages/appRoutes";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
function App() {

  const [sideBar,setSideBar] = useState(false)


  return (
    <>
    <Provider store={store}>

      <div className="p-0">
        <Router>
          <Navbar sideBar={sideBar} setSideBar={setSideBar} />
          <div className="d-flex p-2">
            <Sidebar sideBar={sideBar} />
            <div id="content">
              <AppRoutes/>
            </div>
          </div>
        </Router>
      </div>
    </Provider>
    </>
  );
}

export default App;
