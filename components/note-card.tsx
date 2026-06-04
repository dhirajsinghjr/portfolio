'use client'

import { Note, SUBJECT_COLORS } from '@/lib/types'

interface NoteCardProps {
  note: Note
  onClick: () => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  const colors = SUBJECT_COLORS[note.subject]
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-CA')

  return (
    <button
      onClick={onClick}
      className="group text-left w-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-border/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {/* Subject Color Strip */}
      <div className={`h-1.5 ${colors.bg}`} />
      
      <div className="p-5">
        {/* Subject Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded ${colors.light} ${colors.text}`}>
            {note.subject}
          </span>
        </div>
        
        {/* Title - Serif Font */}
        <h3 className="font-serif text-xl font-medium text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {note.title}
        </h3>
        
        {/* Content Preview */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {note.content}
        </p>
        
        {/* Tags and Date */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {note.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 border border-border text-muted-foreground rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {formattedDate}
          </span>
        </div>
      </div>
    </button>
  )
}
