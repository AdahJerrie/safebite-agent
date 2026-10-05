# 🥗 SafeBite AI — Allergy-Aware Agentic Meal Planner

> **Live Demo:** [https://safebite-agent.onrender.com](https://safebite-agent.onrender.com)  
> **Hacktoberfest Submissions:** Best Use of Mastra | Best Use of Render

SafeBite AI is an autonomous, agentic meal planning assistant engineered to prevent accidental allergen exposure while helping individuals and families make delicious meals out of available pantry ingredients. Powered by **Mastra AI**, **Google Gemini**, **Next.js (App Router)**, and **Tailwind CSS v4**, SafeBite doesn't just prompt an LLM—it autonomously executes real-time ingredient screening using custom tools before delivering fully verified recipes.

---

## 🌟 Key Features

* **🤖 Autonomous Agentic Workflow:** Leverages Mastra's `Agent` class to reason through recipe requirements, dynamically query tools, and validate ingredients.
* **🛡️️ Real-Time Allergen Screening:** Integrated `allergenCheckerTool` inspects ingredient lists for active dietary restrictions (Peanuts, Tree Nuts, Dairy, Eggs, Soy, Gluten, Shellfish, Fish) and catches hidden or ambiguous allergen risks.
* **⚡ Live Execution Telemetry:** Transparently displays Mastra agent execution steps, active tool invocations, and verification badges directly within the UI.
* **🎨 Modern, Responsive UI:** Built with Next.js App Router, Tailwind CSS v4 dark mode, reactive state management, and formatted Markdown recipe rendering.
* **🚀 Hosted on Render:** Deployed as a web service utilizing Render's automated build pipeline and environment variable management.

---

## 🏗️ Architecture & Data Flow

┌─────────────────┐       POST /api/generate       ┌───────────────────────┐
│                 │ ─────────────────────────────> │                       │
│  Next.js React  │                                │  Next.js API Route   │
│    Dashboard    │ <───────────────────────────── │  (Mastra Runtime)     │
└─────────────────┘      JSON Output + Status      └───────────┬───────────┘
│
│ agent.generate()
▼
┌───────────────────────┐
│     safeBiteAgent     │
│  (Mastra Framework)   │
└───────────┬───────────┘
│
┌───────────────────┴───────────────────┐
│                                       │
▼                                       ▼
┌───────────────────────┐               ┌───────────────────────┐
│  allergenCheckerTool  │               │     Google Gemini     │
│   (Safety Screening)  │               │   (gemini-1.5-flash)  │
└───────────────────────┘               └───────────────────────┘


---

## 🛠️ Tech Stack & Configuration

* **Framework:** Next.js 15+ (App Router)
* **Agent Framework:** `@mastra/core`
* **LLM Provider:** `@ai-sdk/google` (`gemini-3.8-flash`)
* **Styling:** Tailwind CSS v4, `@tailwindcss/postcss`
* **Deployment:** Render (Web Service)

---

## 📂 Project Structure

```text
├── src/
│   ├── agents/
│   │   └── safeBiteAgent.ts    # Mastra agent definition & system instructions
│   ├── tools/
│   │   └── allergenChecker.ts  # Mastra tool for ingredient screening
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts    # API handler initializing Mastra runtime
│   │   ├── page.tsx            # Main interactive dashboard with telemetry
│   │   └── layout.tsx          # Root layout and theme configuration
│   └── mastra/
│       └── index.ts            # Mastra instance registry
├── postcss.config.cjs          # PostCSS configuration for Tailwind v4
├── tailwind.config.cjs         # Tailwind configuration
└── package.json
🚀 Getting Started Locally
Prerequisites
Node.js 20.x or higher

npm 10.x or higher

A Google Gemini API Key (Get key here)

Installation
Clone the repository:

Bash
git clone [https://github.com/AdahJerrie/safebite-agent.git](https://github.com/YOUR_USERNAME/safebite-agent.git)
cd safebite-agent
Install dependencies:

Bash
npm install
Configure environment variables:
Create a .env.local file in the root directory:

Code snippet
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
Run the development server:

Bash
npm run dev
Open in browser:

Navigate to http://localhost:3000.

🌐 Production Deployment on Render
This project is configured for seamless deployment as a Node.js Web Service on Render:

Build Command: npm install && npm run build

Start Command: npm run start

Environment Variables Required:

GOOGLE_GENERATIVE_AI_API_KEY: Your production Gemini API key

NODE_VERSION: 20.18.0

🏆 Hacktoberfest Prize Eligibility
Best Use of Mastra: Demonstrates practical implementation of Mastra's Agent structure, tool binding (allergenCheckerTool), execution telemetry extraction, and AI SDK integration.

Best Use of Render: Fully deployed and running on Render Web Services with production environment variable management and automated CI/CD build pipelines.

📜 License
Distributed under the MIT License. See LICENSE for more information.