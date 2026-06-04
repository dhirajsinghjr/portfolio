'use client'

import { Search, Plus, BookOpen, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Note, Subject, SUBJECTS, SUBJECT_COLORS } from '@/lib/types'
import { getNotes, saveNotes } from '@/lib/storage'
import { useState, useEffect, useMemo } from 'react'
import { NoteCard } from './note-card'
import { NoteDialog } from './note-dialog'

export function StudyDesk() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setNotes(getNotes())
  }, [])

  const subjectCounts = useMemo(() => {
    const counts: Record<Subject, number> = {
      Mathematics: 0,
      Physics: 0,
      Biology: 0,
      History: 0,
      Chemistry: 0,
    }
    notes.forEach(note => {
      counts[note.subject]++
    })
    return counts
  }, [notes])

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSubject = !selectedSubject || note.subject === selectedSubject
      const matchesSearch = !searchQuery || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesSubject && matchesSearch
    })
  }, [notes, selectedSubject, searchQuery])

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNote) {
      const updated = notes.map(n => 
        n.id === editingNote.id 
          ? { ...n, ...noteData, updatedAt: new Date().toISOString() }
          : n
      )
      setNotes(updated)
      saveNotes(updated)
    } else {
      const newNote: Note = {
        ...noteData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const updated = [newNote, ...notes]
      setNotes(updated)
      saveNotes(updated)
    }
    setIsDialogOpen(false)
    setEditingNote(null)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setIsDialogOpen(true)
  }

  const handleNewNote = () => {
    setEditingNote(null)
    setIsDialogOpen(true)
  }

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="h-5 w-5 animate-pulse" />
          <span>Loading StudyDesk...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-sidebar flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-semibold text-foreground">StudyDesk</h1>
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">notes</span>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <Button onClick={handleNewNote} className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4" />
            New note
          </Button>
        </div>
        
        <nav className="flex-1 px-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Subjects
          </p>
          <ul className="space-y-0.5">
            <li>
              <button
                onClick={() => setSelectedSubject(null)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  selectedSubject === null
                    ? 'bg-sidebar-accent font-medium border-l-4 border-sidebar-primary -ml-1 pl-4'
                    : 'text-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-border flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-foreground/20" />
                  </div>
                  <span>All notes</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {notes.length}
                </span>
              </button>
            </li>
            {SUBJECTS.map(subject => (
              <li key={subject}>
                <button
                  onClick={() => setSelectedSubject(subject)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedSubject === subject
                      ? 'bg-sidebar-accent font-medium border-l-4 border-sidebar-primary -ml-1 pl-4'
                      : 'text-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${SUBJECT_COLORS[subject].bg}`} />
                    <span>{subject}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {subjectCounts[subject]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Header */}
        <header className="bg-card px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 border border-muted-foreground/50 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-sm bg-muted-foreground/30" />
              </div>
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-9 bg-card border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Sort:</span>
              <span className="font-mono">Newest</span>
            </div>
          </div>
        </header>

        {/* Notes Grid */}
        <div className="flex-1 overflow-auto p-6">
          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No notes found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery 
                  ? 'Try a different search term'
                  : 'Create your first note to get started'}
              </p>
              {!searchQuery && (
                <Button onClick={handleNewNote} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Note
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredNotes.map(note => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onClick={() => handleEditNote(note)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Note Dialog */}
      <NoteDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setEditingNote(null)
        }}
        note={editingNote}
        onSave={handleSaveNote}
      />
    </div>
  )
}
