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

type PostMenuProps = {
  authorId: number;
  postId: number;
};

const styles = {
  menu: {
    borderRadius: 4,
  },
};

const PostMenu = ({ authorId, postId }: PostMenuProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

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
      dispatch(deletePost(postId));
      return result.data;
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      handleMenuClose();
    }
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
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Edit Post</ListItemText>
          </MenuItem>,
          <MenuItem onClick={handleDelete} key="delete">
            <ListItemIcon>
              <Delete color="error" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ color: "error" }}>
              Delete Post
            </ListItemText>
          </MenuItem>,
        ]}
        <MenuItem onClick={handleTemporary} key="copy-link">
          <ListItemIcon>
            <Link />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostMenu;
