// Importing the icons for the navigation bar
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Importing the tools to make the navigation bar
import { Button, List, Stack, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";

// Link is used to let us move from one page to another basically.
import UserAvatar from "./UserAvatar";
import NavItem from "./NavItem";

const navItems = [
  {
    icon: <HomeIcon />,
    label: "Home",
    route: "/login",
  },
  {
    icon: <MailIcon />,
    label: "Messages",
    route: "/login",
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
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 150,
      }}
    >
      <Toolbar>
        <Stack>
          <img
            style={{ width: "50px" }}
            src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
            alt=""
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
