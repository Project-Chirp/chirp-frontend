// Importing the icons for the navigation bar
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Importing the tools to make the navigation bar
import { Avatar, Button, List, Stack, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";

// Link is used to let us move from one page to another basically.
import UserAvatar from "./UserAvatar";
import NavItem from "./NavItem";

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
  const drawerWidth = 250;
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        height: "100%",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Stack sx={{ margin: "auto" }}>
          <Avatar
            sx={{ alignSelf: "center", padding: 2 }}
            alt="logo"
            src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
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
          <Button
            style={{ margin: 10, backgroundColor: "#22AA6F", borderRadius: 10 }}
            size={"large"}
            sx={{ fontFamily: "Inter" }}
            variant="contained"
            type="submit"
          >
            Post
          </Button>
          <UserAvatar />
        </Stack>
      </Toolbar>
    </Drawer>
  );
};

export default NavBar;
