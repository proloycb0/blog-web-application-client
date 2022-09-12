import { Favorite, FavoriteBorder, MoreVert, Unarchive } from "@mui/icons-material";
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


const Archived = ({ blog, refetch }) => {
    const { _id, name, description, image, userName, photo } = blog;

    const handleDelete = () => {
        fetch(`http://localhost:5000/archive/${_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`${name} is unArchived`);
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
                <IconButton aria-label="add to favorites">
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                </IconButton>
                <IconButton onClick={() => handleDelete()} aria-label="unarchive">
                     <Unarchive/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Archived;