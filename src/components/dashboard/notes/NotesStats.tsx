
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, PlusCircle, FileText } from 'lucide-react';

interface NotesStatsProps {
  notesCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateNote: () => void;
}

export const NotesStats: React.FC<NotesStatsProps> = ({
  notesCount,
  searchTerm,
  onSearchChange,
  onCreateNote
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          {notesCount} Notes
        </Badge>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
        <Button
          onClick={onCreateNote}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          New Note
        </Button>
      </div>
    </div>
  );
};
