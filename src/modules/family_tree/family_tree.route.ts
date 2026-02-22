import purifyRequest from "@/middlewares/purifyRequest";
import { Router } from "express";
import { FamilyTreeValidation } from "./family_tree.validation";
import { FamilyTreeController } from "./family_tree.controller";

const router = Router();
const controller = FamilyTreeController();

router.post(
  "/",
  purifyRequest(FamilyTreeValidation.createPerson),
  controller.createPerson,
);

export const FamilyTreeRoutes = router;
