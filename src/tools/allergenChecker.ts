import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const allergenCheckerTool = createTool({
  id: "allergen-checker",
  description: "Cross-checks a list of proposed ingredients against a user's strict list of allergens.",
  inputSchema: z.object({
    ingredients: z.array(z.string()).describe("List of candidate ingredients"),
    allergens: z.array(z.string()).describe("User's restricted allergens or dietary triggers"),
  }),
  outputSchema: z.object({
    safe: z.boolean(),
    flaggedIngredients: z.array(z.string()),
    warningMessage: z.string(),
  }),
  // The first parameter receives the validated input object directly
  execute: async ({ ingredients, allergens }) => {
    const lowerAllergens = allergens.map((a) => a.toLowerCase());

    const flagged = ingredients.filter((item) =>
      lowerAllergens.some((allergen) => item.toLowerCase().includes(allergen))
    );

    const safe = flagged.length === 0;

    return {
      safe,
      flaggedIngredients: flagged,
      warningMessage: safe
        ? "All ingredients passed safety checks."
        : `DANGER: The following ingredients violate allergen constraints: ${flagged.join(", ")}`,
    };
  },
});