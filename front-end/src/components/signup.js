import React, { useState,useEffect } from 'react';
import {json, useNavigate} from 'react-router-dom'

const Signup = () => {  // Renamed component to start with an uppercase letter
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate=useNavigate();

    
        useEffect(()=>{
          const auth=localStorage.getItem('user');
          if(auth)
          {
            navigate('/')
          }
        })

    const collectData =async () => {
        console.warn(name, email, password);
        let result=await fetch('http://localhost:5000/register',{
        method:'post',
        body:JSON.stringify({name, email, password}),
        headers:{
            'Content-Type':'application/json'
        }
    });
    result=await result.json()
    console.warn(result);
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if(result)
    {
        navigate('/');
    }
    }
    return (
        <div className="register">
            <h1>Register</h1>
            <input 
                className="inputBox" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Name" 
            />
           
            <input 
                className="inputBox" 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter Email" 
            />
           
            <input 
                className="inputBox" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter Password" 
            />
           
            <button 
                onClick={collectData} 
                className="appButton" 
                type="submit">
                Signup
            </button>
        </div>
    );
};

export default Signup;
