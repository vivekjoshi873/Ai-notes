'use client';

import { useState } from 'react';
import { Plus, Menu, X } from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import { summarizeNote } from '@/utils/aiService';
import NotesList from '@/components/NotesList';
import NoteEditor from '@/components/NoteEditor';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import AISummaryModal from '@/components/AISummaryModal';
import ThemeToggle from '@/components/ThemeToggle';

/**
 * Main application page - AI Notes App
 * Combines all components to create a full-featured notes application
 */
export default function Home() {
  // Notes state management
  const {
    filteredNotes,
    activeNote,
    activeNoteId,
    allTags,
    selectedTags,
    searchQuery,
    createNote,
    updateNote,
    deleteNote,
    setActiveNoteId,
    setSearchQuery,
    toggleTagFilter,
    clearTagFilters,
    addTagToNote,
    removeTagFromNote,
  } = useNotes();

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [aiError, setAiError] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  // Handle creating a new note
  const handleCreateNote = () => {
    const newNote = createNote();
    setIsSidebarOpen(false); // Close sidebar on mobile after creating
  };

  // Handle AI summarization
  const handleSummarize = async () => {
    if (!activeNote) return;

    setIsModalOpen(true);
    setIsLoadingSummary(true);
    setAiSummary('');
    setAiError(null);

    try {
      // Call the real AI summarization function
      const result = await summarizeNote(activeNote.content);
      
      if (result.error) {
        setAiError(result.error);
      } else {
        setAiSummary(result.summary);
      }
    } catch (error) {
      setAiError('An unexpected error occurred');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static lg:translate-x-0 z-30 w-80 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Notes
            </h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        {/* Tag Filter */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <TagFilter
            allTags={allTags}
            selectedTags={selectedTags}
            onToggleTag={toggleTagFilter}
            onClearFilters={clearTagFilters}
            onAddTag={addTagToNote}
            activeNoteId={activeNoteId}
          />
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          <NotesList
            notes={filteredNotes}
            activeNoteId={activeNoteId}
            onSelectNote={(id) => {
              setActiveNoteId(id);
              setIsSidebarOpen(false); // Close sidebar on mobile after selecting
            }}
          />
        </div>

        {/* New Note Button */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCreateNote}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Notes
          </h1>
          <ThemeToggle />
        </div>

        {/* Note Editor */}
        <div className="flex-1 overflow-hidden bg-white dark:bg-gray-800">
          <NoteEditor
            note={activeNote}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
            onRemoveTag={removeTagFromNote}
            onSummarize={handleSummarize}
          />
        </div>
      </main>

      {/* AI Summary Modal */}
      <AISummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summary={aiSummary}
        error={aiError}
        isLoading={isLoadingSummary}
      />

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

