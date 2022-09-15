
import { Box, Stack } from '@mui/material';
import React from 'react';
import Feed from './Feed';
import RightBar from './RightBar';
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar />
                <Feed />
                <RightBar />
            </Stack>
        </Box>
    );
};

export default Home;