import { Request, Response } from "express";
import { CatchAsyncRequest } from "../../utils/catchAsync";
import * as entryService from "./entry.service";
import { EntryInput } from "./entry.schema";

export const createEntry = CatchAsyncRequest(
  async (req: Request, res: Response) => {
    const data: EntryInput = req.body;

    const result = await entryService.createEntry(req.user!.id, data);

    res.status(201).json({
      success: true,
      message: "Entry creation request successfully done",
    });
  }
);

export const getEntries = CatchAsyncRequest(
  async (req: Request, res: Response) => {}
);

export const getEntry = CatchAsyncRequest(
  async (req: Request, res: Response) => {}
);

export const deleteEntry = CatchAsyncRequest(
  async (req: Request, res: Response) => {}
);
