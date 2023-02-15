import { Box } from "@mui/material";
import Post from "../components/Post";
import PageWrapper from "./PageWrapper";

const Timeline = () => {
  return (
    <PageWrapper>
      <Box sx={{ padding: 3 }}>
        <Post />
      </Box>
    </PageWrapper>
  );
};

export default Timeline;
