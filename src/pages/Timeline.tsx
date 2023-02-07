import { Box } from "@mui/material";
import PostList from "../components/Posts/PostList";
import PageWrapper from "./PageWrapper";

const Timeline = () => {
  return (
    <PageWrapper>
      <Box sx={{ padding: 3 }}>
        <PostList />
      </Box>
    </PageWrapper>
  );
};

export default Timeline;
