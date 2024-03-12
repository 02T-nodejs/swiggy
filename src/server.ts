import { Application } from "express";
import mongoose from "mongoose";
import { GetEnvironmentVariables } from "./enviroments/enviroment";
import UserRouter from "./routers/UserRouter";
import express = require("express");
import bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

export class Server {
  public app: Application = express();

  constructor() {
    this.setConfigs();
    this.setRouter();
  }

  setConfigs() {
    // connected to mongo
    this.connectMongoDB();
    // set body parser
    this.configureBodyParser();
    //
    this.configureFomData();
    // handle errors
    this.handleErrors();
  }
  connectMongoDB() {
    mongoose
      .connect(GetEnvironmentVariables().db_uri)
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.error("Could not connect to MongoDB..."));
  }
  setRouter() {
    this.userRouter();
    this.error404Handler();
  }
  userRouter() {
    this.app.use("/api/user", UserRouter);
  }
  configureBodyParser() {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.app.use(bodyParser.json());
  }
  configureFomData() {
    this.app.use(upload.array());
    this.app.use(express.static("uploads"));
  }

  error404Handler() {
    this.app.use((req, res, next) => {
      res.status(404).json({
        message: "Not found",
        status_code: 404,
      });
    });
  }
  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = error.status || 500;
      const errorMessage = error.message || "Something went wrong!";
      res.status(500).json({
        message: errorMessage,
        status_code: errorStatus,
      });
    });
  }
}
