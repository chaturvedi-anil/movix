import AppError from "../../utils/appError";
import { signToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import * as authRepository from "./auth.repository";
import { LoginInput, RegisterInput } from "./auth.schema";

export const registerUser = async (data: RegisterInput) => {
  const { username, email, password } = data;

  const isUserExist = await authRepository.findUserByEmail(email);

  if (isUserExist) {
    throw new AppError(409, `User with ${email} email already exists`);
  }

  const passwordHash = await hashPassword(password);

  const user = await authRepository.createUser({
    username,
    email,
    passwordHash,
  });

  if (!user) {
    throw new AppError(500, "Unable to create user");
  }

  const token = signToken({ id: user.id, email: user.email });

  return { user, token };
};

export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await authRepository.findUserByEmailWithPassword(email);

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await comparePassword(password, user.passwordHash);

  if (!isPasswordCorrect) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = signToken({ id: user.id, email: user.email });

  const publicUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return { user: publicUser, token };
};

export const getUser = async (email: string) => {
  const user = await authRepository.findUserByEmail(email);

  return { user };
};
