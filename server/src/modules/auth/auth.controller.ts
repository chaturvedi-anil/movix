import { Request, Response } from "express";
import { CatchAsyncRequest } from "../../utils/catchAsync";
import * as authService from "./auth.service";

export const register = CatchAsyncRequest(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Registration completed successfully",
      result,
    });
  }
);

export const login = CatchAsyncRequest(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "LoggedIn successfully",
    result,
  });
});
