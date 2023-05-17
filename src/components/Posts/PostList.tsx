import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";

type PostListProps = {
  replies: boolean;
};

const PostList = ({ replies }: PostListProps) => {
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const post = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      switch (replies) {
        case true:
          const resultReplies = await axios.get(
            "http://localhost:3001/api/posts/fetchReplies",
            {
              params: {
                userId: user.userId,
                postId: post.postId,
              },
            }
          );
          dispatch(setPosts(resultReplies.data as Post[]));

          break;
        case false:
          const resultPosts = await axios.get(
            "http://localhost:3001/api/posts",
            {
              params: {
                userId: user.userId,
              },
            }
          );
          dispatch(setPosts(resultPosts.data as Post[]));
          break;
        default:
          console.log("PostList could not be rendered.");
          break;
      }
    };
    fetchPosts();
  }, [dispatch, user, post, replies]);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default PostList;
