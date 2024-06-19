import PostItem from "../Posts/PostItem";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Box, Divider, Stack } from "@mui/material";
import InfiniteScrollList from "../Common/InfiniteScrollList";
import { Post, setPosts } from "../../state/slices/postsSlice";
import axios from "axios";

type ProfileRepliesProps = {
  userId: number;
};

const ProfileReplies = ({ userId }: ProfileRepliesProps) => {
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  const fetchProfileReplies = async (pageParam = 1) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getUserPosts",
        {
          params: {
            userId,
            offset: pageParam,
          },
        }
      );
      pageParam > 1
        ? dispatch(setPosts([...posts, ...(result.data as Post[])]))
        : dispatch(setPosts(result.data as Post[]));
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Stack>
      <InfiniteScrollList
        dataLength={posts.length}
        queryFn={fetchProfileReplies}
        queryKey="profileReplies"
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
