import { z } from "zod";

export const entrySchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 characters long")
    .max(255, "Title must be at most 255 characters long"),

  description: z
    .string()
    .min(1, "Description must be at least 20 characters long")
    .max(255, "Description must be at most 255 characters long")
    .optional(),

  releaseYear: z
    .number()
    .min(1888, "Year must be valid")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  director: z
    .string()
    .min(3, "Director must be at least 3 characters long")
    .max(100, "Director must be at most 100 characters long"),

  budget: z.number().positive("Budget must be a positive number"),
  boxOffice: z.number().positive("Budget must be a positive number"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  type: z.enum(["MOVIE", "TV_SHOW", "SHORT_FILMS"]),
});

export type EntryInput = z.infer<typeof entrySchema>;
