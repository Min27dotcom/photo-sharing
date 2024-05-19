import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../services/userServices";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  CardMedia,
} from "@mui/material";
import { deletePhoto, getPhotoOfUser, uploadPhoto } from "../../services/photoServices";
import "../../SCSS/base.scss";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";

function Profile() {
  const token = getCookie("token");
  const username = getCookie("username");
  const authen = useSelector((state) => state.authenReducer);
  const [user, setUser] = useState([]);
  const [photoOfUser, setPhotoOfUser] = useState([]);
  const [file, setFile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserByUsername({ username: username });
      if(result.length !== 0){
        setUser(result[0]);
        const photos = await getPhotoOfUser(result[0]._id);
        if(photos.message !== 'NOT FOUND'){
          setPhotoOfUser(photos);
        }
      }
    };
    fetchData();
  }, [username]);

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

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);

    const uploadImage = async () => {
      const result = await uploadPhoto(formData, token);
      if(result){
        setPhotoOfUser([...photoOfUser, result]);
        Swal.fire({
          title: 'Your photo has been uploaded!',
          icon: 'success',
        })
      }
    }
    uploadImage();

  }

  const handleDeletePhoto = (photoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ADFF2F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const delPhoto = async () => {
          const result = await deletePhoto(photoId);
          if(result.message === "Delete Success!"){
            Swal.fire({
              title: "Deleted!",
              text: "Your photo has been deleted.",
              icon: "success"
            });
            const updatePhotosOfUser = photoOfUser.filter((photo) => photo._id !== photoId);
            setPhotoOfUser(updatePhotosOfUser);
          }
        }
        delPhoto();
      }
    });
    
  }

  return (
    <>
      <div>
        {token && authen ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Paper className="main-grid-item">
                  <Grid container spacing={1}>
                    <CardContent>
                      <Typography variant="h5" style={{display: "flex", alignItems: "center", padding: "10px", color:"#006400"}}>
                        <FaUser style={{marginRight: "10px"}}/> {user.first_name} {user.last_name}
                      </Typography>
                      <Typography variant="body2" style={{color:"#006400"}}>
                        Location: {user.location}
                      </Typography>
                      <Typography variant="body2" style={{color:"#006400"}}>
                        Description: {user.description}
                      </Typography>
                      <Typography variant="body2" style={{color:"#006400"}}>
                        Occupation: {user.occupation}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "20px",
                          flexDirection: "column"
                        }}
                      > 
                        <form onSubmit={handleUpload} style={{
                          textAlign: "center"
                        }}>
                          <input type="file" name="avatar" onChange={handleChange} style={{
                            width: "300px",
                            height: "50px",
                          }}/> 
                          <button
                          className="button-upload" style={{color:"#006400", borderColor:"#006400"}}
                          >
                            Upload Photo
                          </button>
                        </form>
                      </div>
                    </CardContent>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={9}>
                <Paper className="main-grid-item">
                  {photoOfUser.length === 0 ? (
                    <>
                      <div style={{ padding: "20px" }}>
                        The user has not posted any photos yet
                      </div>
                    </>
                  ) : (
                    <>
                      <Grid container spacing={1}>
                        {photoOfUser.map((photo) => (
                          <Grid item xs={6} key={photo._id}>
                            <Card>
                              <CardMedia
                                component="img"
                                src={`http://localhost:3006/uploads/${photo.file_name}`}
                                alt={photo.file_name}
                              />
                              <CardContent>
                                <Typography variant="body2">
                                  Date: {formatDate(photo.date_time)}
                                </Typography>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "20px",
                                  }}
                                >
                                  <button
                                    className="button-delete"
                                    onClick={() => handleDeletePhoto(photo._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Card style={{
              height: "400px",
              fontSize: "50px",
              paddingTop: "70px",
              paddingLeft: "70px",
              fontWeight: "600"
            }}>
              Please Login!
            </Card>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
