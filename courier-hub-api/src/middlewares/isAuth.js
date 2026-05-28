import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Authentication failed.");
    error.statusCode = 401;
    throw new error();
  }
  const token = authHeader.split(" ")[1];
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, "Thisismysecretkey");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (verifiedToken) {
    req.userId = verifiedToken.userId;
    return next();
  }
  const error = new Error("Authentication failed.");
  error.statusCode = 401;
  throw error;
};
