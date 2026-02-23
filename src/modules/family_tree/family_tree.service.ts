import { neo4jClient } from "@/db";
import { TPerson, TCreatePersonPayload } from "./family_tree.interface";
import { FamilyTreeCypher } from "./family_tree.cypher";

/**
 * FamilyTreeService is a service that handles the business logic for the family tree module.
 */
export const FamilyTreeService = {
  async createPerson(payload: TCreatePersonPayload) {
    const session = neo4jClient.getSession();

    try {
      const result = await session.run(FamilyTreeCypher.createPerson, payload);

      return result?.records[0]?.get("p")?.properties as TPerson;
    } catch (error) {
      console.error("Error creating person:", error);

      throw error;
    } finally {
      await session.close();
    }
  },
};
