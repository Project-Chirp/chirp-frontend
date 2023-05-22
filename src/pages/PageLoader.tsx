import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";

const PageLoader = () => {
  return (
    <Box sx={{ margin: "auto" }}>
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
