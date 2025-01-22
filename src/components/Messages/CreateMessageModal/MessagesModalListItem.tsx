import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import { BaseUser } from "../../../types/users";

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
  otherUser: BaseUser;
  onClose: () => void;
};

const MessageModalListItem = ({
  otherUser,
  onClose,
}: MessageModalListItemProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const { displayName, userId: otherUserId, username } = otherUser;
  const navigate = useNavigate();
  const routeChange = () => {
    onClose();
    const path = `/messages/${userId}/${otherUserId}`;
    navigate(path);
  };

  return (
    <ListItemButton onClick={() => routeChange()}>
      <Box sx={styles.container}>
        <ListItemAvatar sx={styles.avatar}>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={displayName}
          primaryTypographyProps={{ variant: "subtitle1" }}
          secondary={`@${username}`}
          secondaryTypographyProps={{ variant: "subtitle2" }}
        />
      </Box>
    </ListItemButton>
  );
};

export default MessageModalListItem;
