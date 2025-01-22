import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { BaseUser } from "../../../types/users";

const styles = {
  avatar: { margin: "auto" },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
};

type NewMessageModalListProps = {
  activeConversations: BaseUser[];
  onSelect: (userId: number) => void;
};

const NewMessageModalList = ({
  activeConversations,
  onSelect,
}: NewMessageModalListProps) => (
  <List component="div">
    {activeConversations.map((o) => (
      <ListItemButton key={o.userId} onClick={() => onSelect(o.userId)}>
        <Box sx={styles.container}>
          <ListItemAvatar sx={styles.avatar}>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={o.displayName}
            primaryTypographyProps={{ variant: "subtitle1" }}
            secondary={`@${o.username}`}
            secondaryTypographyProps={{ variant: "subtitle2" }}
          />
        </Box>
      </ListItemButton>
    ))}
  </List>
);

export default NewMessageModalList;
