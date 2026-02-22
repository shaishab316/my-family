/**
 * This file defines constants and types for the family tree module.
 */

export const EGender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

export type EGender = keyof typeof EGender;
