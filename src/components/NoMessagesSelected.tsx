import { Button, Typography } from "@mui/material";
import React from "react";
import "./NoMessagesSelected.css";

const NoMessagesSelected = () => {
  return (
    <div>
      <h1 className="title">Select a Message!</h1>
      <Typography className="messagethread">
        Select an already existing mesage thread or start an entirely new one!
      </Typography>

      <Button
        style={{ margin: 10, backgroundColor: "#22AA6F", borderRadius: 10 }}
        size={"large"}
        sx={{ fontFamily: "Inter" }}
        variant="contained"
        /* Might have to change this */
        type="submit"
      >
        New Message
      </Button>
    </div>
  );
};

export default NoMessagesSelected;
