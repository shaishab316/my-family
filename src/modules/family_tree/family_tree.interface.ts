import type { z } from "zod";
import type { EGender } from "./family_tree.constant";
export type { EGender } from "./family_tree.constant";
import type { FamilyTreeValidation } from "./family_tree.validation";
import type { FamilyTreeService } from "./family_tree.service";
import type catchAsync from "@/middlewares/catchAsync";

/******************************************/
/*                                        */
/*             Model  Interface         	*/
/*                                        */
/*****************************************/

/**
 *  UUID is a universally unique identifier.
 */
export type UUID = string;

/**
 * Person is a person in the family tree.
 */
export interface TPerson {
  created_at: Date;
  updated_at: Date;

  /** primary key of the person */
  person_id: UUID;

  /**
   * name used to display the person
   */
  display_name: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  name_suffix?: string;
  name_prefix?: string;

  gender?: EGender;

  /** date of birth */
  dob?: Date;
  /** date of death */
  dod?: Date;

  /** flag to indicate if the person is alive */
  is_alive?: boolean;
}

/**
 * Relationship kind is descriptive of the relationship between two people.
 *
 * - PARENT_OF: from -> to is parent -> child
 * - SPOUSE_OF: from -> to is spouse -> spouse
 */
export type RelationshipKind = "PARENT_OF" | "SPOUSE_OF";

/**
 * Parentage kind is descriptive of the relationship between a parent and child.
 *
 * - BIOLOGICAL: biological parent
 * - ADOPTIVE: adoptive parent
 * - STEP: step parent
 * - FOSTER: foster parent
 * - GUARDIAN: guardian
 */
export type ParentageKind =
  | "BIOLOGICAL"
  | "ADOPTIVE"
  | "STEP"
  | "FOSTER"
  | "GUARDIAN";

/**
 * Marriage status is descriptive of the marriage status of a spouse.
 *
 * - MARRIED: married
 * - WIDOWED: widowed
 * - DIVORCED: divorced
 * - SEPARATED: separated
 * - NEVER_MARRIED: never married
 */
export type MarriageStatus = "MARRIED" | "WIDOWED" | "DIVORCED" | "SEPARATED";

/**
 * Person relation is a directed edge between two people.
 */
export interface TPersonRelation {
  created_at: Date;
  updated_at: Date;

  /** primary key of the relation */
  relation_id: UUID;

  /** Edge direction: from -> to */
  from_person_id: UUID;
  to_person_id: UUID;

  /** kind of relationship */
  relationship_kind: RelationshipKind;

  /** only for relationship_kind === RelationshipKind.PARENT_OF */
  parentage_kind?: ParentageKind;

  /** only for relationship_kind === RelationshipKind.SPOUSE_OF */
  marriage_status?: MarriageStatus;

  /** start date of the relationship */
  start_date?: Date;
  /** end date of the relationship */
  end_date?: Date;
}

/******************************************/
/*                                        */
/*           Validation  Interface      	*/
/*                                        */
/*****************************************/

export type TCreatePerson = z.infer<typeof FamilyTreeValidation.createPerson>;
export type TCreatePersonPayload = TCreatePerson["body"];

/******************************************/
/*                                        */
/*           Controller  Interface      	*/
/*                                        */
/*****************************************/
export type TFamilyTreeControllerOptions = {
  service: typeof FamilyTreeService;
  catchAsync: typeof catchAsync;
};
