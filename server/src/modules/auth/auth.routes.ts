import { Router } from "express";
import { login, register } from "./auth.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";

const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), register);
authRouter.post("/login", validateRequest(loginSchema), login);

// authRouter.get("/me");

export default authRouter;
