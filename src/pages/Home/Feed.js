import { Box } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import AddPost from './AddPost';
import Post from './Post';

const Feed = () => {
    const { data: blogs, isLoading, refetch } = useQuery("blogs", () => fetch('http://localhost:5000/blogs', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json())
    );

    if (isLoading) {
        return <Loading />
    }

    return (
        <Box >
            <AddPost refetch={refetch}/>
            {
                blogs?.map(blog => <Post 
                key={blog._id}
                blog={blog}
                />)
            }
        </Box>
    );
};

export default Feed;