import { Request, Response, Router } from "express";

const authRouter = Router();

authRouter.post("/register", (req: Request, res: Response) => {});
authRouter.post("/login");

authRouter.get("/me");

export default authRouter;
