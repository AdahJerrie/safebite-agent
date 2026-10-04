import { NextResponse } from "next/server";
import { mastra } from "../../../mastra/index";

export async function POST(req: Request) {
  try {
    const { ingredients, allergies, maxTime } = await req.json();

    const agent = mastra.getAgent("safeBiteAgent");

    const prompt = `
      Roommate Allergies: ${allergies.join(", ") || "None"}
      Available Ingredients: ${ingredients.join(", ")}
      Preparation Time Limit: Under ${maxTime} minutes.

      Please generate a safe dinner recipe using these ingredients.
    `;

    const response = typeof agent.generateLegacy === "function" 
      ? await agent.generateLegacy(prompt)
      : await agent.generate(prompt);

    // Extract tool calls / steps if available from Mastra's execution response
    const toolResults = response.toolResults || response.steps || [];

    return NextResponse.json({ 
      success: true, 
      recipe: response.text,
      toolCalls: toolResults,
      verified: true
    });
  } catch (error: any) {
    console.error("SafeBite API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate recipe" },
      { status: 500 }
    );
  }
}