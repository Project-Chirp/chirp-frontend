import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from "@mui/material";

import "../Styles/Messages.css";
import DMSearchBar from "../components/DMSearchBar";
import PageWrapper from "./PageWrapper";
import DMViewProfile from "../components/Conversation";

const Messages = () => {
  return (
    <>
      <PageWrapper>
        <div>
          <div className="Messagesflexbox">
            <h1 className="Messagesheader">Messages</h1>

            <IconButton>
              <ChatIcon className="ChatIcon" />
            </IconButton>
          </div>

          <DMSearchBar />
          <DMViewProfile />
        </div>

        <div>
          <h1 className="title">Select a Message!</h1>
          <Typography className="messagethread">
            Select an already existing mesage thread or start an entirely new
            one!
          </Typography>

          <div className="MessagesButton">
            <Button
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                backgroundColor: "#22AA6F",
                borderRadius: 10,
              }}
              size={"large"}
              sx={{ fontFamily: "Inter" }}
              variant="contained"
              /* Might have to change this */
              type="submit"
            >
              New Message
            </Button>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Messages;
