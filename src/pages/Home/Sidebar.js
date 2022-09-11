import { Box, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import React from 'react';
import { Home, AllInbox, Archive, RestoreFromTrash } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme })=>({
    [theme.breakpoints.only('xs')]: {
        display: 'none'
      },
}));
const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <StyledBox flex={1}>
            <Box position='fixed'>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton as={Link} to='/'
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton as={Link} to='/blogs'
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <AllInbox />
                        </ListItemIcon>
                        <ListItemText primary="Blogs" />
                    </ListItemButton>
                    <ListItemButton as={Link} to='/archive'
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <Archive />
                        </ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItemButton>
                    <ListItemButton as={Link} to='/trash'
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <RestoreFromTrash />
                        </ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItemButton>
                </List>
            </Box>
        </StyledBox>
    );
};

export default Sidebar;