import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack/Stack";
import React from "react";
import { useAppSelector } from "../../state/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const styles = {
  arrow: {
    color: "white.main",
    // Similar to MUI box shadow
    filter:
      "drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.2)) drop-shadow(0px 8px 10px rgba(0,0,0,0.14)) drop-shadow(0px 3px 14px rgba(0,0,0,0.12))",
    left: "50%",
    position: "absolute",
    top: "100%",
    transform: "translate(-50%, -45%)",
  },
  button: {
    ":hover": {
      backgroundColor: "primary.light",
    },
    marginTop: "auto",
    marginBottom: 1,
    padding: 1.5,
    transitionDuration: "0.25s",
  },
  nameContainer: { paddingLeft: 2, textAlign: "left" },
  popover: {
    ".MuiPopover-paper": {
      padding: 1,
      borderRadius: 3,
      overflow: "visible",
    },
  },
  popoverButton: {
    paddingX: 2,
    paddingY: 1,
  },
  logOutIcon: {
    marginRight: 1.5,
  },
};

const AccountMenu = () => {
  const { logout } = useAuth0();
  const user = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
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
          vertical: -5,
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={styles.popover}
      >
        <ArrowDropDownIcon fontSize="large" sx={styles.arrow} />
        <Button sx={styles.popoverButton} onClick={() => logout()}>
          <LogoutIcon sx={styles.logOutIcon}></LogoutIcon>
          Log Out
        </Button>
      </Popover>
    </>
  );
};

export default AccountMenu;
