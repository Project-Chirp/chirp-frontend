import { AlertColor, SnackbarOrigin } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

type ToastState = {
  action?: ReactNode;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  message: string;
  open: boolean;
  severity?: AlertColor;
};

type ToastPayload = Omit<ToastState, "open">;

const initialState: ToastState = {
  anchorOrigin: { vertical: "top", horizontal: "center" },
  autoHideDuration: 5000,
  message: "",
  open: false,
  severity: "success",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    closeToast: (state) => {
      state.open = false;
    },
    queueToast: (state, action: PayloadAction<ToastPayload>) => {
      const {
        action: toastAction,
        anchorOrigin,
        autoHideDuration,
        message,
        severity,
      } = action.payload;

      state.open = true;
      state.message = message;
      state.action = toastAction;
      state.anchorOrigin = anchorOrigin ?? initialState.anchorOrigin;
      state.autoHideDuration =
        autoHideDuration ?? initialState.autoHideDuration;
      state.severity = severity ?? initialState.severity;
    },
  },
});

export const { closeToast, queueToast } = toastSlice.actions;

export default toastSlice.reducer;
