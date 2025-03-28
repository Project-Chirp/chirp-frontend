import CloseIcon from "@mui/icons-material/Close";
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
  ListItemButton,
  Link,
  useTheme,
} from "@mui/material";
import { Link as Routerlink, useNavigate } from "react-router-dom";
import PageLoader from "../../pages/PageLoader";
import { useAppSelector } from "../../state/hooks";
import { selectCurrentUserId } from "../../state/slices/userSlice";
import { FollowableUser } from "../../types/users";
import FollowButton from "../Common/FollowButton";
import FollowingButton from "../Common/FollowingButton";
import SearchBar from "../Common/SearchBar";
import UserAvatar from "../Common/UserAvatar";

type FollowListModalProps = {
  list: FollowableUser[];
  loading: boolean;
  onClose: () => void;
  onToggleFollow: (userId: number, isFollowing: boolean) => void;
  open: boolean;
  title: string;
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
  list,
  loading,
  onClose,
  onToggleFollow,
  open,
  title,
}: FollowListModalProps) => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const navigate = useNavigate();
  const theme = useTheme();

  const sortedList = list.sort((a, b) =>
    b.userId === currentUserId ? 1 : a.userId === currentUserId ? -1 : 0,
  );

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ sx: styles.dialog }}
      scroll="paper"
    >
      <DialogTitle sx={styles.header}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.titleBox}>
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
      </DialogTitle>
      <Divider />
      <Box sx={styles.searchBarContainer}>
        <SearchBar />
      </Box>
      <DialogContent>
        {loading && <PageLoader />}
        {!loading && (
          <List sx={styles.list}>
            {sortedList.map((o) => (
              <ListItem disablePadding key={o.userId}>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${o.username}`);
                    onClose();
                  }}
                >
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
                        {`@${o.displayName}`}
                      </Link>
                    }
                  />
                  {o.userId !== currentUserId &&
                    (o.isFollowing ? (
                      <FollowingButton
                        onClick={() => {
                          onToggleFollow(o.userId, o.isFollowing);
                        }}
                        visitedUserId={o.userId}
                      />
                    ) : (
                      <FollowButton
                        onClick={() => {
                          onToggleFollow(o.userId, o.isFollowing);
                        }}
                        visitedUserId={o.userId}
                      />
                    ))}
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
