import { Typography } from "@mui/material";
import React from "react";
import "./About.css";

const About = ({about}) => {
  const { quote, avatar, name, title, subtitle, description } = about;
  console.log(about);
  return (
    <div className="about">
     
      <div className="aboutContainer">
        <Typography>{quote}</Typography>
      </div>
      <div className="aboutContainer2">
        <div>
          <img src={avatar.url} alt="shivam" className="aboutAvatar" />

          <Typography
            variant="h4"
            style={{ margin: "1vmax 0", color: "black" }}
          >
            {name}
          </Typography>

          <Typography>{title}</Typography>

          <Typography style={{ margin: "1vmax 0", textAlign: "center" }}>
            {subtitle}
          </Typography>
        </div>

        <div>
          <Typography
            style={{
              wordSpacing: "5px",
              lineHeight: "50px",
              letterSpacing: "5px",
              textAlign: "right",
            }}
          >
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default About;
