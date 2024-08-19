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
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDeleteModal(true);
    try {
      // const result = await axios.delete(
      //   `http://localhost:3001/api/posts/deletePost`,
      //   {
      //     data: {
      //       postId: postId,
      //       userId: userId,
      //     },
      //   }
      // );
      // if (isExpandedPost) {
      //   dispatch(deletePost(postId));
      // } else {
      //   navigate(-1);
      // }
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      setMenuOpen(false);
    }
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
        MenuListProps={{ sx: { padding: 0 } }}
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
          <MenuItem sx={styles.menuItem} onClick={handleDelete}>
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
    </>
  );
};

export default PostMenu;
