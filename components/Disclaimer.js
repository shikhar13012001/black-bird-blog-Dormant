import React from "react";
import Developer from "../public/developer.jpeg";
import Image from "next/image";
import { Typography } from "@mui/material";
const Disclaimer = () => {
  return (
    <section className="bg-gray-900 bg-home">
      <div className="w-full px-4 py-20 mx-auto text-center max-w-7xl md:w-4/5 lg:w-4/6">
        <Typography
          fontSize={{
            lg: 80,
            md: 64,
            sm: 50,
            xs: 40,
          }}
          variant="h1"
          className="text-center text-white"
        >
          Disclaimer
        </Typography>
        <h1 className="mt-3 mb-10 text-xl  text-white md:leading-snug md:text-3xl">
          Welcome to this project, If you are here, you are probably my great
          friend or a lame ass. Hate speech aside, I made this small blog for
          timepass. This project is in
          <span className="text-white bg-transparent bg-clip-border xl:bg-clip-text xl:text-transparent xl:bg-gradient-to-r from-green-400 to-purple-500">
            {" "}
            beta mode{" "}
          </span>
          and will remain so until I get a better idea of what I want to do with
          it. So please browse around and post good stuff. I am always here for
          you. Thank you.
        </h1>
        <div className="mx-auto mb-3 avatar">
          <Image
            src={Developer}
            alt="Praveen Juge"
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="text-base font-medium text-gray-200">Shikhar Gupta</p>
        <p className="text-xs font-medium text-white">Dev @BlackBird</p>
      </div>
    </section>
  );
};
export default Disclaimer;
