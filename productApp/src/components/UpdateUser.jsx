import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../authcontext'; 

export const Update = () => {
  const { user, setUser } = useAuth(); 
  const [form, setForm] = useState({
    user_name: '',
    user_id: '',
    user_password: '',
    user_email: '',
    user_place: '',
    user_age: '',
    user_phno: '',
    user_gender: '',
    user_type: 'user'
  });

  useEffect(() => {
    if (user) {
      console.log(user)
      // Fetch user data based on user ID or identifier
      axios.get(`http://localhost:4000/user/${user.user_id}`)
        .then(response => {
          setForm(response.data);
        })
        .catch(error => {
          console.error( error);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/updateuser/${user._id}`, form);
      alert('Profile updated successfully');
      setUser(response.data);
    } catch (error) {
      console.log( error);
      alert('Error updating profile');
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, maxWidth: 600, margin: '50px auto', opacity: 0.9, backgroundColor: '#F5F5DC', padding: '20px' }}>
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
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Update Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_name"
              label="Name"
              variant="outlined"
              fullWidth
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_id"
              label="Username"
              variant="outlined"
              fullWidth
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
              fullWidth
              name="user_password"
              value={form.user_password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_email"
              label="Email ID"
              variant="outlined"
              fullWidth
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
              fullWidth
              name="user_place"
              value={form.user_place}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_age"
              label="Age"
              variant="outlined"
              fullWidth
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
              fullWidth
              name="user_phno"
              value={form.user_phno}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="user_gender"
              label="Gender"
              variant="outlined"
              select
              fullWidth
              name="user_gender"
              value={form.user_gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="others">Prefer not to say</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button color="inherit" type="submit" style={{ color: 'white', backgroundColor: '#654321' }} fullWidth>
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
// import React from 'react';
// import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';

// export const Update = () => {
//   return (
//     <Paper elevation={3} sx={{ 
//       borderRadius: 2, 
//       maxWidth: 600, 
//       margin: '50px auto', 
//       opacity: 0.9, 
//       backgroundColor:'#F5F5DC',
//       padding: '20px'
//     }}>
//       <Box
//         component="form"
//         sx={{
//           '& .MuiTextField-root': { m: 1 },
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           minHeight: '80vh', 
//           color: '#000000'
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//           Update Profile
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="name"
//               label="Name"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.84}>
//             <TextField
//               id="place"
//               label="Place"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="age"
//               label="Age"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.84}>
//             <TextField
//               id="phone-number"
//               label="Phone number"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="username"
//               label="Username"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.84}>
//             <TextField
//               id="password"
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//               autoComplete="current-password"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="email-id"
//               label="Email id"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={5.84}>
//             <TextField
//               id="user-id"
//               label="User ID"
//               variant="outlined"
//               fullWidth
//               sx={{ mt: 1, mb: 1 }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl component="fieldset" sx={{ mt: 1, mb: 1, width: '100%' }}>
//               <FormLabel component="legend">Gender</FormLabel>
//               <RadioGroup
//                 row
//                 aria-label="gender"
//                 name="row-radio-buttons-group"
//               >
//                 <FormControlLabel value="female" control={<Radio />} label="Female" />
//                 <FormControlLabel value="male" control={<Radio />} label="Male" />
//                 <FormControlLabel value="other" control={<Radio />} label="Other" />
//               </RadioGroup>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <Button color="inherit" style={{ color: 'white', backgroundColor: '#654321' }} fullWidth>
//               Update Profile
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// };
