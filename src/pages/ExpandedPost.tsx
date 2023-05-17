import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import ExpandedPostItem from "../components/Posts/ExpandedPostItem";
import ComposePost from "../components/Posts/ComposePost";
import ExpandedPostReplies from "../components/Posts/ExpandedPostReplies";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { padding: 2, width: "50%" },
};

const ExpandedPost = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <ExpandedPostItem />
        <ComposePost placeholder="Post your reply" />
        <ExpandedPostReplies />
      </Box>
    </Stack>
  );
};

export default ExpandedPost;
