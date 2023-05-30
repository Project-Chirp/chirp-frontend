import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import ExpandedPostItem from "../components/Posts/ExpandedPostItem";
import ComposeReply from "../components/Posts/ComposeReply";
import ExpandedPostList from "../components/Posts/ExpandedPostList";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { padding: 0, width: "50%" },
};

const ExpandedPost = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <ExpandedPostItem />
        <ComposeReply placeholder="Post your reply" />
        <ExpandedPostList />
      </Box>
    </Stack>
  );
};

export default ExpandedPost;
