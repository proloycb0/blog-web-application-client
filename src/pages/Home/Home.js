
import { Box} from '@mui/material';
import React from 'react';
import Feed from './Feed';

const Home = () => {
    return (
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            <Feed />
        </Box>
    );
};

export default Home;