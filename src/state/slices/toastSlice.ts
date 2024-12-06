import { AlertColor, SnackbarOrigin } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

type Toast = {
  action?: ReactNode;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  message: string;
  severity?: AlertColor;
};

type ToastLoafState = {
  currentToast: Toast | null;
  loaf: Toast[];
  open: boolean;
};

const initialState: ToastLoafState = {
  currentToast: null,
  loaf: [],
  open: false,
};

const defaultToastOptions: Toast = {
  anchorOrigin: { vertical: "top", horizontal: "center" },
  autoHideDuration: 3000,
  message: "",
  severity: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    clearCurrentToast: (state) => {
      state.currentToast = null;
    },
    dequeueToast: (state) => {
      state.currentToast = state.loaf.shift() || null;
    },
    enqueueToast: (state, action: PayloadAction<Toast>) => {
      const {
        action: toastAction,
        anchorOrigin,
        autoHideDuration,
        message,
        severity,
      } = action.payload;

      const newToast: Toast = {
        action: toastAction,
        message,
        anchorOrigin: anchorOrigin ?? defaultToastOptions.anchorOrigin,
        autoHideDuration:
          (autoHideDuration ?? severity === "error")
            ? 5000
            : defaultToastOptions.autoHideDuration,
        severity: severity ?? defaultToastOptions.severity,
      };

      state.loaf.push(newToast);
    },
    setToastOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { clearCurrentToast, dequeueToast, enqueueToast, setToastOpen } =
  toastSlice.actions;

export default toastSlice.reducer;
