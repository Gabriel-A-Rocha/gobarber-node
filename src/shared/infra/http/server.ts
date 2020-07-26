import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routes/index";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";

//importar a conexão com o postgres
import "@shared/infra/typeorm/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    //caso ocorra um erro conhecido
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.log(err);

    //caso ocorra um erro inesperado
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => {
  console.log("GoBarber server running on port 3333. ✅");
});
