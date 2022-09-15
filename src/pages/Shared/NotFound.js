import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box align='center'>
            <img src="https://i.ibb.co/gyvzkfL/404-error.webp" alt="Not Found" />
            <Button onClick={() => navigate('/home')} sx={{marginBottom: '15px'}} variant='contained'>Back to home</Button>
            <Footer/>
        </Box>
    );
};

export default NotFound;