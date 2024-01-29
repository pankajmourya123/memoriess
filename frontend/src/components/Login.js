import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import{Link} from 'react-router-dom'

function Login() {
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')


    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    useEffect(()=>{                          
        const auth=localStorage.getItem("user")
        if(auth){
          navigate('/take')
        }
      },[])
    const register= async ()=>{
        let item={email,password}
        console.log(item)
        let result = await  fetch("http://localhost:7000/login",{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'content-Type':'application/json'
      },
      body:JSON.stringify(item)    
});
result = await result.json()
console.log(result)
if(result.name){
    localStorage.setItem("user",JSON.stringify(result.user));
    localStorage.setItem("token",JSON.stringify(result.auth));
    navigate("/take")
}else{
    alert("please enter valid email")
}
    }




  return (
    <div class="row justify-content-evenly m-3 login">
    <div class="col-5">

 <Paper>
      <form autoComplete="off" noValidate  onSubmit={handleSubmit}  className='form text-center p-5'>
        <Typography variant="h6">Login</Typography>
        <TextField className='mt-3' name="email" variant="outlined" label="E-mail" type="email" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)} />
        <TextField name="password"  className='mt-3' variant="outlined" label="Password" type="password" autoComplete="on"fullWidth value={password} onChange={(e)=>setPassword(e.target.value)} />
       
        <Button  variant="contained" color="primary" size="large"  className='mt-3' type="submit"onClick={register} fullWidth>Submit</Button>
        <Link to='/signup' className='link-login'>Signup</Link>
      </form>
    </Paper>
  </div>
  </div> 
  )
}

export default Login