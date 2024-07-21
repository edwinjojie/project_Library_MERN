import React from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';

export const Update = () => {
  return (
    <Paper elevation={3} sx={{ 
      borderRadius: 2, 
      maxWidth: 600, 
      margin: '50px auto', 
      opacity: 0.9, 
      backgroundColor:'#F5F5DC',
      padding: '20px'
    }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '80vh', 
          color: '#000000'
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Update Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={5.84}>
            <TextField
              id="place"
              label="Place"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="age"
              label="Age"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={5.84}>
            <TextField
              id="phone-number"
              label="Phone number"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={5.84}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email-id"
              label="Email id"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={5.84}>
            <TextField
              id="user-id"
              label="User ID"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" sx={{ mt: 1, mb: 1, width: '100%' }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button color="inherit" style={{ color: 'white', backgroundColor: '#654321' }} fullWidth>
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};