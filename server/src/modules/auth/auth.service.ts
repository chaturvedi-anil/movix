import AppError from "../../utils/AppError";
import * as authRepository from "./auth.repository";

export const signupUser = async (data: any) => {
  const { email } = data;
  const isUserExisting = await authRepository.findUserByEmail(email);

  if (isUserExisting) {
    throw new AppError(`User with ${email} email already exists`, 400);
  }

  const hashedPassword = await hashPassword(password);

  const user = await authRepository.createUser({
    ...data,
    password: hashedPassword,
  });

  const token = signToken({ id: user.id, role: user.role });
  return { user, token };
};
