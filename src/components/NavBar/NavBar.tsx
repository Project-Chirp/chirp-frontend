import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Button, List, Toolbar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import NavItem from "./NavItem";
import PostButtonModal from "./PostButtonModal";
import { useState } from "react";
import ComposePost from "../Posts/ComposePost";
import { useAppSelector } from "../../state/hooks";

const styles = {
  icon: {
    color: "black.main",
    opacity: 0.8,
  },
  logo: {
    alignSelf: "left",
    height: 50,
    paddingLeft: 2,
    paddingTop: 2,
    width: 50,
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    marginBottom: "auto",
    width: "100%",
  },
  postButton: { fontSize: 18, margin: 2 },
  toolbar: {
    height: "100%",
    marginLeft: "auto",
  },
};

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const { selectedConversation } = useAppSelector((state) => state.messages);
  const user = useAppSelector((state) => state.user);

  const navItems = [
    {
      icon: <HomeIcon sx={styles.icon} />,
      label: "Home",
      route: "/",
    },
    {
      icon: <MailIcon sx={styles.icon} />,
      label: "Messages",
      route: selectedConversation.userId
        ? `/messages/${user.userId}/${selectedConversation.userId}`
        : "/messages",
    },
    {
      icon: <AccountCircleIcon sx={styles.icon} />,
      label: "Profile",
      route: `/${user.username}`,
    },
  ];

  return (
    <>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navList}>
          <Avatar
            alt="logo"
            src={`/chirp-logo-transparent.png`}
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
          <Button
            sx={styles.postButton}
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Post
          </Button>
          <AccountMenu />
        </Box>
      </Toolbar>
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
