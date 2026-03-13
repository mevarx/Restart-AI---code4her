import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { generateRoadmap } from "./gemini.js";
import { getFallbackRoadmap } from "./fallback.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON request bodies
  app.use(express.json());

  // ==========================================
  // API Routes
  // ==========================================

  /**
   * POST /api/roadmap
   * Accepts profile data, calls Gemini AI, returns a personalized roadmap.
   * Falls back to mock data if Gemini fails.
   */
  app.post("/api/roadmap", async (req, res) => {
    try {
      const { previousRole, yearsExperience, breakDuration, breakReason, targetRole, workStyle } = req.body;

      // Validate required fields
      if (!previousRole || !targetRole || !workStyle) {
        res.status(400).json({
          error: "Missing required fields: previousRole, targetRole, workStyle",
        });
        return;
      }

      const profileData = {
        previousRole,
        yearsExperience: yearsExperience || 0,
        breakDuration: breakDuration || 0,
        breakReason: breakReason || "Not specified",
        targetRole,
        workStyle,
      };

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "your_gemini_api_key_here") {
        console.warn("⚠️  No Gemini API key configured. Returning fallback data.");
        const fallback = getFallbackRoadmap(previousRole, targetRole);
        res.json(fallback);
        return;
      }

      try {
        console.log("🤖  Calling Gemini API for:", previousRole, "→", targetRole);
        const roadmap = await generateRoadmap(profileData, apiKey);
        console.log("✅  Gemini response received successfully");
        res.json(roadmap);
      } catch (aiError) {
        console.error("❌  Gemini API failed, returning fallback:", aiError);
        const fallback = getFallbackRoadmap(previousRole, targetRole);
        res.json(fallback);
      }
    } catch (error) {
      console.error("❌  Server error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ==========================================
  // Static Files (Production)
  // ==========================================
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname)
      : path.resolve(__dirname, "..", "dist");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}/`);
    console.log(`📡 API endpoint: POST http://localhost:${port}/api/roadmap`);
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      console.log("⚠️  No GEMINI_API_KEY set — will return fallback data");
    } else {
      console.log("✅ Gemini API key configured");
    }
  });
}

startServer().catch(console.error);
