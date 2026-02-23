import { existsSync } from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV ?? "development";

for (const file of [`.env.${NODE_ENV}`, ".env"]) {
  const filePath = path.resolve(process.cwd(), file);

  if (existsSync(filePath)) {
    dotenv.config({
      path: filePath,

      //? Don't override existing environment variables
      override: false,
    });
  }
}

export default process.env;
