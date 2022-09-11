import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const paperStyle = { padding: "20px", height: '60vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '8px 0' }

    const handleSubmit = () => {
        
        console.log(email)
    }
    const handleReset = () => {}
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField onChange={(e) => setEmail(e.target.value)} variant="standard" label='Username' placeholder='Enter username' fullWidth required sx={{marginBottom: "10px"}}/>
                <TextField onChange={(e) => setEmail(e.target.value)} variant="standard" label='Password' placeholder='Enter password' type='password' fullWidth required />
                <Typography sx={{marginTop: "10px"}}>Forgot password ? 
                <Link style={{textDecoration: 'none'}} to="" onClick={() => handleReset()}>Reset Password</Link>
                </Typography>
                <Button onClick={() => handleSubmit()} type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>Sign in</Button>
                <Typography > Do you have an account ?
                    <Link style={{textDecoration: 'none'}} to="/signup" >
                        Sign Up
                    </Link>
                </Typography>
                <Button color='primary' variant="contained" style={btnStyle} fullWidth>Google Sign in</Button>
            </Paper>
        </Grid>
    );
};

export default Login;