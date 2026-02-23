import purifyRequest from "@/middlewares/purifyRequest";
import { Router } from "express";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import catchAsync from "@/middlewares/catchAsync";
import { UserService } from "./user.service";

const controller = UserController({
  catchAsync,
  service: UserService,
});

const router = Router();

/**
 * register a new user with email
 */
router.post(
  "/register-with-email",
  purifyRequest(UserValidation.createUserWithEmail),
  controller.createUserWithEmail,
);

export const UserRouter = router;
