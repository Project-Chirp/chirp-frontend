import {
  Box,
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
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import SearchBar from "../Common/SearchBar";
import FollowingButton from "../Common/FollowingButton";
import FollowButton from "../Common/FollowButton";

export type user = {
  userId: number;
  userName: string;
  displayName: string;
  imageURL: string;
  isFollowing: boolean;
};

export type ListType = "Followers" | "Following";

type FollowListModalProps = {
  openModal: boolean;
  listType: ListType | null;
  listUserData: user[];
  onClose: () => void;
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    right: 6,
  },
  dialog: {
    borderRadius: 5,
    boxSizing: "border-box",
  },
  searchBarContainer: {
    padding: 1,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: 1,
  },
  avatar: {
    marginRight: 4,
  },
  listItemText: {
    flexGrow: 1,
  },
};

export default function FollowListModal({
  openModal,
  listType,
  listUserData,
  onClose,
}: FollowListModalProps) {
  //Dummy Data
  const [list, setList] = useState<user[]>([
    {
      userId: 1,
      userName: "haileyhotrodhottie",
      displayName: "Hailey 🚗💄💋🦸‍♂️",
      imageURL: "https://via.placeholder.com/40",
      isFollowing: true,
    },
    {
      userId: 2,
      userName: "me_mo_ri",
      displayName: "Memori",
      imageURL: "https://via.placeholder.com/40",
      isFollowing: true,
    },
  ]);

  //Need to add proper logic for actual data
  const handleFollowToggle = (index: number) => {
    setList((prevList) =>
      prevList.map((user, i) =>
        i === index ? { ...user, isFollowing: !user.isFollowing } : user
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
        <IconButton onClick={onClose} sx={styles.closeIcon}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box sx={styles.searchBarContainer}>
          <SearchBar placeholder="Search Chirp" />
        </Box>
        <List>
          {listUserData.map((item, index) => (
            <ListItem key={index} sx={styles.listItem}>
              <ListItemAvatar>
                <Avatar src={item.imageURL} sx={styles.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={item.displayName}
                secondary={item.userName}
                sx={styles.listItemText}
              />
              <ListItemSecondaryAction>
                {/* {item.isFollowing ? (
                  <FollowingButton
                    visitedUserId={index}
                    onClick={() => handleFollowToggle(index)}
                  />
                ) : (
                  <FollowButton
                    visitedUserId={index}
                    onClick={() => handleFollowToggle(index)}
                  />
                )} */}

                {item.isFollowing ? (
                  <FollowingButton visitedUserId={item.userId} />
                ) : (
                  <FollowButton visitedUserId={item.userId} />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
