
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, FileText } from 'lucide-react';
import { NoteCard } from './NoteCard';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesListProps {
  notes: Note[];
  filteredNotes: Note[];
  onDeleteNote: (id: string) => void;
  onCreateNote: () => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  filteredNotes,
  onDeleteNote,
  onCreateNote
}) => {
  if (filteredNotes.length === 0) {
    return (
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
            <Button onClick={onCreateNote} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Your First Note
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
};
