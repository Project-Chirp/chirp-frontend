import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import formatTimestamp from "../NavBar/formatTimestamp";

const ExpandedPostList = () => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const expandedPost = useAppSelector((state) => state.expandedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultReplies = await axios.get(
          "http://localhost:3001/api/posts/fetchReplies",
          {
            params: {
              userId: user.userId,
              postId: expandedPost.postId,
            },
          }
        );
        const modified = resultReplies.data.map((entry: any) => ({
          ...entry,
          timestamp: formatTimestamp(entry),
        }));
        dispatch(setPosts(modified as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user, expandedPost, posts]);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default ExpandedPostList;