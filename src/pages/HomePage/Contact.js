import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

const Contact = () => {
    return (
        <Box marginTop={5}>
            <Typography marginBottom={3} variant='h4' color='primary' align='center'>Contact Us</Typography>
            <Grid container component="main">
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://img.freepik.com/free-photo/businessman-touching-virtual-screen_1232-737.jpg?size=626&ext=jpg&ga=GA1.2.1591317346.1641023292)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} square>
                    <Box
                        sx={{
                            my:{ xs: 2, sm:8},
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Let's Stay Us
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="text"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                type="text"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                name="message"
                                label="Message"
                                type="text"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Contact;