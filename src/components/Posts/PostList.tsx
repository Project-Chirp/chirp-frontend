import PostItem from "./PostItem";
import { useAppSelector } from "../../state/hooks";
import { Box, Divider, Stack } from "@mui/material";
import InfiniteScrollList from "../Common/InfiniteScrollList";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { PayloadAction } from "@reduxjs/toolkit";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const userId = useAppSelector((state) => state.user.userId);

  return (
    <Stack divider={<Divider />}>
      <InfiniteScrollList
        dataLength={posts.length}
        url="http://localhost:3001/api/posts"
        fetchParams={{ userId }}
        queryKey="timeline"
        setData={(newPosts: Post[]): PayloadAction<Post[]> => {
          return setPosts(newPosts);
        }}
        selectData={(state) => state.posts.posts}
      >
        {posts.map((o, index) => (
          <Box key={index}>
            <PostItem post={o} />
            <Divider />
          </Box>
        ))}
      </InfiniteScrollList>
    </Stack>
  );
};

export default PostList;
