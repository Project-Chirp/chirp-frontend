import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

type NavItemProps = {
  icon: React.ReactElement;
  altIcon: React.ReactElement;
  label: string;
  route: string;
  active: boolean;
};

const NavItem = ({ icon, altIcon, label, route, active }: NavItemProps) => {
  return (
    <ListItemButton component={Routerlink} to={route} selected={active}>
      <ListItemIcon>{active ? altIcon : icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default NavItem;
