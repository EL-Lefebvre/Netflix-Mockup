import React from "react";
import { Box, Typography } from "@mui/material";
import "./Footer.css"; // Import the CSS file for styling

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
      <Box className="footer-content">
        {itemList.map((item, index) => (
          <Typography key={index} variant="body2" className="footer-link">
            {item}
          </Typography>
        ))}
      </Box>
      <Box className="footer-padding">
        <Typography variant="body1" className="footer-text">
          © {new Date().getFullYear()} MovieFlix. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
