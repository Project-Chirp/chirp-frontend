import { Box, Divider, Typography } from "@mui/material";
import ComposePost from "../components/Posts/ComposePost";
import PostList from "../components/Posts/PostList";
import SideBar from "../components/SideBar/SideBar";
import Layout from "./Layout";

const styles = {
  headerTitle: {
    padding: 2,
  },
};

const Timeline = () => {
  return (
    <Layout
      middleContent={
        <Box>
          <Typography sx={styles.headerTitle} variant="h2">
            Timeline
          </Typography>
          <ComposePost placeholder="What's happening?" />
          <Divider />
          <PostList />
        </Box>
      }
      rightContent={<SideBar />}
    />
  );
};

export default Timeline;
