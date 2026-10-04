import "dotenv/config";
import { Mastra } from "@mastra/core";
import { safeBiteAgent } from "../agents/safeBiteAgent";

export const mastra = new Mastra({
  agents: { safeBiteAgent },
});