import express from "express";
import bodyParser from "body-parser";
import employeeRouter from "./src/route/employee.route.js";
import ApplicationError from "./errorHandling/customError.error.js";
import connectToDB from "./config/mongoose.config.js";
import ejs from "ejs";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
const server = express();

// Set the view engine
server.use(cookieParser());
server.set("views", path.join(path.resolve(), "src", "view"));
server.use(expressEjsLayouts);
server.set("view engine", "ejs");
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", employeeRouter);

// Serve static files

server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    return res
      .status(err.code)
      .send(
        "There is a problem with the server. We will fix it soon. Stay tuned."
      );
  }
  if (err.message.includes("jwt expired")) {
    return res.status(400).send("Session Expired login again ");
  }
  return res.status(500).send("there was some error please wait");
});

server.listen(8080, () => {
  console.log("The server is listening at port: 8080");
  connectToDB();
});
