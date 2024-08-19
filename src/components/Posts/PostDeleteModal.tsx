import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deletePost } from "../../state/slices/postsSlice";

const styles = {
  dialog: {
    height: "auto",
    width: "35%",
    borderRadius: 5,
    padding: 1,
  },
  title: {
    padding: 1,
  },
};

type PostDeleteModalProps = {
  onClose: () => void;
  open: boolean;
  postId: number;
  isExpandedPost?: boolean;
};

const PostDeleteModal = ({
  onClose,
  open,
  postId,
  isExpandedPost,
}: PostDeleteModalProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/deletePost`, {
        data: {
          postId: postId,
          userId: userId,
        },
      });
      if (isExpandedPost) {
        navigate(-1);
      } else {
        dispatch(deletePost(postId));
      }
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      onClose();
    }
  };
  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ sx: styles.dialog }}>
      <DialogTitle sx={styles.title} variant="h6">
        Are you sure you want to delete this post?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleDelete} variant="outlined" color="error">
          Delete
        </Button>
        <Button variant="outlined">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDeleteModal;
