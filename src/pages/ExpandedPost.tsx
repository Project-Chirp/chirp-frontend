import { Box, Divider } from "@mui/material";
import ExpandedPostItem from "../components/Posts/ExpandedPostItem";
import ComposeReply from "../components/Posts/ComposeReply";
import ExpandedPostList from "../components/Posts/ExpandedPostReplies";
import Layout from "./Layout";

const styles = {
  root: {
    width: "100%",
  },
};

const ExpandedPost = () => {
  return (
    <Layout
      mainContent={
        <Box sx={styles.root}>
          <ExpandedPostItem />
          <ComposeReply placeholder="Post your reply" />
          <Divider />
          <ExpandedPostList />
        </Box>
      }
    />
  );
};

export default ExpandedPost;
