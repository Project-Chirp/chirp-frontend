import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { Link as Routerlink } from "react-router-dom";

type NavItemProps = {
  icon: ReactElement<SvgIconProps>;
  selectedIcon: ReactElement<SvgIconProps>;
  label: string;
  route: string;
  selected: boolean;
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
  },
  listItemText: { marginRight: 1 },
  unselectedText: { fontWeight: 500 },
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
      component={Routerlink}
      selected={selected}
      sx={styles.navItem}
      to={route}
    >
      <ListItemIcon>{selected ? selectedIcon : icon}</ListItemIcon>
      <ListItemText disableTypography sx={styles.listItemText}>
        <Typography
          sx={{ ...(!selected && styles.unselectedText) }}
          variant="h3"
        >
          {label}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default NavItem;
