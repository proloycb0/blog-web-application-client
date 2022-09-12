import { Box, Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Archived from './Archived';


const Archive = () => {
    const { data: archives, isLoading, refetch } = useQuery('archive', () => fetch('http://localhost:5000/archive', {
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
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                {

                   archives?.map(blog => <Grid key={blog._id} sx={{margin:{xs: 4, md: 5 }}} item xs={4} sm={4} md={6} >
                        <Archived
                            blog={blog}
                            refetch={refetch}
                        /></Grid>)
                }
            </Grid>
        </Box>
    );
};

export default Archive;