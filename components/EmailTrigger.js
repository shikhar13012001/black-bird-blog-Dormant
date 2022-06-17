import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const EmailTrigger = ({ to_name, to_email, message, reply_to }) => {
  emailjs.send("service_whcdmqo", "template_0nv09eh", {
    to_name,
    to_email,
    message,
    reply_to,
  });
};

export default EmailTrigger;
