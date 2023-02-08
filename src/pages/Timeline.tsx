import { Box } from "@mui/material";
import PostList from "../components/Posts/PostList";

const styles = {
  postBox: { padding: 3 },
};

const Timeline = () => {
  return (
    <Box sx={styles.postBox}>
      <PostList />
    </Box>
  );
};

export default Timeline;
