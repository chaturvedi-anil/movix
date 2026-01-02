import { Router } from "express";
import { login, register, getMe } from "./auth.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";
import { isAuthenticated } from "../../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), register);
authRouter.post("/login", validateRequest(loginSchema), login);

authRouter.get("/me", isAuthenticated, getMe);

export default authRouter;
