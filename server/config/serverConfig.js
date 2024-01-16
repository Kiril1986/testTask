const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionConfig = require("./sessionConfig.js");
const UserRouter = require("../routes/views/users.routes");
const AuthRouter = require("../routes/views/apiUsers.routes.js")

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
const serverConfig = (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(cors(corsOptions));
  app.use(session(sessionConfig)); 
  app.use(cookieParser()); 
  app.use("/", UserRouter);
  app.use("/", AuthRouter)
  };

module.exports = serverConfig;

