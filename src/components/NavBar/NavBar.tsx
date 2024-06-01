import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box, Button, IconButton, List, SvgIcon, Toolbar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import NavItem from "./NavItem";
import PostButtonModal from "./PostButtonModal";
import { useState } from "react";
import ComposePost from "../Posts/ComposePost";
import { useAppSelector } from "../../state/hooks";
import { useLocation } from "react-router-dom";
import { Link as Routerlink } from "react-router-dom";
import Logo from "../../assets/logo.svg?react";

const styles = {
  icon: {
    color: "black.main",
    opacity: 0.9,
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
  const { selectedConversation } = useAppSelector((state) => state.messages);
  const user = useAppSelector((state) => state.user);

  const navItems = [
    {
      icon: <HomeOutlinedIcon fontSize="large" sx={styles.icon} />,
      altIcon: <HomeIcon fontSize="large" sx={styles.icon} />,
      label: "Home",
      route: "/",
    },
    {
      icon: <MailOutlinedIcon fontSize="large" sx={styles.icon} />,
      altIcon: <MailIcon fontSize="large" sx={styles.icon} />,
      label: "Messages",
      route: selectedConversation.userId
        ? `/messages/${user.userId}/${selectedConversation.userId}`
        : "/messages",
    },
    {
      icon: <AccountCircleOutlinedIcon fontSize="large" sx={styles.icon} />,
      altIcon: <AccountCircleIcon fontSize="large" sx={styles.icon} />,
      label: "Profile",
      route: `/${user.username}`,
    },
  ];
  console.log(location);
  return (
    <>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navList}>
          <IconButton component={Routerlink} sx={styles.iconButton} to="/">
            <SvgIcon
              component={Logo}
              fontSize="large"
              color="primary"
              inheritViewBox
            />
          </IconButton>
          <List sx={styles.navItemList} component="nav">
            {navItems.map((navItem, index) => (
              <NavItem
                key={index}
                icon={navItem.icon}
                altIcon={navItem.altIcon}
                label={navItem.label}
                route={navItem.route}
                active={location.pathname === navItem.route}
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
