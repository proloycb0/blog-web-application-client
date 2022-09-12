import { Delete, Edit, Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    IconButton,
    Typography,
} from "@mui/material";
import React from 'react';
import { toast } from "react-toastify";


const Blog = ({ blog, refetch }) => {
    const {_id, name, description, image, userName, userEmail, photo } = blog;

    const handleDelete = () => {
        const blogTrash = {
            userName,
            userEmail,
            photo,
            name,
            description,
            image,
        }
        fetch(`http://localhost:5000/blogs/${_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(blogTrash)
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount) {
                toast.success(`${name} is deleted`);
                refetch();
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
                height="300px"
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
                <IconButton aria-label="add to favorites">
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                </IconButton>
                <IconButton aria-label="Edit">
                     <Edit/>
                </IconButton>
                <IconButton onClick={() => handleDelete()} aria-label="delete">
                     <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Blog;