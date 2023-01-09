import { Box } from "@mui/material";
import Post from "../components/Post";
import PageWrapper from "./PageWrapper";

const Timeline = () => {
  return (
    <PageWrapper>
      <Box>
        <Post />
      </Box>
    </PageWrapper>
  );
};

export default Timeline;
