import { toast } from "react-toastify";

interface Toast {
  error: (message: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
}

const showToast: Toast = {
  error: (message: string) => {
    toast.error(message);
  },
  success: (message: string) => {
    toast.success(message);
  },
  info: (message: string) => {
    toast.info(message);
  },
};

export default showToast;
