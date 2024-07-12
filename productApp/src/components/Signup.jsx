import React from 'react'
import { Box, Button, Link, TextField, Typography, Grid, Paper } from '@mui/material';
export const Signup = () => {
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
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, maxWidth: 500, marginTop:'20px' }}>
        <Typography sx={{ fontSize: 36, fontWeight: 'bold', color: 'black', textAlign: 'center' }} gutterBottom>
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-required"
              label="Name"
              variant="outlined"
              //fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-required"
              label="Place"
              variant="outlined"
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-required"
              label="Age"
              variant="outlined"
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-required"
              label="Phone number"
              variant="outlined"
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-required"
              label="Username"
              variant="outlined"
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              variant="outlined"
             
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-password-input"
              label="Email id"
              
              variant="outlined"
              
            />
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
            <Button color="inherit" style={{color: 'white', marginLeft:'5px' ,backgroundColor: '#654321'}} fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
