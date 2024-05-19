const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const jwt = require("jsonwebtoken");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AdminRouter = require("./routes/AdminRouter");
const privateKey = fs.readFileSync('private.key');

//database connection
dbConnect();

//config
app.use(cors());
app.use(express.json());

//middleware
// app.use((req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ message: 'Missing authorization token' });
//   try {
//     const decoded = jwt.verify(token.split(" ")[1], privateKey);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid authorization token' });
//   }
// });
      
//routes
app.use("/admin", AdminRouter);
app.use("/user", UserRouter);
app.use("/photo", PhotoRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello from photo-sharing app API!" });
});


app.use("/uploads", express.static('./uploads'));

app.listen(3006, () => {
  console.log("server listening on port 3006");
});
