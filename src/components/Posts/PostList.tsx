import PostItem from "./PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Box, Divider, Stack } from "@mui/material";
import InfiniteScrollList from "../Common/InfiniteScrollList";
import { Post, setPosts } from "../../state/slices/postsSlice";
import axios from "axios";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();

  const fetchTimeline = async (pageParam = 1) => {
    try {
      const result = await axios.get("http://localhost:3001/api/posts", {
        params: {
          userId,
          offset: pageParam,
        },
      });
      pageParam > 1
        ? dispatch(setPosts([...posts, ...(result.data as Post[])]))
        : dispatch(setPosts(result.data as Post[]));
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Stack divider={<Divider />}>
      <InfiniteScrollList
        dataLength={posts.length}
        queryFn={fetchTimeline}
        queryKey="timeline"
      >
        {posts
          .filter((o) => o.parentPostId == null)
          .map((o, index) => (
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
