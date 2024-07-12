import React from 'react';
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
       //backgroundColor: '#f5f5f5',
        //p: 2,
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, maxWidth: 500 }}>
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
            <Typography variant="body2" sx={{ mt: 2 }}>
              By clicking submit, you agree to the{' '}
              <Link href="https://librarypass.com/terms-conditions/" underline="hover">
                terms and conditions
              </Link>.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: 'skyblue' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};