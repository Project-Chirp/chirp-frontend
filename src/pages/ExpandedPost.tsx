import { Box, Divider } from "@mui/material";
import ComposeReply from "../components/Posts/ComposeReply";
import ExpandedPostItem from "../components/Posts/ExpandedPostItem";
import ExpandedPostReplies from "../components/Posts/ExpandedPostReplies";
import SideBar from "../components/SideBar/SideBar";
import { useAppSelector } from "../state/hooks";
import { selectExpandedPost } from "../state/slices/postsSlice";
import Layout from "./Layout";

const styles = {
  divider: { marginBottom: 3 },
};

const ExpandedPost = () => {
  const expandedPost = useAppSelector(selectExpandedPost);

  return (
    <Layout
      middleContent={
        <Box>
          <ExpandedPostItem post={expandedPost} />
          <Divider sx={styles.divider} variant="middle" />
          <ComposeReply
            parentPostId={expandedPost.postId}
            placeholder="Post your reply"
          />
          <Divider />
          <ExpandedPostReplies postId={expandedPost.postId} />
        </Box>
      }
      rightContent={<SideBar isExpandedPost />}
    />
  );
};

export default ExpandedPost;
