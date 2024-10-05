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
import EditPostModal from "./EditPostModal";
import PostDeleteConfirmationModal from "./PostDeleteConfirmationModal";
import { enqueueToast } from "../../state/slices/toastSlice";
import { Post } from "../../state/slices/postsSlice";

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
  const authorId = post.userId;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${post.postId}`);
    setMenuOpen(false);
    dispatch(enqueueToast({ message: "Post URL copied to clipboard!" }));
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
          <MenuItem
            sx={styles.menuItem}
            onClick={() => {
              setMenuOpen(false);
              setEditModalOpen(true);
            }}
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
        <MenuItem sx={styles.menuItem} onClick={() => copyToClipboard()}>
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
        postId={post.postId}
        isExpandedPost={isExpandedPost}
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
