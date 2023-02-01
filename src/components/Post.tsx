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

type PostProps = {
  displayName: string;
  textContent: string;
  timestamp: string;
  username: string;
};

const Post = ({ displayName, textContent, timestamp, username }: PostProps) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>CK</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${displayName} @${username}`}
        subheader={timestamp}
      />
      <CardActionArea>
        <CardContent sx={{ width: 400 }}>
          <Typography>{textContent}</Typography>
        </CardContent>
        <CardMedia
          sx={{ maxWidth: 200, margin: "auto" }}
          component="img"
          image="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
        />
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

export default Post;
