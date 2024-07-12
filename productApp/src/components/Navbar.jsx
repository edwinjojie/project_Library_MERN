import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#654321' }}>
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
          <Link to={'/'}><Button  style={{color:'white'}} sx={{ marginLeft: '6px' }}>HOME</Button></Link>
          <IconButton
            size="large"
            aria-label="sign up"
            aria-haspopup="true"
            onClick={handleSignup}
            color="inherit"
            sx={{ marginLeft: '6px' }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;