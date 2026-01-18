import React from 'react'

interface DashboardInfo {
  id: string
  title: string
  description: string
  icon: string
  path: string
  port: number
  color: string
}

const dashboards: DashboardInfo[] = [
  {
    id: 'v3-fund',
    title: '시안1: 클래식 대시보드',
    description: '펀드 관리 및 투자 현황 모니터링',
    icon: '💰',
    path: 'v3-fund-dashboard',
    port: 5190,
    color: '#4ade80',
  },
  {
    id: 'asset',
    title: '시안3: 카드 그리드',
    description: '전문 자산 관리 및 포트폴리오 분석',
    icon: '🏦',
    path: 'professional-asset-management-dashboard',
    port: 5192,
    color: '#f472b6',
  },
  {
    id: 'monitoring',
    title: '시안2: 모니터링 센터',
    description: '시스템 모니터링 및 실시간 알림',
    icon: '📊',
    path: 'proactive-monitoring-center',
    port: 5191,
    color: '#60a5fa',
  }
  
]

const App: React.FC = () => {
  const handleLaunch = (dashboard: DashboardInfo) => {
    window.open(`http://localhost:${dashboard.port}`, '_blank')
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 Dashboard Portal</h1>
        <p style={styles.subtitle}>농림수산식품모태펀드 투자자산관리시스템 재구축 시안</p>
      </header>

      <main style={styles.main}>
        <div style={styles.grid}>
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              style={{
                ...styles.card,
                borderTop: `4px solid ${dashboard.color}`,
              }}
              onClick={() => handleLaunch(dashboard)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${dashboard.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              <div style={styles.iconWrapper}>
                <span style={styles.icon}>{dashboard.icon}</span>
              </div>
              <h2 style={styles.cardTitle}>{dashboard.title}</h2>
              <p style={styles.cardDescription}>{dashboard.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.path}>📁 {dashboard.path}</span>
                <span style={{ ...styles.port, backgroundColor: dashboard.color }}>
                  :{dashboard.port}
                </span>
              </div>
              <button
                style={{ ...styles.button, backgroundColor: dashboard.color }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleLaunch(dashboard)
                }}
              >
                열기 →
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Copyright 2026. LOGOSSYTEM. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: 800,
    marginBottom: 12,
    background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 32,
  },
  card: {
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    padding: 32,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
    color: '#1e293b',
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 1.6,
    marginBottom: 20,
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  path: {
    fontSize: 12,
    color: '#94a3b8',
  },
  port: {
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 6,
    color: '#fff',
    fontWeight: 600,
  },
  button: {
    width: '100%',
    padding: '12px 24px',
    border: 'none',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  footer: {
    marginTop: 60,
    textAlign: 'center',
  },
  footerText: {
    color: '#64748b',
    marginBottom: 20,
  },
  code: {
    background: 'rgba(0,0,0,0.05)',
    padding: '4px 8px',
    borderRadius: 4,
    fontFamily: 'monospace',
    color: '#1e293b',
  },
  commands: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  commandItem: {
    display: 'block',
    background: 'rgba(255,255,255,0.8)',
    padding: '8px 16px',
    borderRadius: 6,
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#475569',
    border: '1px solid #e2e8f0',
  },
}

export default App
