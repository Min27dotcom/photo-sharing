import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import { getUserList } from "../../services/userServices";
import { FaUser } from "react-icons/fa";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const result = await getUserList();
        setUsers(result);
        console.log(result);
    };
    fetchData();
  }, []);
  return (
    <Card style={{padding:"20px"}}>
      <Typography variant="h6" style={{display: "flex", alignItems: "center"}}><FaUser style={{marginRight: "10px"}}/><div style={{fontSize: "28px", color: "#006400"}}>Users</div></Typography>
      <List component="nav">
        {users.map((user) => (
          <ListItem key={user._id}>
            <Link to={`/user/${user._id}`} style={{textDecoration: "none", color: "#006400"}}>
              <ListItemText primary={user.first_name + " " + user.last_name}/>
            </Link>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default UserList;
