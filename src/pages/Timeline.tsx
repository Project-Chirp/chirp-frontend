import { Box, Divider, Typography } from "@mui/material";
import ComposePost from "../components/Posts/ComposePost";
import PostList from "../components/Posts/PostList";
import Layout from "./Layout";
import SideBar from "../components/SideBar/SideBar";

const styles = {
  headerTitle: {
    fontWeight: "bold",
    paddingX: 2,
    paddingY: 1,
  },
};

const Timeline = () => {
  return (
    <Layout
      middleContent={
        <Box>
          <Typography sx={styles.headerTitle}>Timeline</Typography>
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
