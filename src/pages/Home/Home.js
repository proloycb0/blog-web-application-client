import { Stack } from '@mui/material';
import React from 'react';
import Feed from './Feed';
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar/>
            <Feed />
        </Stack>
    );
};

export default Home;