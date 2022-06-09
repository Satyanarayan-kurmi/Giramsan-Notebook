import './App.css';
import { 
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from "react"
function App() {
  const [alert, setAlert] = useState("")
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className='container'>
            <Switch>
                <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
                <Route path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
