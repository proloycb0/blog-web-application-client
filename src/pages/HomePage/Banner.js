import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const Banner = () => {
    const navigate = useNavigate();
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none" }}
                onClick={onClick}
            />
        );
    }
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none", }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Slider {...settings}>
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    minHeight: '90vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${'https://i.ibb.co/vwRqhTy/toy-bricks-table-144627-48267.jpg'})`,
                }}
            >
                {/* Increase the priority of the hero background image */}
                {/* {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />} */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',

                }}>
                    <Grid item align='center'>
                        <Box
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                Create Your Blog
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Here you will publish your blog and see another user blog
                            </Typography>
                            <Button onClick={() => navigate('/home')} variant='contained'>Get Started</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    minHeight: '90vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${'https://i.ibb.co/C2dWFtv/technology-communication-icons-symbols-concept-53876-120314.jpg'})`,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.5)',
                    }}
                />
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',

                }}>
                    <Grid item align='center'>
                        <Box
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                Create Your Blog
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Here you will publish your blog and see another user blog
                            </Typography>
                            <Button onClick={() => navigate('/home')} variant='contained'>Get Started</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Slider>
    );
};

export default Banner;