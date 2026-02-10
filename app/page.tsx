'use client'

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: '#2563eb' }}>
              <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Compliance Manager</h1>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Federal Grants Assessment Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>Compliance Projects</h2>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', margin: '0 0 2rem 0' }}>Track and manage federal compliance across all projects. Risk-based assessment system.</p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '28rem', marginBottom: '3rem' }}>
            <svg style={{ position: 'absolute', left: '0.75rem', top: '0.875rem', width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.625rem', paddingBottom: '0.625rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', color: '#111827', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Project 1 */}
          <div style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Northern Network Broadband</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>Northern Tribes</p>
              </div>
              <svg style={{ width: '24px', height: '24px', color: '#16a34a', marginLeft: '0.5rem', flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 15.172l9.192-9.193a1 1 0 111.415 1.415l-10.6 10.6a1 1 0 01-1.415 0l-4.242-4.243a1 1 0 111.415-1.415l3.03 3.03z" />
              </svg>
            </div>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Overall Score</span>
                <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>82%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#22c55e', width: '82%' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ padding: '0.5rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600', margin: 0 }}>82%</p>
                <p style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0' }}>Compliant</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: '600', margin: 0 }}>12%</p>
                <p style={{ fontSize: '0.75rem', color: '#ca8a04', margin: '0.25rem 0 0 0' }}>Evidence</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: '600', margin: 0 }}>6%</p>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '0.25rem 0 0 0' }}>Non-Compliant</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #bbf7d0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>2 CFR 200</span>
              <svg style={{ width: '16px', height: '16px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Project 2 */}
          <div style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid #bfdbfe', backgroundColor: '#f0f9ff', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Digital Equity Initiative</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>Mountain County</p>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Overall Score</span>
                <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>65%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#3b82f6', width: '65%' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ padding: '0.5rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600', margin: 0 }}>65%</p>
                <p style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0' }}>Compliant</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: '600', margin: 0 }}>20%</p>
                <p style={{ fontSize: '0.75rem', color: '#ca8a04', margin: '0.25rem 0 0 0' }}>Evidence</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: '600', margin: 0 }}>15%</p>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '0.25rem 0 0 0' }}>Non-Compliant</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>Title VI</span>
              <svg style={{ width: '16px', height: '16px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Project 3 */}
          <div style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid #fcd34d', backgroundColor: '#fffbeb', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Rural Connectivity</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>Eastern Region</p>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Overall Score</span>
                <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>45%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#f59e0b', width: '45%' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ padding: '0.5rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600', margin: 0 }}>45%</p>
                <p style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0' }}>Compliant</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: '600', margin: 0 }}>35%</p>
                <p style={{ fontSize: '0.75rem', color: '#ca8a04', margin: '0.25rem 0 0 0' }}>Evidence</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: '600', margin: 0 }}>20%</p>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '0.25rem 0 0 0' }}>Non-Compliant</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #fcd34d' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>2 CFR 200</span>
              <svg style={{ width: '16px', height: '16px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Project 4 */}
          <div style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', backgroundColor: '#f3f4f6', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Coastal Broadband</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>Pacific Nations</p>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Overall Score</span>
                <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>55%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#9ca3af', width: '55%' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ padding: '0.5rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600', margin: 0 }}>55%</p>
                <p style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0' }}>Compliant</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: '600', margin: 0 }}>30%</p>
                <p style={{ fontSize: '0.75rem', color: '#ca8a04', margin: '0.25rem 0 0 0' }}>Evidence</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: '600', margin: 0 }}>15%</p>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '0.25rem 0 0 0' }}>Non-Compliant</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>NEPA</span>
              <svg style={{ width: '16px', height: '16px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Project 5 */}
          <div style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', backgroundColor: '#f3f4f6', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Tech Support Center</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>Central Services</p>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Overall Score</span>
                <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>28%</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#9ca3af', width: '28%' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ padding: '0.5rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600', margin: 0 }}>28%</p>
                <p style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0' }}>Compliant</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: '600', margin: 0 }}>40%</p>
                <p style={{ fontSize: '0.75rem', color: '#ca8a04', margin: '0.25rem 0 0 0' }}>Evidence</p>
              </div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: '600', margin: 0 }}>32%</p>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '0.25rem 0 0 0' }}>Non-Compliant</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>ADA</span>
              <svg style={{ width: '16px', height: '16px', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', marginTop: '4rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Support</h3>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>compliance@support.gov</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Frameworks</h3>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>10 CFR codes with 25+ obligations</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Version</h3>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>Compliance Manager v3.0</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>© 2026 Compliance Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
