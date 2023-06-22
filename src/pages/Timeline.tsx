import { Box, Divider, Typography } from "@mui/material";
import ComposePost from "../components/Posts/ComposePost";
import { Stack } from "@mui/system";
import PostList from "../components/Posts/PostList";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { width: "50%" },
  timelineHeader: {},
  headerTitle: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    paddingLeft: 2,
    paddingTop: 1,
    paddingBottom: 1,
  },
};

const Timeline = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <Typography sx={styles.headerTitle}>Timeline</Typography>
        <ComposePost placeholder="What's happening?" />
        <PostList />
      </Box>
      <Divider orientation="vertical" />
    </Stack>
  );
};

export default Timeline;
