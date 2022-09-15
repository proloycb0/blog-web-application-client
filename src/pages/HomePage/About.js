import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <Box marginTop={5}>
           <Typography marginBottom={3} variant='h4' color='primary' align='center'>About Us</Typography>
            <Grid container component="main">
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} square>
                    <Box
                        sx={{
                            my: { xs: 2, sm: 8 },
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ mt: 1 }}>
                            <Typography component="p" variant="h4">
                                Our Mission
                            </Typography>
                            <Typography variant='p'>Our Mission is to create a better everyday life for many people. That's aspirational, short and to the point. More than that, it sets the tone for the company and makes it clear that You publish your blog and gain your knowledge from another blog.</Typography>
                            <Typography variant='p'>You publish here blog of your own idea and knowledge.</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://img.freepik.com/free-photo/about-us-information-service-sharing-join-concept_53876-124056.jpg?size=626&ext=jpg&ga=GA1.2.1591317346.1641023292)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </Box>
    );
};

export default About;