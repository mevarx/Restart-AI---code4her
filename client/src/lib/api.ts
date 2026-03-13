import { ProfileData, RoadmapData } from '@/contexts/AppContext';

/**
 * Fetch AI-generated roadmap from backend API.
 * Calls POST /api/roadmap which uses Gemini AI.
 * Falls back to mock data if the API call fails.
 */
export async function fetchAIRoadmap(profileData: ProfileData): Promise<RoadmapData> {
  try {
    const response = await fetch('/api/roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: RoadmapData = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch roadmap from API, using fallback:', error);
    // Return fallback data so the app never fully breaks
    return getFallbackRoadmap(profileData);
  }
}

/**
 * Client-side fallback in case even the server is unreachable
 */
function getFallbackRoadmap(profile: ProfileData): RoadmapData {
  return {
    skillGaps: [
      { skill: 'Digital Marketing Tools', current: 65, target: 95 },
      { skill: 'Data Analytics', current: 45, target: 85 },
      { skill: 'Social Media Strategy', current: 70, target: 90 },
      { skill: 'AI & Automation', current: 20, target: 75 },
      { skill: 'Leadership & Management', current: 80, target: 95 },
    ],
    learningSteps: [
      {
        title: 'Google Analytics 4 Certification',
        description: 'Master the latest analytics platform used across the industry',
        duration: '2-3 weeks',
      },
      {
        title: 'Refresh SEO & Content Strategy',
        description: 'Update your knowledge on modern SEO practices and content marketing',
        duration: '3-4 weeks',
      },
      {
        title: 'AI Tools for Marketing',
        description: 'Learn ChatGPT, Claude, and other AI tools for marketing automation',
        duration: '2 weeks',
      },
      {
        title: 'Advanced Excel & Data Visualization',
        description: 'Strengthen your data analysis and reporting capabilities',
        duration: '2 weeks',
      },
      {
        title: 'Mock Interviews & Case Studies',
        description: 'Practice with industry-specific scenarios and interview prep',
        duration: '2 weeks',
      },
    ],
    opportunities: [
      {
        title: `${profile.targetRole} - Returnship Program`,
        company: 'Path Forward',
        description: '16-week paid returnship for professionals returning after 2+ year career breaks',
      },
      {
        title: `${profile.targetRole} Returnship`,
        company: 'Amazon',
        description: 'Dedicated 16-week paid program for experienced professionals returning to work',
      },
      {
        title: 'Career Re-Entry Program',
        company: 'Goldman Sachs',
        description: 'Full-time fellowship for professionals who have taken a career break of 2+ years',
      },
    ],
    interviewTopics: [
      'Frame your break as a period of growth — mention skills like project management, multitasking, and emotional intelligence.',
      `Be ready to discuss industry changes that happened during your break and your proactive approach to catching up.`,
      `Prepare examples of how your ${profile.previousRole} experience makes you qualified for the ${profile.targetRole} position.`,
    ],
  };
}
