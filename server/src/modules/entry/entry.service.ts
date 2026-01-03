import { EntryInput } from "./entry.schema";
import * as entryRepo from "./entry.repository";
import AppError from "../../utils/appError";

export const createEntry = async (ownerId: string, data: EntryInput) => {
  const isEntryExist = await entryRepo.findUniqueEntry(
    data.title,
    data.director,
    data.releaseYear,
    data.duration
  );

  if (isEntryExist) {
    throw new AppError(409, "Entry already exists with these details");
  }

  const entry = await entryRepo.createEntry(ownerId, data);

  return { entry };
};

export const getEntries = async () => {};

export const getEntry = async () => {};

export const deleteEntry = async () => {};
