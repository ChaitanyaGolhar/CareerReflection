import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ThankYouPage() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '1.25rem 0',
        background: 'var(--color-surface)',
      }}>
        <div className="container">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600 }}>
            Make Talent Visible
          </span>
        </div>
      </nav>

      {/* Main content */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 0 6rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.5s var(--ease-smooth), transform 0.5s var(--ease-smooth)',
      }}>
        <div className="container">
          {/* Contribution mark */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '2px solid var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            color: 'var(--color-success)',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Heading — calm, not celebratory */}
          <h1 className="text-display-xl" style={{ marginBottom: '1.5rem', maxWidth: '440px' }}>
            Thank you.
          </h1>

          {/* Contribution message — ownership framing */}
          <p className="text-body-lg" style={{
            color: 'var(--color-text-secondary)',
            maxWidth: '480px',
            marginBottom: '1.25rem',
            lineHeight: 1.75,
          }}>
            You've just contributed to one of the earliest research efforts focused on understanding how careers actually develop.
          </p>

          <p style={{
            color: 'var(--color-text-secondary)',
            maxWidth: '480px',
            marginBottom: '2.5rem',
            lineHeight: 1.75,
          }}>
            Your experiences will directly influence the research, insights, and future products we build. We'll continue learning from contributors like you and share what we discover.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
              id="return-to-mtv"
            >
              Return to Make Talent Visible
            </button>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              id="book-conversation"
              style={{ textAlign: 'center' }}
            >
              Book a research conversation
            </a>
          </div>

          {/* Pride moment */}
          <div style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
            maxWidth: '440px',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontStyle: 'italic',
              color: 'var(--color-text-tertiary)',
              lineHeight: 1.65,
            }}>
              "One day, thousands of students may benefit from lessons like yours. Thank you for helping make talent visible."
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', marginTop: '0.75rem' }}>
              — Make Talent Visible Research Team
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '1.5rem 0',
        background: 'var(--color-surface)',
      }}>
        <div className="container">
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
            Career Reflection v1.0 · Make Talent Visible Research
          </p>
        </div>
      </footer>
    </div>
  )
}
