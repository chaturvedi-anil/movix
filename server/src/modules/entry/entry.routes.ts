import { Router } from "express";
import { validateRequest } from "../../middleware/validate.middleware";
import { entrySchema } from "./entry.schema";
import {
  createEntry,
  deleteEntry,
  getEntries,
  getEntry,
} from "./entry.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";

const entryRouter = Router();

entryRouter.post(
  "/",
  isAuthenticated,
  validateRequest(entrySchema),
  createEntry
);

entryRouter.get("/", getEntries);
entryRouter.get("/:id", getEntry);
entryRouter.delete("/:id", isAuthenticated, deleteEntry);

export default entryRouter;
