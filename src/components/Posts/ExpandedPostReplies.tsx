import PostItem from "./PostItem";
import { useAppSelector } from "../../state/hooks";
import { Box, Divider, Stack } from "@mui/material";
import InfiniteScrollList from "../Common/InfiniteScrollList";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { PayloadAction } from "@reduxjs/toolkit";

type ExpandedPostRepliesProps = {
  postId: number;
};

const ExpandedPostReplies = ({ postId }: ExpandedPostRepliesProps) => {
  const posts = useAppSelector((state) => state.posts.posts);
  const userId = useAppSelector((state) => state.user.userId);

  return (
    <Stack divider={<Divider />}>
      <InfiniteScrollList
        dataLength={posts.length}
        url="http://localhost:3001/api/posts/fetchReplies"
        fetchParams={{ userId, postId }}
        queryKey="expandedposts"
        setData={(newPosts: Post[]): PayloadAction<Post[]> => {
          return setPosts(newPosts);
        }}
        selectData={(state) => state.posts.posts}
      >
        {posts
          .filter((o) => o.parentPostId === postId)
          .map((o) => (
            <Box key={o.postId}>
              <PostItem post={o} />
              <Divider />
            </Box>
          ))}
      </InfiniteScrollList>
    </Stack>
  );
};

export default ExpandedPostReplies;
