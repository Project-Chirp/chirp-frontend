import { Box } from "@mui/material";

const styles = {
  ad: { height: "100%", width: "100%" },
  container: {
    backgroundColor: "gray.light",
    border: "5px solid",
    borderColor: "primary.main",
    borderRadius: 5,
    boxSizing: "border-box",
    cursor: "pointer",
    overflow: "hidden",
  },
};

const Advertisement = () => {
  return (
    <Box sx={styles.container}>
      <Box
        alt="Advertisement"
        component="img"
        src={"/Ad Gray.gif"}
        sx={styles.ad}
      />
    </Box>
  );
};

export default Advertisement;
