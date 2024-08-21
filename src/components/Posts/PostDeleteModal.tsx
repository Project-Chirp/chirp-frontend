import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deletePost } from "../../state/slices/postsSlice";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  actions: {
    justifyContent: "space-between",
    paddingTop: 0,
  },
  dialog: {
    height: "auto",
    width: "20%",
    borderRadius: 5,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingX: 2,
    paddingY: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    gap: 1,
  },
  contentTextBold: { color: "black.main", textAlign: "center" },
  deleteButton: {
    width: "50%",
    ":hover": {
      backgroundColor: "error.main",
      color: "white.main",
    },
  },
  cancelButton: {
    width: "50%",
    ":hover": {
      backgroundColor: "primary.main",
      color: "white.main",
    },
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
        Delete Post?
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={styles.content}>
        <DialogContentText variant="subtitle1" sx={styles.contentTextBold}>
          Are you sure you want to delete this post?
        </DialogContentText>
        <DialogContentText>You cannot undo this action.</DialogContentText>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <Button variant="outlined" onClick={onClose} sx={styles.cancelButton}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="outlined"
          color="error"
          sx={styles.deleteButton}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDeleteModal;
