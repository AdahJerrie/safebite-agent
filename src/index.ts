import "dotenv/config"; // Loads environment variables before any other module initializations
import { mastra } from "./mastra/index.js";

async function run() {
  const agent = mastra.getAgent("safeBiteAgent");

  const prompt = `
  Roommate Allergies: Severe Peanuts and Dairy.
  Available Ingredients: Chicken breast, garlic, olive oil, rice, spinach, soy sauce.
  Preparation Time limit: Under 20 minutes.

  Please generate a safe dinner recipe using these ingredients.
  `;

  console.log("Generating safe recipe...\n");
  const response = await agent.generate(prompt);

  console.log("--- SafeBite Output ---");
  console.log(response.text);
}

run().catch(console.error);