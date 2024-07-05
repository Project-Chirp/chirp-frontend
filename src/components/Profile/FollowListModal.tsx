import {
  Box,
  Typography,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import SearchBar from "../Common/SearchBar";
import FollowingButton from "../Common/FollowingButton";
import FollowButton from "../Common/FollowButton";

export type ListType = "Followers" | "Following";

type user = {
  userName: string;
  displayName: string;
  imageURL: string;
  isFollowing: boolean;
};

type FollowListModalProps = {
  openModal: boolean;
  listType: ListType | null;
  onClose: () => void;
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    right: 16,
  },
  dialog: {
    borderRadius: 5,
  },
  searchBarContainer: {
    padding: "8px 16px",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
  },
  avatar: {
    marginRight: 16,
  },
  listItemText: {
    flexGrow: 1,
  },
  divider: {
    margin: "8px 0",
  },
};

export default function FollowListModal({
  openModal,
  listType,
  onClose,
}: FollowListModalProps) {
  //Dummy Data
  const [list, setList] = useState<User[]>([
    {
      id: "1",
      userName: "haileyhotrodhottie",
      displayName: "Hailey 🚗💄💋🦸‍♂️",
      imageURL: "https://via.placeholder.com/40",
      isFollowing: true,
    },
    {
      id: "2",
      userName: "me_mo_ri",
      displayName: "Memori",
      imageURL: "https://via.placeholder.com/40",
      isFollowing: true,
    },
  ]);

  //Need to add proper logic for actual data
  const handleFollowToggle = (id: string) => {
    setList((prevList) =>
      prevList.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle sx={styles.header}>
        {listType}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={styles.divider}>
        <hr />
      </Box>

      <DialogContent>
        <Box sx={styles.searchBarContainer}>
          <SearchBar placeholder="Search Chirp" />
        </Box>
        <List>
          {list.map((item) => (
            <ListItem key={item.id} sx={styles.listItem}>
              <ListItemAvatar>
                <Avatar src={item.imageURL} sx={styles.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={item.displayName}
                secondary={item.userName}
                sx={styles.listItemText}
              />
              <ListItemSecondaryAction>
                {item.isFollowing ? (
                  <FollowingButton
                    visitedUserId={parseInt(item.id)}
                    onClick={() => handleFollowToggle(item.id)}
                  />
                ) : (
                  <FollowButton
                    visitedUserId={parseInt(item.id)}
                    onClick={() => handleFollowToggle(item.id)}
                  />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
