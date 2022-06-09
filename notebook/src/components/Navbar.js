import React, {  } from 'react'
import {Link, useNavigate} from 'react-router-dom';



export default function Navbar() {
    // useEffect(()=>{
    //     console.log(location);
    // },[location])
    let navigate=useNavigate();
    const handlelogout=()=>{
      localStorage.removeItem('token');
      navigate("/");
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Giramsan-Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">
              <Link className="btn btn-outline-success mx-2" role="button" to="/login" >Log in</Link>
              <Link className="btn btn-outline-success mx-2" role="button" to="/signup">Sign Up</Link>
            </form>:<button onClick={handlelogout} className="btn btn-outline-success mx-2" >Log out</button>}
          </div>
        </div>
      </nav>
  )
}
