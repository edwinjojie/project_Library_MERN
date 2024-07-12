import React from 'react';
import { Box, Button, Link, TextField, Typography, Grid, Paper } from '@mui/material';


const Login = () => {
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
        backgroundcolor:' #F5F5F5',
        color:' #333333',
        fontfamily: 'Open Sans',
        fontsize: '16px',
        lineheight: 1.6,
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, maxWidth: 500 }}>
        <Typography sx={{ fontSize: 36, fontWeight: 'bold', color: 'black', textAlign: 'center' }} gutterBottom>
          Login
        </Typography>
        
            <TextField
              id="outlined-required"
              label="user_id or email"
              variant="outlined"
            />

            <TextField
              id="outlined-required"
              label="Password"
              variant="outlined"
              
            />
           <Link  >
          <Button color="inherit" style={{color: 'black',fontWeight: 'bold', backgroundColor: 'skyblue', marginLeft:'5px'}}>login</Button>
          </Link>
          <div>
          <p style={{ marginBottom: '2px' }}>
             Don't have an account in Libra?
          </p>
          <Link to='/Signup' >
         
          <Button color="inherit" style={{ alignSelf: 'left', fontSize: '10px', color: 'blue', marginTop: '0', padding: '5px 10px' ,textDecoration:'underlined'}}>Create account</Button>
          </Link>
          </div>
      </Paper>
    </Box>
 
    </div>
  )
}

export default Login