import { Request, Response, NextFunction } from "express";
import { CatchAsyncRequest } from "../../utils/catchAsync";
import * as entryService from "./entry.service";
import { EntryInput } from "./entry.schema";
import { logger } from "../../utils/logger";
import { serialize } from "../../utils/serialize";

export const createEntry = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const data: EntryInput = req.body;
    const id = req.user!.id;
    const result = await entryService.createEntry(id, data);

    res.status(201).json({
      success: true,
      message: "Entry creation request successfully done",
      result,
    });
  }
);

export const getEntries = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = serialize(await entryService.getEntries());
    logger.info("controller result: ", result[0]);
    res.status(201).json({
      success: true,
      result,
    });
  }
);

export const getEntry = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const entryId = req.params!.id;
    const result = await entryService.getEntry(entryId);

    res.status(201).json({
      success: true,
      result,
    });
  }
);

export const deleteEntry = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const entryId = req.params!.id;
    const ownerId = req.user!.id;

    const result = await entryService.deleteEntry(entryId, ownerId);

    res.status(201).json({
      success: true,
      result,
    });
  }
);
