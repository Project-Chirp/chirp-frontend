import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import { useAppSelector } from "../../state/hooks";
import { Box, Divider, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "../../utilities/queryClient";
import PageLoader from "../../pages/PageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchPosts from "../../utilities/useFetchPosts";

type ProfileRepliesProps = {
  userId: number;
};

const ProfileReplies = ({ userId }: ProfileRepliesProps) => {
  const posts = useAppSelector((state) => state.posts.posts);
  const { fetchPosts } = useFetchPosts(
    "http://localhost:3001/api/profile/getUserReplies",
    userId
  );

  useEffect(() => {
    queryClient.clear();
    fetchPosts(1);
  }, [userId]);

  const { error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["replies"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  if (status === "pending") return <PageLoader />;
  if (status === "error") return <Box>{error.message}</Box>; // TODO: Create an Error Component

  return (
    <Stack>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<PageLoader />}
      >
        {posts.map((o, index) => (
          <Box key={index}>
            <PostItem post={o} />
            <Divider />
          </Box>
        ))}
      </InfiniteScroll>
    </Stack>
  );
};

export default ProfileReplies;
