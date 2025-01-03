import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [Credentials, setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:Credentials.email,password:Credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save Auth Token And Redirect User
            localStorage.setItem('token',json.authToken);
            props.showAlert("Loged-In Successfully","success");
            navigate("/");
        }else{
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange=(e)=>{
        setCredentials({...Credentials,[e.target.name]:e.target.value});
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' value={Credentials.email} onChange={onChange} placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" name='password' value={Credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary mb-3" >Log-in</button>
            </form>
        </div>
    )
}

export default Login