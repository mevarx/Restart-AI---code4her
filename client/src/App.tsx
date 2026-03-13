import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Dashboard from "@/pages/Dashboard";
import Landing from "@/pages/Landing";
import Wizard from "@/pages/Wizard";
import { ThemeProvider } from "./contexts/ThemeContext";

function AppContent() {
  const { currentView } = useApp();

  return (
    <>
      {currentView === 'landing' && <Landing />}
      {currentView === 'wizard' && <Wizard />}
      {currentView === 'dashboard' && <Dashboard />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <AppProvider>
          <AppContent />
          <Toaster />
        </AppProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
