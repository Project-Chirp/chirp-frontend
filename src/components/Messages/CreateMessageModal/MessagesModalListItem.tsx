import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import { SelectedUser } from "../../../state/slices/messagesSlice";

const styles = {
  avatar: { margin: "auto" },
  primaryTextContainer: {
    gap: 0.5,
    width: "30%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
};

type MessageModalListItemProps = {
  otherUser: SelectedUser;
  onClose: () => void;
};

const MessageModalListItem = ({
  otherUser,
  onClose,
}: MessageModalListItemProps) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const routeChange = () => {
    onClose();
    const path = `/messages/${user.userId}/${otherUser.userId}`;
    navigate(path);
  };

  return (
    <ListItemButton onClick={() => routeChange()}>
      <Box sx={styles.container}>
        <ListItemAvatar sx={styles.avatar}>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Box>
              <Typography variant="subtitle1">
                {otherUser.displayName}
              </Typography>
              <Typography variant="subtitle2">{`@${otherUser.username}`}</Typography>
            </Box>
          }
        />
      </Box>
    </ListItemButton>
  );
};

export default MessageModalListItem;
