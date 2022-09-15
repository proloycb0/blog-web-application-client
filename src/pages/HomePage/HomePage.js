import { Box } from '@mui/material';
import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import Contact from './Contact';

const HomePage = () => {
    return (
        <Box >
            <Banner />
            <Contact />
            <Footer />
        </Box>
    );
};

export default HomePage;