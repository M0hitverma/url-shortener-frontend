import Register from "./Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Smart Links | Register",
  description:
    "Create an account to start building and tracking branded smart links.",
};
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
