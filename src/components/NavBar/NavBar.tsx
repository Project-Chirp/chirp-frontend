import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MailIcon from "@mui/icons-material/Mail";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { Box, Button, IconButton, List, SvgIcon, Toolbar } from "@mui/material";
import { useState } from "react";
import { useLocation, Link as Routerlink } from "react-router-dom";
import Logo from "../../assets/logo.svg?react";
import { useAppSelector } from "../../state/hooks";
import ComposePost from "../Posts/ComposePost";
import AccountMenu from "./AccountMenu";
import NavItem from "./NavItem";
import PostButtonModal from "./PostButtonModal";

const styles = {
  icon: {
    color: "black.main",
    opacity: 0.9,
    fontSize: "30px",
  },
  iconButton: {
    alignSelf: "flex-start",
    ":hover": {
      backgroundColor: "primary.light",
    },
    marginLeft: 0.5,
    marginY: 1,
    padding: 1,
    transitionDuration: "0.25s",
  },
  logo: {
    height: 50,
    width: 50,
  },
  navContainer: {
    flex: "0 0 275px",
    height: "100vh",
    position: "sticky",
    top: 0,
  },
  navItemList: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    paddingTop: 0,
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    marginBottom: "auto",
    width: "100%",
  },
  postButton: { fontSize: "1.0625rem", marginY: 2, paddingY: 1 },
  toolbar: {
    height: "100%",
    marginLeft: "auto",
  },
};

const NavBar = () => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const selectedConversationUserId = useAppSelector(
    (state) => state.messages.selectedConversation.userId,
  );
  const user = useAppSelector((state) => state.user);

  const navItems = [
    {
      icon: <HomeOutlinedIcon sx={styles.icon} />,
      selectedIcon: <HomeIcon sx={styles.icon} />,
      label: "Home",
      route: "/",
    },
    {
      icon: <MailOutlinedIcon sx={styles.icon} />,
      selectedIcon: <MailIcon sx={styles.icon} />,
      label: "Messages",
      route: selectedConversationUserId
        ? `/messages/${user.userId}/${selectedConversationUserId}`
        : "/messages",
    },
    {
      icon: <AccountCircleOutlinedIcon sx={styles.icon} />,
      selectedIcon: <AccountCircleIcon sx={styles.icon} />,
      label: "Profile",
      route: `/${user.username}`,
    },
  ];

  return (
    <Box component="header" sx={styles.navContainer}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navList}>
          <IconButton component={Routerlink} sx={styles.iconButton} to="/">
            <SvgIcon
              color="primary"
              component={Logo}
              fontSize="large"
              inheritViewBox
            />
          </IconButton>
          <List component="nav" sx={styles.navItemList}>
            {navItems.map((navItem, index) => (
              <NavItem
                icon={navItem.icon}
                key={index}
                label={navItem.label}
                route={navItem.route}
                selected={
                  location.pathname.split("/")[1] ===
                  navItem.route.split("/")[1]
                }
                selectedIcon={navItem.selectedIcon}
              />
            ))}
          </List>
          <Button
            onClick={() => setOpenModal(true)}
            sx={styles.postButton}
            variant="contained"
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
        <ComposePost
          onClose={() => setOpenModal(false)}
          placeholder="What's happening?"
        />
      </PostButtonModal>
    </Box>
  );
};

export default NavBar;
