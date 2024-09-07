import {
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../Common/SearchBar";
import FollowingButton from "../Common/FollowingButton";
import FollowButton from "../Common/FollowButton";
import { useAppSelector } from "../../state/hooks";
import { Link as Routerlink } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";

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
  dialog: {
    borderRadius: 5,
    width: "25%",
    height: "50%",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  list: {
    boxSizing: "border-box",
    height: "100%",
    paddingBottom: 0,
  },
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
  const theme = useTheme();

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
              <ListItem key={o.userId}>
                <ListItemAvatar>
                  <UserAvatar username={o.username} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link
                      color={theme.typography.subtitle1.color}
                      component={Routerlink}
                      to={`/${o.username}`}
                      underline="hover"
                      variant="subtitle1"
                    >
                      {o.displayName}
                    </Link>
                  }
                  secondary={
                    <Link
                      color={theme.typography.subtitle2.color}
                      component={Routerlink}
                      to={`/${o.username}`}
                      underline="none"
                      variant="subtitle2"
                    >
                      @{o.username}
                    </Link>
                  }
                />
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
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowListModal;
