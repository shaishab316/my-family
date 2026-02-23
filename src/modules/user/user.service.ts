import { prisma } from "@/db";
import {
  TCreateUserWithEmailPayload,
  TTempUserTokenPayload,
} from "./user.interface";
import { hashEmail } from "@/utils/crypto";
import { ServerError } from "@/errors";
import { statusCodes } from "@/lib/status_codes";
import { signToken } from "@/utils/jwt";
import { debugError, debugLog } from "@/utils/debug";
import { sendMail } from "@/utils/mailer";
import { verifyEmailTemplate } from "@/templates/emails/verify_email_template";
import config from "@/config";
import { generateOtp } from "@/utils/otp";

/**
 * Service layer for user-related operations.
 */
export const UserService = {
  /**
   * Creates a new user using email-based registration.
   */
  async createUserWithEmail({
    email,
    first_name,
    last_name,
  }: TCreateUserWithEmailPayload) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email_address_hash: hashEmail(email),
      },
    });

    if (existingUser) {
      throw new ServerError(
        statusCodes.BAD_REQUEST,
        "A user with this email already exists",
      );
    }

    const tempUserToken = signToken(
      {
        token_type: "temp_user",

        email,
        first_name,
        last_name,
      } satisfies TTempUserTokenPayload,
      "5m",
    ); // Token valid for 5 minutes

    const otp = await generateOtp({
      secret: email,
      digits: 6,
      period: 300, // OTP valid for 5 minutes
    });

    //? fire-and-forget email sending - we don't want to block user creation if email sending fails
    sendMail({
      to: email,
      subject: "Verify your email address",
      html: verifyEmailTemplate({
        otp,
        verificationLink: `${config.server_url}/api/v1/auth/verify-email?token=${tempUserToken}&otp=${otp}`,
        firstName: first_name,
      }),
    })
      .then(() => {
        debugLog(`[createUserWithEmail] Sent verification email to ${email}`);
      })
      .catch((error) => {
        debugError(
          "[createUserWithEmail] Failed to send verification email: ",
          error,
        );
      });

    return {
      temp_user_token: tempUserToken,
    };
  },
};
