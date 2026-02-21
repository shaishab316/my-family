import { type Driver as Neo4jDriver } from 'neo4j-driver';
import { neo4jClient } from '@/db';

export class FamilyTreeService {
	private driver = neo4jClient.getDriver();

	async createPerson() {}
}
