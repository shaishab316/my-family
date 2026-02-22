import catchAsync from "@/middlewares/catchAsync";
import { FamilyTreeService } from "./family_tree.service";
import { TCreatePerson } from "./family_tree.interface";

/**
 * FamilyTreeController is a controller that handles the HTTP requests for the family tree module.
 */
export const FamilyTreeController = (service = new FamilyTreeService()) => ({
  /**
   * createPerson creates a new person in the family tree.
   */
  createPerson: catchAsync<TCreatePerson>(async ({ body }) => {
    const result = await service.createPerson(body);

    return {
      message: "Person created successfully",
      data: result,
    };
  }),
});
