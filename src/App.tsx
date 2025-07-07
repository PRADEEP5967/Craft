
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { WelcomePage } from '@/components/dashboard/WelcomePage';
import { NotesApp } from '@/components/dashboard/NotesApp';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);

  if (!user) {
    return <AuthPage />;
  }

  if (showWelcome) {
    return (
      <WelcomePage onStartTakingNotes={() => setShowWelcome(false)} />
    );
  }

  return <NotesApp />;
};

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </AuthProvider>
);

export default App;
