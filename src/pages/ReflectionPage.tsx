import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useReflectionStore } from '../store/reflection.store'
import { CHAPTERS, getMinutesRemaining, type Question } from '../data/questions'
import { api } from '../lib/api'
import { track } from '../lib/analytics'

// ─── Autosave indicator ────────────────────────────────────────────────────

function AutosaveIndicator({ visible }: { visible: boolean }) {
  return (
    <div className={`autosave-indicator ${visible ? 'visible' : ''}`}>
      <Check size={12} />
      <span>Progress saved</span>
    </div>
  )
}

// ─── Chapter progress header ────────────────────────────────────────────────

function ChapterHeader({ chapter, questionIndex, totalQuestions }: {
  chapter: number
  questionIndex: number
  totalQuestions: number
}) {
  const ch = CHAPTERS[chapter - 1]
  const minutesLeft = getMinutesRemaining(chapter)
  const [autosave, setAutosave] = useState(false)

  useEffect(() => {
    setAutosave(true)
    const t = setTimeout(() => setAutosave(false), 2000)
    return () => clearTimeout(t)
  }, [chapter, questionIndex])

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      background: 'var(--color-bg)',
      zIndex: 10,
      borderBottom: '1px solid var(--color-border)',
      padding: '1rem 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', marginBottom: '0.375rem' }}>
            Chapter {chapter} of 5 · {ch?.title}
            {chapter < 5 && ` · About ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''} remaining`}
          </div>
          {/* Dot progress */}
          <div className="chapter-progress-dots">
            {CHAPTERS.map((c) => (
              <div
                key={c.number}
                className={`chapter-dot ${c.number === chapter ? 'active' : c.number < chapter ? 'done' : ''}`}
              />
            ))}
          </div>
        </div>
        <AutosaveIndicator visible={autosave} />
      </div>
      {/* Question micro-progress bar */}
      {totalQuestions > 1 && (
        <div style={{ height: 2, background: 'var(--color-border)', marginTop: '0.75rem' }}>
          <div style={{
            height: '100%',
            width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
            background: 'var(--color-brand)',
            transition: 'width 0.4s var(--ease-smooth)',
          }} />
        </div>
      )}
    </div>
  )
}

// ─── Single question screen ─────────────────────────────────────────────────

function QuestionScreen({
  question,
  value,
  onChange,
  onNext,
  onBack,
  isFirst,
  isLast,
  error,
}: {
  question: Question
  value: string
  onChange: (v: string) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
  error?: string
}) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [question.key])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (question.type !== 'textarea' && e.key === 'Enter') {
      e.preventDefault()
      onNext()
    }
  }

  return (
    <div className="page-enter" style={{ padding: '3rem 0 2rem' }}>
      <div className="container">
        {/* Question */}
        <h2 className="text-display-md" style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
          {question.question}
          {!question.required && (
            <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', fontWeight: 400, color: 'var(--color-text-tertiary)', marginLeft: '0.5rem' }}>
              (optional)
            </span>
          )}
        </h2>

        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.7, maxWidth: '460px' }}>
          {question.helper}
        </p>

        {/* Input */}
        <div className="field-group" style={{ marginBottom: '1.75rem' }}>
          {question.type === 'textarea' ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              className={`field-input field-textarea ${error ? 'error' : ''}`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              rows={6}
              aria-label={question.question}
              aria-describedby={error ? `${question.key}-error` : undefined}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={question.type}
              className={`field-input ${error ? 'error' : ''}`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={question.placeholder}
              aria-label={question.question}
              aria-describedby={error ? `${question.key}-error` : undefined}
            />
          )}
          {error && (
            <p className="field-error" id={`${question.key}-error`}>
              <AlertCircle size={13} />
              {error}
            </p>
          )}
          {question.minLength && value.length > 0 && (
            <p className="field-hint">
              {value.trim().split(/\s+/).filter(Boolean).length} words
              {question.minLength && value.trim().split(/\s+/).filter(Boolean).length < 15 && ' · A little more helps us understand better'}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {!isFirst && (
            <button onClick={onBack} className="btn btn-secondary" id={`back-${question.key}`}>
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          <button
            onClick={onNext}
            className="btn btn-primary"
            id={`next-${question.key}`}
            style={{ minWidth: '160px' }}
          >
            {isLast ? 'Continue Sharing' : 'Continue Sharing'}
            <ArrowRight size={16} />
          </button>
        </div>

        {!question.required && (
          <button
            onClick={onNext}
            className="btn btn-ghost btn-sm"
            style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}
          >
            Skip this question
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Chapter 5: Future Contribution ────────────────────────────────────────

function FutureContributionScreen({
  onSubmit,
  submitting,
  error,
}: {
  onSubmit: () => void
  submitting: boolean
  error?: string
}) {
  const store = useReflectionStore()

  const options = [
    {
      key: 'wantsResearchUpdates' as const,
      title: 'Research updates',
      desc: 'Receive summaries of what we\'re learning across reflections.',
    },
    {
      key: 'wantsConversation' as const,
      title: 'A research conversation',
      desc: 'A 20-minute call to go deeper on your experience. Voluntary.',
    },
    {
      key: 'wantsMentoring' as const,
      title: 'Mentoring opportunities',
      desc: 'Connecting with students who could benefit from your perspective.',
    },
  ]

  return (
    <div className="page-enter" style={{ padding: '3rem 0 2rem' }}>
      <div className="container">
        <h2 className="text-display-md" style={{ marginBottom: '0.75rem' }}>
          One last step.
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Would you like to stay connected to the research? Select anything that interests you.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {options.map(({ key, title, desc }) => (
            <div
              key={key}
              className={`checkbox-field ${store[key] ? 'checked' : ''}`}
              onClick={() => store.setOptIn(key, !store[key])}
              role="checkbox"
              aria-checked={store[key]}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') store.setOptIn(key, !store[key]) }}
              id={`optin-${key}`}
            >
              <div className="checkbox-indicator">
                {store[key] && <Check size={12} color="white" strokeWidth={3} />}
              </div>
              <div>
                <p style={{ fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{title}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="field-group" style={{ marginBottom: '2rem' }}>
          <label className="field-label">Anything else you'd like to share?</label>
          <textarea
            className="field-input field-textarea"
            value={store.anythingElse}
            onChange={(e) => store.setAnythingElse(e.target.value)}
            placeholder="Any thoughts, questions, or context you'd like us to know..."
            rows={4}
          />
        </div>

        {error && (
          <p className="field-error" style={{ marginBottom: '1rem' }}>
            <AlertCircle size={13} />
            {error}
          </p>
        )}

        <button
          onClick={onSubmit}
          disabled={submitting}
          className="btn btn-primary btn-lg"
          id="submit-reflection"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {submitting ? 'Contributing...' : 'Contribute Reflection'}
          {!submitting && <Check size={16} />}
        </button>

        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', marginTop: '0.875rem', textAlign: 'center' }}>
          You can submit without selecting any of the above. All selections are voluntary.
        </p>
      </div>
    </div>
  )
}

// ─── Exit warning modal ─────────────────────────────────────────────────────

function ExitWarningModal({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'hsl(220 13% 13% / 0.5)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div className="card card-padded" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-display-sm" style={{ marginBottom: '0.75rem' }}>
          Leave your reflection?
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
          Your progress has been saved. You can return and continue from where you left off.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onStay} className="btn btn-primary" style={{ flex: 1 }}>
            Stay and continue
          </button>
          <button onClick={onLeave} className="btn btn-secondary">
            Leave
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Reflection Page ────────────────────────────────────────────────────

export default function ReflectionPage() {
  const navigate = useNavigate()
  const store = useReflectionStore()
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showExitWarning, setShowExitWarning] = useState(false)

  const chapter = store.currentChapter
  const chapterData = CHAPTERS[chapter - 1]
  const questions = chapterData?.questions ?? []
  const questionIndex = store.currentQuestion

  const currentQ = chapter < 5 ? questions[questionIndex] : null

  // Start timer on mount
  useEffect(() => {
    store.startTimer()
    track('reflection_started')
  }, [])

  // Track chapter start
  useEffect(() => {
    track('chapter_started', { chapter })
  }, [chapter])

  // Chapter 1 field values come from store directly, others from answers
  const getValue = (q: Question): string => {
    if (q.chapter === 1) {
      return (store as unknown as Record<string, unknown>)[q.key] as string ?? ''
    }
    return store.answers[q.key] ?? ''
  }

  const setValue = (q: Question, v: string) => {
    if (q.chapter === 1) {
      store.setField(q.key, v)
    } else {
      store.setAnswer(q.key, v)
    }
    // Clear error
    if (fieldErrors[q.key]) {
      setFieldErrors(prev => ({ ...prev, [q.key]: '' }))
    }
  }

  function validateCurrentQuestion(): boolean {
    if (!currentQ) return true
    const value = getValue(currentQ)

    if (currentQ.required && !value.trim()) {
      setFieldErrors(prev => ({
        ...prev,
        [currentQ.key]: currentQ.type === 'email'
          ? 'Could you double-check your email?'
          : 'This helps us understand your journey better.',
      }))
      return false
    }

    if (currentQ.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldErrors(prev => ({ ...prev, [currentQ.key]: 'Could you double-check your email?' }))
      return false
    }

    if (currentQ.type === 'number') {
      const n = parseInt(value)
      if (currentQ.key === 'graduationYear') {
        if (isNaN(n) || n < 1980 || n > new Date().getFullYear()) {
          setFieldErrors(prev => ({ ...prev, [currentQ.key]: 'Please enter a valid graduation year.' }))
          return false
        }
      } else if (currentQ.key === 'experienceYears') {
        if (isNaN(n) || n < 0 || n > 60) {
          setFieldErrors(prev => ({ ...prev, [currentQ.key]: 'Please enter a valid number of years of experience.' }))
          return false
        }
      } else {
        if (isNaN(n)) {
          setFieldErrors(prev => ({ ...prev, [currentQ.key]: 'Please enter a valid number.' }))
          return false
        }
      }
    }

    return true
  }

  function goNext() {
    if (!validateCurrentQuestion()) return

    if (currentQ) {
      track('question_answered', { questionKey: currentQ.key, chapter })
    }

    if (chapter < 5) {
      if (questionIndex < questions.length - 1) {
        store.setQuestion(questionIndex + 1)
      } else {
        store.setChapter(chapter + 1)
        store.setQuestion(0)
      }
    }
  }

  function goBack() {
    if (questionIndex > 0) {
      store.setQuestion(questionIndex - 1)
    } else if (chapter > 1) {
      const prevChapter = CHAPTERS[chapter - 2]
      store.setChapter(chapter - 1)
      store.setQuestion(Math.max(0, prevChapter.questions.length - 1))
    }
  }

  const isFirstQuestion = chapter === 1 && questionIndex === 0

  async function handleSubmit() {
    setSubmitError('')
    setSubmitting(true)

    try {
      const answers = Object.entries(store.answers)
        .filter(([, v]) => v.trim())
        .map(([questionKey, answer]) => ({ questionKey, answer }))

      await api.submitReflection({
        name: store.name,
        email: store.email,
        linkedin: store.linkedin || undefined,
        college: store.college,
        graduationYear: parseInt(store.graduationYear),
        experienceYears: parseInt(store.experienceYears),
        company: store.company,
        role: store.role,
        answers,
        wantsResearchUpdates: store.wantsResearchUpdates,
        wantsConversation: store.wantsConversation,
        wantsMentoring: store.wantsMentoring,
        anythingElse: store.anythingElse || undefined,
        completionTime: store.getElapsedSeconds(),
      })

      track('reflection_completed', { completionTime: store.getElapsedSeconds() })
      if (store.wantsConversation) track('conversation_opted_in')
      if (store.wantsResearchUpdates) track('research_update_opted_in')

      store.reset()
      navigate('/thank-you')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Your progress is still safe.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Header */}
      <nav style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '1rem 0',
        background: 'var(--color-surface)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowExitWarning(true)}
            style={{ paddingLeft: '0.5rem', color: 'var(--color-text-tertiary)' }}
          >
            <ArrowLeft size={16} />
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            Career Reflection
          </span>
        </div>
      </nav>

      {/* Chapter progress */}
      <ChapterHeader
        chapter={chapter}
        questionIndex={questionIndex}
        totalQuestions={questions.length}
      />

      {/* Content */}
      {chapter < 5 && currentQ ? (
        <QuestionScreen
          key={`${chapter}-${questionIndex}`}
          question={currentQ}
          value={getValue(currentQ)}
          onChange={(v) => setValue(currentQ, v)}
          onNext={goNext}
          onBack={goBack}
          isFirst={isFirstQuestion}
          isLast={questionIndex === questions.length - 1}
          error={fieldErrors[currentQ.key]}
        />
      ) : (
        <FutureContributionScreen
          onSubmit={handleSubmit}
          submitting={submitting}
          error={submitError}
        />
      )}

      {/* Exit warning */}
      {showExitWarning && (
        <ExitWarningModal
          onStay={() => setShowExitWarning(false)}
          onLeave={() => navigate('/')}
        />
      )}
    </div>
  )
}
