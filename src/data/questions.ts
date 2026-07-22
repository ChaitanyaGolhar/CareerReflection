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
        key: 'experienceYears',
        question: 'How many years of professional experience do you have?',
        helper: 'This helps us understand how perspectives evolve over time.',
        type: 'number',
        placeholder: 'e.g. 5',
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
        key: 'career_formula',
        question: 'When you were in college, what did you believe was the formula for building a successful career?',
        helper: 'Think about the advice you believed and the path you expected to follow.',
        type: 'textarea',
        placeholder: 'I believed success came from...',
        required: true,
        minLength: 80,
        chapter: 2,
      },
      {
        key: 'belief_changed',
        question: 'Which of those beliefs turned out to be wrong after entering the real world?',
        helper: 'What did reality teach you that college never did?',
        type: 'textarea',
        placeholder: 'Looking back, I realised...',
        required: true,
        minLength: 80,
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
        key: 'missed_opportunity',
        question: 'Looking back, what opportunity almost changed your life—but you nearly ignored it?',
        helper: 'A job, internship, project, conversation or risk that only seems important in hindsight.',
        type: 'textarea',
        placeholder: 'At the time I almost ignored...',
        required: true,
        minLength: 80,
        chapter: 3,
      },
      {
        key: 'career_accelerator',
        question: 'Who or what accelerated your career the most, and why?',
        helper: 'It could be a mentor, manager, peer, community, book or even a single conversation.',
        type: 'textarea',
        placeholder: 'The biggest accelerator in my career was...',
        required: true,
        minLength: 60,
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
        key: 'visibility_problem',
        question: 'Why do you think talented students often remain invisible despite working hard?',
        helper: 'There is no right answer. We are trying to challenge our own assumptions about how careers develop.',
        type: 'textarea',
        placeholder: 'I think talented students remain invisible because...',
        required: true,
        minLength: 100,
        chapter: 4,
      },
      {
        key: 'career_advice_disagree',
        question: 'What is one piece of career advice that everyone repeats but you no longer believe?',
        helper: 'Share a belief that changed after gaining real-world experience.',
        type: 'textarea',
        placeholder: 'One piece of advice I no longer agree with is...',
        required: true,
        minLength: 80,
        chapter: 4,
      },
      {
        key: 'second_year_self',
        question: 'If you could have one honest conversation with your second-year self, what would you say?',
        helper: 'Imagine you have five minutes with your younger self. What would you want them to truly understand?',
        type: 'textarea',
        placeholder: 'Dear second-year me...',
        required: true,
        minLength: 120,
        chapter: 4,
      },
      {
        key: 'missing_question',
        question: 'What is one question we should have asked you but didn’t?',
        helper: 'Sometimes the most valuable insights come from questions researchers forget to ask.',
        type: 'textarea',
        placeholder: 'One question I wish you had asked is...',
        required: false,
        minLength: 30,
        chapter: 4,
      },
    ],
  },
  {
    number: 5,
    title: 'Future Contribution',
    purpose: 'Stay connected',
    estimatedMinutes: 1,
    questions: [
      {
        key: 'final_message',
        question: 'Is there anything else you would like future students to know?',
        helper: 'This is completely open. Share anything that feels important.',
        type: 'textarea',
        placeholder: 'One final thought...',
        required: false,
        minLength: 20,
        chapter: 5,
      },
    ],
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
