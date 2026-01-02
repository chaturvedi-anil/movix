import { Request, Response } from "express";
import { CatchAsyncRequest } from "../../utils/catchAsync";
import * as authService from "./auth.service";

export const register = CatchAsyncRequest(
  async (req: Request, res: Response) => {
    const data = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Registration completed successfully",
      data,
    });
  }
);

export const login = CatchAsyncRequest(async (req: Request, res: Response) => {
  const data = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "LoggedIn successfully",
    data,
  });
});

export const getMe = CatchAsyncRequest(async (req: Request, res: Response) => {
  const email = req.user!.email;

  const data = await authService.getUser(email);

  res.status(200).json({
    success: true,
    data,
  });
});
