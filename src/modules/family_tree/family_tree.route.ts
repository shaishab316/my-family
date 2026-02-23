import catchAsync from "@/middlewares/catchAsync";
import purifyRequest from "@/middlewares/purifyRequest";
import { Router } from "express";
import { FamilyTreeValidation } from "./family_tree.validation";
import { FamilyTreeController } from "./family_tree.controller";
import { FamilyTreeService } from "./family_tree.service";

const controller = FamilyTreeController({
  service: FamilyTreeService,
  catchAsync,
});

const router = Router();

/**
 * createPerson creates a new person in the family tree.
 */
router.post(
  "/",
  purifyRequest(FamilyTreeValidation.createPerson),
  controller.createPerson,
);

/**
 * FamilyTreeRoutes is the router for the family tree module.
 */
export const FamilyTreeRoutes = router;
