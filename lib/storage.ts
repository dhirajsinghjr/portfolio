import { Note, SAMPLE_NOTES } from './types'

const STORAGE_KEY = 'studydesk-notes'

export function getNotes(): Note[] {
  if (typeof window === 'undefined') return SAMPLE_NOTES
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    // Initialize with sample notes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_NOTES))
    return SAMPLE_NOTES
  }
  
  try {
    return JSON.parse(stored)
  } catch {
    return SAMPLE_NOTES
  }
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function addNote(note: Note): Note[] {
  const notes = getNotes()
  const updated = [note, ...notes]
  saveNotes(updated)
  return updated
}

export function updateNote(id: string, updates: Partial<Note>): Note[] {
  const notes = getNotes()
  const updated = notes.map(note => 
    note.id === id 
      ? { ...note, ...updates, updatedAt: new Date().toISOString() }
      : note
  )
  saveNotes(updated)
  return updated
}

export function deleteNote(id: string): Note[] {
  const notes = getNotes()
  const updated = notes.filter(note => note.id !== id)
  saveNotes(updated)
  return updated
}
