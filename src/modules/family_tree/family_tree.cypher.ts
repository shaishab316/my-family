/**
 * FamilyTreeCypher is a collection of Cypher queries for the family tree module.
 */
export const FamilyTreeCypher = {
  /**
   * createPerson creates a new person in the family tree.
   */
  createPerson: /* cypher */ `CREATE (p:Person {
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
};
