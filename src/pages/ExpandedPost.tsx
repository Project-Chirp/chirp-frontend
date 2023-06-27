import { Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import ExpandedPostItem from "../components/Posts/ExpandedPostItem";
import ComposeReply from "../components/Posts/ComposeReply";
import ExpandedPostReplies from "../components/Posts/ExpandedPostReplies";
import { useAppSelector } from "../state/hooks";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { padding: 0, width: "50%" },
  divider: { marginBottom: 3 },
};

const ExpandedPost = () => {
  const expandedPost = useAppSelector((state) => state.expandedPost);

  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <ExpandedPostItem post={expandedPost} />
        <Divider sx={styles.divider} variant="middle" />
        <ComposeReply
          placeholder="Post your reply"
          parentPostId={expandedPost.postId}
        />
        <Divider />
        <ExpandedPostReplies post={expandedPost} />
      </Box>
      <Divider orientation="vertical" />
    </Stack>
  );
};

export default ExpandedPost;
