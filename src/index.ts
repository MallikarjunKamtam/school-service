// src/index.ts
import express from "express";
import routes from "./routes/index";
import { sequelize } from "../models";
import cors from "cors";
import { globalExceptionHandler } from "./utils.ts/errorHandler";
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");
const port = process.env.PORT ?? 3000;
const app = express();
const helmet = require("helmet");

app.use(helmet());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(globalExceptionHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
});

sequelize
  .sync()
  .then(() => {
    console.log("Connected to the database");
    app.use(routes);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Error connecting to the database:", error));
