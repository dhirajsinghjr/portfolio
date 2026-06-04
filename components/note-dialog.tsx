'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Note, Subject, SUBJECTS, SUBJECT_COLORS } from '@/lib/types'

interface NoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  note: Note | null
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function NoteDialog({ open, onOpenChange, note, onSave }: NoteDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState<Subject>('Mathematics')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setSubject(note.subject)
      setTags(note.tags)
    } else {
      setTitle('')
      setContent('')
      setSubject('Mathematics')
      setTags([])
    }
    setTagInput('')
  }, [note, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    
    onSave({
      title: title.trim(),
      content: content.trim(),
      subject,
      tags,
    })
  }

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/^#/, '')
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1.5">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here (3-4 lines recommended)..."
              rows={4}
              required
              className="w-full px-3 py-2 text-sm border border-input bg-background rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Subject
            </label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                    subject === s
                      ? `${SUBJECT_COLORS[s].bg} text-white border-transparent`
                      : `border-border text-muted-foreground hover:border-border/80 hover:text-foreground`
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-1.5">
              Tags <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <div className="flex gap-2">
              <Input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., formula, concept"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {note ? 'Save Changes' : 'Create Note'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
