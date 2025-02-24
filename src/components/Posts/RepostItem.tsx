import { RepeatOutlined } from "@mui/icons-material";
import { Box, Link, useTheme } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { Post } from "../../types/posts";
import { convertRepostToPost } from "../../utilities/postTransform";
import PostItem from "./PostItem";

type RepostProps = {
  post: Post;
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    color: "gray.main",
    paddingLeft: 2,
    paddingTop: 1,
    cursor: "pointer",
  },
  link: {
    paddingLeft: 0.5,
  },
};

const RepostItem = ({ post }: RepostProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.user.username);

  if (!post.originalPostContent) {
    return null;
  }

  const convertedPost = convertRepostToPost(post);

  return (
    <Box>
      <Box onClick={() => navigate(`/${username}`)} sx={styles.container}>
        <RepeatOutlined fontSize="small" />
        <Link
          color={theme.typography.subtitle2.color}
          component={RouterLink}
          fontSize={"small"}
          sx={styles.link}
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
