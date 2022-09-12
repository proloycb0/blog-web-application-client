import { Box, Grid } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Archived from './Archived';


const Archive = () => {
    const { data: archives, isLoading } = useQuery('archive', () => fetch('http://localhost:5000/archive', {
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
        <Box flex={3} p={{ xs: 0, md: 2 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {

                   archives?.map(blog => <Grid sx={{margin:{xs: 4, md: 5 }}} item xs={4} sm={4} md={5} >
                        <Archived
                            key={blog._id}
                            blog={blog}
                        /></Grid>)
                }
            </Grid>
        </Box>
    );
};

export default Archive;