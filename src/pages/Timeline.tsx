import { Box } from "@mui/material";
import PostList from "../components/Posts/PostList";
import PageWrapper from "./PageWrapper";

const styles = {
  postBox: { padding: 3 },
};

const Timeline = () => {
  return (
    <PageWrapper>
      <Box sx={styles.postBox}>
        <PostList />
      </Box>
    </PageWrapper>
  );
};

export default Timeline;
