import { Box } from '@mui/material';
import React from 'react';
import AddPost from './AddPost';

const Feed = () => {
    return (
        <Box flex={4} p={{ xs: 0, md: 2 }}>
            <AddPost/>
        </Box>
    );
};

export default Feed;