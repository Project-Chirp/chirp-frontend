import { useEffect } from "react";
import PostItem from "../Posts/PostItem";
import { useAppSelector } from "../../state/hooks";
import { Box, Divider, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import PageLoader from "../../pages/PageLoader";
import { queryClient } from "../../utilities/queryClient";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchPosts from "../../utilities/useFetchPosts";
import InfiniteScrollList from "../Common/InfiniteScrollList";

type ProfileLikesProps = {
  userId: number;
};

const ProfileLikes = ({ userId }: ProfileLikesProps) => {
  const posts = useAppSelector((state) => state.posts.posts);

  return (
    <Stack divider={<Divider />}>
      <InfiniteScrollList
        dataLength={posts.length}
        url="http://localhost:3001/api/profile/getUserLikes"
        fetchParams={{ userId }}
      >
        {posts.map((o) => (
          <Box key={o.postId}>
            <PostItem post={o} />
            <Divider />
          </Box>
        ))}
      </InfiniteScrollList>
    </Stack>
  );
};

export default ProfileLikes;
