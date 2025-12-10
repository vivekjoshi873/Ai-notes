'use client';

import { Note } from '@/types';
import { Clock, Tag } from 'lucide-react';
import { formatDistanceToNow } from '@/utils/dateUtils';

interface NotesListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (noteId: string) => void;
}

/**
 * NotesList component displays a list of notes in the sidebar
 * Shows note title, preview, tags, and last updated time
 */
export default function NotesList({ notes, activeNoteId, onSelectNote }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-2">No notes found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Create your first note or adjust your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notes.map((note) => {
        const isActive = note.id === activeNoteId;
        const preview = note.content.substring(0, 100).replace(/[#*\-_]/g, '').trim();

        return (
          <button
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className={`w-full text-left p-4 rounded-lg transition-all animate-fade-in ${
              isActive
                ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400 shadow-md'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm'
            }`}
          >
            {/* Title */}
            <h3
              className={`font-semibold mb-1 truncate ${
                isActive
                  ? 'text-blue-900 dark:text-blue-100'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {note.title || 'Untitled'}
            </h3>

            {/* Preview */}
            {preview && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {preview}
              </p>
            )}

            {/* Tags */}
            {note.tags.length > 0 && (
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                <Tag className="w-3 h-3 text-gray-400" />
                {note.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {note.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{note.tags.length - 3}</span>
                )}
              </div>
            )}

            {/* Last Updated */}
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(note.updatedAt)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

