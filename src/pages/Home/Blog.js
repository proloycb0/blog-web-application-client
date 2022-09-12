import { Delete, Edit, Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    IconButton,
    Modal,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const Blog = ({ blog, refetch }) => {
    const { _id, name, description, image, userName, userEmail, photo } = blog;
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    const [title, setTitle] = useState(name);
    const [editDes, setEditDes] = useState(description);
    const [url, setUrl] = useState(image);

    const handleSubmit = () => {
        const blogs = {
            name: title,
            description: editDes,
            image: url
        }
        fetch(`http://localhost:5000/blog/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(blogs)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Blogs edit successfully');
                setOpen(false);
                refetch();
            })
    }
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
                if (data.deletedCount) {
                    toast.success(`${name} is deleted`);
                    refetch();
                }
            })
    }
    return (
        <Card>
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
                sx={{ height: { md: '200px' } }}
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
                <IconButton onClick={(e) => setOpen(true)} aria-label="Edit">
                    <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete()} aria-label="delete">
                    <Delete />
                </IconButton>
            </CardActions>
            <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={400}
                    height={300}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                >
                    <Typography variant="h6" color="gray" textAlign="center">
                        Edit blog
                    </Typography>
                    <UserBox>
                        <Avatar
                            src={user?.photoURL}
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography fontWeight={500} variant="span">
                            {user?.displayName}
                        </Typography>
                    </UserBox>
                    <TextField
                        sx={{ width: "100%" }}
                        id="standard-multiline-static"
                        value={title}
                        variant="standard"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        value={editDes}
                        variant="standard"
                        onChange={(e) => setEditDes(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "100%", marginBottom: '5px' }}
                        value={url}
                        variant="standard"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button fullWidth
                        variant="contained"
                        aria-label="outlined primary"
                        onClick={() => handleSubmit()}>Save</Button>
                </Box>
            </StyledModal>
        </Card>
    );
};

export default Blog;