const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('private.key');

module.exports = function (req, res, next) {
    const token = req.headers["authorization"];
    if (typeof token !== "undefined") {
      jwt.verify(token.split(" ")[1], privateKey, (err, decoded) => {
        if (err) {
          res.status(403).send("Invalid token");
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } else {
      res.status(401).send("Unauthorized");
    }
};

