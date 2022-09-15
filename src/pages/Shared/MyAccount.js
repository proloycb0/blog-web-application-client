
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

import auth from '../../firebase.init';
import RightBar from '../Home/RightBar';
import Sidebar from '../Home/Sidebar';
import Loading from './Loading';



const MyAccount = () => {
    const [user] = useAuthState(auth);

    const { data: users, isLoading } = useQuery(['users', user], () => fetch(`http://localhost:5000/user?email=${user?.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <Box flex={4} p={{ xs: 0, md: 2 }}>
                {
                    users?.map(userOwn => <Card key={user._id} align='center' sx={{ width: { xs: '75vw', md: '30vw' }, margin: { xs: 4, md: '70px auto' } }}>
                        <Avatar sx={{ width: 200, height: 200, margin: 3 }} alt={user.name} src={user?.photoURL} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {userOwn.name}
                            </Typography>
                            <Typography variant='p' component='h4'>Phone: {userOwn.phone}</Typography>
                            <Typography variant='p' component='h4'>Address: {userOwn.address}</Typography>
                        </CardContent>
                    </Card>)
                }
            </Box>
            <RightBar />
        </Stack>

    );
};

export default MyAccount;