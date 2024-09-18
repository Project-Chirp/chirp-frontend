import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { MoreVert, Edit, Delete, Link } from "@mui/icons-material";
import PostDeleteConfirmationModal from "./PostDeleteConfirmationModal";
import { enqueueToast } from "../../state/slices/toastSlice";

type PostMenuProps = {
  authorId: number;
  postId: number;
  isExpandedPost?: boolean;
};

const styles = {
  icon: {
    color: "black.main",
  },
  menu: {
    borderRadius: 4,
  },
  menuItem: {
    paddingX: 1.5,
    paddingY: 1,
  },
  menuList: { padding: 0 },
};

const PostMenu = ({
  authorId,
  postId,
  isExpandedPost = false,
}: PostMenuProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${postId}`);
  };

  return (
    <>
      <IconButton ref={menuRef} onClick={() => setMenuOpen(true)}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={menuRef.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: styles.menu,
        }}
        MenuListProps={{ sx: styles.menuList }}
      >
        {userId === authorId && (
          <MenuItem sx={styles.menuItem} onClick={() => setMenuOpen(false)}>
            <ListItemIcon>
              <Edit sx={styles.icon} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
              Edit Post
            </ListItemText>
          </MenuItem>
        )}
        {userId === authorId && (
          <MenuItem
            sx={styles.menuItem}
            onClick={() => {
              setMenuOpen(false);
              setDeleteConfirmationModalOpen(true);
            }}
          >
            <ListItemIcon>
              <Delete color="error" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                variant: "subtitle1",
                color: "error",
              }}
            >
              Delete Post
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem
          sx={styles.menuItem}
          onClick={() => {
            copyToClipboard();
            setMenuOpen(false);
            dispatch(
              enqueueToast({ message: "Post URL copied to clipboard!" })
            );
          }}
        >
          <ListItemIcon>
            <Link sx={styles.icon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
            Copy Link
          </ListItemText>
        </MenuItem>
      </Menu>
      <PostDeleteConfirmationModal
        onClose={() => setDeleteConfirmationModalOpen(false)}
        open={deleteConfirmationModalOpen}
        postId={postId}
        isExpandedPost={isExpandedPost}
      />
    </>
  );
};

export default PostMenu;
