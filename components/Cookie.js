import React from "react";
import COOKIES from "../public/cookie.svg";
import Image from "next/image";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
const Cookie = () => {
  // find if the cookie_accepted cookie is set
  const cookie_accepted = document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("cookie_accepted"));
  console.log(cookie_accepted);
  const [open, setOpen] = React.useState(!cookie_accepted);
  const handleClose = () => {
    document.cookie = "cookie_accepted=true";
    setOpen(!open);
  };
  const handleOnClose = () => {
    // set cookie in browser
    console.log("bhoot");
    setOpen(!open);
  };
  return (
    <Dialog open={open} onClose={handleOnClose} sx={{ overflow: "visible" }}>
      <div className="w-72 bg-white rounded-lg shadow-lg p-6">
        <div className="w-16 mx-auto relative mb-3">
          <Image style={{ marginTop: 1 }} src={COOKIES} alt="cookie" />
        </div>
        <span className="w-full block leading-normal text-gray-800 mb-3 text-center">
          We care about your data, and we&#x27;d love to use cookies to make
          your experience better.
        </span>
        <div className="flex items-center justify-between text-center">
          <div className="w-full">
            <button
              type="button"
              className="py-2 px-4 mt-2 mb-2  bg-black hover:bg-white focus:ring-indigo-500 focus:ring-offset-indigo-200 hover:text-black text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Privacy Policy
            </button>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={handleClose}
            type="button"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Allow Cookies
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default Cookie;
