import { Prisma } from "@/db";

/**
 * Fields to omit when returning user data, ensuring sensitive information is not exposed.
 */
export const userOmitFields = {
  email_address_encrypted: true,
  email_address_hash: true,
  password_hash: true,
  phone_number_encrypted: true,
  phone_number_hash: true,
} satisfies Prisma.UserOmit;
