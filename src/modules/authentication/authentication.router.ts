import { Router } from "express";
import catchAsync from "@/middlewares/catchAsync";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import purifyRequest from "@/middlewares/purifyRequest";
import { AuthenticationVerification } from "./authentication.verification";

const controller = AuthenticationController({
  catchAsync,
  service: AuthenticationService,
});

const router = Router();

/**
 * Route for verifying email using token and OTP.
 */
router.get(
  "/verify-email",
  purifyRequest(AuthenticationVerification.verifyToken),
  controller.verifyEmail,
);

export const AuthenticationRouter = router;
