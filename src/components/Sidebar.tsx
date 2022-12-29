import React from "react";
import SidebarRows from "./SidebarRows.tsx";

//importing the icons for the navbar
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";

function Sidebar() {
  return (
    <div>
      <img
        style={{ width: "50px" }}
        src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
        alt=""
      />

      {/* //update the links for the sidebars */}
      <SidebarRows Icon={HomeIcon} title="Home" link="/login" />
      <SidebarRows Icon={MailIcon} title="Inbox" link="" />
      <SidebarRows Icon={AccountCircleIcon} title="User" link="" />

      {/*/update the button to post action*/}
      <Button
        style={{ margin: 10, backgroundColor: "#22AA6F", borderRadius: 10 }}
        size={"large"}
        sx={{ fontFamily: "Inter" }}
        variant="contained"
        type="submit"
      >
        Post
      </Button>
    </div>
  );
}

export default Sidebar;
