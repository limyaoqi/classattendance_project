import React from "react";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function GoBackButton({ type }) {
  const navigateTo = type === "student" ? "/" :"/classmanage" ;

  return (
    <IconButton
      component={Link}
      to={navigateTo}
      sx={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "10px",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
        margin: { xs: "10px 0 10px 10px", md: "0" },
      }}
    >
      <ArrowBack />
    </IconButton>
  );
}
