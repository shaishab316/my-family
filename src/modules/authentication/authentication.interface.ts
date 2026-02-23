import type { z } from "zod";
import type { AuthenticationVerification } from "./authentication.verification";
import catchAsync from "@/middlewares/catchAsync";
import { AuthenticationService } from "./authentication.service";

/******************************************/
/*                                        */
/*           Validation  Interface      	*/
/*                                        */
/*****************************************/

export type TVerifyToken = z.infer<
  typeof AuthenticationVerification.verifyToken
>;
export type TVerifyTokenPayload = TVerifyToken["query"];

/******************************************/
/*                                        */
/*           Controller  Interface      	*/
/*                                        */
/*****************************************/

export type TAuthenticationControllerOptions = {
  service: typeof AuthenticationService;
  catchAsync: typeof catchAsync;
};
