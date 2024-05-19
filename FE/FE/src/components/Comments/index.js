import { FaComments } from "react-icons/fa";
import { CardContent, Typography } from "@mui/material";
import { getCookie } from "../../helpers/cookie";
import { addComment, getCommentOfPhoto } from "../../services/photoServices";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Comments(props) {
  const {comments, photoId} = props;  
  const token = getCookie("token");
  const [newComment, setNewComment] = useState({});
  const [photoComments, setPhotoComments] = useState(comments);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setNewComment((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleComment = (photoId) => {
    let options = {
      ...newComment
    }
    const addNewComment = async () => {
      const result = await addComment(photoId, token, options);
      if(result.message === "Success"){
        const newPhotoComments = await getCommentOfPhoto(photoId);
        setPhotoComments(newPhotoComments.comments);
        setNewComment({})
        inputRef.current.value = '';
      }

    }
    addNewComment();
  }

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
      <CardContent>
        <Typography
          variant="h5"
          style={{
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            color: "#006400"
            
          }}
        >
          <FaComments style={{ marginRight: "10px", fontSize: "30px" }} />{" "}
          <div>Comments:</div>
        </Typography>
        {photoComments.length === 0 ? (
            <>
            This photo have no comments 
            </>
        ) : (
            <>{photoComments.map((comment) => (
                <div
                  key={comment._id}
                  style={{ borderBottom: "1px solid #444444" }}
                >
                  <Typography variant="body2" style={{ color: "#AAAAAA" }}>
                    {formatDate(comment.date_time)}
                  </Typography>
                  <Typography variant="body1">
                    <Link
                      to={`/user/${comment.user._id}`}
                      style={{
                        textDecoration: "none",
                        fontWeight: "550",
                        color: "#006400",
                      }}
                    >
                      {`${comment.user.first_name} ${comment.user.last_name}`}
                    </Link>
                    : {comment.comment}
                  </Typography>
                </div>
              ))}</>
        )
          }
      </CardContent>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <textarea
            placeholder="Add your comment...."
            cols={80}
            rows={2}
            name="commentContent"
            onChange={handleChange}
            style={{
              borderRadius: "10px",
              paddingTop: "15px",
              marginRight: "10px",
            }}
          ></textarea>
          <button
            style={{
              width: "70px",
              height: "40px",
              borderRadius: "10px",
              cursor: "pointer",
              
            }}
            onClick={() => handleComment(photoId)}
            ref={inputRef}
          >
            Add
          </button>
        </div>
      </CardContent>
    </>
  );
}

export default Comments;
