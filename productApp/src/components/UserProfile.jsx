import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useAuth } from '../authcontext';
const UserProfile = () => {
  const {user}=useAuth();
  return (
    <div>
      if (!user) {
       <Typography>Loading...</Typography>
      };
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
        <Card  sx={{ maxWidth: 600, width: '100%', padding:'10px 10px', opacity:1}}>
          <CardContent>
          <Typography variant="h4" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Georgia' }}>⁘ User Details ⁘</Typography>            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Name: {user.user_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>User ID: {user.user_id}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>User password: {user.user_password}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Email: {user.user_email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Place: {user.user_place}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Age: {user.user_age}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Phone Number: {user.user_phno}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Gender: {user.user_gender}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" style={{color: '#3B5323'}} sx={{ mt: 1, fontFamily:'Garamond' }}>Type: {user.user_type}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Link to='/updateuser'>
          <button  style={{color:'white', backgroundColor:'#E97451', fontFamily:'Garamond'}}>Update</button></Link>
        </Card>

      </Box>
    
    </div>
  )
}

export default UserProfile