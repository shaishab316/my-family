import z from "zod";

/**
 * Common validation rules for authentication-related fields.
 */
const verifications = {
  token: z
    .string()
    .trim()
    .min(50, "Token is required")
    .max(1024, "Token must be less than 1024 characters"),
  otp: z.coerce
    .string()
    .trim()
    .length(6, "OTP must be exactly 6 characters")
    .refine((val) => /^\d+$/.test(val), "OTP must contain only digits"),
};

/**
 * AuthenticationVerification contains Zod schemas for validating authentication-related requests.
 */
export const AuthenticationVerification = {
  /**
   * Schema for verifying a token and OTP.
   */
  verifyToken: z.object({
    query: z.object({
      token: verifications.token,
      otp: verifications.otp,
    }),
  }),
};
