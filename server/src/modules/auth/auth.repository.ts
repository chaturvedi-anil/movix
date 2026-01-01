import { prismaClient } from "../../configs/database";

export const createUser = (data: any) => {
  prismaClient.user.create({
    data: data,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });
};
export const findUserByEmail = (email: string) => {};
export const findUserById = (id: string) => {};
