'use client'

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafbfc', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>
            Compliance Manager
          </h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
            Federal Compliance Assessment Platform
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '48px 24px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', margin: '0 0 12px 0' }}>
          Compliance Projects
        </h2>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 40px 0' }}>
          Select a compliance framework to begin assessment.
        </p>

        {/* CARDS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1f70e6'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
              2 CFR 200 Compliance
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 20px 0' }}>
              Uniform Administrative Requirements
            </p>
            <div style={{ padding: '12px', backgroundColor: '#f0f7ff', borderRadius: '8px', marginBottom: '16px' }}>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: 0 }}>78%</p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Compliance Score</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f70e6' }}>Start Assessment →</span>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1f70e6'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
              Title VI Assessment
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 20px 0' }}>
              Civil Rights Compliance Review
            </p>
            <div style={{ padding: '12px', backgroundColor: '#f0f7ff', borderRadius: '8px', marginBottom: '16px' }}>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: 0 }}>82%</p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Compliance Score</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f70e6' }}>Start Assessment →</span>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1f70e6'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
              NEPA Documentation
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 20px 0' }}>
              Environmental Compliance Review
            </p>
            <div style={{ padding: '12px', backgroundColor: '#f0f7ff', borderRadius: '8px', marginBottom: '16px' }}>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: 0 }}>45%</p>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Compliance Score</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f70e6' }}>Start Assessment →</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', padding: '32px 24px', marginTop: '48px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', fontSize: '13px', color: '#6b7280' }}>
          <p style={{ margin: 0 }}>© 2026 Compliance Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
