import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
  },
};

const PageLoader = () => {
  return (
    <Box sx={styles.container}>
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
