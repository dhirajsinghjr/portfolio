export type Subject =
  | 'History'
  | 'Current Affairs'
  | 'Geography'
  | 'Science'
  | 'Polity'

export interface Note {
  id: string
  title: string
  content: string
  subject: Subject
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const SUBJECTS: Subject[] = [
  'History',
  'Current Affairs',
  'Geography',
  'Science',
  'Polity',
]

export const SUBJECT_COLORS: Record<
  Subject,
  { bg: string; border: string; text: string; light: string }
> = {
  'Current Affairs': {
    bg: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-700',
    light: 'bg-blue-100',
  },
  Geography: {
    bg: 'bg-orange-500',
    border: 'border-orange-500',
    text: 'text-orange-700',
    light: 'bg-orange-100',
  },
  Science: {
    bg: 'bg-teal-500',
    border: 'border-teal-500',
    text: 'text-teal-700',
    light: 'bg-teal-100',
  },
  History: {
    bg: 'bg-purple-500',
    border: 'border-purple-500',
    text: 'text-purple-700',
    light: 'bg-purple-100',
  },
  Polity: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    light: 'bg-yellow-100',
  },
}

export const SAMPLE_NOTES: Note[] = [
  {
    id: '1',
    title: "Avogadro's Number",
    content:
      "6.022 × 10²³ — the number of particles in one mole of a substance.",
    subject: 'Science',
    tags: ['constant'],
    createdAt: '2024-06-06T10:00:00.000Z',
    updatedAt: '2024-06-06T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'French Revolution (1789)',
    content:
      'Began with financial crisis and social inequality under Louis XVI.',
    subject: 'History',
    tags: ['event'],
    createdAt: '2024-06-05T10:00:00.000Z',
    updatedAt: '2024-06-05T10:00:00.000Z',
  },
  {
    id: '3',
    title: 'Indian Constitution – Fundamental Rights',
    content:
      'Articles 12–35 guarantee equality, freedom, religion, remedies.',
    subject: 'Polity',
    tags: ['constitution'],
    createdAt: '2024-06-04T10:00:00.000Z',
    updatedAt: '2024-06-04T10:00:00.000Z',
  },
  {
    id: '4',
    title: 'Monsoon in India',
    content:
      'South-West monsoon caused by differential heating of land and sea.',
    subject: 'Geography',
    tags: ['climate'],
    createdAt: '2024-06-03T10:00:00.000Z',
    updatedAt: '2024-06-03T10:00:00.000Z',
  },
  {
    id: '5',
    title: 'G20 Summit 2023',
    content:
      'India hosted the G20 summit focusing on inclusive growth.',
    subject: 'Current Affairs',
    tags: ['summit'],
    createdAt: '2024-06-02T10:00:00.000Z',
    updatedAt: '2024-06-02T10:00:00.000Z',
  },
]