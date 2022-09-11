import { Avatar, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const paperStyle = { padding: "20px", width: 300, margin: "20px auto"};
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnStyle = { margin: '8px 0' };
    let signUpError;
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    if(loading || gLoading || updating || sending){
        return <Loading/>
    }
    if(user || gUser){
        navigate('/');
    }
    if (error || gError || updateError) {
        signUpError = <p style={{color: 'red'}}><small>{error?.message || gError?.message}</small></p>
    }
    const handleSubmit = async () => {
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({displayName: name, email: email});
        await sendEmailVerification();
        toast.success('SignUp successful');
    }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField onChange={(e) => setName(e.target.value)} variant="standard" label='Name' placeholder="Enter your name" fullWidth required sx={{ marginBottom: "10px" }}/>
                    <TextField onChange={(e) => setEmail(e.target.value)} variant="standard" label='Email' placeholder="Enter your email" type='email' fullWidth required sx={{ marginBottom: "10px" }}/>
                    <TextField onChange={(e) => setPassword(e.target.value)} variant="standard" label='Password' placeholder="Enter your password" type='password' fullWidth required sx={{ marginBottom: "10px" }}/>
                    {signUpError}
                    <Button onClick={() => handleSubmit()} type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Sign Up</Button>
                    <Typography > Already have an account ?
                        <Link style={{ textDecoration: 'none' }} to="/login" >
                            Login
                        </Link>
                    </Typography>
                    <Divider>OR</Divider>
                    <Button onClick={() => signInWithGoogle()} color='primary' variant="contained" style={btnStyle} fullWidth>Google Sign Up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;