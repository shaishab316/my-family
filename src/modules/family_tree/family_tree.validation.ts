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

  date: z.iso.datetime(),

  flag: z.boolean(),
};

export const FamilyTreeValidation = {
  createPerson: z.object({
    body: z.object({
      display_name: validators.name("Display name"),
      first_name: validators.name("First name").nullable().default(null),
      last_name: validators.name("Last name").nullable().default(null),
      middle_name: validators.name("Middle name").nullable().default(null),
      name_suffix: validators.name("Name suffix").nullable().default(null),
      name_prefix: validators.name("Name prefix").nullable().default(null),

      gender: validators.gender.nullable().default(null),

      dob: validators.date.nullable().default(null),
      dod: validators.date.nullable().default(null),

      is_alive: validators.flag.nullable().default(null),
    }),
  }),
};
