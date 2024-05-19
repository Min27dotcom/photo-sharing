const express = require("express");
const Photos = require("../db/photoModel");
const Users = require("../db/userModel");
const router = express.Router();
const verifyToken = require("../helpers/verifyToken");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Lay anh cua user theo userid
router.get("/:id", async function (request, response) {
  try {
    var id = request.params.id;
    const photos = await Photos.find({ user_id: id });
    if (!photos || photos.length === 0) {
      console.log(`** Photos for user with id ${id}: Not Found! **`);
      return response.status(400).json({ message: "NOT FOUND" });
    }
    const listPhotos = JSON.parse(JSON.stringify(photos));
    for (let photo of listPhotos) {
      delete photo.__v;
      for (let comment of photo.comments) {
        const user = await Users.findOne({ _id: comment.user_id });
        if (user) {
          const { location, description, occupation, __v, ...rest } =
            user.toJSON();
          comment["user"] = rest;
        }
      }
    }
    response.json(listPhotos);
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send("Internal Server Error");
  }
});

//Tao comment moi theo photoId
router.post("/comment/:photoId", verifyToken, async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const comment = {
      user_id: req.user[0]._id,
      comment: req.body.commentContent,
    };
    const photo = await Photos.findByIdAndUpdate(photoId, {
      $push: { comments: comment },
    });
    if (photo) {
      res.json({ message: "Success" });
    } else {
      res.json({ message: "Fail" });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send("Internal Server Error");
  }
});

//Lay tat ca comment cua anh theo photoId
router.get("/comment/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const photo = await Photos.findOne({ _id: photoId });
    if (photo) {
      const photoObj = JSON.parse(JSON.stringify(photo));
      for (let comment of photoObj.comments) {
        const user = await Users.findOne({ _id: comment.user_id });
        if (user) {
          const { location, description, occupation, __v, ...rest } =
            user.toJSON();
          comment["user"] = rest;
        }
      }
      res.json(photoObj);
    } else {
      res.json({ message: "Fail" });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send("Internal Server Error");
  }
});

router.post('/deleteCommentOfPhoto', function (request, response) {
  // Check if user is logged in, if not, respond with status 401 unauthorized
  if (!request.session.user_id) {
      console.log("Please log in.");
      response.status(401).send(JSON.stringify("Please log in."));
      return;
  }

  if (!request.body.photo_id || !request.body.comment_id) {
      console.log("Must provide photo ID and comment ID.");
      response.status(400).send("Must provide photo ID and comment ID.");
      return;
  }    

  let photo_id = request.body.photo_id;
  let comment_id = request.body.comment_id;

  //Add comment with user_id, comment and datetime to MongoDB database
  Photos.findOne({_id: photo_id}, function (err, photo) {
      if (err) {
          console.error('Error getting photo with id ', photo_id, err);
          response.status(400).send("Error getting photo. ", JSON.stringify(err));
          return;
      }
      if (!photo) {
          console.log("Photo was not found.");
          response.status(400).send("Photo was not found.");
          return;
      }

      let user_id = request.session.user_id;
      
      //Loop through comments to delete the one that matches comment_id
      for (let i = 0; i < photo.comments.length; i++) {
          //The _id field is an object so have to convert it to a string before comparison
          if (photo.comments[i]._id.toString() === comment_id) {
              //Check if user is allowed to delete the comment
              if (photo.comments[i].user_id.toString() !== user_id) {
                  console.log("You can only delete your own comments.");
                  response.status(400).end("You can only delete your own comments.");
                  return
              }

              photo.comments.splice(i, 1);
              photo.save();

              console.log('Successfully deleted comment.');
              response.status(200).end('Successfully deleted comment.');
              return;
          }
      }
      
      console.log('Comment not found.');
      response.status(200).end('Comment not found.');
  });
});


// //xoa cmt
// app.post('/removeComment/:photoId', verifyToken, async (request, response) => {
//   // try {
//     const photoId = req.params.photoId;
//     const comment = {
//       user_id: req.user[0]._id,
//       comment: req.body.commentContent,
//     };
//     console.log(comment)
//     // const photo = await Photos.findByIdAndUpdate(photoId, {
//     //   $push: { comments: comment },
//     // });
//     // if (photo) {
//     //   res.json({ message: "Success" });
//     // } else {
//     //   res.json({ message: "Fail" });
//     // }


//     var time;
//     // overwrite the comments array of that photo to omit that comment
//     Photos.findOne({_id: request.params.photo_id}, (error, photo) => {
//         if (error) {
//             console.log('Error finding photo in /removeComment');
//             response.status(500).send();
//             return;
//         }
//         var newCommentsArr = [];
//         for (var comment of photo.comments) {
//             if (comment._id != request.body.comment_id) {
//                 newCommentsArr = newCommentsArr.concat([comment]);

//             } else {
//                 if (comment.user_id != request.session.user_id) {
//                     response.status(400).send('Cannot delete another user\'s comment');
//                     return;
//                 }
//                 time = comment.date_time;
//             }
//         }
//         photo.comments = newCommentsArr;
//         photo.save();
//         console.log(newCommentsArr);
//         Photos.comments.deleteOne({date_time: time}, (error) => {
//             console.log(time);
//             assert(!error);
//             Users.findOne({_id: request.session.user_id}, (error, user) => {
//                 if (error) {
//                     console.log('Error finding user in /removeComment');
//                     response.status(500).send();
//                     return; 
//                 }
//                 user.activity = {};
//                 user.save();
//             });
//             console.log('Successfully removed comment activity');
//         });
//         response.status(200).send();
//     });
// });

router.post(
  "/upload",
  upload.single("avatar"),
  verifyToken,
  async (req, res) => {
    try {
      console.log(req.file);
      const photo = {
        file_name: req.file.filename,
        user_id: req.user[0]._id,
      };
      const newPhoto = await Photos.create(photo);
      if (!newPhoto) {
        res.status(400).send("Fail");
      }
      res.json(newPhoto);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Xoa photo theo photoId
router.delete("/:id", async (req, res) => {
  try {
    const photoId = req.params.id;
    const delPhoto = await Photos.deleteOne({ _id: photoId });
    if (delPhoto.deletedCount === 0) {
      res.status(404).send("Photo not found!");
    }
    res.json({ message: "Delete Success!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
