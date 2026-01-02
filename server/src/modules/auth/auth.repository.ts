import { prismaClient } from "../../configs/database";

export const createUser = (data: any) => {
  return prismaClient.user.create({
    data: data,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });
};
export const findUserByEmail = (email: string) => {
  return prismaClient.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserByEmailWithPassword = (email: string) => {
  return prismaClient.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      passwordHash: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserById = (id: string) => {
  return prismaClient.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      username: true,
      email: true,
      passwordHash: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
