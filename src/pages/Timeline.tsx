import { Box } from "@mui/material";
import ComposePost from "../components/ComposePost";
import { Stack } from "@mui/system";
import PostList from "../components/Posts/PostList";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { padding: 2, width: "50%" },
};

const Timeline = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <ComposePost />
        <PostList />
      </Box>
    </Stack>
  );
};

export default Timeline;
