import { create } from "zustand";
import {
  toast,
  type ToastContent,
  type ToastOptions,
  type TypeOptions,
} from "react-toastify";

interface ToastStore {
  showToast: (
    message: ToastContent,
    type?: TypeOptions,
    options?: ToastOptions
  ) => void;
}

export const useToastStore = create<ToastStore>(() => ({
  showToast: (message, type = "default", options = {}) => {
    toast(message, { type, ...options });
  },
}));
