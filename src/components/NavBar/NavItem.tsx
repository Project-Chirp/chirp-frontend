import React from "react";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

type NavItemProps = {
  index: number;
  icon: React.ReactElement;
  label: React.ReactElement;
  route: string;
  selectedPage: number;
  setSelectedPage: (state: number) => void;
};

const styles = {
  navbutton: {
    "&:hover": { background: "none" },
  },
  navBox: {
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
    paddingX: 1.5,
    paddingY: 0.5,
    "&:hover": { borderRadius: 10, backgroundColor: "#E8E8E8" },
  },
};

const NavItem = ({
  index,
  icon,
  label,
  route,
  selectedPage,
  setSelectedPage,
}: NavItemProps) => {
  const buttonProps = (value: number) => ({
    selected: selectedPage === value,
    onClick: () => setSelectedPage(value),
  });
  return (
    <ListItemButton
      {...buttonProps(index)}
      sx={styles.navbutton}
      component={Routerlink}
      to={route}
    >
      <Box sx={styles.navBox}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </Box>
    </ListItemButton>
  );
};

export default NavItem;
