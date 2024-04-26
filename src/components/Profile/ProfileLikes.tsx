import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Divider, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

type ProfileLikesProps = {
  userId: number;
};

const ProfileLikes = ({ userId }: ProfileLikesProps) => {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const fetchPosts = async ({ pageParam = 1 }) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/api/profile/getUserLikes",
        {
          params: {
            visitedUserId: userId,
            offset: pageParam,
          },
        }
      );

      if (pageParam > 1) {
        dispatch(setPosts([...posts, ...result.data] as Post[]));
      } else {
        dispatch(setPosts(result.data as Post[]));
      }

      return result.data;
    } catch (error) {
      console.error("error fetching posts:", error);
    }
  };

  const { error, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["query"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    fetchPosts({ pageParam: 1 });
  }, [userId]);

  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <Stack divider={<Divider />}>
      {posts.map((o, index) => (
        <PostItem key={index} post={o} />
      ))}

      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      <Divider />
    </Stack>
  );
};

export default ProfileLikes;
