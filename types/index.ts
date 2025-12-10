export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  searchQuery: string;
  selectedTags: string[];
  allTags: string[];
}

export interface AISummaryResponse {
  summary: string;
  error?: string;
}

