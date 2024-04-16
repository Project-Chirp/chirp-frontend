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
  title: {
    fontWeight: 700,
    fontSize: 32,
  },
};

const Welcome = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title} variant="h1">
        Welcome to Tweeter
      </Typography>
      <img style={styles.logo} src={"/logojade.png"} alt="Logo" />
      <Button
        size="large"
        variant="contained"
        onClick={() => loginWithRedirect()}
      >
        Take me to Tweeter
      </Button>
    </Box>
  );
};

export default Welcome;
