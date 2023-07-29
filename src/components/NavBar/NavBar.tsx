import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Button, List, Toolbar, Typography } from "@mui/material";
import AccountMenu from "./AccountMenu";
import NavItem from "./NavItem";
import PostButtonModal from "./PostButtonModal";
import { useEffect, useState } from "react";
import ComposePost from "../Posts/ComposePost";
import { useAppSelector } from "../../state/hooks";

const styles = {
  logo: { alignSelf: "left", paddingTop: 2, paddingLeft: 2 },
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
  icon: {
    width: "1.25em",
    height: "1.25em",
  },
  text: {
    fontSize: "1.1rem",
  },
};

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const { selectedConversation } = useAppSelector((state) => state.messages);
  const user = useAppSelector((state) => state.user);

  const navItems = [
    {
      icon: <HomeIcon sx={styles.icon} />,
      label: <Typography sx={styles.text}>Home</Typography>,
      route: "/",
    },
    {
      icon: <MailIcon sx={styles.icon} />,
      label: <Typography sx={styles.text}>Messages</Typography>,
      route: selectedConversation.userId
        ? `/messages/${user.userId}/${selectedConversation.userId}`
        : "/messages",
    },
    {
      icon: <AccountCircleIcon sx={styles.icon} />,
      label: <Typography sx={styles.text}>Profile</Typography>,
      route: "/profile",
    },
  ];

  useEffect(() => {
    console.log(selectedPage);
  }, [selectedPage]);

  return (
    <>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navList}>
          <Avatar
            alt="logo"
            src={process.env.PUBLIC_URL + "/chirp_logo.png"}
            sx={styles.logo}
          />
          <List component="nav">
            {navItems.map((navItem, index) => (
              <NavItem
                key={index}
                index={index}
                icon={navItem.icon}
                label={navItem.label}
                route={navItem.route}
                selectedPage={selectedPage}
                setSelectedPage={() => setSelectedPage(index)}
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
