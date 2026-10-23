import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [context, setContext] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/users/")) {
      const userId = path.split("/users/")[1];
      fetchModel(`/user/${userId}`)
        .then((res) => {
          setContext(`${res.data.first_name} ${res.data.last_name}`);
        })
        .catch(() => setContext(""));
    } else if (path.startsWith("/photos/")) {
      const userId = path.split("/photos/")[1];
      fetchModel(`/user/${userId}`)
        .then((res) => {
          setContext(`Photos of ${res.data.first_name} ${res.data.last_name}`);
        })
        .catch(() => setContext(""));
    } else {
      setContext("");
    }
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Nguyễn Đức Tài
        </Typography>
        <Typography variant="h5" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
