import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"
import './login.css'
export default function Signup(props) {
  const [data, setdata] = useState({name:"",email:"",password:""})
  let navigate=useNavigate();  
    const handlesubmit=async (e)=>{
        e.preventDefault();
        // const {name,email,password}=data;
        const response=await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name:data.name,email:data.email,password:data.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
              //redirect
              localStorage.setItem('token',json.authtoken);
              props.showAlert("Acount created successfully","success")
              navigate("/login");
          }
          else{
              props.showAlert("Invalid id or password","danger")
          }
    }
    const handlechange=(e)=>{
      setdata({...data,[e.target.name]:e.target.value})
    }
    return (
    <div className="hello">
      <h2>Create an Account</h2>
        <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="username" className='my-2'>User Name</label>
          <input type="name" onChange={handlechange} className="form-control my-2" id="name" name='name' placeholder="Enter User Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className='my-2'>Your email</label>
          <input type="email" onChange={handlechange} className="my-2 form-control" id="email" name='email' placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className='my-2'>Password</label>
          <input type="password" onChange={handlechange} className="form-control my-2" name='password' id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  )
}
