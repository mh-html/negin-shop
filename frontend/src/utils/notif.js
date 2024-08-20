import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifErr = (text) => toast.error(text, { autoClose: 3000 });
const notifSuc = (text) => toast.success(text, { autoClose: 3000 });

export { notifErr, notifSuc };
