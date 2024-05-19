import React, { useState, useEffect } from "react";
import {  Toolbar, Typography } from "@mui/material";
import {  useLocation } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { getUserById, getUserByUsername } from "../../services/userServices";

function TopBar() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const location = useLocation();
  const username = getCookie("username");
  const pathParts = location.pathname.split("/");
  const currentView = pathParts[pathParts.length - 2];
  const userId = pathParts[pathParts.length - 1];

  useEffect(() => {
    const fetchData = async () => {
        const result = await getUserByUsername({username: username});
        setUser(result[0]);
        if(userId !== "user"){
            const currentUser = await getUserById(userId);
            setCurrentUser(currentUser);
        }
      };
      fetchData();
  }, [username, userId]);

  let title = "";

  if (currentView === "user") {
    title = `User Details: ${currentUser.first_name} ${currentUser.last_name}`;
  } else if (currentView === "photo") {
    title = `Photos of: ${currentUser.first_name} ${currentUser.last_name}`;
  }
  return (
    <div style={{background: '#fff'}}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Typography variant="h6" component="div">
            Hello, {user.first_name} {user.last_name}
        </Typography>
      </Toolbar>
    </div>
  );
}

export default TopBar;
