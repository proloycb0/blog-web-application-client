import { AppBar, Avatar, Box, Button, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';
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

  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>Kep Blogger</Typography>
        <MenuIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Search><InputBase placeholder='Search...' /></Search>
        <Icons>
          <Avatar onClick={e => setOpen(true)} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
        <MenuItem>Profile</MenuItem>
        <MenuItem>{user ? <Button onClick={() => signOut(auth)}>Sign Out</Button>
          : <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">Login</Link>}</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;