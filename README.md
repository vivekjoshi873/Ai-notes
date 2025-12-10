# AI Notes App

A modern, feature-rich notes application built with Next.js, React, and Tailwind CSS.

## Features

- ✅ Full CRUD operations for notes
- ✅ Markdown editor with live preview
- ✅ Real-time search functionality
- ✅ Tag-based filtering system
- ✅ LocalStorage persistence
- ✅ AI-powered note summarization
- ✅ Dark mode support
- ✅ Smooth animations and transitions
- ✅ Responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
ai-notes-app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── NoteEditor.tsx    # Markdown editor component
│   ├── NotesList.tsx     # Sidebar notes list
│   ├── SearchBar.tsx     # Search functionality
│   ├── TagFilter.tsx     # Tag filtering
│   ├── MarkdownPreview.tsx # Markdown renderer
│   └── AISummaryModal.tsx  # AI summary modal
├── hooks/                 # Custom React hooks
│   ├── useLocalStorage.ts # LocalStorage hook
│   └── useNotes.ts        # Notes management hook
├── types/                 # TypeScript types
│   └── index.ts
└── utils/                 # Utility functions
    └── aiService.ts       # AI API integration
```

## AI Integration

To enable AI summarization, update the `AI_API_ENDPOINT` in `utils/aiService.ts` with your AI API endpoint.

```typescript
const AI_API_ENDPOINT = 'YOUR_API_ENDPOINT_HERE';
```

The API should accept a POST request with:
```json
{
  "content": "note content here"
}
```

And return:
```json
{
  "summary": "AI generated summary"
}
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **react-markdown** - Markdown rendering
- **lucide-react** - Icons
- **LocalStorage** - Data persistence

## License

MIT

