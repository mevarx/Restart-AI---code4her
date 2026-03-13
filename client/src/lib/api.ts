import { ProfileData, RoadmapData } from '@/contexts/AppContext';

/**
 * Fetch AI-generated roadmap from backend API
 * Currently returns mock data after a 2-second delay
 * Backend engineer can swap this with real fetch('http://localhost:8000/api/roadmap', ...) call
 */
export async function fetchAIRoadmap(profileData: ProfileData): Promise<RoadmapData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock data based on profile
  const mockRoadmap: RoadmapData = {
    skillGaps: [
      {
        skill: 'Digital Marketing Tools',
        current: 65,
        target: 95,
      },
      {
        skill: 'Data Analytics',
        current: 45,
        target: 85,
      },
      {
        skill: 'Social Media Strategy',
        current: 70,
        target: 90,
      },
      {
        skill: 'AI & Automation',
        current: 20,
        target: 75,
      },
      {
        skill: 'Leadership & Management',
        current: 80,
        target: 95,
      },
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
        title: 'Marketing Manager - Returnship Program',
        company: 'Google',
        description: 'Dedicated 12-week program for professionals returning to the workforce',
      },
      {
        title: 'Senior Marketing Specialist',
        company: 'Salesforce',
        description: 'Flexible hybrid role with mentorship from industry experts',
      },
      {
        title: 'Marketing Operations Manager',
        company: 'HubSpot',
        description: 'Full-time role with flexible hours and comprehensive benefits',
      },
    ],
    interviewTopics: [
      'How AI is transforming marketing strategies and your approach to staying current',
      'Your experience managing remote teams and cross-functional collaboration during career breaks',
    ],
  };

  return mockRoadmap;
}
