import { Badge, LocalPhone, LocationOn } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Modal, styled, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from './Loading';


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});
const Profile = () => {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(user?.displayName);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [updateProfile, updating] = useUpdateProfile(auth);
    const { data: users, isLoading, refetch } = useQuery(['users', user], () => fetch(`http://localhost:5000/user?email=${user?.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading || updating) {
        return <Loading />
    }

    const handleSubmit = (event) => {
        const users = {
            name: name,
            photoURL: image,
            phone: phone,
            address: address
        }

        fetch(`http://localhost:5000/user/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(async (data) => {
                toast.success('save information successfully')
                await updateProfile({ displayName: name, photoURL: image });
                event.target.reset();
                refetch();
                setOpen(false)
            })
    }


    return (
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            {
                users.map(user => <Card key={user._id} align='center' sx={{ width:{xs: '75vw', md: '30vw'}, margin:{xs: 4, md: '70px auto' }}}>
                <Avatar sx={{ width: 200, height: 200, margin: 3 }} alt={user.name} src={user?.photoURL} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <Typography><LocalPhone/></Typography>
                            <Typography><LocationOn/></Typography>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                        <Button onClick={() => setOpen(true)}>Edit</Button>
                    </CardActions>
                </Card>)
            }

            <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={400}
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
            </StyledModal>
        </Box>
    );
};

export default Profile;