import { TCreateUserWithEmail, TUserControllerOptions } from "./user.interface";

/**
 * UserController is a controller that handles the HTTP requests for the user module.
 */
export const UserController = ({
  catchAsync,
  service,
}: TUserControllerOptions) => ({
  /**
   * Create a new user with email.
   */
  createUserWithEmail: catchAsync<TCreateUserWithEmail>(async ({ body }) => {
    const data = await service.createUserWithEmail(body);

    return {
      message: "User created successfully",
      data,
    };
  }),
});
