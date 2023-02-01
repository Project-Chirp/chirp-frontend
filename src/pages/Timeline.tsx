import { Box } from "@mui/material";
import Post from "../components/Post";
import PageWrapper from "./PageWrapper";

const testData = [
  {
    displayName: "Buzzkill",
    textContent: "Hey y'all! This is a post on our new app!",
    timestamp: "January 8, 2023",
    username: "itsthebuzzkill",
  },
  {
    displayName: "Dennis",
    textContent: "Another post!",
    timestamp: "January 22, 2023",
    username: "DennisL",
  },
];

const Timeline = () => {
  return (
    <PageWrapper>
      <Box sx={{ padding: 3 }}>
        {testData.map((o) => (
          <Post
            displayName={o.displayName}
            textContent={o.textContent}
            timestamp={o.timestamp}
            username={o.username}
          />
        ))}
      </Box>
    </PageWrapper>
  );
};

export default Timeline;
