import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider, Stack } from "@mui/material";

const PostList = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultPosts = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts`,
          {
            params: {
              userId: user.userId,
            },
          }
        );
        dispatch(setPosts(resultPosts.data as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user]);

  return (
    <Stack divider={<Divider />}>
      {posts
        .filter((o) => o.parentPostId == null)
        .map((o) => (
          <PostItem key={o.postId} post={o} />
        ))}
    </Stack>
  );
};

export default PostList;
