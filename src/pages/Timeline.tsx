import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Post from "../components/Post";
import PageWrapper from "./PageWrapper";
import axios from "axios";

const Timeline = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await axios.get("http://localhost:3001/api/posts");
      setPosts(result.data);
    };
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <PageWrapper>
      <Box sx={{ padding: 3 }}>
        {posts.map((o) => (
          <Post
            displayName={o.display_name}
            imagePath={o.imagePath}
            textContent={o.text_content}
            timestamp={o.post_timestamp}
            username={o.email}
          />
        ))}
      </Box>
    </PageWrapper>
  );
};

export default Timeline;
