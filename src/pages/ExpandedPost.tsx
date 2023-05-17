import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ExpandedPostItem from "../components/Posts/ExpandedPostItem";

const styles = {
  root: {
    width: "100%",
  },
  postListContainer: { padding: 2, width: "50%" },
};

const ExpandedPost = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <Box sx={styles.postListContainer}>
        {/* <ComposePost /> */}
        <Typography>TESTING</Typography>
        <ExpandedPostItem />
      </Box>
    </Stack>
  );
};

export default ExpandedPost;
