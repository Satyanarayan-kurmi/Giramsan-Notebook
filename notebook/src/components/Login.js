import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'
export default function Login(props) {
    const [data, setdata] = useState({email:"",password:""})
    let navigate=useNavigate();
    const handelsubmit=async (e)=>{
        e.preventDefault()
        const response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:data.email,password:data.password})
          });
          const json=await response.json();
          // console.log(json);
          if(json.success){
              //redirect
              localStorage.setItem('token',json.authtoken);
              navigate("/");
              props.showAlert("Logged In  successfully","success")
          }
          else{
            props.showAlert("Invalid id or password","danger")
          }
    }

    const handlechange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
  return (
    <div className='hello'>
        <h2>Log in to contiunue</h2>
        <form onSubmit={handelsubmit}>
        <div className="form-group">
          <label className='my-2' htmlFor="emial">User email</label>
          <input onChange={handlechange} value={data.email} type="email" className="form-control my-2" id="email" name='email' typeof='email' placeholder="Enter email" />
          
        </div>
        <div className="form-group">
          <label className='my-2' htmlFor="password">Password</label>
          <input onChange={handlechange} value={data.password} type="password" className="my-2 form-control" id="password"
          name='password' placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-success my-3" >Log in</button>
      </form>
    </div>
  )
}
