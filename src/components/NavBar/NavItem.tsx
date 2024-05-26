import { ReactElement } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  Typography,
} from "@mui/material";
import { Link as Routerlink } from "react-router-dom";

type NavItemProps = {
  icon: ReactElement<SvgIconProps>;
  altIcon: ReactElement<SvgIconProps>;
  label: string;
  route: string;
  active: boolean;
};

const styles = {
  navItem: {
    "&.Mui-selected": {
      ":hover": {
        backgroundColor: "primary.light",
      },
      backgroundColor: "transparent",
    },
    ":hover": {
      backgroundColor: "primary.light",
    },
    borderRadius: 10,
    paddingX: 1.5,
    transitionDuration: "0.25s",
    width: "fit-content",
  },
  listItemText: { marginRight: 1 },
  unselectedText: { fontWeight: 500 },
};

const NavItem = ({ icon, altIcon, label, route, active }: NavItemProps) => {
  return (
    <ListItemButton
      component={Routerlink}
      selected={active}
      sx={styles.navItem}
      to={route}
    >
      <ListItemIcon>{active ? altIcon : icon}</ListItemIcon>
      <ListItemText disableTypography sx={styles.listItemText}>
        <Typography variant="h3" sx={{ ...(!active && styles.unselectedText) }}>
          {label}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default NavItem;
