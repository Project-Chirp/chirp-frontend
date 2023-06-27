import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Button, List, Stack, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";
import AccountMenu from "./AccountMenu";
import NavItem from "./NavItem";
import PostButtonModal from "./PostButtonModal";
import { useState } from "react";
import ComposePost from "../Posts/ComposePost";
import { useAppSelector } from "../../state/hooks";

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
  postButton: { margin: 2 },
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

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const { selectedConversation } = useAppSelector((state) => state.messages);
  const user = useAppSelector((state) => state.user);

  const navItems = [
    {
      icon: <HomeIcon />,
      label: "Home",
      route: "/",
    },
    {
      icon: <MailIcon />,
      label: "Messages",
      route: selectedConversation.userId
        ? `/messages/${user.userId}/${selectedConversation.userId}`
        : "/messages",
    },
    {
      icon: <AccountCircleIcon />,
      label: "Profile",
      route: "/profile",
    },
  ];

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
        <ComposePost placeholder="What's happening?" minRows={3} />
      </PostButtonModal>
    </>
  );
};

export default NavBar;
