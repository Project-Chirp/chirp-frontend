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
import SearchBar from "../Common/SearchBar";
import FollowingButton from "../Common/FollowingButton";
import FollowButton from "../Common/FollowButton";
import { useAppSelector } from "../../state/hooks";
import { ProfileContent } from "../../pages/Profile";
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
    width: "25%",
    height: "50%",
  },
  searchBarContainer: {
    paddingX: 2,
    paddingY: 1,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    paddingX: 2,
    "&:hover": {
      backgroundColor: "gray.light",
      cursor: "pointer",
    },
  },
  avatar: {
    marginRight: 2,
  },
  listItemText: {
    flexGrow: 1,
  },
};

const FollowListModal = ({
  loading,
  openModal,
  listType,
  listUserData,
  profileContents,
  setProfileContents,
  setListUserData,
  onClose,
}: FollowListModalProps) => {
  const currentUserId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const handleFollowToggle = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleNavigation = (username: string) => {
    onClose();
    navigate(`/${username}`);
  };

  const modifiedListUserData = listUserData.sort((a, b) =>
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
        {listType}
        <IconButton onClick={onClose} sx={styles.closeIcon}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search Chirp" />
      </Box>

      <DialogContent sx={{ paddingBottom: 1 }}>
        {!loading && (
          <List>
            {modifiedListUserData.map((item, index) => (
              <ListItem
                key={index}
                sx={styles.listItem}
                onClick={() => handleNavigation(item.username)}
              >
                <ListItemAvatar>
                  <Avatar src={item.imageURL} sx={styles.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.displayName}
                  secondary={item.username}
                  sx={styles.listItemText}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
                {item.userId !== currentUserId && (
                  <ListItemSecondaryAction>
                    {item.isFollowing ? (
                      <FollowingButton
                        visitedUserId={item.userId}
                        onClick={(event) => handleFollowToggle(index, event)}
                      />
                    ) : (
                      <FollowButton
                        visitedUserId={item.userId}
                        onClick={(event) => handleFollowToggle(index, event)}
                      />
                    )}
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowListModal;
