import { EntryInput } from "./entry.schema";
import * as entryRepo from "./entry.repository";
import AppError from "../../utils/appError";
import { logger } from "../../utils/logger";

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
  return entry;
};

export const getEntries = async () => {
  const entries = await entryRepo.findEntries();
  return entries;
};

export const getEntry = async (id: string) => {
  const entry = await entryRepo.findById(id);
  return entry;
};

export const deleteEntry = async (id: string, ownerId: string) => {
  const deleted = await entryRepo.findByIdAndDelete(id, ownerId);
  return deleted;
};
