import { Box, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useNavigate } from "react-router-dom";

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
  },
  greenRectangle: {
    backgroundColor: "primary.main",
    width: "100vw",
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
};

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.layout}>
      <IconButton onClick={() => navigate("/")} sx={styles.backButton}>
        <KeyboardBackspaceIcon color="secondary" />
      </IconButton>
      <Box sx={styles.greenRectangle}>
        <Typography color="primary.contrastText" variant="h2" sx={styles.text}>
          Coming Soon
        </Typography>
      </Box>
    </Box>
  );
};

export default ComingSoon;
