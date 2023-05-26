const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.get("Authorization")) {
    return next(createError(401));
  }

  const token = req.get("Authorization").split(" ")[1];
  const secret = process.env.SECRET;
  try {
    const decode = jwt.verify(token, secret);
    req.user = { id: decode.id, username: decode.username };
    next();
  } catch (err) {
    next(createError(401));
  }
};
