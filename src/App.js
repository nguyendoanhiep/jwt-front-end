import './App.scss';
import Nav from './components/navigation/Nav';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import AppRoutes from "./components/routes/AppRoutes";




function App() {

  useEffect(()=>{

  },[])

  return (
    <Router>
    <div className="App">
      <Nav/>
      </div>
      <div>
        <AppRoutes/>
      </div>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />

    </Router>

   
  );
}

export default App;
