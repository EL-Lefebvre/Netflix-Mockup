import React from "react";
import { Box, Typography } from "@mui/material";
import { IconButton } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import "./Footer.css";

const Footer = () => {
  const itemList = [
    "Audio Description",
    "Investor Relations",
    "Privacy",
    "Contact Us",
    "Help Center",
    "Jobs",
    "Legal Notice",
    "Ad Choices",
    "Gift Cards",
    "MovieFlix Shop",
    "Cookie Preferences",
    "Media Center",
    "Terms of Use",
    "Corporate Information",
  ];

  return (
    <Box className="footer">
      <Box className="iconsContainer">
        <Box>
          <IconButton
            style={{
              color: "white",
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            style={{
              color: "white",
            }}
          >
            <FacebookIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            style={{
              color: "white",
            }}
          >
            <XIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            style={{
              color: "white",
            }}
          >
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className="footerContent">
        {itemList.map((item, index) => (
          <Typography key={index} variant="body2" className="footerLink">
            {item}
          </Typography>
        ))}
      </Box>
      <Box className="footerPadding">
        <Typography variant="body2" className="footerText">
          © {new Date().getFullYear()} MovieFlix. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
