import React from "react";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

type NavItemProps = {
  icon: React.ReactElement;
  altIcon: React.ReactElement;
  label: string;
  route: string;
  active: boolean;
};

const styles = {
  navItem: {
    borderRadius: "30px",
    width: "fit-content",
    paddingLeft: "12px",
    paddingRight: "12px",
    transitionDuration: "0.2s",
    "&.Mui-selected": { backgroundColor: "transparent" },
    ":hover": {
      backgroundColor: "primary.light",
    },
  },
  box: {
    display: "flex",
  },
};

const NavItem = ({ icon, altIcon, label, route, active }: NavItemProps) => {
  return (
    <ListItemButton
      sx={styles.navItem}
      component={Routerlink}
      to={route}
      selected={active}
    >
      <Box sx={styles.box}>
        <ListItemIcon>{active ? altIcon : icon}</ListItemIcon>
        <ListItemText primary={label} />
      </Box>
    </ListItemButton>
  );
};

export default NavItem;
