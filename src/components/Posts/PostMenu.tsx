import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
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
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: styles.menu,
        }}
      >
        {userId === authorId && (
          <>
            <MenuItem sx={styles.menuItem} onClick={handleTemporary}>
              <EditIcon />
              <Typography>Edit Post</Typography>
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={styles.menuItem}>
              <DeleteIcon color="error" />
              <Typography color="error">Delete Post</Typography>
            </MenuItem>
          </>
        )}
        <MenuItem sx={styles.menuItem} onClick={handleTemporary}>
          <LinkIcon />
          <Typography>Copy Link</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostMenu;
