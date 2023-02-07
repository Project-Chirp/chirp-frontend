import { Card, CardContent, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar/Avatar";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton/IconButton";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardActions from "@mui/material/CardActions/CardActions";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Post } from "./PostList";

type PostProps = {
  post: Post;
};

const PostItem = ({ post }: PostProps) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>CK</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.displayName} @${post.username}`}
        subheader={post.timestamp}
      />
      <CardActionArea>
        <CardContent sx={{ width: 400 }}>
          <Typography>{post.textContent}</Typography>
        </CardContent>
        {post.imagePath && (
          <CardMedia
            sx={{ maxWidth: 200, margin: "auto" }}
            component="img"
            image={post.imagePath}
          />
        )}
      </CardActionArea>
      <CardActions>
        <Stack direction="row" justifyContent="space-between">
          <IconButton>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton>
            <AddCommentOutlinedIcon />
          </IconButton>
          <IconButton>
            <RepeatOutlinedIcon />
          </IconButton>
          <IconButton>
            <ShareOutlinedIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PostItem;
