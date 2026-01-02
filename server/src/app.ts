import express from "express";
import cors from "cors";
import { ErrorMiddleware } from "./middleware/error.middleware";
import indexRouter from "./modules/index.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", indexRouter);

app.use(ErrorMiddleware);

export default app;
