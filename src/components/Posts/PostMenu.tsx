import { MoreVert, Edit, Delete, Link } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { enqueueToast } from "../../state/slices/toastSlice";
import { Post } from "../../types/posts";
import EditPostModal from "./EditPostModal";
import PostDeleteConfirmationModal from "./PostDeleteConfirmationModal";

type PostMenuProps = {
  isExpandedPost?: boolean;
  post: Post;
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

const PostMenu = ({ isExpandedPost = false, post }: PostMenuProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId: authorId, postId } = post;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${postId}`);
    setMenuOpen(false);
    dispatch(enqueueToast({ message: "Post URL copied to clipboard!" }));
  };

  return (
    <>
      <IconButton onClick={() => setMenuOpen(true)} ref={menuRef}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={menuRef.current}
        MenuListProps={{ sx: styles.menuList }}
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        PaperProps={{
          sx: styles.menu,
        }}
      >
        {userId === authorId && (
          <MenuItem
            onClick={() => {
              setMenuOpen(false);
              setEditModalOpen(true);
            }}
            sx={styles.menuItem}
          >
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
            onClick={() => {
              setMenuOpen(false);
              setDeleteConfirmationModalOpen(true);
            }}
            sx={styles.menuItem}
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
        <MenuItem onClick={() => copyToClipboard()} sx={styles.menuItem}>
          <ListItemIcon>
            <Link sx={styles.icon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
            Copy Link
          </ListItemText>
        </MenuItem>
      </Menu>
      <PostDeleteConfirmationModal
        isExpandedPost={isExpandedPost}
        onClose={() => setDeleteConfirmationModalOpen(false)}
        open={deleteConfirmationModalOpen}
        postId={postId}
      />
      <EditPostModal
        isExpandedPost={isExpandedPost}
        onClose={() => setEditModalOpen(false)}
        open={editModalOpen}
        post={post}
      />
    </>
  );
};

export default PostMenu;
