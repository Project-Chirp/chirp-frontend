import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { closeToast } from "../../state/slices/toastSlice";

const Toast = () => {
  const toast = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeToast());
  };

  return (
    <Snackbar
      anchorOrigin={toast.anchorOrigin}
      autoHideDuration={toast.autoHideDuration}
      onClose={handleClose}
      open={toast.open}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        action={toast.action}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
