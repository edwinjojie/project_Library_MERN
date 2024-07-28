import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { AccountCircle, Menu as MenuIcon, Book as BookIcon, Logout as LogoutIcon, Add as AddIcon, People as PeopleIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    navigate('/');
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <img src="https://w7.pngwing.com/pngs/294/856/png-transparent-software-deployment-installation-pdq-library-runtime-system-manage-settings-angle-rectangle-logo.png" alt="Logo" width="40" height="40" />
        <Typography variant="h6" sx={{ ml: 2 }}>Libra</Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, mt: 2 }}>
        {user?.user_type === 'Admin' ? (
          <>
            <ListItem button component={Link} to="/addbook">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Book" />
            </ListItem>
            <ListItem button component={Link} to="/allusers">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="/rentedbooks">
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Rented Books" />
            </ListItem>
            <ListItem button component={Link} to="/user">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        ) : (
          <>
            {/* <ListItem button component={Link} to="/rented-books">
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Rented Books" />
            </ListItem> */}
            <ListItem button component={Link} to="/user">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        )}
      </List>
      <List>
        <ListItem button onClick={handleLogout} sx={{ mt: 'auto' }}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{ backgroundColor: '#4B2E2E', color: '#FFFFFF' }}>
        <Toolbar>
          {user && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawerContent}
              </Drawer>
            </>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LIBRARY
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to={'/'}>
              <IconButton sx={{ color: 'white', p: 1, height: '40px', width: '40px', borderRadius: '50%' }}>
                <HomeIcon />
              </IconButton>
            </Link>
            {!user && (
              <>
                <Link to="/login" style={{ color: 'white', marginLeft: '20px' }}>LOGIN</Link>
                <Link to="/signup" style={{ color: 'white', marginLeft: '20px' }}>SIGNUP</Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
