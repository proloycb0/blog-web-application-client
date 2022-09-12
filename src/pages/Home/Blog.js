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


const Blog = ({ blog }) => {
    const { name, description, image, userName, userEmail, photo } = blog;

    const handleArchive = () => {
        const blogArchive = {
            userName,
            userEmail,
            photo,
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
                <IconButton aria-label="delete">
                     <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Blog;