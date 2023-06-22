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
  divider: { paddingBottom: 3 },
};

const ExpandedPost = () => {
  const post = useAppSelector((state) => state.post);

  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <ExpandedPostItem post={post} />
        <ComposeReply
          placeholder="Post your reply"
          parentPostId={post.postId}
        />
        <Divider />
        <ExpandedPostReplies post={post} />
      </Box>
      <Divider orientation="vertical" />
    </Stack>
  );
};

export default ExpandedPost;
