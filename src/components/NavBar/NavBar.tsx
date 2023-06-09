import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Button, List, Stack, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";
import AccountMenu from "./AccountMenu";
import NavItem from "./NavItem";
import { useState } from "react";
import ComposePost from "../Posts/ComposePost";
import PostButtonModal from "../Misc/PostButtonModal";

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
  postButton: { borderRadius: 10, margin: 2 },
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
    route: "/",
  },
  {
    icon: <MailIcon />,
    label: "Messages",
    route: "/messages",
  },
  {
    icon: <AccountCircleIcon />,
    label: "Profile",
    route: "/profile",
  },
];

// To declare a variable in JS, we use const or let. Variables declared with const can't be redefined but let can.
const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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
            <Button
              sx={styles.postButton}
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              Post
            </Button>
            <AccountMenu />
          </Stack>
        </Toolbar>
      </Drawer>
      <PostButtonModal
        onClose={() => setOpenModal(false)}
        openModal={openModal}
      >
        <ComposePost placeholder="What's happening?" />
      </PostButtonModal>
    </>
  );
};

export default NavBar;
