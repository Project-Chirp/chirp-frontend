import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import "./Messages.css";

const Messages = () => {
  return (
    <div>
      <div className="flexbox">
        <h1 className="header">Messages</h1>
        <ChatIcon className="ChatIcon" />
      </div>

      <div className="searchflexbox">
        <SearchIcon />
        <input
          className="searchDM"
          type="text"
          placeholder="Search Direct Message"
        />
      </div>
    </div>
  );
};

export default Messages;
