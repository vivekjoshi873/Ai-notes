'use client';

import { Note } from '@/types';
import { useState } from 'react';
import { Trash2, X, Eye, Edit3, Sparkles } from 'lucide-react';
import MarkdownPreview from './MarkdownPreview';
import ConfirmModal from './ConfirmModal';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  onRemoveTag: (noteId: string, tag: string) => void;
  onSummarize: () => void;
}

export default function NoteEditor({
  note,
  onUpdateNote,
  onDeleteNote,
  onRemoveTag,
  onSummarize,
}: NoteEditorProps) {
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Edit3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No note selected
        </h2>
        <p className="text-gray-500 dark:text-gray-500">
          Select a note from the sidebar or create a new one
        </p>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote(note.id, { title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote(note.id, { content: e.target.value });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (note) {
      onDeleteNote(note.id);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          placeholder="Note title..."
          className="w-full text-2xl font-bold bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
        />
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => onRemoveTag(note.id, tag)}
                  className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'edit'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'split'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'preview'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onSummarize}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              AI Summary
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              aria-label="Delete note"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
                
      <div className="flex-1 overflow-hidden">
        {viewMode === 'edit' && (
          <textarea
            value={note.content}
            onChange={handleContentChange}
            placeholder="Start writing your note in markdown..."
            className="w-full h-full p-6 bg-transparent resize-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 font-mono text-sm scrollbar-thin"
          />
        )}

        {viewMode === 'preview' && (
          <div className="h-full overflow-y-auto p-6 scrollbar-thin">
            <MarkdownPreview content={note.content} />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-2 h-full divide-x divide-gray-200 dark:divide-gray-700">
            <textarea
              value={note.content}
              onChange={handleContentChange}
              placeholder="Start writing your note in markdown..."
              className="w-full h-full p-6 bg-transparent resize-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 font-mono text-sm scrollbar-thin"
            />
            <div className="h-full overflow-y-auto p-6 scrollbar-thin">
              <MarkdownPreview content={note.content} />
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Note?"
        message="Are you sure you want to delete this note? This action cannot be undone and all content will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

