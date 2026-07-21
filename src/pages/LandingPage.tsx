import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, BookOpen, Shield, ArrowRight, Sparkles } from 'lucide-react'
import { track } from '../lib/analytics'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    track('landing_viewed')
  }, [])

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '1.25rem 0',
        background: 'var(--color-surface)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
            Make Talent Visible
          </span>
          <button
            onClick={() => navigate('/reflection')}
            className="btn btn-primary btn-sm"
          >
            Begin Reflection
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 0 4rem' }}>
        <div className="container">

          {/* Eyebrow */}
          <div style={{ marginBottom: '1.75rem' }}>
            <span className="badge badge-blue" style={{ gap: '6px' }}>
              <Sparkles size={12} />
              Research · Alumni Edition
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-display-xl" style={{
            maxWidth: '540px',
            color: 'var(--color-text-primary)',
            marginBottom: '1.5rem',
          }}>
            Every professional carries lessons that could save students years of confusion.
          </h1>

          <p className="text-body-lg" style={{
            color: 'var(--color-text-secondary)',
            maxWidth: '480px',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}>
            We're trying to capture those lessons before they're forgotten. This is a structured, five-minute research reflection — not a survey.
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <div className="trust-badge">
              <Clock size={14} />
              <span>5 minutes</span>
            </div>
            <div className="trust-badge">
              <BookOpen size={14} />
              <span>12 questions</span>
            </div>
            <div className="trust-badge">
              <Shield size={14} />
              <span>Progress saved automatically</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/reflection')}
            className="btn btn-primary btn-lg"
            style={{ gap: '0.5rem' }}
            id="begin-reflection-cta"
          >
            Begin Reflection
            <ArrowRight size={16} />
          </button>

          <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
            Your experience will directly shape future research and products.
          </p>
        </div>
      </section>

      <hr className="divider" style={{ margin: 0 }} />

      {/* Why it matters */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <p className="text-label" style={{ color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}>
            Why this matters
          </p>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h3 className="text-display-sm" style={{ marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
                  Students repeatedly make the same mistakes.
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  Without access to the lived experience of alumni, each generation navigates career development almost blindly.
                </p>
              </div>
              <div>
                <h3 className="text-display-sm" style={{ marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
                  Your experience disappears without a system.
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  Traditional mentoring doesn't scale. Career Reflection compresses decades of insight into a structured five-minute contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" style={{ margin: 0 }} />

      {/* What you get */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <p className="text-label" style={{ color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}>
            What this is
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              ['Research', 'Your responses become part of an ongoing study of how careers actually develop.'],
              ['Storytelling', 'We ask for moments, decisions, and turning points — not opinions.'],
              ['Structured Reflection', 'Five chapters, one question at a time. Thoughtfully designed.'],
              ['Contribution', "You're a founding contributor to something that may shape future student careers."],
            ].map(([title, desc]) => (
              <div key={title} style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
              }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--color-brand)',
                  flexShrink: 0,
                  marginTop: '0.6rem',
                }} />
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{title}</p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" style={{ margin: 0 }} />

      {/* Closing CTA */}
      <section style={{ padding: '5rem 0 6rem', textAlign: 'center' }}>
        <div className="container">
          <h2 className="text-display-md" style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
            Ready to contribute?
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '380px', margin: '0 auto 2rem' }}>
            It takes five minutes. Your experiences will directly influence the research and insights we build.
          </p>
          <button
            onClick={() => navigate('/reflection')}
            className="btn btn-primary btn-lg"
            id="begin-reflection-cta-bottom"
          >
            Begin Reflection
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '1.5rem 0',
        background: 'var(--color-surface)',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
            Make Talent Visible
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
            Research · Career Reflection v1.0
          </span>
        </div>
      </footer>
    </div>
  )
}
