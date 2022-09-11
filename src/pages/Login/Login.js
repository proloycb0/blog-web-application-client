import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const paperStyle = { padding: "20px", height: '60vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '8px 0' }
    let signInError;
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user || gUser) {
            navigate(from, { replace: true });
        }
    }, [user, gUser, from, navigate]);
    if (loading || gLoading || sending) {
        return <Loading />
    }
    if (error || gError) {
        signInError = <p sx={{color: 'red'}}><small>{error?.message || gError?.message}</small></p>
    }
    const handleSubmit = async () => {
        await signInWithEmailAndPassword(email, password);
        toast.success('Login successful')
    }
    const handleReset = async () => {
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success('Sent email')
        }
        else {
            toast.error('Please enter your email')
        }
    }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField onChange={(e) => setEmail(e.target.value)} variant="standard" label='Username' placeholder='Enter username' fullWidth required sx={{marginBottom: "10px"}}/>
                <TextField onChange={(e) => setPassword(e.target.value)} variant="standard" label='Password' placeholder='Enter password' type='password' fullWidth required />
                <Typography sx={{marginTop: "10px"}}>Forgot password ? 
                <Link style={{textDecoration: 'none'}} to="" onClick={() => handleReset()}>Reset Password</Link>
                </Typography>
                {signInError}
                <Button onClick={() => handleSubmit()} type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Sign in</Button>
                <Typography > Do you have an account ?
                    <Link style={{textDecoration: 'none'}} to="/signup" >
                        Sign Up
                    </Link>
                </Typography>
                <Button onClick={() => signInWithGoogle()} color='primary' variant="contained" style={btnStyle} fullWidth>Google Sign in</Button>
            </Paper>
        </Grid>
    );
};

export default Login;