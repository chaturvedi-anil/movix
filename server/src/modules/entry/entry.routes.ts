import { Router } from "express";
import { validateRequest } from "../../middleware/validate.middleware";
import { entrySchema } from "./entry.schema";
import { createEntry } from "./entry.controller";

const entryRouter = Router();

entryRouter.post("/entries", validateRequest(entrySchema), createEntry);

export default entryRouter;
