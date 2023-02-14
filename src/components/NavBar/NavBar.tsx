import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Button, List, Stack, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";
import UserAvatar from "./UserAvatar";
import NavItem from "./NavItem";

const drawerWidth = "30%";
const styles = {
  logo: { alignSelf: "left", paddingTop: 2, paddingLeft: 2 },
  navDrawer: {
    height: "100%",
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
  postButton: { backgroundColor: "#22AA6F", borderRadius: 10, margin: 2 },
  stack: {
    marginBottom: "auto",
    width: "100%",
    height: "100%",
  },
  toolbar: {
    height: "100%",
    width: "40%",
    marginLeft: "auto",
  },
};

const navItems = [
  {
    icon: <HomeIcon />,
    label: "Home",
    route: "/home",
  },
  {
    icon: <MailIcon />,
    label: "Messages",
    route: "/",
  },
  {
    icon: <AccountCircleIcon />,
    label: "Profile",
    route: "/",
  },
];

// To declare a variable in JS, we use const or let. Variables declared with const can't be redefined but let can.
const NavBar = () => {
  return (
    <Drawer variant="permanent" anchor="left" sx={styles.navDrawer}>
      <Toolbar sx={styles.toolbar}>
        <Stack sx={styles.stack}>
          <Avatar
            alt="logo"
            src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
            sx={styles.logo}
          />
          <List component="nav">
            {navItems.map((navItem, index) => (
              <NavItem
                key={index}
                icon={navItem.icon}
                label={navItem.label}
                route={navItem.route}
              />
            ))}
          </List>
          {/*/ Update the button to post action*/}
          <Button sx={styles.postButton} variant="contained" type="submit">
            Post
          </Button>
          <UserAvatar />
        </Stack>
      </Toolbar>
    </Drawer>
  );
};

export default NavBar;