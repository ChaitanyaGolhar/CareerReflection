import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '1.25rem 0',
        background: 'var(--color-surface)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm" style={{ paddingLeft: '0.5rem' }}>
            <ArrowLeft size={16} />
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600 }}>
            Make Talent Visible
          </span>
        </div>
      </nav>

      <main style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <p className="text-label" style={{ color: 'var(--color-brand)', marginBottom: '1.5rem' }}>
            About Career Reflection
          </p>

          <h1 className="text-display-lg" style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
            A structured research experience. Not a survey.
          </h1>

          <p className="text-body-lg" style={{ color: 'var(--color-text-secondary)', marginBottom: '3rem', maxWidth: '480px', lineHeight: 1.75 }}>
            Career Reflection is the first research product inside Make Talent Visible. It is designed to capture the wisdom of experienced professionals in a structured, five-minute experience.
          </p>

          <hr className="divider" />

          {/* What it is / is not */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <p className="text-label" style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>
                This is not
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Another Google Form', 'Another feedback survey', 'An assessment', 'A personality test'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid var(--color-border-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ width: 6, height: 1.5, background: 'var(--color-text-tertiary)', display: 'block' }} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label" style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>
                This is
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Research', 'Storytelling', 'Structured reflection', 'A contribution'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)', fontSize: '0.9375rem', fontWeight: 500 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--color-success-light)', border: '1.5px solid var(--color-success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-success)', fontSize: '0.625rem' }}>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="divider" />

          {/* How responses are used */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '1rem' }}>
              How your responses will be used
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Responses are read by the Make Talent Visible research team.',
                'Patterns and insights are extracted to understand how careers actually develop.',
                'Insights directly inform future products, research reports, and content.',
                'Your name and contact details are never published without explicit permission.',
                'You may optionally choose to receive research updates or participate in further conversations.',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ color: 'var(--color-brand)', fontFamily: 'var(--font-display)', fontSize: '1.125rem', flexShrink: 0, lineHeight: 1.4 }}>
                    {i + 1}.
                  </span>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          {/* CTA */}
          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <h2 className="text-display-sm" style={{ marginBottom: '0.75rem' }}>
              Ready to share your story?
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.75rem' }}>
              Five minutes. One chapter at a time.
            </p>
            <button
              onClick={() => navigate('/reflection')}
              className="btn btn-primary btn-lg"
              id="about-begin-reflection"
            >
              Begin Reflection
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
