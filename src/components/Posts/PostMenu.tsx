import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { MoreVert, Edit, Delete, Link } from "@mui/icons-material";
import axios from "axios";
import { deletePost } from "../../state/slices/postsSlice";
import { useNavigate } from "react-router-dom";

type PostMenuProps = {
  authorId: number;
  postId: number;
  isExpanded?: boolean;
};

const styles = {
  listItemIcon: {
    "&.MuiListItemIcon-root": { color: "black.main" },
  },
  listItemText: { fontWeight: "bold" },
  menu: {
    borderRadius: 4,
  },
};

const PostMenu = ({ authorId, postId, isExpanded = false }: PostMenuProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `http://localhost:3001/api/posts/deletePost`,
        {
          data: {
            postId: postId,
            userId: userId,
          },
        }
      );

      isExpanded ? handleExpandedPostDelete() : handlePostDelete();
      return result.data;
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      handleMenuClose();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handlePostDelete = () => {
    dispatch(deletePost(postId));
  };

  const handleExpandedPostDelete = () => {
    navigate(-1);
  };

  const handleTemporary = () => {
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: styles.menu,
        }}
      >
        {userId === authorId && [
          <MenuItem onClick={handleTemporary} key="edit">
            <ListItemIcon sx={styles.listItemIcon}>
              <Edit />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={styles.listItemText}>
              Edit Post
            </ListItemText>
          </MenuItem>,
          <MenuItem onClick={handleDelete} key="delete">
            <ListItemIcon>
              <Delete color="error" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                ...styles.listItemText,
                color: "error",
              }}
            >
              Delete Post
            </ListItemText>
          </MenuItem>,
        ]}
        <MenuItem onClick={handleTemporary} key="copy-link">
          <ListItemIcon sx={styles.listItemIcon}>
            <Link />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={styles.listItemText}>
            Copy Link
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostMenu;
