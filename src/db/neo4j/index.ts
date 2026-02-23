import neo4j, { type Driver as Neo4jDriver } from "neo4j-driver";
import config from "@/config";
import { logger } from "@/utils/logger";

/**
 * Custom error class for Neo4j connection errors.
 */
export class Neo4jConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Neo4jConnectionError";
  }
}

/**
 * Singleton class for Neo4j client.
 */
class Neo4jClient {
  private static instance: Nullable<Neo4jClient> = null;
  private driver: Nullable<Neo4jDriver> = null;

  /**
   * Private constructor to prevent direct instantiation.
   */
  private constructor() {
    this.driver = neo4j.driver(
      config.neo4j.uri,
      neo4j.auth.basic(config.neo4j.user, config.neo4j.password),
      {
        logging: {
          logger: (level, message) => {
            if (level === "info" || level === "warn") {
              logger.info(`[Neo4j] ${message}`);
            } else if (level === "error") {
              logger.error(`[Neo4j] ${message}`);
            }
          },
        },
      },
    );
  }

  /**
   * Gets the Neo4j client instance.
   */
  public static getInstance(): Neo4jClient {
    return (Neo4jClient.instance ??= new Neo4jClient());
  }

  /**
   * Verifies the Neo4j connection.
   * Call this at app bootstrap for fail-fast behavior.
   */
  public async verifyConnectivity(): Promise<void> {
    const driver = this.getDriver();

    try {
      await driver.verifyConnectivity();
    } catch (error) {
      if (error instanceof Error) {
        throw new Neo4jConnectionError(
          `Failed to connect to Neo4j: ${error.message}`,
        );
      }

      throw new Neo4jConnectionError("Failed to connect to Neo4j");
    }
  }

  /**
   * Gets the Neo4j driver instance.
   */
  public getDriver(): Neo4jDriver {
    if (!this.driver) {
      throw new Neo4jConnectionError("Neo4j driver is not initialized");
    }

    return this.driver;
  }

  /**
   * Gets a Neo4j session for the configured database.
   */
  public getSession() {
    return this.getDriver().session();
  }

  /**
   * Closes the Neo4j driver.
   */
  public async close(): Promise<void> {
    await this.driver?.close();
    this.driver = null;
  }

  /**
   * Destroys the Neo4j client instance.
   */
  public async destroy(): Promise<void> {
    await this.close();
    Neo4jClient.instance = null;
  }
}

/**
 * Neo4j client instance.
 */
export const neo4jClient = Neo4jClient.getInstance();
