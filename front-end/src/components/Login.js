import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('')
    const navigate=useNavigate();
    useEffect(()=>{
const auth=localStorage.getItem('user');
if(auth)
{
    navigate("/")
}
    },[])
    const handleLogin=async ()=>{
        console.warn(email,password)
        let result=await fetch('http://localhost:5000/login',{
          method:'post',
          body:JSON.stringify({email,password}),
          headers:{
            'Content-Type':'application/json'
        } 
        });
        result=await result.json();
        console.warn(result);

        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/");
        }else{
            alert("Please enter correct details");
        }
    }
     return(
        <div className="login">
            <h1>Login</h1>
            <input 
                className="inputBox" 
                type="text"
                onChange={(e)=>setEmail(e.target.value)} 
                value={email}
                placeholder="Enter Email" 
            />
           
            <input 
                className="inputBox" 
                type="password" 
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                placeholder="Enter Password" 
            />
           
            <button 
                className="appButton" 
                onClick={handleLogin}
                type="button">
                Login
            </button>
        </div>
     )
}

export default Login;