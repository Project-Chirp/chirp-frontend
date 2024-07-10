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
import { useAppSelector } from "../../state/hooks";
import axios from "axios";
import { ProfileContent } from "../../pages/Profile";

export type NetworkUsers = {
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
  listUserData: NetworkUsers[];
  profileContents: ProfileContent;
  setProfileContents: (data: ProfileContent) => void;
  setListUserData: (data: NetworkUsers[]) => void;
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
  profileContents,
  setProfileContents,
  setListUserData,
  onClose,
}: FollowListModalProps) {
  const currentUserId = useAppSelector((state) => state.user.userId);

  const handleFollowToggle = async (index: number) => {
    const updatedList = [...listUserData];
    updatedList[index] = {
      ...listUserData[index],
      isFollowing: !listUserData[index].isFollowing,
    };
    setListUserData(updatedList);
    if (currentUserId === profileContents.userId) {
      const isFollowing: boolean = updatedList[index].isFollowing;
      const newFollowingCount = isFollowing
        ? ++profileContents.followingCount
        : --profileContents.followingCount;

      setProfileContents({
        ...profileContents,
        followingCount: newFollowingCount,
      });
    }
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
                {item.isFollowing ? (
                  <FollowingButton
                    visitedUserId={item.userId}
                    onClick={() => handleFollowToggle(index)}
                  />
                ) : (
                  <FollowButton
                    visitedUserId={item.userId}
                    onClick={() => handleFollowToggle(index)}
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
