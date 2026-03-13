import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ProfileData {
  previousRole: string;
  yearsExperience: number;
  breakDuration: number;
  breakReason: string;
  targetRole: string;
  workStyle: string;
}

export interface SkillGap {
  skill: string;
  current: number;
  target: number;
}

export interface LearningStep {
  title: string;
  description: string;
  duration: string;
}

export interface Opportunity {
  title: string;
  company: string;
  description: string;
}

export interface RoadmapData {
  skillGaps: SkillGap[];
  learningSteps: LearningStep[];
  opportunities: Opportunity[];
  interviewTopics: string[];
}

function buildPrompt(profile: ProfileData): string {
  return `You are a career counselor AI specializing in helping women return to the workforce after career breaks. Analyze the following profile and generate a comprehensive career re-entry roadmap.

**User Profile:**
- Previous Role: ${profile.previousRole}
- Years of Experience (pre-break): ${profile.yearsExperience}
- Career Break Duration: ${profile.breakDuration} years
- Reason for Break: ${profile.breakReason || "Not specified"}
- Target Role: ${profile.targetRole}
- Preferred Work Style: ${profile.workStyle}

**Your task:** Generate a personalized roadmap in the following JSON format. Be specific and practical. Base your analysis on real industry trends and current job market demands.

Return ONLY valid JSON (no markdown, no code fences, no extra text) in this exact format:

{
  "skillGaps": [
    { "skill": "Skill Name", "current": 65, "target": 90 }
  ],
  "learningSteps": [
    { "title": "Step Title", "description": "Detailed description of what to learn and why", "duration": "2-3 weeks" }
  ],
  "opportunities": [
    { "title": "Program/Job Title", "company": "Company Name", "description": "Brief description of the opportunity" }
  ],
  "interviewTopics": [
    "Specific interview tip or topic tailored to this user's situation"
  ]
}

**Requirements:**
1. "skillGaps": Provide exactly 5 skills. "current" is the estimated proficiency (0-100) based on pre-break experience minus skill decay. "target" is what's needed for the target role. Use realistic numbers.
2. "learningSteps": Provide 4-5 actionable steps. Include specific, real course names, certifications, or resources. Mention free/low-cost options. Explain WHY each is needed (e.g., "This technology emerged during your break").
3. "opportunities": Provide exactly 3 relevant returnship programs or job opportunities. Use real companies known for return-to-work programs (e.g., Amazon Returnship, Path Forward, iRelaunch, Microsoft LEAP, Goldman Sachs Returnship). Tailor to the user's target industry.
4. "interviewTopics": Provide 3-4 specific tips on how to frame the career gap positively, what trending topics to be aware of, and how to showcase transferable skills gained during the break.

Be empowering, practical, and specific. Do NOT use generic advice.`;
}

export async function generateRoadmap(
  profile: ProfileData,
  apiKey: string
): Promise<RoadmapData> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = buildPrompt(profile);

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Clean the response - sometimes Gemini wraps JSON in markdown code fences
  let cleanedText = text.trim();
  if (cleanedText.startsWith("```json")) {
    cleanedText = cleanedText.slice(7);
  } else if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.slice(3);
  }
  if (cleanedText.endsWith("```")) {
    cleanedText = cleanedText.slice(0, -3);
  }
  cleanedText = cleanedText.trim();

  const parsed: RoadmapData = JSON.parse(cleanedText);

  // Validate the shape
  if (
    !Array.isArray(parsed.skillGaps) ||
    !Array.isArray(parsed.learningSteps) ||
    !Array.isArray(parsed.opportunities) ||
    !Array.isArray(parsed.interviewTopics)
  ) {
    throw new Error("Invalid response shape from Gemini API");
  }

  return parsed;
}
