import axios from "axios";

const registerUser =  ( username,email,phone,password) => {
   return   axios.post('http://localhost:8081/api/register',{
        username,email,
       phone,password
    })

}

const loginUser = (valueLogin , password) =>{
   return  axios.post('http://localhost:8081/api/login',{
       valueLogin,password
   })
}

const fetchAllUsers = (page , limit) => {
    return axios.get(`http://localhost:8081/api/user/show?page=${page}&limit=${limit}`)
}
const userDelete = (user) => {
  return axios.delete(`http://localhost:8081/api/user/delete`,{data : {id : user.id}})
}
const getGroup = () => {
    return axios.get(`http://localhost:8081/api/group/show`)
}

const createUser = (userData) =>{
    return  axios.post('http://localhost:8081/api/user/create',{
        ...userData
    })
}

export {registerUser , loginUser , fetchAllUsers , userDelete , getGroup, createUser}