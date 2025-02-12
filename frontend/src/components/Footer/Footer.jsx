import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { SiLeetcode , SiCodeforces} from "react-icons/si";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Shivam Kumar  Singh. I am a Full-Stack Developer and <b> Competitive Programer </b>
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div>
        <Typography variant="h6">Social Media</Typography>
        <a href="https://github.com/Shivam7235singh" target="black">
          <BsGithub />
          </a>
        <a href="https://codeforces.com/profile/shivam31473" target="black">
        <SiCodeforces />
        </a>
        <a href="https://leetcode.com/u/Shivam31473/" target="black">
        <SiLeetcode />
        </a>
   
        <a href="linkedin.com/in/shivam-singh-1ba7b7211" target="black">
          <BsLinkedin />
        </a>
        <a href="https://www.instagram.com/__shivam_rajput__41/" target="black">
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

export default Footer;
