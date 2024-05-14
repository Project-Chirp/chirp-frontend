import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import axios from "axios";
import { Post, setPosts } from "../state/slices/postsSlice";

const useFetchPosts = (url: string, userId?: number) => {
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (pageParam = 1) => {
    setLoading(true);

    try {
      const result = await axios.get(url, {
        params: {
          userId: userId,
          offset: pageParam,
        },
      });

      if (pageParam > 1) {
        dispatch(setPosts([...posts, ...result.data] as Post[]));
      } else {
        dispatch(setPosts(result.data as Post[]));
      }

      return result.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchPosts, loading };
};

export default useFetchPosts;
