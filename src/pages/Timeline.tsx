import { Box, Divider, Typography } from "@mui/material";
import ComposePost from "../components/Posts/ComposePost";
import PostList from "../components/Posts/PostList";
import Layout from "./Layout";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  headerTitle: {
    fontWeight: "bold",
    paddingX: 2,
    paddingY: 1,
  },
};

const Timeline = () => {
  return (
    <Layout
      mainContent={
        <Box sx={styles.root}>
          <Typography sx={styles.headerTitle}>Timeline</Typography>
          <ComposePost placeholder="What's happening?" />
          <Divider />
          <PostList />
        </Box>
      }
    />
  );
};

export default Timeline;
