import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  clearCurrentToast,
  dequeueToast,
  setToastOpen,
} from "../../state/slices/toastSlice";

const Toast = () => {
  const { currentToast, loaf, open } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loaf.length > 0 && !currentToast) {
      // Show next the toast if one isn't active
      dispatch(dequeueToast());
      dispatch(setToastOpen(true));
    } else if (loaf.length > 0 && currentToast && open) {
      // Close the current toast when a new one is added
      dispatch(setToastOpen(false));
    }
  }, [currentToast, loaf, dispatch]);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setToastOpen(false));
  };

  const handleExited = () => {
    dispatch(clearCurrentToast());
  };

  if (!currentToast) return null;

  return (
    <Snackbar
      anchorOrigin={currentToast.anchorOrigin}
      autoHideDuration={currentToast.autoHideDuration}
      onClose={handleClose}
      open={open}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert
        onClose={handleClose}
        severity={currentToast.severity}
        action={currentToast.action}
      >
        {currentToast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
