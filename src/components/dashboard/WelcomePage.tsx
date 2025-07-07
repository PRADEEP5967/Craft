
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, PlusCircle, FileText } from 'lucide-react';

interface WelcomePageProps {
  onStartTakingNotes: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStartTakingNotes }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Welcome Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                Start Taking Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Create your first note and start organizing your thoughts, ideas, and important information.
              </p>
              <Button onClick={onStartTakingNotes} className="w-full">
                Create Your First Note
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Your Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm font-medium">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Auth Method:</span>
                  <span className="text-sm font-medium capitalize">
                    {user?.authMethod === 'google' ? 'Google' : 'Email & Password'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle>What you can do with Notes App</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <PlusCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Create Notes</h3>
                <p className="text-sm text-muted-foreground">
                  Quickly create and organize your thoughts with our intuitive note-taking interface.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Organize</h3>
                <p className="text-sm text-muted-foreground">
                  Keep your notes organized and easily accessible whenever you need them.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your notes are securely stored and only accessible to you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
