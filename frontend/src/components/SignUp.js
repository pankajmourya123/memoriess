import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';

function SignUp() {
    let [name,setName]=useState('')
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  let [error,setError]=useState(false)
   const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

useEffect(()=>{                           
  const auth=localStorage.getItem("user")
  if(auth){
    navigate('/')
  }
},[])

  const register= async ()=>{
    let item={name,email,password}
   
    if(!name || !email || !password ){
        setError(true)
        return false;
    }
    let result = await  fetch("http://localhost:7000/register",{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'content-Type':'application/json'
      },
      body:JSON.stringify(item)    
});
result = await result.json()
console.log(result)
localStorage.setItem("user",JSON.stringify(result.result))
localStorage.setItem("token",JSON.stringify(result.auth))
  navigate('/take')
  }
  return (
    <div class="row justify-content-evenly m-3 signup">
    <div class="col-5">

 <Paper>
      <form autoComplete="off" noValidate  onSubmit={handleSubmit}  className='form text-center p-5 '>
        <Typography variant="h6">Sign-up</Typography>
        <TextField className='mt-3' name="creator" variant="outlined" label="Name" fullWidth value={name}  onChange={(e)=>setName(e.target.value)} />
      {error && !name &&<span className='invalid-input'>Enter valid name</span>}
     
      <TextField name="title"  className='mt-3' variant="outlined" label="Email" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)} />
      {error && !email &&<span className='invalid-input'>Enter valid email</span>}
     
      <TextField name="title"  className='mt-3' variant="outlined" label="password" type="password" autoComplete="on" fullWidth value={password} onChange={(e)=>setPassword(e.target.value)} />
      {error && !password &&<span className='invalid-input'>Enter valid password</span>}
     
      <Button  variant="contained" color="primary" size="large"  className='mt-3' type="submit"onClick={register} fullWidth>Submit</Button>
      </form>
    </Paper>
  </div>
  </div> 
  )
}

export default SignUp