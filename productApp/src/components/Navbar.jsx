import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';

const Navbar = () => {
  const navigate = useNavigate();
  //function to route to login after signing up
  const handleSignup = () => {
    navigate('/login');
  };
  const { user, logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="absolute" sx={{ backgroundColor:' #4B2E2E', color: '#FFFFFF' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LIBRARY
          </Typography>
          <Link to={'/'}><Button  style={{color:'white' ,fontSize:17,paddingTop:'6px',paddingRight:'20px'}} >HOME</Button></Link>
          {user ? (
      <>
        <Button onClick={logout} style={{color:'white' ,paddingRight:'20px' ,fontSize:17}} sx={{ paddingLeft: '6px' ,paddingRight:'20px'}}>Logout</Button>
        <Link to="/user"><AccountCircle /></Link>
      </>
    ) : (
      <>
        <Link to="/login" style={{color:'white' ,paddingRight:'20px'}} sx={{ paddingLeft: '6px' ,paddingRight:'20px'}}>LOGIN</Link>
        <Link to="/signup" style={{ paddingLeft:'6px',color:'white'}} sx={{ marginLeft: '6px' }}>SIGNUP</Link>
      </>
    )}
          {/* <IconButton
            size="large"
            aria-label="sign up"
            aria-haspopup="true"
            onClick={handleSignup}
            color="inherit"
            sx={{ marginLeft: '6px' }}
          >
            <AccountCircle />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
    
  );
};

export default Navbar;