import type {
  TCreatePerson,
  TFamilyTreeControllerOptions,
} from "./family_tree.interface";

/**
 * FamilyTreeController is a controller that handles the HTTP requests for the family tree module.
 */
export const FamilyTreeController = ({
  service,
  catchAsync,
}: TFamilyTreeControllerOptions) => ({
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
