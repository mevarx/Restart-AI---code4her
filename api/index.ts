import "dotenv/config";
import express from "express";
import { generateRoadmap } from "../server/gemini.js";
import { getFallbackRoadmap } from "../server/fallback.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

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

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
