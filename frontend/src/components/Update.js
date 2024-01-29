import React, { useEffect, useState } from 'react'

import { TextField, Button, Typography, Paper } from '@material-ui/core';

import { useNavigate, useParams } from 'react-router-dom';
function Updateproduct() {
    const [img,setImg]=useState() 
  const [creator,setCreator]=useState() 
  const [message,setMessage]=useState() 
  const [tags,setTags]=useState() 
  const [title,setTitle]=useState() 
    const params = useParams();
    const navigate= useNavigate();

    const handleSubmit=(e)=>{
      e.preventDefault();
  }

    useEffect(()=>{
     getDetails()
    },[])

    const getDetails= async ()=>{
console.warn(params)
let result = await fetch(`http://localhost:7000/update/${params.id}`,{
 
});
result = await result.json();
setImg(result.img)
setCreator(result.creator)
setMessage(result.message)
setTags(result.tags)
setTitle(result.title)
    }

    const updateDetails= async()=>{
        const formData = new FormData()
        formData.append('creator',creator)
        formData.append('title',title)
        formData.append('tags',tags)
        formData.append('message',message)
        formData.append('img',img)
      let result = await fetch(`http://localhost:7000/update/${params.id}`,{
        method:'put',
        body:formData ,  
    })
    result= await result.json();
    console.log(result)
    navigate("/main")
    }
  return (
    <div >
    <div class="row justify-content-evenly m-5">
        <div class="col-5">
        <Paper>
      <form autoComplete="off" noValidate  onSubmit={handleSubmit}  className='form text-center p-5'>
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField className='mt-3' name="creator" variant="outlined" label="Creator" fullWidth value={creator} placeholder="Creator" onChange={(e)=>setCreator(e.target.value)} />
        <TextField name="title"  className='mt-3' variant="outlined" label="Title" fullWidth value={title} onChange={(e)=>setTitle(e.target.value)} />
        <TextField className='mt-3' name="message" variant="outlined" label="Message" fullWidth multiline rows={4}value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <TextField className='mt-3' name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={tags} onChange={(e)=>setTags(e.target.value)}/>
        <TextField className='mt-3' name="file" type="file" variant="outlined" fullWidth  onChange={(e)=>setImg(e.target.files[0])}/> 

        <Button  variant="contained" color="primary" size="large"  className='mt-3' type="submit"onClick={ updateDetails} fullWidth>UPDATE</Button>
      </form>
    </Paper>
    </div>
    </div>
    </div>
  )// with npm
}

export default Updateproduct