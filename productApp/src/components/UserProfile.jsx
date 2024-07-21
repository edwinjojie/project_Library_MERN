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
        <Card sx={{ maxWidth: 600, width: '100%' }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>User Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Name: {user.user_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">User ID: {user.user_id}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Email: {user.user_email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Place: {user.user_place}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Age: {user.user_age}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Phone Number: {user.user_phno}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Gender: {user.user_gender}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Type: {user.user_type}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Link to='/updateuser'>
          <button  style={{color:'white', backgroundColor:'brown'}}>update</button></Link>
        </Card>

      </Box>
    
    </div>
  )
}

export default UserProfile