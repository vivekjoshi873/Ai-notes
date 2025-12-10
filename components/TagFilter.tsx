'use client';

import { X, Plus } from 'lucide-react';
import { useState } from 'react';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearFilters: () => void;
  onAddTag: (noteId: string, tag: string) => void;
  activeNoteId: string | null;
}

/**
 * TagFilter component for filtering notes by tags
 * Supports multiple tag selection and displays tags as chips
 */
export default function TagFilter({
  allTags,
  selectedTags,
  onToggleTag,
  onClearFilters,
  onAddTag,
  activeNoteId,
}: TagFilterProps) {
  const [showAddTag, setShowAddTag] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && activeNoteId) {
      onAddTag(activeNoteId, newTag.trim());
      setNewTag('');
      setShowAddTag(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    } else if (e.key === 'Escape') {
      setShowAddTag(false);
      setNewTag('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Filter by Tags
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 font-bold transition-all duration-300 transform hover:scale-105"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.length === 0 ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            No tags yet. Add tags to your notes!
          </p>
        ) : (
          allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                selectedTags.includes(tag)
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:from-purple-700 hover:to-blue-700 hover:shadow-purple-500/50 dark:shadow-purple-500/30'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 shadow-sm'
              }`}
            >
              {tag}
            </button>
          ))
        )}
      </div>

      {/* Add Tag Section */}
      {activeNoteId && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          {showAddTag ? (
            <div className="space-y-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="New tag name..."
                className="w-full px-4 py-2 text-sm bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddTag}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 dark:shadow-purple-500/30"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddTag(false);
                    setNewTag('');
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddTag(true)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 dark:shadow-purple-500/30"
            >
              <Plus className="w-4 h-4" />
              Add Tag
            </button>
          )}
        </div>
      )}
    </div>
  );
}

