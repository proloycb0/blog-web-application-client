import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from './Loading';
import RightBar from '../Home/RightBar';
import Sidebar from '../Home/Sidebar';


const Profile = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState(user?.displayName);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [updateProfile, updating] = useUpdateProfile(auth);

    if (updating) {
        return <Loading />
    }

    const handleSubmit = () => {
        let nameText;
        let imageUrl;
        let phoneNumber;
        let addressText;
        if (name === '') {

        }
        else {
            nameText = name;
        }
        if (image === '') {

        }
        else {
            imageUrl = image;
        }
        if (phone === '') {

        }
        else {
            phoneNumber = phone;
        }
        if (address === '') {

        }
        else {
            addressText = address;
        }
        console.log(nameText, imageUrl, phoneNumber, addressText)
        const users = {
            name: nameText,
            photo: imageUrl,
            phone: phoneNumber,
            address: addressText
        }

        fetch(`https://intense-ocean-27340.herokuapp.com/user/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({users})
        })
            .then(res => res.json())
            .then(async (data) => {
                toast.success('save information successfully');
                await updateProfile({ displayName: nameText, photoURL: imageUrl });
            })
    }
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <Box flex={4} p={{ xs: 0, md: 2 }} align='center'>
                <Box
                    width={{ xs: '70vw', sm: 300 }}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                >
                    <Typography align='center' variant="h5">
                        Edit Profile
                    </Typography>
                    <form>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField value={name} onChange={(e) => setName(e.target.value)} type="name" label="Name" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField value={user?.email} type="email" label="Email" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => setImage(e.target.value)} type="link" placeholder="Photo url" label="Image" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter your address" label="Address" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => handleSubmit()} type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Box>
            <RightBar />
        </Stack>

    );
};

export default Profile;