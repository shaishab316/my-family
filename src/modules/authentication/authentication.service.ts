import { verifyToken } from "@/utils/jwt";
import { TVerifyTokenPayload } from "./authentication.interface";
import { TTempUserTokenPayload } from "../user/user.interface";
import { ServerError } from "@/errors";
import { statusCodes } from "@/lib/status_codes";
import { verifyOtp } from "@/utils/otp";
import { prisma } from "@/db";
import { encryptEmail, hashEmail, hashPassword } from "@/utils/crypto";
import { userOmitFields } from "../user/user.constant";

/**
 * Service layer for authentication-related operations.
 */
export const AuthenticationService = {
  /**
   * Verifies the provided token and OTP for user authentication.
   */
  async verifyEmail({ otp, token }: TVerifyTokenPayload) {
    const tempUser = verifyToken(token) as TTempUserTokenPayload;

    if (tempUser.token_type !== "temp_user") {
      throw new ServerError(statusCodes.BAD_REQUEST, "Invalid token type");
    }

    const isOtpValid = await verifyOtp({
      secret: tempUser.email,
      digits: 6,
      period: 300, // OTP valid for 5 minutes
      token: otp,
    });

    if (!isOtpValid) {
      throw new ServerError(statusCodes.BAD_REQUEST, "Invalid or expired OTP");
    }

    let existingUser = await prisma.user.findFirst({
      where: {
        email_address_hash: hashEmail(tempUser.email),
      },
      omit: userOmitFields,
    });

    if (existingUser) {
      if (!existingUser.is_email_verified) {
        existingUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { is_email_verified: true },
          omit: userOmitFields,
        });
      }

      return existingUser;
    }

    const newUser = await prisma.user.create({
      data: {
        email_address_encrypted: encryptEmail(tempUser.email),
        email_address_hash: hashEmail(tempUser.email),
        display_name: `${tempUser.first_name} ${tempUser.last_name}`,
        first_name: tempUser.first_name,
        last_name: tempUser.last_name,
        password_hash: await hashPassword(Math.random().toString(36).slice(-8)), // Generate a random password hash
        is_email_verified: true,
      },
      omit: userOmitFields,
    });

    return newUser;
  },
};
