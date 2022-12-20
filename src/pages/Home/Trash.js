import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import RightBar from './RightBar';
import Sidebar from './Sidebar';
import TrashItem from './TrashItem';


const Trash = () => {
    const [user] = useAuthState(auth)
    const { data: trashes, isLoading, refetch } = useQuery(['trash', user], () => fetch(`https://blog-web-application-server.onrender.com/trash?email=${user.email}`, {
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

                        trashes?.map(blog => <Grid key={blog._id} sx={{ margin: { xs: 4, md: 5 } }} item xs={4} sm={4} md={6} >
                            <TrashItem
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

export default Trash;