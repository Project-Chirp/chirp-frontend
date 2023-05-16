import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import PostList from "../components/Posts/PostList";
import { useParams } from "react-router-dom";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { padding: 2, width: "50%" },
};

const ExpandedPost = () => {
  const { postId } = useParams();

  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        {/* <ComposePost /> */}
        <Typography>TESTING</Typography>
        <PostList />
      </Box>
    </Stack>
  );
};

export default ExpandedPost;
