import { ToastContainer, Zoom } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      {children}
    </>
  );
};
