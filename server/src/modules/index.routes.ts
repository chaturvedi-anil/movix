import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

export default indexRouter;
