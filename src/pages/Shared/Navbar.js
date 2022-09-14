import { AppBar, Avatar, Box, Button, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}));

const Icons = styled(Box)(({ theme }) => ({

}));
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant={{xs: 'p', md: 'h6'}}><Link style={{ textDecoration: 'none', color: 'white' }} to="/">Kep Blogger</Link></Typography>
        <Search><InputBase placeholder='Search...' /></Search>
        <Icons>
          <Avatar onClick={e => setOpen(true)} alt="" src={user?.photoURL} />
        </Icons>
      </StyledToolbar>
      <Menu sx={{ marginTop: "40px" }}
        id="basic-menu"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
        <MenuItem>{user ? <Button onClick={() => signOut(auth)}>Sign Out</Button>
          : <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">Login</Link>}</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;