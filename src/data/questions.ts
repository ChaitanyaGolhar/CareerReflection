// Reflection question definitions
// 5 chapters, each with individual questions shown one at a time

export interface Question {
  key: string
  question: string
  helper: string
  type: 'text' | 'textarea' | 'email' | 'number' | 'url'
  placeholder?: string
  required?: boolean
  minLength?: number
  chapter: number
}

export interface Chapter {
  number: number
  title: string
  purpose: string
  estimatedMinutes: number
  questions: Question[]
}

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    title: 'About You',
    purpose: 'Context',
    estimatedMinutes: 2,
    questions: [
      {
        key: 'name',
        question: 'What is your full name?',
        helper: 'This helps us attribute insights correctly within our research.',
        type: 'text',
        placeholder: 'Your full name',
        required: true,
        chapter: 1,
      },
      {
        key: 'email',
        question: 'What is your email address?',
        helper: 'Used only to send research updates if you choose to receive them. Never shared.',
        type: 'email',
        placeholder: 'you@example.com',
        required: true,
        chapter: 1,
      },
      {
        key: 'linkedin',
        question: 'What is your LinkedIn profile URL?',
        helper: 'Optional. We may reach out for a research conversation if you\'re open to it.',
        type: 'url',
        placeholder: 'https://linkedin.com/in/yourprofile',
        required: false,
        chapter: 1,
      },
      {
        key: 'college',
        question: 'Which college or university did you graduate from?',
        helper: 'We\'re trying to understand patterns across institutions.',
        type: 'text',
        placeholder: 'e.g. IIT Bombay, BITS Pilani, Delhi University',
        required: true,
        chapter: 1,
      },
      {
        key: 'graduationYear',
        question: 'What year did you graduate?',
        helper: 'This helps us understand how career patterns have evolved over time.',
        type: 'number',
        placeholder: 'e.g. 2019',
        required: true,
        chapter: 1,
      },
      {
        key: 'company',
        question: 'Where do you currently work?',
        helper: 'Your current employer.',
        type: 'text',
        placeholder: 'e.g. Google, Zepto, a startup you founded',
        required: true,
        chapter: 1,
      },
      {
        key: 'role',
        question: 'What is your current role?',
        helper: 'Your job title or the best description of what you do.',
        type: 'text',
        placeholder: 'e.g. Product Manager, Software Engineer, Founder',
        required: true,
        chapter: 1,
      },
    ],
  },
  {
    number: 2,
    title: 'Your Journey',
    purpose: 'Understand expectations',
    estimatedMinutes: 1,
    questions: [
      {
        key: 'journey_beliefs',
        question: 'What did you believe would matter most for your career while you were still in college?',
        helper: 'Think back to your final year. What were you focused on? Grades, placements, skills, connections?',
        type: 'textarea',
        placeholder: 'I believed that...',
        required: true,
        minLength: 50,
        chapter: 2,
      },
      {
        key: 'journey_surprise',
        question: 'What surprised you most after graduation?',
        helper: 'Sometimes reality looks very different from what we expected in college. Take your time.',
        type: 'textarea',
        placeholder: 'I was surprised to find that...',
        required: true,
        minLength: 50,
        chapter: 2,
      },
    ],
  },
  {
    number: 3,
    title: 'Turning Points',
    purpose: 'Find leverage',
    estimatedMinutes: 1,
    questions: [
      {
        key: 'turning_decision',
        question: 'What single decision had the biggest impact on your career?',
        helper: 'It could be a job you took, a job you refused, a skill you invested in, or a relationship you built.',
        type: 'textarea',
        placeholder: 'The decision that changed everything was...',
        required: true,
        minLength: 50,
        chapter: 3,
      },
      {
        key: 'turning_influence',
        question: 'Who influenced your journey the most, and how?',
        helper: 'A mentor, a manager, a peer, a book, or even a chance conversation. You don\'t need to name them if you\'d prefer not to.',
        type: 'textarea',
        placeholder: 'Someone who shaped how I think about careers is...',
        required: true,
        minLength: 30,
        chapter: 3,
      },
      {
        key: 'turning_opportunity',
        question: 'What opportunity changed everything for you?',
        helper: 'A role, a project, a conversation, a conference. The moment things shifted.',
        type: 'textarea',
        placeholder: 'The opportunity that opened new doors was...',
        required: true,
        minLength: 30,
        chapter: 3,
      },
    ],
  },
  {
    number: 4,
    title: 'Lessons',
    purpose: 'Transfer wisdom',
    estimatedMinutes: 1,
    questions: [
      {
        key: 'lessons_underestimate',
        question: 'What do students consistently underestimate?',
        helper: 'What do you wish someone had told you, or told you more clearly?',
        type: 'textarea',
        placeholder: 'Students underestimate...',
        required: true,
        minLength: 50,
        chapter: 4,
      },
      {
        key: 'lessons_advice',
        question: 'What advice would you give your second-year self?',
        helper: 'Not platitudes. The specific, honest advice based on how things actually unfolded.',
        type: 'textarea',
        placeholder: 'I would tell my second-year self to...',
        required: true,
        minLength: 50,
        chapter: 4,
      },
      {
        key: 'lessons_matters',
        question: 'What matters more than students realize?',
        helper: 'Something that only becomes clear with time and experience.',
        type: 'textarea',
        placeholder: 'Something that matters far more than I realized was...',
        required: true,
        minLength: 50,
        chapter: 4,
      },
    ],
  },
  {
    number: 5,
    title: 'Future Contribution',
    purpose: 'Stay connected',
    estimatedMinutes: 1,
    questions: [], // Chapter 5 is handled as opt-ins, not individual questions
  },
]

export const ALL_QUESTIONS = CHAPTERS.flatMap(c => c.questions)

export const TOTAL_CHAPTERS = CHAPTERS.length

export function getChapterByNumber(n: number): Chapter | undefined {
  return CHAPTERS.find(c => c.number === n)
}

export function getMinutesRemaining(chapter: number): number {
  return CHAPTERS.slice(chapter - 1).reduce((acc, c) => acc + c.estimatedMinutes, 0)
}
