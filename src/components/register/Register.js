import React, {useEffect, useState} from "react";
import './Register.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import {registerUser} from "../service/userService";




const Register = () => {
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const isValid = ()=> {
        if(!username){
            toast.error("username is null !");
            return false
        }
        if(!email){
            toast.error("email is null !");
            return false
        }
        if(!phone){
            toast.error("phone is null !");
            return false
        }
        if(!password){
            toast.error("password is null !");
            return false
        }

        return true
    }

    let history  = useHistory();
    const toLogin= ()=>{
        history.push("/login")

    }

     const register = async () => {
          let check = isValid()
         if(check === true){
             let response = await registerUser(username,email,phone,password)
             console.log('check response : ',response)
             let serverData = response.data;
             if(+serverData.EC ===0){
                 console.log(serverData.EC)
                 toast.success(serverData.EM);
                 history.push("/login")
             }else {
                 toast.error(serverData.EM)
             }
         }
     }

    useEffect(()=>{

    },[])
    return(
        <div className="login-container ">
            <div className="container">
                <div className="row">
                    <div className="content-left col-7 d-none d-sm-block">

                        <div className="brand"> facebook </div>
                        <div className="detail"> Chao anh em </div>
                    </div>
                    <div className="content-right col-12  col-sm-5 black d-flex flex-column gap-3 py-3">
                        <input type="text" value={username} onChange={(event)=>{setUsername(event.target.value)}} className="form-control" placeholder="Username "/>
                        <input type="text" value={email} onChange={(event)=>{setEmail(event.target.value)}} className="form-control" placeholder="Email  "/>
                        <input type="text" value={phone} onChange={(event)=>{setPhone(event.target.value)}} className="form-control" placeholder="Phone "/>
                        <input type="password"value={password} onChange={(event)=>{setPassword(event.target.value)}} className="form-control" placeholder="Password"/>
                        <button className="btn btn-primary" onClick={()=>register()}>Login</button>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success" onClick={()=>toLogin()}>Back to login </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}
export default Register