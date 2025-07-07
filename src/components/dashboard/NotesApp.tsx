
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NotesHeader } from './notes/NotesHeader';
import { NotesStats } from './notes/NotesStats';
import { CreateNoteForm } from './notes/CreateNoteForm';
import { NotesList } from './notes/NotesList';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const NotesApp: React.FC = () => {
  const { user } = useAuth();
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

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewNote({ title: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NotesHeader />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <NotesStats
          notesCount={notes.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onCreateNote={() => setIsCreating(true)}
        />

        {isCreating && (
          <CreateNoteForm
            title={newNote.title}
            content={newNote.content}
            onTitleChange={(value) => setNewNote(prev => ({ ...prev, title: value }))}
            onContentChange={(value) => setNewNote(prev => ({ ...prev, content: value }))}
            onSave={handleCreateNote}
            onCancel={handleCancelCreate}
          />
        )}

        <NotesList
          notes={notes}
          filteredNotes={filteredNotes}
          onDeleteNote={handleDeleteNote}
          onCreateNote={() => setIsCreating(true)}
        />
      </div>
    </div>
  );
};
