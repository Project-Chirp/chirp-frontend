import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Link } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack/Stack";
import React from "react";
import { useAppSelector } from "../../state/hooks";

const styles = {
  button: {
    marginTop: "auto",
    marginBottom: 2,
  },
  nameContainer: { paddingLeft: 2, textAlign: "left" },
};

const AccountMenu = () => {
  const { logout } = useAuth0();
  const user = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button onClick={handleClick} sx={styles.button}>
        <Avatar />
        <Stack sx={styles.nameContainer}>
          <Typography color="primary" variant="subtitle1">
            {user.displayName}
          </Typography>
          <Typography
            color="primary"
            variant="subtitle2"
          >{`@${user.username}`}</Typography>
        </Stack>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Button component={Link} onClick={() => logout()}>
          Log Out
        </Button>
      </Popover>
    </>
  );
};

export default AccountMenu;
