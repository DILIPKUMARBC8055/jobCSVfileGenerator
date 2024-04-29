import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
      req.email = payload.email;
      next();
    } else return res.send("unauthorized");
  } else {
    return res.send("unauthorized");
  }
};
export default jwtAuth;
