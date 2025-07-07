
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  PlusCircle, 
  TrendingUp, 
  Clock, 
  Star,
  BarChart3,
  Calendar,
  BookOpen
} from 'lucide-react';

interface DashboardProps {
  onCreateNote: () => void;
  onViewNotes: () => void;
  notesCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onCreateNote, 
  onViewNotes, 
  notesCount 
}) => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Notes',
      value: notesCount,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'This Week',
      value: '12',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Favorites',
      value: '8',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Categories',
      value: '5',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const recentActivity = [
    { action: 'Created', title: 'Meeting Notes', time: '2 hours ago' },
    { action: 'Updated', title: 'Project Ideas', time: '5 hours ago' },
    { action: 'Created', title: 'Shopping List', time: '1 day ago' },
    { action: 'Updated', title: 'Daily Journal', time: '2 days ago' },
  ];

  const quickActions = [
    {
      title: 'Create New Note',
      description: 'Start writing your thoughts',
      icon: PlusCircle,
      action: onCreateNote,
      color: 'bg-primary hover:bg-primary/90',
    },
    {
      title: 'View All Notes',
      description: 'Browse your collection',
      icon: FileText,
      action: onViewNotes,
      color: 'bg-secondary hover:bg-secondary/80',
    },
    {
      title: 'Analytics',
      description: 'View your writing stats',
      icon: BarChart3,
      action: () => console.log('Analytics clicked'),
      color: 'bg-green-600 hover:bg-green-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
            <p className="text-primary-foreground/80">
              Ready to capture your ideas today?
            </p>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="h-16 w-16 text-primary-foreground/20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`w-full p-4 rounded-lg text-left transition-colors text-white ${action.color}`}
              >
                <div className="flex items-center space-x-3">
                  <action.icon className="h-5 w-5" />
                  <div>
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm opacity-80">{action.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <Badge variant="secondary" className="mr-2">
                        {activity.action}
                      </Badge>
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips & Features */}
      <Card>
        <CardHeader>
          <CardTitle>Tips & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg border">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Rich Text Editor</h4>
              <p className="text-sm text-muted-foreground">
                Format your notes with rich text editing capabilities
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Favorites</h4>
              <p className="text-sm text-muted-foreground">
                Mark important notes as favorites for quick access
              </p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Categories</h4>
              <p className="text-sm text-muted-foreground">
                Organize your notes with custom categories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
