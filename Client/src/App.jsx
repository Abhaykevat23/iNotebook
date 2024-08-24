import React, { useState } from 'react'
import NoteState from './Context/notes/noteState';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert'; 
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }
  return (
    <>
      <NoteState>
        <Router>

          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}  />}  />

              <Route exact path="/about" element={<About />} />

              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />

            </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  )
}

export default App
