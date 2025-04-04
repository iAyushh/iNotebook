var jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;  // Ensure that the `verified` object contains a `user` property
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};



module.exports = fetchUser;
