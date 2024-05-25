import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar, Box, Button, List, Toolbar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import NavItem from "./NavItem";
import PostButtonModal from "./PostButtonModal";
import { useState } from "react";
import ComposePost from "../Posts/ComposePost";
import { useAppSelector } from "../../state/hooks";
import { useLocation } from "react-router-dom";

const styles = {
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
  postButton: { margin: 2 },
  toolbar: {
    height: "100%",
    marginLeft: "auto",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

const NavBar = () => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const { selectedConversation } = useAppSelector((state) => state.messages);
  const user = useAppSelector((state) => state.user);

  const navItems = [
    {
      icon: <HomeIcon fontSize="large" />,
      altIcon: <HomeOutlinedIcon fontSize="large" />,
      label: "Home",
      route: "/",
    },
    {
      icon: <MailIcon fontSize="large" />,
      altIcon: <MailOutlinedIcon fontSize="large" />,
      label: "Messages",
      route: selectedConversation.userId
        ? `/messages/${user.userId}/${selectedConversation.userId}`
        : "/messages",
    },
    {
      icon: <AccountCircleIcon fontSize="large" />,
      altIcon: <AccountCircleOutlinedIcon fontSize="large" />,
      label: "Profile",
      route: `/${user.username}`,
    },
  ];
  console.log(location);
  return (
    <>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navList}>
          <Avatar
            alt="logo"
            src={`/chirp-logo-transparent.png`}
            sx={styles.logo}
          />
          <List sx={styles.list} component="nav">
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
        <ComposePost placeholder="What's happening?" minRows={3} />
      </PostButtonModal>
    </>
  );
};

export default NavBar;
