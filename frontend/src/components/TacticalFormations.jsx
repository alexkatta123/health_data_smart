import React from 'react';
import { 
  RefreshCw, Zap, Users, 
  FileText, LogOut, ChevronRight,
  ShieldAlert, Activity
} from 'lucide-react';

const TacticalFormations = () => {
  const formations = [
    { label: 'Transfer Patient', icon: <RefreshCw size={20} />, desc: 'Orchestrate inter-ward or facility transfer.' },
    { label: 'Update Status', icon: <Zap size={20} />, desc: 'Adjust clinical acuity and monitoring priority.' },
    { label: 'Assign New Doctor', icon: <Users size={20} />, desc: 'Reallocate primary clinical responsibility.' },
    { label: 'Clinical Documentation', icon: <FileText size={20} />, desc: 'Generate or review comprehensive medical records.' },
    { label: 'Discharge Patient', icon: <LogOut size={20} />, desc: 'Finalize clinical recovery and exit protocols.', danger: true }
  ];

  return (
    <div className="tactical-formations animate-fade">
      <div className="formations-header" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Activity size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>Operational Formations</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tactical directives for clinical management and patient flow.</p>
          </div>
        </div>
      </div>

      <div className="formations-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {formations.map((f, i) => (
          <button 
            key={i} 
            className={`formation-card ${f.danger ? 'danger' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ 
                width: 44, 
                height: 44, 
                borderRadius: '12px', 
                background: f.danger ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.03)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: f.danger ? '#ef4444' : 'white',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                {f.icon}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: f.danger ? '#ef4444' : 'white' }}>{f.label}</h4>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            </div>
            <ChevronRight size={20} color="var(--text-muted)" />
          </button>
        ))}
      </div>

      <div className="formation-advisory" style={{ marginTop: '3rem', background: 'rgba(14, 165, 233, 0.05)', border: '1px solid rgba(14, 165, 233, 0.1)', padding: '1.5rem', borderRadius: '24px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <ShieldAlert size={24} color="var(--primary)" />
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <strong>Command Directive:</strong> All operational formations must be authorized by the attending physician and logged into the statewide health intelligence registry for real-time audit.
        </p>
      </div>

      <style>{`
        .formation-card:hover {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.2) !important;
          transform: translateX(10px);
        }
        .formation-card.danger:hover {
          background: rgba(239, 68, 68, 0.05) !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default TacticalFormations;
