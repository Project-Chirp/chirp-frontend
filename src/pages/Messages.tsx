import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ConversationList from "../components/Messages/ConversationList";

const styles = {
  button: {
    borderRadius: 10,
    marginTop: 1,
  },
  root: {
    width: "100%",
  },
  selectMessageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
};

const Messages = () => {
  return (
    <Stack direction="row" sx={styles.root}>
      <ConversationList />
      <Divider flexItem orientation="vertical" />
      <Box sx={styles.selectMessageContainer}>
        <Box>
          <Typography variant="h6">Select a Message</Typography>
          <Typography>
            Choose one of your existing conversations or start a new one!
          </Typography>
          <Button variant="contained" sx={styles.button}>
            New Message
          </Button>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
    </Stack>
  );
};

export default Messages;
