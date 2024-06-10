import React from "react";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

type NavItemProps = {
  icon: React.ReactElement;
  selectedIcon: React.ReactElement;
  label: string;
  route: string;
  selected: boolean;
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
    alignItems: "center",
  },
};

const NavItem = ({
  icon,
  selectedIcon,
  label,
  route,
  selected,
}: NavItemProps) => {
  return (
    <ListItemButton
      sx={styles.navItem}
      component={Routerlink}
      to={route}
      selected={selected}
    >
      <Box sx={styles.box}>
        <ListItemIcon>{selected ? selectedIcon : icon}</ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={
            selected ? { variant: "h3" } : { variant: "h3", fontWeight: 500 }
          }
        />
      </Box>
    </ListItemButton>
  );
};

export default NavItem;
