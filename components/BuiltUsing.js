import React from "react";
import Marquee from "react-fast-marquee";
const BuiltUsing = () => {
  return (
    <section className="px-4 py-24 mx-auto max-w-7xl" data-aos="fade-up">
      <h1 className="mb-3 text-3xl font-bold leading-tight text-center text-gray-900 md:text-4xl">
        @BlackBird is built using
      </h1>
      <p className="mb-16 text-lg text-center text-gray-600">
        Many npm packages and stolen UI components
      </p>
      <Marquee
        speed={100}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div className="flex items-center justify-center">
          <img
            src="https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png"
            alt="Todoist Logo"
            className="block object-contain h-40 mr-20"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"
            alt="Slack Logo"
            className="block object-contain h-40 mr-20"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://cdn.iconscout.com/icon/free/png-64/react-1543566-1306069.png"
            alt="Typeform Logo"
            className="block object-contain h-40 mr-20"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://seeklogo.com/images/M/material-ui-logo-5BDCB9BA8F-seeklogo.com.png"
            alt="Algolia Logo"
            className="block object-contain h-40 mr-20"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://avatars.githubusercontent.com/u/67109815?s=280&v=4"
            alt="Postcss Logo"
            className="block object-contain h-40 mr-20"
          />
        </div>
      </Marquee>
    </section>
  );
};
export default BuiltUsing;
