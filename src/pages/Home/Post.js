import { Archive, Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";


const Post = ({ blog }) => {
    const [user] = useAuthState(auth);
    const { name, description, image, userName, userEmail, photo } = blog;

    const handleArchive = () => {
        const blogArchive = {
            email: user?.email,
            userName,
            userEmail,
            photo: photo || '',
            name,
            description,
            image,

        }
        fetch('http://localhost:5000/archive', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(blogArchive)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Blog archived successful')
            })
    }
    return (
        <Card  sx={{ width:{xs: '75vw', md: '50vw'}, margin:{xs: 4, md: 5 }}} >
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
                image={image}
                alt={name}
                sx={{height: {md: '300px'}}}
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
                <IconButton onClick={() => handleArchive()} aria-label="archive">
                    <Archive />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Post;