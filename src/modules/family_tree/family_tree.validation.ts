import z from "zod";
import { EGender } from "./family_tree.constant";

/**
 * This module defines the validation schemas for the family tree module using Zod.
 * It ensures that the data for creating and updating persons in the family tree
 * adheres to the expected formats and constraints.
 */
const validators = {
  name: (label: string) =>
    z
      .string()
      .trim()
      .min(1, `${label} is required`)
      .max(255, `${label} must be at most 255 characters`),

  gender: z.enum(EGender),

  date: z.iso.datetime().transform((str) => new Date(str)),

  flag: z.boolean(),
};

export const FamilyTreeValidation = {
  createPerson: z.object({
    body: z.object({
      display_name: validators.name("Display name"),
      first_name: validators.name("First name").optional(),
      last_name: validators.name("Last name").optional(),
      middle_name: validators.name("Middle name").optional(),
      name_suffix: validators.name("Name suffix").optional(),
      name_prefix: validators.name("Name prefix").optional(),

      gender: validators.gender.optional(),

      dob: validators.date.optional(),
      dod: validators.date.optional(),

      is_alive: validators.flag.optional(),
    }),
  }),
};
