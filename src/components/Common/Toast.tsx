import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { closeToast } from "../../state/slices/toastSlice";

const Toast = () => {
  const { action, anchorOrigin, autoHideDuration, message, open, severity } =
    useAppSelector((state) => state.toast);
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
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={open}
    >
      <Alert onClose={handleClose} severity={severity} action={action}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
