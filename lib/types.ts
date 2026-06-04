export type Subject = 'Mathematics' | 'Physics' | 'Biology' | 'History' | 'Chemistry'

export interface Note {
  id: string
  title: string
  content: string
  subject: Subject
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const SUBJECTS: Subject[] = ['History', 'Current Affairs', 'Geography', 'Science', 'Polity']

export const SUBJECT_COLORS: Record<Subject, { bg: string; border: string; text: string; light: string }> = {
  Current Affairs: {
    bg: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-700',
    light: 'bg-blue-100',
  },
  Physics: {
    bg: 'bg-orange-500',
    border: 'border-orange-500',
    text: 'text-orange-700',
    light: 'bg-orange-100',
  },
  Biology: {
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
  Chemistry: {
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
    content: "6.022 × 10²³ — the number of particles in one mole of a substance. Applies to atoms, molecules, ions. Named after Amedeo Avogadro who first proposed that equal volumes of gases contain equal numbers of molecules.",
    subject: 'Chemistry',
    tags: ['constant'],
    createdAt: '2024-06-06T10:00:00.000Z',
    updatedAt: '2024-06-06T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'French Revolution (1789)',
    content: 'Began with financial crisis and social inequality under Louis XVI. Key events: storming of the Bastille, Declaration of the Rights of Man, Reign of Terror, rise of Napoleon Bonaparte.',
    subject: 'History',
    tags: ['event'],
    createdAt: '2024-06-05T10:00:00.000Z',
    updatedAt: '2024-06-05T10:00:00.000Z',
  },
  {
    id: '3',
    title: 'Mitosis vs Meiosis',
    content: 'Mitosis produces 2 identical diploid daughter cells for growth and repair. Meiosis produces 4 genetically different haploid cells for sexual reproduction. Both involve prophase, metaphase, anaphase, and telophase.',
    subject: 'Biology',
    tags: ['concept'],
    createdAt: '2024-06-04T10:00:00.000Z',
    updatedAt: '2024-06-04T10:00:00.000Z',
  },
  {
    id: '4',
    title: 'Photosynthesis',
    content: 'Plants use CO₂ + H₂O + sunlight → C₆H₁₂O₆ + O₂. Light reactions occur in thylakoids, Calvin cycle in stroma. Chlorophyll absorbs red and blue light, reflects green.',
    subject: 'Biology',
    tags: ['process'],
    createdAt: '2024-06-03T10:00:00.000Z',
    updatedAt: '2024-06-03T10:00:00.000Z',
  },
  {
    id: '5',
    title: 'Pythagorean Theorem',
    content: 'In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides. Formula: a² + b² = c². This is fundamental for calculating distances and is used extensively in trigonometry.',
    subject: 'Mathematics',
    tags: ['formula', 'geometry'],
    createdAt: '2024-06-02T10:00:00.000Z',
    updatedAt: '2024-06-02T10:00:00.000Z',
  },
  {
    id: '6',
    title: "Newton's Laws of Motion",
    content: "1st Law: Objects remain at rest or in uniform motion unless acted upon by a force. 2nd Law: F = ma (Force equals mass times acceleration). 3rd Law: Every action has an equal and opposite reaction.",
    subject: 'Physics',
    tags: ['law', 'mechanics'],
    createdAt: '2024-06-01T10:00:00.000Z',
    updatedAt: '2024-06-01T10:00:00.000Z',
  },
]
