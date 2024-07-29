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
  Typography,
  ListItemButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../Common/SearchBar";
import FollowingButton from "../Common/FollowingButton";
import FollowButton from "../Common/FollowButton";
import { useAppSelector } from "../../state/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

export type NetworkUsers = {
  userId: number;
  username: string;
  displayName: string;
  imageURL: string;
  isFollowing: boolean;
};

export type ListType = "Followers" | "Following";

type FollowListModalProps = {
  loading: boolean;
  openModal: boolean;
  listType: ListType | null;
  listUserData: NetworkUsers[];
  setListUserData: (data: NetworkUsers[]) => void;
  onClose: () => void;
  onFollowed: (isFollowing: boolean) => void;
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
  },
  titleBox: { paddingLeft: 3, width: "100%" },
  dialog: {
    borderRadius: 5,
    width: "25%",
    height: "50%",
  },
  searchBarContainer: {
    paddingX: 2,
    paddingY: 2,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    paddingX: 2,
  },
  listItemText: {
    fontWeight: "bold",
  },
  dialogContent: {
    paddingBottom: 1,
  },
  avatar: {
    marginRight: 2,
  },
};

const FollowListModal = ({
  loading,
  openModal,
  listType,
  listUserData,
  setListUserData,
  onClose,
  onFollowed,
}: FollowListModalProps) => {
  const currentUserId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const handleFollowToggle = async (userId: number) => {
    const updatedList = listUserData.map((o) => {
      if (userId === o.userId) {
        onFollowed(o.isFollowing);
        return { ...o, isFollowing: !o.isFollowing };
      }
      return o;
    });

    setListUserData(updatedList);
  };

  const sortedListUserData = listUserData.sort((a, b) =>
    b.userId === currentUserId ? 1 : a.userId === currentUserId ? -1 : 0
  );

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={openModal}
      scroll="paper"
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle sx={styles.header}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.titleBox}>
          <Typography variant="h3">{listType}</Typography>
        </Box>
      </DialogTitle>

      <Divider />
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search" />
      </Box>

      <DialogContent sx={styles.dialogContent}>
        {!loading && (
          <List>
            {sortedListUserData.map((o) => (
              <ListItem key={o.userId} sx={styles.listItem}>
                <ListItemButton
                  onClick={() => {
                    onClose();
                    navigate(`/${o.username}`);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={o.imageURL} sx={styles.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={o.displayName}
                    secondary={o.username}
                    primaryTypographyProps={styles.listItemText}
                  />
                  {o.userId !== currentUserId && (
                    <ListItemSecondaryAction>
                      {o.isFollowing ? (
                        <FollowingButton
                          visitedUserId={o.userId}
                          onClick={() => handleFollowToggle(o.userId)}
                        />
                      ) : (
                        <FollowButton
                          visitedUserId={o.userId}
                          onClick={() => handleFollowToggle(o.userId)}
                        />
                      )}
                    </ListItemSecondaryAction>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowListModal;
