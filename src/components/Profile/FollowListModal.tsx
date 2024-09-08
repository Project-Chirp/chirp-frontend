import {
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
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
import { useNavigate } from "react-router-dom";
import { Link as Routerlink } from "react-router-dom";

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
  avatar: {
    marginRight: 2,
  },
  dialog: {
    borderRadius: 5,
    width: "25%",
    height: "50%",
  },
  displayName: { ":hover": { textDecoration: "underline" } },
  header: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  list: { height: "100%", paddingBottom: 0, boxSizing: "border-box" },
  searchBarContainer: {
    paddingBottom: 1,
    paddingTop: 2,
    paddingX: 2,
  },
  titleBox: { paddingLeft: 3 },
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
      PaperProps={{ sx: styles.dialog }}
      scroll="paper"
    >
      <DialogTitle sx={styles.header}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.headerTitle}>{listType}</Typography>
        </Box>
      </DialogTitle>
      <Divider />
      <Box sx={styles.searchBarContainer}>
        <SearchBar placeholder="Search" />
      </Box>
      <DialogContent>
        {!loading && (
          <List sx={styles.list}>
            {sortedListUserData.map((o) => (
              <ListItem
                disablePadding
                key={o.userId}
                secondaryAction={
                  o.userId !== currentUserId && (
                    <>
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
                    </>
                  )
                }
              >
                <ListItemButton
                  component={Routerlink}
                  onClick={() => onClose()}
                  to={`/${o.username}`}
                >
                  <ListItemAvatar>
                    <Avatar src={o.imageURL} sx={styles.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={o.displayName}
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      sx: styles.displayName,
                    }}
                    secondary={`@${o.username}`}
                    secondaryTypographyProps={{ variant: "subtitle2" }}
                  />
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
