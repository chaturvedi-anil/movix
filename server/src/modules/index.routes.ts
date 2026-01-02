import { Router } from "express";
import authRouter from "./auth/auth.routes";

const indexRouter = Router();

indexRouter.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

indexRouter.use("/auth", authRouter);

export default indexRouter;
