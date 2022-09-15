import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
    return (
        <Box flex={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
};

export default Loading;