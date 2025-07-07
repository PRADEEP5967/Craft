
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CreateNoteFormProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const CreateNoteForm: React.FC<CreateNoteFormProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onCancel
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Note</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Note title..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-lg font-medium"
        />
        <Textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-32 resize-none"
        />
        <div className="flex gap-2">
          <Button
            onClick={onSave}
            disabled={!title.trim() || !content.trim()}
          >
            Save Note
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
