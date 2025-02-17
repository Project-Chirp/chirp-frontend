import { RepeatOutlined } from "@mui/icons-material";
import { Box, Link, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Post } from "../../types/posts";
import { convertRepostToPost } from "../../utilities/postTransform";
import PostItem from "./PostItem";

type RepostProps = {
  post: Post;
};

const RepostItem = ({ post }: RepostProps) => {
  const theme = useTheme();

  if (!post.originalPostContent) {
    return null;
  }

  const convertedPost = convertRepostToPost(post);
  console.log(convertedPost);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#808080",
          paddingLeft: 2,
          paddingTop: 1,
        }}
      >
        <RepeatOutlined sx={{ fontSize: "1rem" }} />
        <Link
          color={theme.typography.subtitle2.color}
          component={RouterLink}
          sx={{ paddingLeft: 0.5, fontSize: "0.8125rem" }}
          to={`/${post.username}`}
          underline="hover"
          variant="subtitle2"
        >
          Reposted by {post.repostedByDisplayName}
        </Link>
      </Box>
      <PostItem post={convertedPost} />
    </Box>
  );
};

export default RepostItem;
