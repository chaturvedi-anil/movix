import { Router } from "express";
import { validateRequest } from "../../middleware/validate.middleware";
import { entrySchema } from "./entry.schema";
import { createEntry } from "./entry.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";

const entryRouter = Router();

entryRouter.post(
  "/",
  isAuthenticated,
  validateRequest(entrySchema),
  createEntry
);

export default entryRouter;
