import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography } from "@mui/material";

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
};

const Welcome = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box sx={styles.container}>
      <Typography variant="h1">Welcome to Chirp</Typography>
      <img style={styles.logo} src="/chirp-logo-transparent.png" alt="Logo" />
      <Button
        size="large"
        variant="contained"
        onClick={() => loginWithRedirect()}
      >
        Take me to Chirp
      </Button>
    </Box>
  );
};

export default Welcome;
