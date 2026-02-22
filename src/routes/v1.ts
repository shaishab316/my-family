import { FamilyTreeRoutes } from "@/modules/family_tree/family_tree.route";
import { Router } from "express";

const router = Router();

router.use("/family-tree", FamilyTreeRoutes);

export const v1Routes = router;
