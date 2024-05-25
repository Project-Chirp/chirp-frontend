import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import axios from "axios";
import { Post, clearPosts, setPosts } from "../state/slices/postsSlice";

type UseFetchPostsProps = {
  url: string;
  params?: {};
};

const useFetchPosts = ({ url, params }: UseFetchPostsProps) => {
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (pageParam = 1) => {
    setLoading(true);

    try {
      const result = await axios.get(url, {
        params: {
          ...params,
          offset: pageParam,
        },
      });

      const newPosts = result.data as Post[];

      const updatedPosts =
        pageParam > 1
          ? [
              ...new Map(
                [...posts, ...newPosts].map((post) => [post.postId, post])
              ).values(),
            ]
          : newPosts;

      dispatch(setPosts(updatedPosts));

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
