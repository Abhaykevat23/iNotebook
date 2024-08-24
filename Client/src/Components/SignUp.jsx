import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
 
function SignUp(props) {
  const [Credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name,email,password}=Credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name:Credentials.name,email:Credentials.email,password:Credentials.password })
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
          //Save Auth Token And Redirect User
          localStorage.setItem('token',json.authToken);
          navigate("/");
          props.showAlert("Account Created Successfully","success");
      }else{
          props.showAlert("Invalid Credentials","danger");
      }
  }

  const onChange=(e)=>{
      setCredentials({...Credentials,[e.target.name]:e.target.value});
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={Credentials.name} onChange={onChange} placeholder="Devin John" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name='email' value={Credentials.email} onChange={onChange} placeholder="name@example.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" name='password' value={Credentials.password} minLength={5} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" id="cpassword" className="form-control" name='cpassword' value={Credentials.cpassword} minLength={5} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-primary mb-3" >Sign-Up</button>
        </form>
      </div>
    </>
  )
}

export default SignUp