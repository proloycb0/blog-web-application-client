import { Delete, Favorite, FavoriteBorder, MoreVert, RestoreFromTrash, Unarchive } from "@mui/icons-material";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import React from 'react';
import { toast } from "react-toastify";


const TrashItem = ({ blog, refetch }) => {
    const { _id, name, description, image, userName, userEmail, photo } = blog;

    const handleDelete = () => {
        fetch(`http://localhost:5000/trash/${_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`${name} is deleted`);
                    refetch();
                }
            })
    }

    const handleRestore = () => {
        const blogs = {
            userName,
            userEmail,
            photo,
            name,
            description,
            image,
        }

        // send to your database
        fetch('http://localhost:5000/blogs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(blogs)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success('Blogs restore successfully');
                    refetch();
                }
                else {
                    toast.error('Blogs restore failed')
                }
            })
    
    }
    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar src={photo} sx={{ bgcolor: "primary" }} aria-label="recipe">
                        {userName.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={userName}
            />
            <CardMedia
                component="img"
                sx={{height: {md: '200px'}}}
                image={image}
                alt={name}
            />
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={() => handleDelete()} aria-label="permanent delete">
                     <Delete/>
                </IconButton>
                <IconButton onClick={() => handleRestore()} aria-label="restore ">
                     <RestoreFromTrash/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default TrashItem;