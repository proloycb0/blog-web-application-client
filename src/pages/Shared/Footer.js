import { Facebook, Twitter, YouTube } from '@mui/icons-material';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <Box component="footer" sx={{ bgcolor: 'gray', color: 'white', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    Kep Blogger
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    component="p"
                >
                    Copyright &copy; {year} - All right reserved by Kep Blogger.
                </Typography>
                <Grid spacing={2} align='center' margin = '10px'>
                    <a href='https://twitter.com/ProloyChacrobo1'><Twitter sx={{color: 'white'}}/></a>
                    <a href='https://www.youtube.com/channel/UCw_PIwxT4OJIrpsKNOASeng'><YouTube sx={{color: 'white'}}/></a>
                    <a href='https://www.facebook.com/bishajit.chakraborty.1/'><Facebook sx={{color: 'white'}}/></a>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;