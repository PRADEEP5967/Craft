
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle, Search, Trash2, User, LogOut, FileText, Calendar } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const NotesApp: React.FC = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${user?.id}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [user?.id]);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`notes_${user.id}`, JSON.stringify(notes));
    }
  }, [notes, user?.id]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '' });
    setIsCreating(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">My Notes</h1>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {notes.length} Notes
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Note
            </Button>
          </div>
        </div>

        {/* Create Note Form */}
        {isCreating && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                className="text-lg font-medium"
              />
              <Textarea
                placeholder="Write your note here..."
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-32 resize-none"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateNote}
                  disabled={!newNote.title.trim() || !newNote.content.trim()}
                >
                  Save Note
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setNewNote({ title: '', content: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {notes.length === 0 ? 'No notes yet' : 'No notes found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {notes.length === 0 
                  ? 'Create your first note to get started!' 
                  : 'Try adjusting your search terms.'
                }
              </p>
              {notes.length === 0 && (
                <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Your First Note
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-4 mb-4">
                    {note.content}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(note.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
