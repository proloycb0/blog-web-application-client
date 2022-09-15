import { Box } from '@mui/material';
import React from 'react';
import Footer from '../Shared/Footer';
import About from './About';
import Banner from './Banner';
import Contact from './Contact';

const HomePage = () => {
    return (
        <Box >
            <Banner />
            <About />
            <Contact />
            <Footer />
        </Box>
    );
};

export default HomePage;