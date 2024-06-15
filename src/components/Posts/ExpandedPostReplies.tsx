import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Post, setPosts } from "../../state/slices/postsSlice";
import { Box, Divider, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "../../utilities/queryClient";
import PageLoader from "../../pages/PageLoader";
import InfiniteScroll from "react-infinite-scroll-component";

type ExpandedPostRepliesProps = {
  postId: number;
};

const ExpandedPostReplies = ({ postId }: ExpandedPostRepliesProps) => {
  const posts = useAppSelector((state) => state.posts.posts);
  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queryClient.clear();
    fetchReplies({ pageParam: 1 });
  }, [postId]);

  const fetchReplies = async ({ pageParam = 1 }) => {
    setLoading(true);
    try {
      const resultReplies = await axios.get(
        "http://localhost:3001/api/posts/fetchReplies",
        {
          params: {
            userId: userId,
            postId: postId,
            offset: pageParam,
          },
        }
      );

      if (pageParam > 1) {
        dispatch(setPosts([...posts, ...resultReplies.data] as Post[]));
      } else {
        dispatch(setPosts(resultReplies.data as Post[]));
      }

      return resultReplies.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["expandedposts"],
    queryFn: fetchReplies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <Box>{error.message}</Box>; // TODO: Create an Error Component

  return (
    <Stack divider={<Divider />}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<PageLoader />}
      >
        {posts
          .filter((o) => o.parentPostId === postId)
          .map((o, index) => (
            <Box key={index}>
              <PostItem post={o} />
              <Divider />
            </Box>
          ))}
      </InfiniteScroll>
    </Stack>
  );
};

export default ExpandedPostReplies;
