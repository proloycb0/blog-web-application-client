import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import Blog from './Blog';
import RightBar from './RightBar';
import Sidebar from './Sidebar';

const Blogs = () => {
    const [user] = useAuthState(auth)
    const { data: blogs, isLoading, refetch } = useQuery(["blogs", user], () => fetch(`https://intense-ocean-27340.herokuapp.com/blog?userEmail=${user.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json())
    );

    if (isLoading) {
        return <Loading />
    }
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <Box flex={4} p={{ xs: 0, md: 2 }}>
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                    {

                        blogs?.map(blog => <Grid key={blog._id} sx={{ margin: { xs: 4, md: 5 } }} item xs={4} sm={4} md={6} >
                            <Blog
                                blog={blog}
                                refetch={refetch}
                            /></Grid>)
                    }
                </Grid>
            </Box>
            <RightBar />
        </Stack>
    );
};

export default Blogs;