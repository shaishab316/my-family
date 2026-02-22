import { neo4jClient } from "@/db";
import { Person, TCreatePersonPayload } from "./family_tree.interface";

/**
 * FamilyTreeService is a service that handles the business logic for the family tree module.
 */
export class FamilyTreeService {
  private driver = neo4jClient.getDriver();

  /**
   * createPerson creates a new person in the family tree.
   */
  async createPerson(payload: TCreatePersonPayload) {
    const session = this.driver.session();

    try {
      const result = await session.run(
        `CREATE (p:Person {
          person_id:    randomUUID(),
          display_name: $display_name,
          first_name:   $first_name,
          last_name:    $last_name,
          middle_name:  $middle_name,
          name_suffix:  $name_suffix,
          name_prefix:  $name_prefix,
          gender:       $gender,
          dob:          $dob,
          dod:          $dod,
          is_alive:     $is_alive
        })
        RETURN p`,
        {
          display_name: payload.display_name,
          first_name: payload.first_name ?? null,
          last_name: payload.last_name ?? null,
          middle_name: payload.middle_name ?? null,
          name_suffix: payload.name_suffix ?? null,
          name_prefix: payload.name_prefix ?? null,
          gender: payload.gender ?? null,
          dob: payload.dob?.toISOString() ?? null,
          dod: payload.dod?.toISOString() ?? null,
          is_alive: payload.is_alive ?? null,
        },
      );

      return result?.records[0]?.get("p")?.properties as Person;
    } catch (error) {
      console.error("Error creating person:", error);

      throw error;
    } finally {
      await session.close();
    }
  }
}
