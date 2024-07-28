import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../authcontext';


const Login = () => {
  const navigate = useNavigate();
  const {login}=useAuth();
  const handleSignup = () => {
    navigate('/signup');
  };
  //for storing the value from the textfields
  const [form,setForm]=useState({
    identifier:'',
    password:''
  })

  //to store any change that occured in the textfield
  //syntax:
  //const functionName = (parameters) => {
  //  // multiple statements
  //return value;}
  const inputChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
    console.log(form);
  };
  //when login button is pressed
  const handleLogin=(e)=>{
    //console.log(form);
    axios.post("http://localhost:4000/loginuser",form).then((res)=>{
      alert('login successfull');
      console.log(res.data);
      //updating the auth file
      login(res.data);
      //use navigate function to dashboard here,afterward
      navigate('/')
    })
    .catch((error)=>{
      alert("wrong username or password");
      console.error(error);
    }); 
  };
  
  return (
    <div > 
     
     <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        backgroundColor: '#00000',
        color: '#000000',
        fontFamily: 'Open Sans',
        fontSize: '16px',
        lineHeight: 1.6,
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3} sx={{ p: 2, borderRadius: '8px', maxWidth: 500, padding: '20px' ,backgroundColor:'#F5F5DC',opacity: 0.9}}>
        <Typography sx={{ fontSize: 36, fontWeight: 'bold', color: 'black', textAlign: 'center' }} gutterBottom>
          Login
        </Typography>

        <TextField id="outlined-required" label="user_name or email" name='identifier' variant="outlined" onChange={inputChange} value={form.identifier}/>
        <TextField id="outlined-required" label="Password" variant="outlined" name='password' onChange={inputChange} value={form.password}/>

        <br />

        <Link>
          <Button color="inherit" 
          style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'skyblue', marginLeft: '5px' }} 
          onClick={handleLogin}>
            login
          </Button>
        </Link>

        <div>
          <p style={{ marginBottom: '2px' }}>
            Don't have an account in Libra?
          </p>
          <Button
            color="inherit"
            onClick={handleSignup}
            style={{
              alignSelf: 'left',
              fontSize: '10px',
              color: 'brown',
              marginTop: '0',
              padding: '5px 10px',
              textDecoration: 'underline'
            }}
          >
            Create account
          </Button>
        </div>
      </Paper>
    </Box>
 
    </div>
  )
}

export default Login