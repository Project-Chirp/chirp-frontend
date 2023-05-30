import { Box, Divider } from "@mui/material";
import ComposePost from "../components/Posts/ComposePost";
import { Stack } from "@mui/system";
import PostList from "../components/Posts/PostList";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { width: "50%" },
};

const Timeline = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <ComposePost placeholder="What's happening?" />
        <PostList />
      </Box>
      <Divider orientation="vertical" />
    </Stack>
  );
};

export default Timeline;
