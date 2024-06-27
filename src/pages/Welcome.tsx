import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, SvgIcon, Typography } from "@mui/material";
import Logo from "../assets/logo.svg?react";

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100%",
    justifyContent: "center",
  },
  logo: { fontSize: 250 },
};

const Welcome = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box sx={styles.container}>
      <Typography variant="h1">Welcome to Chirp</Typography>
      <SvgIcon
        component={Logo}
        sx={styles.logo}
        color="primary"
        inheritViewBox
      />
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
