import React, { createContext, useContext, useState } from 'react';

export interface ProfileData {
  previousRole: string;
  yearsExperience: number;
  breakDuration: number;
  breakReason: string;
  targetRole: string;
  workStyle: string;
}

export interface RoadmapData {
  skillGaps: Array<{ skill: string; current: number; target: number }>;
  learningSteps: Array<{ title: string; description: string; duration: string }>;
  opportunities: Array<{ title: string; company: string; description: string }>;
  interviewTopics: Array<string>;
}

interface AppContextType {
  currentView: 'landing' | 'wizard' | 'dashboard';
  setCurrentView: (view: 'landing' | 'wizard' | 'dashboard') => void;
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
  roadmapData: RoadmapData | null;
  setRoadmapData: (data: RoadmapData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<'landing' | 'wizard' | 'dashboard'>('landing');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        profileData,
        setProfileData,
        roadmapData,
        setRoadmapData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
