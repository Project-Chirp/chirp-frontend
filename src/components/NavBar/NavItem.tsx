import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

type NavItemProps = {
  icon: React.ReactElement;
  label: string;
  route: string;
};

const NavItem = ({ icon, label, route }: NavItemProps) => {
  return (
    <ListItemButton component={Routerlink} to={route}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default NavItem;
