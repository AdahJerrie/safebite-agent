"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const COMMON_ALLERGENS = [
  { name: "Peanuts", icon: "🥜" },
  { name: "Tree Nuts", icon: "🌰" },
  { name: "Dairy", icon: "🥛" },
  { name: "Eggs", icon: "🥚" },
  { name: "Soy", icon: "🫘" },
  { name: "Gluten", icon: "🌾" },
  { name: "Shellfish", icon: "🦐" },
  { name: "Fish", icon: "🐟" },
];

export default function SafeBiteDashboard() {
  const [ingredients, setIngredients] = useState<string[]>([
    "Chicken breast",
    "Garlic",
    "Olive oil",
    "Rice",
    "Spinach",
  ]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [allergies, setAllergies] = useState<string[]>(["Peanuts", "Dairy"]);
  const [maxTime, setMaxTime] = useState<number>(20);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);

  const toggleAllergy = (allergyName: string) => {
    setAllergies((prev) =>
      prev.includes(allergyName)
        ? prev.filter((a) => a !== allergyName)
        : [...prev, allergyName]
    );
  };

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = ingredientInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (item: string) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const generateRecipe = async () => {
    setLoading(true);
    setRecipe(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, allergies, maxTime }),
      });
      const data = await res.json();
      if (data.success) {
        setRecipe(data.recipe);
      } else {
        alert("Error generating recipe: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to SafeBite Agent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl shadow-inner">
              🥗
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                SafeBite AI
              </h1>
              <p className="text-xs text-slate-400">
                Allergy-Aware Agentic Meal Planner
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Agent Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-3 py-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
            Safe Recipes, Tailored to Your Pantry.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Select your active dietary restrictions and pantry items. Our AI agent
            will screen every ingredient against potential allergens before crafting your recipe.
          </p>
        </div>

        {/* Input Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allergens Selector */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-semibold text-rose-400 flex items-center gap-2">
                <span>🛡️</span> Active Restrictions
              </h3>
              <span className="text-xs text-slate-500">
                {allergies.length} selected
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {COMMON_ALLERGENS.map((item) => {
                const active = allergies.includes(item.name);
                return (
                  <button
                    key={item.name}
                    onClick={() => toggleAllergy(item.name)}
                    type="button"
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                      active
                        ? "bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-sm"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pantry Ingredients Input */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
                <span>🥬</span> Available Pantry Items
              </h3>
              <span className="text-xs text-slate-500">
                {ingredients.length} items
              </span>
            </div>

            <form onSubmit={addIngredient} className="flex gap-2">
              <input
                type="text"
                placeholder="Add ingredient (e.g. Avocado)..."
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition shadow-md"
              >
                Add
              </button>
            </form>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
              {ingredients.map((item) => (
                <span
                  key={item}
                  className="bg-slate-950/60 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xs"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeIngredient(item)}
                    className="text-slate-500 hover:text-rose-400 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2 space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Max Prep Time</span>
              <span className="text-emerald-400 font-bold">{maxTime} Mins</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <button
            onClick={generateRecipe}
            disabled={loading || ingredients.length === 0}
            type="button"
            className="w-full md:w-auto px-8 py-3.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-slate-950"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Screening Allergens & Cooking...
              </>
            ) : (
              <>
                <span>✨ Generate Safe Recipe</span>
              </>
            )}
          </button>
        </div>

        {/* Recipe Display Section */}
        {recipe && (
          <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                <span>🍽️</span> SafeBite Agent Output
              </h3>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(recipe)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700"
              >
                📋 Copy Recipe
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 prose-headings:text-slate-100 prose-emerald">
              <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}