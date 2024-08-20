import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { MoreVert, Edit, Delete, Link } from "@mui/icons-material";
import axios from "axios";
import { deletePost } from "../../state/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import PostDeleteModal from "./PostDeleteModal";
import EditPostModal from "./EditPostModal";

type PostMenuProps = {
  authorId: number;
  postId: number;
  isExpandedPost?: boolean;
};

const styles = {
  icon: {
    color: "black.main",
  },
  listItemText: { fontWeight: "bold" },
  menu: {
    borderRadius: 4,
  },
  menuItem: {
    paddingX: 1.5,
    paddingY: 1,
  },
};

const PostMenu = ({
  authorId,
  postId,
  isExpandedPost = false,
}: PostMenuProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        MenuListProps={{ sx: { padding: 0 } }}
      >
        {userId === authorId && (
          <MenuItem sx={styles.menuItem} onClick={() => setEditModal(true)}>
            <ListItemIcon>
              <Edit sx={styles.icon} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
              Edit Post
            </ListItemText>
          </MenuItem>
        )}
        {userId === authorId && (
          <MenuItem sx={styles.menuItem} onClick={() => setDeleteModal(true)}>
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
        <MenuItem sx={styles.menuItem} onClick={() => setMenuOpen(false)}>
          <ListItemIcon>
            <Link sx={styles.icon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
            Copy Link
          </ListItemText>
        </MenuItem>
      </Menu>
      <PostDeleteModal
        onClose={() => setDeleteModal(false)}
        open={deleteModal}
        postId={postId}
        isExpandedPost={isExpandedPost}
      />
      <EditPostModal
        onClose={() => setEditModal(false)}
        open={editModal}
        // postId={postId}
        // isExpandedPost={isExpandedPost}
      />
    </>
  );
};

export default PostMenu;
