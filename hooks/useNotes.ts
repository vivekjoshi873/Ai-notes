import { useState, useMemo, useCallback } from 'react';
import { Note } from '@/types';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing notes with CRUD operations, search, and filtering
 * Includes localStorage persistence and derived state for filtered notes
 */
export function useNotes() {
  // Persist notes in localStorage
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  
  // UI state
  const [activeNoteId, setActiveNoteId] = useState<string | null>(
    notes.length > 0 ? notes[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from all notes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [notes]);

  // Filter notes based on search query and selected tags
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => note.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [notes, searchQuery, selectedTags]);

  // Get the currently active note
  const activeNote = useMemo(() => {
    return notes.find(note => note.id === activeNoteId) || null;
  }, [notes, activeNoteId]);

  // Create a new note
  const createNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote;
  }, [setNotes]);

  // Update an existing note
  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ));
  }, [setNotes]);

  // Delete a note
  const deleteNote = useCallback((id: string) => {
    setNotes(prev => {
      const newNotes = prev.filter(note => note.id !== id);
      
      // If we deleted the active note, select another one
      if (id === activeNoteId) {
        setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
      }
      
      return newNotes;
    });
  }, [setNotes, activeNoteId]);

  // Toggle tag selection for filtering
  const toggleTagFilter = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // Clear all tag filters
  const clearTagFilters = useCallback(() => {
    setSelectedTags([]);
  }, []);

  // Add tag to active note
  const addTagToNote = useCallback((noteId: string, tag: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId && !note.tags.includes(tag)
        ? { ...note, tags: [...note.tags, tag], updatedAt: new Date().toISOString() }
        : note
    ));
  }, [setNotes]);

  // Remove tag from note
  const removeTagFromNote = useCallback((noteId: string, tag: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId
        ? { ...note, tags: note.tags.filter(t => t !== tag), updatedAt: new Date().toISOString() }
        : note
    ));
  }, [setNotes]);

  return {
    // Data
    notes,
    filteredNotes,
    activeNote,
    activeNoteId,
    allTags,
    selectedTags,
    searchQuery,

    // Actions
    createNote,
    updateNote,
    deleteNote,
    setActiveNoteId,
    setSearchQuery,
    toggleTagFilter,
    clearTagFilters,
    addTagToNote,
    removeTagFromNote,
  };
}

