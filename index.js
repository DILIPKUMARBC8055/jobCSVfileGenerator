// Import necessary modules and dependencies
import express from "express";
import bodyParser from "body-parser";
import employeeRouter from "./src/route/employee.route.js";
import ApplicationError from "./errorHandling/customError.error.js";
import connectToDB from "./config/mongoose.config.js";
import ejs from "ejs";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";

// Create an instance of the Express server
const server = express();

// Set up middleware
server.use(cookieParser());
server.set("views", path.join(path.resolve(), "src", "view"));
server.use(expressEjsLayouts);
server.set("view engine", "ejs");
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
server.use("/", employeeRouter);

// Error handling middleware
server.use((err, req, res, next) => {
  console.log(err);
  // Handle custom application errors
  if (err instanceof ApplicationError) {
    return res
      .status(err.code)
      .send(
        "There is a problem with the server. We will fix it soon. Stay tuned."
      );
  }
  // Handle JWT token expiration error
  if (err.message.includes("jwt expired")) {
    return res.status(400).send("Session Expired login again ");
  }
  // Handle other unexpected errors
  return res.status(500).send("there was some error please wait");
});

// Start the server and connect to the database
server.listen(process.env.PORT, () => {
  console.log("The server is listening at port: 8080");
  connectToDB();
});
