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

    const response = await agent.generate(prompt);

    return NextResponse.json({ success: true, recipe: response.text });
  } catch (error: any) {
    console.error("SafeBite API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate recipe" },
      { status: 500 }
    );
  }
}