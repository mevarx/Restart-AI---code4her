import type { RoadmapData } from "./gemini.js";

/**
 * Returns a hardcoded fallback roadmap.
 * Used when the Gemini API fails, so the demo never breaks.
 */
export function getFallbackRoadmap(
  previousRole: string,
  targetRole: string
): RoadmapData {
  return {
    skillGaps: [
      { skill: "Digital Marketing Tools", current: 65, target: 95 },
      { skill: "Data Analytics", current: 45, target: 85 },
      { skill: "Social Media Strategy", current: 70, target: 90 },
      { skill: "AI & Automation", current: 20, target: 75 },
      { skill: "Leadership & Management", current: 80, target: 95 },
    ],
    learningSteps: [
      {
        title: "Google Analytics 4 Certification",
        description:
          "Master the latest analytics platform — GA4 fully replaced Universal Analytics during your break",
        duration: "2-3 weeks",
      },
      {
        title: "Refresh Industry-Specific Skills",
        description: `Update your knowledge on current best practices for the ${targetRole} role`,
        duration: "3-4 weeks",
      },
      {
        title: "AI Tools for Professionals",
        description:
          "Learn ChatGPT, Claude, and other AI tools widely adopted across industries since your break",
        duration: "2 weeks",
      },
      {
        title: "Advanced Data Visualization",
        description:
          "Strengthen your data analysis and reporting capabilities with modern tools",
        duration: "2 weeks",
      },
      {
        title: "Mock Interviews & Case Studies",
        description:
          "Practice with industry-specific scenarios and prepare for common interview questions about career gaps",
        duration: "2 weeks",
      },
    ],
    opportunities: [
      {
        title: `${targetRole} - Returnship Program`,
        company: "Path Forward",
        description:
          "16-week paid returnship for professionals returning after 2+ year career breaks, with various partner companies",
      },
      {
        title: `${targetRole} Returnship`,
        company: "Amazon",
        description:
          "Dedicated 16-week paid program designed for experienced professionals returning to work after a career break",
      },
      {
        title: "Career Re-Entry Program",
        company: "Goldman Sachs",
        description:
          "Full-time fellowship for professionals who have taken a career break of 2+ years, with mentorship and support",
      },
    ],
    interviewTopics: [
      `Frame your career break as a period of growth — highlight transferable skills like project management, multitasking, and emotional intelligence gained during your time away.`,
      `Be ready to discuss industry changes that happened during your break and demonstrate your proactive approach to catching up.`,
      `Prepare specific examples of how your ${previousRole} experience makes you uniquely qualified for the ${targetRole} position.`,
      `Research the company's return-to-work culture and ask thoughtful questions about professional development opportunities.`,
    ],
  };
}
