import React from 'react';
import { ShieldCheck, Building2, Database, ArrowRight, Activity, Lock as LockIcon, Globe } from 'lucide-react';

const AccessPlatform = ({ onSelectRole }) => {
  const platforms = [
    {
      id: 'Admin',
      title: 'Administrative Intelligence',
      subtitle: 'State & District Command',
      icon: <ShieldCheck size={48} />,
      color: '#8b5cf6',
      desc: 'High-level epidemiological monitoring, policy hub, and strategic outbreak response management.',
      features: ['State Heatmaps', 'Trend Analysis', 'IDSP Reporting']
    },
    {
      id: 'Hospital',
      title: 'Clinical Gateway',
      subtitle: 'Facility & Patient Care',
      icon: <Building2 size={48} />,
      color: '#10b981',
      desc: 'Real-time patient EMR, AI-driven disease classification, and hospital resource tracking.',
      features: ['Patient Registry', 'AI Diagnosis', 'Resource Hub']
    },
    {
      id: 'DataEntry',
      title: 'Operational Hub',
      subtitle: 'Field Staff & Data Ingestion',
      icon: <Database size={48} />,
      color: '#f59e0b',
      desc: 'Simplified data upload portal for field staff, ensuring rapid ingestion of clinical records.',
      features: ['Manual Entry', 'CSV Bulk Upload', 'Validation Status']
    }
  ];

  return (
    <div className="access-platform-container animate-fade">
      <div className="mesh-bg"></div>
      
      <div className="access-content">
        <header className="access-header">
          <div className="govt-tag">
            <Activity size={18} />
            <span>Health Data Smart | AP Health Department</span>
          </div>
          <h1>Multi-Tier Access Platform</h1>
          <p>Select your operational environment to initialize secure intelligence streaming.</p>
        </header>

        <div className="platform-grid">
          {platforms.map((p) => (
            <div key={p.id} className="platform-card-premium" onClick={() => onSelectRole(p.id)}>
              <div className="card-inner" style={{ '--accent': p.color }}>
                <div className="card-visual">
                  <div className="icon-glow" style={{ background: p.color }}></div>
                  <div className="icon-main">{p.icon}</div>
                </div>
                
                <div className="card-body-p">
                  <span className="platform-subtitle">{p.subtitle}</span>
                  <h2>{p.title}</h2>
                  <p>{p.desc}</p>
                  
                  <div className="feature-tags">
                    {p.features.map(f => <span key={f} className="f-tag">{f}</span>)}
                  </div>

                  <button className="access-btn">
                    Access Platform <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="access-footer">
          <div className="security-status">
            <LockIcon size={14} />
            <span>DPDP 2023 & HIPAA Compliant Session Hub</span>
          </div>
          <div className="system-links">
             <span>v4.2.0 Tactical Intelligence</span>
             <span className="dot"></span>
             <Globe size={14} />
             <span>Regional Network: AP-SOUTH-1</span>
          </div>
        </footer>
      </div>

      <style>{`
        .access-platform-container {
          min-height: 100vh;
          width: 100vw;
          background: var(--surface);
          color: var(--text);
          position: relative;
          overflow-x: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }

        .mesh-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 40%);
          z-index: 1;
          pointer-events: none;
        }

        .access-content {
          width: 100%;
          max-width: 1400px;
          position: relative;
          z-index: 10;
        }

        .access-header { text-align: center; margin-bottom: 5rem; }
        .govt-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--surface);
          padding: 10px 20px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--primary);
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
        }
        .access-header h1 { font-size: 3.5rem; font-weight: 900; letter-spacing: -2px; margin-bottom: 1rem; }
        .access-header p { font-size: 1.2rem; color: var(--text-muted); font-weight: 600; max-width: 600px; margin: 0 auto; }

        .platform-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        .platform-card-premium {
          cursor: pointer;
          perspective: 1000px;
        }

        .card-inner {
          background: var(--surface);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 40px;
          padding: 3rem;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
        }

        .platform-card-premium:hover .card-inner {
          transform: translateY(-15px) scale(1.02);
          border-color: var(--accent);
          background: var(--surface);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .card-visual {
          width: 100px;
          height: 100px;
          margin-bottom: 2.5rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          filter: blur(25px);
          opacity: 0.2;
          transition: 0.5s;
        }

        .platform-card-premium:hover .icon-glow { opacity: 0.5; transform: scale(1.5); }

        .icon-main {
          color: var(--accent);
          z-index: 2;
          transition: 0.5s;
        }
        .platform-card-premium:hover .icon-main { transform: scale(1.1); }

        .platform-subtitle {
          color: var(--accent);
          font-weight: 900;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.8rem;
          display: block;
        }

        .card-body-p h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; color: var(--text); }
        .card-body-p p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 2rem; font-weight: 500; }

        .feature-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 2.5rem; }
        .f-tag {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text);
        }

        .access-btn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: var(--text);
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: 0.3s;
          cursor: pointer;
        }

        .platform-card-premium:hover .access-btn {
          background: var(--accent);
          border-color: var(--accent);
          color: black;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .access-footer {
          margin-top: 6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 3rem;
          color: var(--text-muted);
          font-weight: 700;
          font-size: 0.85rem;
        }

        .security-status { display: flex; align-items: center; gap: 10px; color: #10b981; }
        .system-links { display: flex; align-items: center; gap: 15px; }
        .dot { width: 4px; height: 4px; background: #334155; border-radius: 50%; }

        @media (max-width: 1100px) {
          .platform-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
};

export default AccessPlatform;
