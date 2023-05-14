import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { PostReplies } from "../components/Posts/PostReplies";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { padding: 2, width: "50%" },
};

const Profile = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        <PostReplies />
      </Box>
    </Stack>
  );
};

export default Profile;
