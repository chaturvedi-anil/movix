import { prismaClient } from "../../configs/database";
import { EntryInput } from "./entry.schema";

export const createEntry = (ownerId: string, data: EntryInput) => {
  return prismaClient.entry.create({
    data: {
      title: data.title,
      description: data.description,
      releaseYear: data.releaseYear,
      director: data.director,
      budget: data.budget,
      boxOffice: data.boxOffice,
      duration: data.duration,
      type: data.type,
      ownerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      releaseYear: true,
      director: true,
      budget: true,
      boxOffice: true,
      duration: true,
      type: true,
      ratings: true,
      likes: true,
    },
  });
};

export const findUniqueEntry = (
  title: string,
  director: string,
  releaseYear: number,
  duration: number
) => {
  return prismaClient.entry.findFirst({
    where: {
      title: title,
      director: director,
      releaseYear: releaseYear,
      duration: duration,
    },
    select: {
      id: true,
      title: true,
      description: true,
      releaseYear: true,
      director: true,
      budget: true,
      boxOffice: true,
      duration: true,
      type: true,
      ratings: true,
      likes: true,
    },
  });
};

export const findById = (id: string) => {
  return prismaClient.entry.findUnique({ where: { id: id } });
};

export const findEntries = () => {
  return prismaClient.entry.findMany();
};

export const findByIdAndDelete = (id: string, ownerId: string) => {
  return prismaClient.entry.delete({ where: { id: id, ownerId: ownerId } });
};
