import React from "react";
import Login from "./Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Smart Links | Login",
  description:
    "Log in to manage and track your smart links with real-time analytics.",
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
      <Login />
      <ToastContainer />
    </div>
  );
}
