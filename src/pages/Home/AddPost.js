import { Add} from '@mui/icons-material';
import { Avatar, Box, Button, Fab, Modal, styled, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';


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
const AddPost = ({refetch}) => {
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = () => {
        const blogs = {
            userName: user.displayName,
            userEmail: user.email,
            photo: user.photoURL,
            name: title,
            description: description,
            image: image,
        }

        // send to your database
        fetch('https://blog-web-application-server.onrender.com/blogs', {
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
                    toast.success('Blogs added successfully');
                    setOpen(false);
                    refetch();
                }
                else {
                    toast.error('Blogs added failed')
                }
            })
    
    }
return (
    <>
        <Tooltip
            onClick={(e) => setOpen(true)}
            title="Add Blog"
            sx={{
                position: "fixed",
                bottom: 20,
                left: { xs: "calc(50% - 25px)", md: 30 },
            }}
        >
            <Fab color="primary" aria-label="add">
                <Add />
            </Fab>
        </Tooltip>
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
                    Create blog
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
                    placeholder="Title here"
                    variant="standard"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    sx={{ width: "100%" }}
                    id="standard-multiline-static"
                    multiline
                    rows={3}
                    placeholder="What's on your mind?"
                    variant="standard"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    sx={{ width: "100%", marginBottom: '5px' }}
                    placeholder="Image url"
                    variant="standard"
                    onChange={(e) => setImage(e.target.value)}
                />
                <Button fullWidth
                    variant="contained"
                    aria-label="outlined primary"
                    onClick={() => handleSubmit()}>Post</Button>
            </Box>
        </StyledModal>
    </>
);
};

export default AddPost;