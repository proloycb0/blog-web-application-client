import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import AddPost from './AddPost';
import Post from './Post';

const Feed = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const { data: blogs, isLoading, refetch } = useQuery(["blogs", page, size], () => fetch(`http://localhost:5000/blogs?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json())
    );

    useEffect(() => {
        fetch('http://localhost:5000/blogCount')
            .then(res => res.json())
            .then(data => {
                const count = data.result;
                const pages = Math.ceil(count / 6);
                setPageCount(pages);
            })
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <Box >
            <AddPost refetch={refetch} />
            {
                blogs?.map(blog => <Post
                    key={blog._id}
                    blog={blog}
                />)
            }
            <Grid align='center'>

                {
                    [...Array(pageCount).keys()]
                        .map((number, index) => <Button key={index} onClick={() => setPage(number)} sx={page === number ? {backgroundColor: '#1760d7', borderRadius: 100, color: 'white' } : {color: 'gray'}}>{number + 1}</Button>)
                }
            </Grid>
        </Box>
    );
};

export default Feed;