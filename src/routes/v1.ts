import { AuthenticationRouter } from "@/modules/authentication/authentication.router";
import { FamilyTreeRoutes } from "@/modules/family_tree/family_tree.route";
import { UserRouter } from "@/modules/user/user.router";
import { Router } from "express";

const router = Router();

router.use("/auth", AuthenticationRouter);

router.use("/users", UserRouter);

router.use("/family-tree", FamilyTreeRoutes);

export const v1Routes = router;
