
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { WelcomePage } from '@/components/dashboard/WelcomePage';
import { NotesApp } from '@/components/dashboard/NotesApp';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

type AppView = 'welcome' | 'dashboard' | 'notes';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('welcome');

  // Load notes count from localStorage
  const getNotesCount = () => {
    if (!user?.id) return 0;
    const savedNotes = localStorage.getItem(`notes_${user.id}`);
    return savedNotes ? JSON.parse(savedNotes).length : 0;
  };

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'welcome':
        return (
          <WelcomePage 
            onStartTakingNotes={() => setCurrentView('dashboard')} 
          />
        );
      case 'dashboard':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Dashboard
                onCreateNote={() => setCurrentView('notes')}
                onViewNotes={() => setCurrentView('notes')}
                notesCount={getNotesCount()}
              />
            </main>
            <Footer />
          </div>
        );
      case 'notes':
        return <NotesApp />;
      default:
        return null;
    }
  };

  return renderContent();
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
