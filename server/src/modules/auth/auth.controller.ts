import { Request, Response } from "express";
import { CatchAsyncRequest } from "../../utils/catchAsync";

export const register = CatchAsyncRequest(
  async (req: Request, res: Response) => {}
);
