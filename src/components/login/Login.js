import React, {useEffect, useState} from "react";
import './Login.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {loginUser} from "../service/userService";



const Login = () => {
    let history  = useHistory();
    
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin= async ()=>{
        if(!valueLogin){
            toast.error("Please enter username or phone ")
            return
        }
        if(!password){
            toast.error("Please enter password ")
            return
        }
         let dataLogin = await loginUser(valueLogin,password);

        if(dataLogin && dataLogin.data && +dataLogin.data.EC ===0){
            let data = {
                isAuthenticated : true,
                token : "fake token"
            }
            sessionStorage.setItem("account" ,JSON.stringify(data))
            toast.success(dataLogin.data.EM)
            history.push("/users")
            window.location.reload();
        }
        if(dataLogin && dataLogin.data && +dataLogin.data.EC !==0){
            toast.error(dataLogin.data.EM)
        }
        console.log(dataLogin)

    }


    const toRegister= ()=>{
        history.push("/register")

    }
    const enter = (event) => {

        if(event.charCode === 13 && event.code === 'Enter'){
            handleLogin()
        }
    }
    useEffect(()=>{
        let session =  sessionStorage.getItem("account")
        if(session){
            history.push("/")
        }
    })

    return(
        <div className="register-container ">
            <div className="container">
                <div className="row">
                       <div className="content-left col-7 d-none d-sm-block">

                           <div className="brand"> facebook </div>
                           <div className="detail"> Chao anh em </div>
                       </div>
                       <div className="content-right col-12  col-sm-5 black d-flex flex-column gap-3 py-3">
                           <input type="text" value={valueLogin} onChange={(event)=>setValueLogin(event.target.value)} className="form-control" placeholder="Email or username "/>
                           <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} onKeyPress={(event)=>enter(event)}  className="form-control" placeholder="Password"/>
                           <button className="btn btn-primary" onClick={()=>handleLogin()} >Login</button>
                           <span className="text-center"> Forgot your password? </span>
                           <hr/>
                           <div className="text-center">
                               <button className="btn btn-success" onClick={()=>toRegister()}>Create new account </button>
                           </div>
                       </div>
                </div>
            </div>
        </div>


    )

}
 export default Login