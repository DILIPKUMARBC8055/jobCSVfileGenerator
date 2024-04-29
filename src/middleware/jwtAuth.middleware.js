// Import JWT module for authentication
import jwt from "jsonwebtoken";

// Middleware function for JWT authentication
const jwtAuth = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token;
  
  // Check if token exists
  if (token) {
    try {
      // Verify token validity
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      
      // If payload exists, set email in request and proceed to next middleware
      if (payload) {
        req.email = payload.email;
        next();
      } else {
        // If payload doesn't exist, send unauthorized response
        return res.send("unauthorized");
      }
    } catch (error) {
      // If token verification fails, send unauthorized response
      return res.send("unauthorized");
    }
  } else {
    // If no token is present, send unauthorized response
    return res.send("unauthorized");
  }
};

// Export JWT authentication middleware
export default jwtAuth;
