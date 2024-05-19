import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPhotoOfUser } from "../../services/photoServices";
import Comments from "../Comments";

function UserPhotos() {
  const { userId } = useParams();
  const [photoOfUser, setPhotoOfUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPhotoOfUser(userId);
      console.log(result);
      setPhotoOfUser(result);
    };
    fetchData();
  }, [userId]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return (
    <>
      <Card style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {photoOfUser.message === "NOT FOUND" ? (
            <>
              <div style={{ padding: "20px" }}>
                The user has not posted any photos yet
              </div>
            </>
          ) : (
            <>
              {photoOfUser.map((photo) => (
                <Grid item xs={12} md={12} key={photo._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      src={`http://localhost:3006/uploads/${photo.file_name}`}
                      alt={photo.file_name}
                    />
                    <Typography variant="body2">
                        Date: {formatDate(photo.date_time)}
                    </Typography>
                    <Comments comments={photo.comments} photoId = {photo._id}/>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Card>
    </>
  );
}

export default UserPhotos;
