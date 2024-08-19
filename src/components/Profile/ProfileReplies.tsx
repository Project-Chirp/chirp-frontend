import PostItem from "../Posts/PostItem";
import { useAppSelector } from "../../state/hooks";
import { Box, Divider, Stack } from "@mui/material";
import InfiniteScrollList from "../Common/InfiniteScrollList";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { PayloadAction } from "@reduxjs/toolkit";

type ProfileRepliesProps = {
  userId: number;
};

const ProfileReplies = ({ userId }: ProfileRepliesProps) => {
  const posts = useAppSelector((state) => state.posts.posts);

  return (
    <Stack>
      <InfiniteScrollList
        dataLength={posts.length}
        url="http://localhost:3001/api/profile/getUserReplies"
        fetchParams={{ userId }}
        queryKey="replies"
        setData={(newPosts: Post[]): PayloadAction<Post[]> => {
          return setPosts(newPosts);
        }}
        selectData={(state) => state.posts.posts}
      >
        {posts.map((o) => (
          <Box key={o.postId}>
            <PostItem post={o} />
            <Divider />
          </Box>
        ))}
      </InfiniteScrollList>
    </Stack>
  );
};

export default ProfileReplies;
