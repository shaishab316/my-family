import type { z } from "zod";
import type { UserValidation } from "./user.validation";
import { UserService } from "./user.service";
import catchAsync from "@/middlewares/catchAsync";

/******************************************/
/*                                        */
/*           Validation  Interface      	*/
/*                                        */
/*****************************************/

export type TCreateUserWithEmail = z.infer<
  typeof UserValidation.createUserWithEmail
>;
export type TCreateUserWithEmailPayload = TCreateUserWithEmail["body"];

export type TCreateUserWithPhoneNumber = z.infer<
  typeof UserValidation.createUserWithPhoneNumber
>;
export type TCreateUserWithPhoneNumberPayload =
  TCreateUserWithPhoneNumber["body"];

/******************************************/
/*                                        */
/*           Service  Interface         	*/
/*                                        */
/*****************************************/

export type TTempUserTokenPayload = {
  token_type: "temp_user";

  email: string;
  first_name: string;
  last_name: string;
};

/******************************************/
/*                                        */
/*           Controller  Interface      	*/
/*                                        */
/*****************************************/

export type TUserControllerOptions = {
  service: typeof UserService;
  catchAsync: typeof catchAsync;
};
