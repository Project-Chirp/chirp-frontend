import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Link } from "@mui/material";
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
    fill: "white",
    filter: "drop-shadow(3px 4px 3px)",
    left: "50%",
    position: "absolute",
    top: "100%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    "&.Mui-selected": {
      ":hover": {
        backgroundColor: "primary.light",
      },
      backgroundColor: "transparent",
    },
    ":hover": {
      backgroundColor: "primary.light",
    },
    marginTop: "auto",
    marginBottom: 1,
    padding: 1.5,
  },
  nameContainer: { paddingLeft: 2, textAlign: "left" },
  popover: {
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "10px",
    overflow: "visible",
  },
  popoverButton: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "20px",
    paddingLeft: "20px",
    textTransform: "none",
  },
  popoverIcon: {
    marginRight: "10px",
  },
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
          vertical: -10,
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          ".MuiPopover-paper": styles.popover,
        }}
      >
        <ArrowDropDownIcon fontSize="large" sx={styles.arrow} />
        <Button
          sx={styles.popoverButton}
          component={Link}
          onClick={() => logout()}
        >
          <LogoutIcon sx={styles.popoverIcon}></LogoutIcon>
          Log Out
        </Button>
      </Popover>
    </>
  );
};

export default AccountMenu;
