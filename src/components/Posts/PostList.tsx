import { useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../../state/slices/postSlice";
// import { usePostContext } from "../../context/PostContext";

export type Post = {
  displayName: string;
  imagePath?: string;
  isLikedByCurrentUser: boolean;
  numberOfLikes: number;
  postId: number;
  textContent: string;
  timestamp: string;
  username: string;
};

const Timeline = () => {
  // const { posts, setPosts } = usePostContext();
  const posts = useSelector((state: RootState) => state.post.value);
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3001/api/posts", {
        params: {
          userId: user.userId,
        },
      });
      dispatch(addPosts(result.data as Post[]));
    };
    fetchPosts();
  }, [dispatch, user]);

  return (
    <>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}
    </>
  );
};

export default Timeline;
