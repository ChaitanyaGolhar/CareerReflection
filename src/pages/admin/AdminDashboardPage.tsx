import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search, Download, LogOut, ChevronLeft, ChevronRight, Clock, BookOpen } from 'lucide-react'
import { api, type AdminReflection } from '../../lib/api'
import { formatDuration, formatDateTime } from '../../lib/utils'

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '5rem 2rem',
      color: 'var(--color-text-secondary)',
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'var(--color-surface-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
      }}>
        <BookOpen size={24} color="var(--color-text-tertiary)" />
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
        Every research movement starts with a single contribution.
      </h3>
      <p style={{ fontSize: '0.9375rem', maxWidth: '380px', margin: '0 auto', lineHeight: 1.65 }}>
        Share your reflection link to begin collecting insights.
      </p>
    </div>
  )
}

function SkeletonRow() {
  return (
    <tr>
      {[200, 140, 120, 100, 80].map((w, i) => (
        <td key={i} style={{ padding: '1rem' }}>
          <div className="skeleton" style={{ height: 16, width: w, borderRadius: 4 }} />
        </td>
      ))}
    </tr>
  )
}

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['reflections', page, search],
    queryFn: () => api.getReflections({ page, limit: 20, search }),
  })

  async function handleLogout() {
    await api.adminLogout().catch(() => {})
    navigate('/admin/login')
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  function handleExport() {
    window.open(api.exportCsvUrl(), '_blank')
  }

  const reflections = data?.data ?? []
  const meta = data?.meta

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600 }}>
              Career Reflection
            </span>
            <span style={{ marginLeft: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
              Research Dashboard
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={handleExport} className="btn btn-secondary btn-sm" id="export-csv">
              <Download size={14} />
              Export CSV
            </button>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm" id="admin-logout">
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main style={{ padding: '2rem 0' }}>
        <div className="container-wide">
          {/* Stats */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={16} color="var(--color-brand)" />
              </div>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', lineHeight: 1 }}>
                  {meta?.total ?? '—'}
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', marginTop: '0.25rem' }}>
                  Total reflections
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 360 }}>
              <Search size={15} className="search-icon" />
              <input
                className="search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, email, college..."
                id="admin-search"
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm">Search</button>
            {search && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setSearchInput(''); setPage(1) }}>
                Clear
              </button>
            )}
          </form>

          {/* Table */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>College</th>
                    <th>Company · Role</th>
                    <th>Submitted</th>
                    <th><Clock size={12} style={{ display: 'inline', marginRight: 4 }} />Time</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                  ) : isError ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-error)' }}>
                        Something went wrong. Please try signing in again.
                      </td>
                    </tr>
                  ) : reflections.length === 0 ? (
                    <tr>
                      <td colSpan={5}><EmptyState /></td>
                    </tr>
                  ) : (
                    reflections.map((r: AdminReflection) => (
                      <tr key={r.id} onClick={() => navigate(`/admin/response/${r.id}`)}>
                        <td className="name">
                          <div>{r.contributor.name}</div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', fontWeight: 400 }}>
                            {r.contributor.email}
                          </div>
                        </td>
                        <td>
                          <div>{r.contributor.college}</div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
                            Class of {r.contributor.graduationYear}
                          </div>
                        </td>
                        <td>
                          <div>{r.contributor.company}</div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
                            {r.contributor.role}
                          </div>
                        </td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          {formatDateTime(r.submittedAt)}
                        </td>
                        <td>
                          <span className="badge badge-grey">
                            {formatDuration(r.completionTime)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {meta && meta.pages > 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderTop: '1px solid var(--color-border)',
              }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
                  Page {meta.page} of {meta.pages} · {meta.total} reflections
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                    id="prev-page"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={page >= meta.pages}
                    onClick={() => setPage(p => p + 1)}
                    id="next-page"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
