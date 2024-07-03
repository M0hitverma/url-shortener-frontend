import Register from "./Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function page() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <Register />
      <ToastContainer />
    </div>
  );
}
