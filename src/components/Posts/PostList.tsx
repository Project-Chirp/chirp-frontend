import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import formatTimestamp from "../NavBar/formatTimestamp";

const PostList = () => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resultPosts = await axios.get("http://localhost:3001/api/posts", {
          params: {
            userId: user.userId,
          },
        });
        const modified = resultPosts.data.map((entry: Post) => ({
          ...entry,
          timestamp: formatTimestamp(entry.timestamp),
        }));
        dispatch(setPosts(modified as Post[]));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPosts();
  }, [dispatch, user]);

  return (
    <>
      {posts
        .filter((o) => o.parentPostId == null)
        .map((o) => (
          <PostItem key={o.postId} post={o} />
        ))}
    </>
  );
};

export default PostList;
