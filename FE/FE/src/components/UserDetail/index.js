import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userServices";

function UserDetail() {
  const { userId } = useParams();
  console.log(userId);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const result = await getUserById(userId);
        setUser(result);
        console.log(result);
    };
    fetchData();
  }, [userId]);  
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" style={{color:"#006400"}}>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body2" style={{color:"#006400"}}>Location: {user.location}</Typography>
          <Typography variant="body2" style={{color:"#006400"}}>
            Description: {user.description}
          </Typography>
          <Typography variant="body2" style={{color:"#006400"}}>Occupation: {user.occupation}</Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/user/photo/${userId}`}>
            Photos
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default UserDetail;
