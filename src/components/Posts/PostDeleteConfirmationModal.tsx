import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { deletePost } from "../../state/slices/postsSlice";
import { enqueueToast } from "../../state/slices/toastSlice";
import { selectCurrentUserId } from "../../state/slices/userSlice";
import useAxios from "../../utilities/useAxios";

const styles = {
  dialog: {
    width: "20%",
    borderRadius: 5,
  },
  title: {
    padding: 2,
    textAlign: "center",
  },
  content: {
    padding: 2,
    textAlign: "center",
  },
  deleteButton: {
    flex: 1,
    ":hover": {
      backgroundColor: "error.main",
      color: "white.main",
    },
  },
  cancelButton: {
    flex: 1,
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
  const userId = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sendRequest } = useAxios();

  const handleDelete = async () => {
    try {
      await sendRequest(
        {
          method: "DELETE",
          data: {
            postId,
            userId,
          },
        },
        "posts/deletePost",
      );
      if (isExpandedPost) {
        navigate(-1);
      } else {
        dispatch(deletePost(postId));
      }
      dispatch(
        enqueueToast({
          message: "Your post has been deleted",
        }),
      );
    } catch (error) {
      console.error("Failed to delete the post", error);
      dispatch(
        enqueueToast({
          message: "Your post failed to be deleted",
          severity: "error",
        }),
      );
    } finally {
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ sx: styles.dialog }}>
      <DialogTitle sx={styles.title} variant="subtitle1">
        Are you sure you want to delete this post?
      </DialogTitle>
      <DialogContent sx={styles.content}>
        <DialogContentText>
          This post will be lost forever as you will not be able to undo this
          action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={styles.cancelButton} variant="outlined">
          Cancel
        </Button>
        <Button
          color="error"
          onClick={handleDelete}
          sx={styles.deleteButton}
          variant="outlined"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDeleteModal;
