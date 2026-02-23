import { EGender } from "@/db";
import z from "zod";

const validators = {
  name: (label: string) =>
    z
      .string()
      .trim()
      .min(1, `${label} is required`)
      .max(255, `${label} must be at most 255 characters`),

  email: z.email().transform((email) => email.toLowerCase()),

  phone: z
    .string()
    .trim()
    .regex(
      /^\+[1-9]\d{7,14}$/,
      "Invalid phone number format (should be in E.164 format)",
    ),

  gender: z.enum(EGender),

  date: z.iso.datetime(),

  flag: z.boolean(),
};

/**
 * Validation interface for user module.
 */
export const UserValidation = {
  /**
   * Validation schema for creating a user with email.
   */
  createUserWithEmail: z.object({
    body: z.object({
      first_name: validators.name("First name"),
      last_name: validators.name("Last name"),
      email: validators.email,
    }),
  }),

  /**
   * Validation schema for creating a user with phone number.
   */
  createUserWithPhoneNumber: z.object({
    body: z.object({
      first_name: validators.name("First name"),
      last_name: validators.name("Last name"),
      phone_number: validators.phone,
    }),
  }),
};
