export default {
  port: Number(process.env.PORT ?? 3000),
  neo4j: {
    uri: String(process.env.NEO4J_URI),
    user: String(process.env.NEO4J_USER),
    password: String(process.env.NEO4J_PASSWORD),
    database: String(process.env.NEO4J_DATABASE),
  },
};
