import { debuglog as debug } from "node:util";

export const debugLog = debug("app:log");
export const debugError = debug("app:error");
