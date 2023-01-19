import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import { Box, Divider, List, Typography } from "@mui/material";
import DMSearchBar from "../components/DMSearchBar";
import PageWrapper from "./PageWrapper";
import Conversation from "../components/Conversation";
import Chatbox from "../components/Chatbox";

const testData = [
  {
    displayName: "Buzzkill",
    message: "Hello",
    messageTimestamp: "3h",
    userName: "itsthebuzzkill",
  },
  {
    displayName: "Dennis",
    message: "Hey",
    messageTimestamp: "2h",
    userName: "DennisL",
  },
];

const Messages = () => {
  return (
    <PageWrapper>
      <Box sx={{ paddingRight: 2, paddingLeft: 2 }}>
        <Box
          sx={{
            padding: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Messages</Typography>
          <IconButton>
            <ChatIcon className="ChatIcon" />
          </IconButton>
        </Box>
        <DMSearchBar />
        <List component="div">
          <Divider />
          {testData.map((o) => (
            <Conversation
              displayName={o.displayName}
              message={o.message}
              messageTimestamp={o.messageTimestamp}
              userName={o.userName}
            />
          ))}
        </List>
      </Box>
      <Chatbox />
    </PageWrapper>
  );
};

export default Messages;
