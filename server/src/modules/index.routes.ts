import { Router } from "express";
import authRouter from "./auth/auth.routes";
import entryRouter from "./entry/entry.routes";

const indexRouter = Router();

indexRouter.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

indexRouter.use("/auth", authRouter);

indexRouter.use("/entries", entryRouter);

export default indexRouter;
