import {
  TAuthenticationControllerOptions,
  TVerifyToken,
} from "./authentication.interface";

/**
 * Controller layer for authentication-related operations.
 */
export const AuthenticationController = ({
  catchAsync,
  service,
}: TAuthenticationControllerOptions) => ({
  /**
   * Handles the verification of a token and OTP for user authentication.
   */
  verifyEmail: catchAsync<TVerifyToken>(async ({ query }) => {
    const data = await service.verifyEmail(query);

    return {
      message: "Email verified successfully",
      data,
    };
  }),
});
