import { useState, useMemo, useCallback, useEffect } from "react";
import { Note } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => note.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [notes, searchQuery, selectedTags]);

  const activeNote = useMemo(() => {
    return notes.find((note) => note.id === activeNoteId) || null;
  }, [notes, activeNoteId]);

  const createNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    return newNote;
  }, [setNotes]);

  const updateNote = useCallback(
    (id: string, updates: Partial<Note>) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? { ...note, ...updates, updatedAt: new Date().toISOString() }
            : note
        )
      );
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const newNotes = prev.filter((note) => note.id !== id);

        if (id === activeNoteId) {
          setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
        }

        return newNotes;
      });
    },
    [setNotes, activeNoteId]
  );

  const toggleTagFilter = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearTagFilters = useCallback(() => {
    setSelectedTags([]);
  }, []);

  const addTagToNote = useCallback(
    (noteId: string, tag: string) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId && !note.tags.includes(tag)
            ? {
                ...note,
                tags: [...note.tags, tag],
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
    },
    [setNotes]
  );

  const removeTagFromNote = useCallback(
    (noteId: string, tag: string) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? {
                ...note,
                tags: note.tags.filter((t) => t !== tag),
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
    },
    [setNotes]
  );

  return {
    notes,
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
  };
}
