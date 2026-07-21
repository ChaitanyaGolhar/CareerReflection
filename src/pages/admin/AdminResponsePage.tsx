import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ExternalLink, Mail, Building2, GraduationCap, Clock, Check } from 'lucide-react'
import { api } from '../../lib/api'
import { formatDuration, formatDateTime } from '../../lib/utils'
import { CHAPTERS } from '../../data/questions'

const QUESTION_LABELS: Record<string, string> = {
  journey_beliefs:      'What did you believe would matter most for your career while in college?',
  journey_surprise:     'What surprised you most after graduation?',
  turning_decision:     'What single decision had the biggest impact on your career?',
  turning_influence:    'Who influenced your journey the most, and how?',
  turning_opportunity:  'What opportunity changed everything for you?',
  lessons_underestimate:'What do students consistently underestimate?',
  lessons_advice:       'What advice would you give your second-year self?',
  lessons_matters:      'What matters more than students realize?',
}

const CHAPTER_KEYS: Record<number, string[]> = {
  2: ['journey_beliefs', 'journey_surprise'],
  3: ['turning_decision', 'turning_influence', 'turning_opportunity'],
  4: ['lessons_underestimate', 'lessons_advice', 'lessons_matters'],
}

function SkeletonBlock({ h = 20, w = '100%' }: { h?: number; w?: string | number }) {
  return <div className="skeleton" style={{ height: h, width: w, borderRadius: 4 }} />
}

export default function AdminResponsePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: reflection, isLoading, isError } = useQuery({
    queryKey: ['reflection', id],
    queryFn: () => api.getReflectionById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
        <div style={{ padding: '2rem 0' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SkeletonBlock h={32} w={240} />
            <SkeletonBlock h={120} />
            <SkeletonBlock h={200} />
            <SkeletonBlock h={200} />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !reflection) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>Reflection not found or could not be loaded.</p>
          <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary btn-sm">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const c = reflection.contributor
  const answerMap = Object.fromEntries(reflection.answers.map(a => [a.questionKey, a.answer]))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} className="page-enter">
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/admin/dashboard')} className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} />
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            Research Dashboard
          </span>
        </div>
      </header>

      <main style={{ padding: '2.5rem 0 5rem' }}>
        <div className="container">
          {/* Contributor profile */}
          <div className="card card-padded" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                  {c.name}
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
                  {c.role} at {c.company}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-grey">
                  <Clock size={11} style={{ marginRight: 4 }} />
                  {formatDuration(reflection.completionTime)}
                </span>
                {reflection.wantsConversation && <span className="badge badge-blue">Open to conversation</span>}
                {reflection.wantsResearchUpdates && <span className="badge badge-green">Wants updates</span>}
                {reflection.wantsMentoring && <span className="badge badge-blue">Open to mentoring</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { icon: <Mail size={14} />, label: 'Email', value: c.email, href: `mailto:${c.email}` },
                { icon: <GraduationCap size={14} />, label: 'College', value: `${c.college}, ${c.graduationYear}` },
                { icon: <Building2 size={14} />, label: 'Company', value: c.company },
                { icon: <ExternalLink size={14} />, label: 'LinkedIn', value: c.linkedin ? 'View Profile' : '—', href: c.linkedin ?? undefined },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-text-tertiary)', marginTop: 2 }}>{icon}</div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginBottom: '0.125rem' }}>{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand)', fontSize: '0.875rem' }}>
                        {value}
                      </a>
                    ) : (
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
                Submitted {formatDateTime(reflection.submittedAt)}
              </p>
            </div>
          </div>

          {/* Answers by chapter */}
          {[2, 3, 4].map((chapterNum) => {
            const chapter = CHAPTERS[chapterNum - 1]
            const keys = CHAPTER_KEYS[chapterNum] ?? []
            return (
              <div key={chapterNum} style={{ marginBottom: '1.5rem' }}>
                <p className="text-label" style={{ color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
                  Chapter {chapterNum} · {chapter.title}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {keys.map((key) => (
                    <div key={key} className="card" style={{ padding: '1.25rem 1.5rem' }}>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text-tertiary)', marginBottom: '0.625rem' }}>
                        {QUESTION_LABELS[key]}
                      </p>
                      <p style={{ color: 'var(--color-text-primary)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
                        {answerMap[key] ?? <em style={{ color: 'var(--color-text-tertiary)' }}>No response</em>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Anything else */}
          {reflection.anythingElse && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="text-label" style={{ color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
                Additional thoughts
              </p>
              <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ color: 'var(--color-text-primary)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
                  {reflection.anythingElse}
                </p>
              </div>
            </div>
          )}

          {/* Opt-ins */}
          <div>
            <p className="text-label" style={{ color: 'var(--color-text-tertiary)', marginBottom: '0.75rem' }}>
              Future contribution preferences
            </p>
            <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { key: 'wantsResearchUpdates', label: 'Research updates' },
                  { key: 'wantsConversation',    label: 'Research conversation' },
                  { key: 'wantsMentoring',       label: 'Mentoring opportunities' },
                ].map(({ key, label }) => {
                  const checked = key === 'wantsResearchUpdates' ? reflection.wantsResearchUpdates
                    : key === 'wantsConversation' ? reflection.wantsConversation
                    : reflection.wantsMentoring
                  return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 20, height: 20,
                      borderRadius: 4,
                      background: checked ? 'var(--color-brand)' : 'var(--color-surface-2)',
                      border: `1.5px solid ${checked ? 'var(--color-brand)' : 'var(--color-border-2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {checked && <Check size={11} color="white" strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>{label}</span>
                  </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
