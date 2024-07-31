import React, { useState } from 'react'
import { Box, Button, Link, TextField, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const Signup = () => {
  const [form,setForm]=useState({
    user_name:'',
    user_id:'',
    user_password:'',
    user_email:'',
    user_place:'',
    user_age:'',
    user_phno:'',
    user_gender:'',
    user_type:'user'
  })
  const handleChange=(e)=>{
    setForm({...form,
      [e.target.name]:e.target.value
  });
  console.log(form);
  };
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/adduser', form);
      console.log(res.data);
      alert('Successfully signed up');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data || 'Error occurred in signing up');
      console.log(error);
    }
  };
  
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        //backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D")', // Add your image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        //p: 2,
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 500, marginTop:'20px', backgroundColor:'#F5F5DC',opacity: 0.9 }}>
        <Typography sx={{ fontSize: 36, fontWeight: 'bold', color: 'black', textAlign: 'center' }} gutterBottom>
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_name"
              label="Name"
              variant="outlined"
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              //fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_id"
              label="Username"
              variant="outlined"
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_password"
              type="password"
              label="Password"
              variant="outlined"
              name="user_password"
              value={form.user_password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_email"
              label=" Email ID"
              variant="outlined"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_place"
              label="Place"
              variant="outlined"
              name="user_place"
              value={form.user_place}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              id="user_age"
              label="Age"
              variant="outlined"
              name="user_age"
              value={form.user_age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="user_phno"
              label="Phone number"
              variant="outlined"
              name="user_phno"
              value={form.user_phno}
              onChange={handleChange}
            />
          </Grid>
          <div>
               
            </div>
          <Grid item xs={12} sm={6}>
          <label style={{fontSize:20 ,color:'gray'}}>Gender: </label>
                <select name="user_gender"  onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="others">Prefer not to say</option>
                </select>
            
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mt: 2}}>
              By clicking submit, you agree to the{' '}
              <Link href="https://librarypass.com/terms-conditions/" underline="hover" sx={{color: '#654321'}} >
                terms and conditions
              </Link>.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button color="inherit" style={{color: 'white', marginLeft:'5px' ,backgroundColor: '#654321'} } onClick={handleSubmit} fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
