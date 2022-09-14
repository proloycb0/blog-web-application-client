
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

import auth from '../../firebase.init';
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
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            {
                users?.map(user => <Card key={user._id} align='center' sx={{ width: { xs: '75vw', md: '30vw' }, margin: { xs: 4, md: '70px auto' } }}>
                    <Avatar sx={{ width: 200, height: 200, margin: 3 }} alt={user.name} src={user?.photoURL} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.name}
                        </Typography>
                        <Typography variant='p' component='h4'>Phone: {user.phone}</Typography>
                        <Typography variant='p' component='h4'>Address: {user.address}</Typography>
                    </CardContent>
                </Card>)
            }


        </Box>
    );
};

export default MyAccount;