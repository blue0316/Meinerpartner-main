"use client";

import { ToastContainer } from "react-toastify";

const Toastify = () => {
  return (
    <ToastContainer
      draggable={false}
      autoClose={3000}
      className="toast-container"
      position="bottom-right"
      closeButton={false}
      hideProgressBar={true}
      newestOnTop={true}
    />
  );
};

export default Toastify;
