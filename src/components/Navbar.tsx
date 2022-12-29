import React from "react";

// Importing the icons for the navigation bar
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Importing the tools to make the navigation bar
import { Button, Toolbar } from "@mui/material";
import { Drawer } from "@mui/material";
import { Tab } from "@mui/material";

// Link is used to let us move from one page to another basically.
import { Link as Routerlink } from "react-router-dom";
import UserAvatar from "./UserAvatar.tsx";

// const is used to declare a variable in JS. const can not be redefined but let can be redefined.
const Navbar = () => {
  return (
    <Drawer open>
      <Toolbar>
        <img
          style={{ width: "50px" }}
          src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
          alt=""
        />
        {/* Update the routerlinks to the right page */}
        <Tab
          icon={<HomeIcon />}
          label="Home"
          iconPosition="start"
          component={Routerlink}
          to="/login"
        />
        <Tab
          icon={<MailIcon />}
          label="Messages"
          iconPosition="start"
          component={Routerlink}
          to="/login"
        />
        <Tab
          icon={<AccountCircleIcon />}
          label="Profile"
          iconPosition="start"
          component={Routerlink}
          to="/login"
        />

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
      </Toolbar>
    </Drawer>
  );
};

export default Navbar;
