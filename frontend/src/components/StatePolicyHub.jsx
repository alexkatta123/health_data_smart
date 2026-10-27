import React from 'react';
import { ShieldCheck, FileText, Send, AlertTriangle } from 'lucide-react';

const StatePolicyHub = () => {
  const directives = [
    { title: 'District-Wide Monsoon Protocol', target: 'Coastal Districts', status: 'Active', priority: 'High' },
    { title: 'AI Classification Validation Audit', target: 'Statewide', status: 'In Review', priority: 'Medium' },
    { title: 'Emergency Resource Escalation', target: 'Kurnool', status: 'Executing', priority: 'Critical' }
  ];

  return (
    <div className="state-policy-hub animate-fade">
      <div className="policy-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: '1.5rem' }}>
        <div className="mo-card">
           <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h3>Strategic Directives & Policies</h3>
              <button className="mo-button-primary"><FileText size={16} /> Draft New Directive</button>
           </div>
           <div className="directive-list">
              {directives.map((d, i) => (
                <div key={i} className="directive-item" style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                         <span className={`badge ${d.priority.toLowerCase()}`}>{d.priority}</span>
                         <span className="badge-outline">{d.status}</span>
                      </div>
                      <h4 style={{ margin: '0 0 5px 0' }}>{d.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target: {d.target}</p>
                   </div>
                   <button className="mo-button-icon"><Send size={18} /></button>
                </div>
              ))}
           </div>
        </div>
        <div className="mo-card">
           <h3>Compliance & Verification</h3>
           <div style={{ marginTop: '2rem' }}>
              <div className="compliance-stat" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                 <div style={{ width: 120, height: 120, borderRadius: '50%', border: '10px solid #10b981', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                    <ShieldCheck size={60} />
                 </div>
                 <strong>98.2% Statewide DPDP Compliance</strong>
              </div>
              <div className="alert-box" style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                 <div style={{ color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontWeight: 800 }}>
                    <AlertTriangle size={18} /> Audit Required
                 </div>
                 <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>3 facilities in Chittoor district have reported inconsistent anonymization logs.</p>
                 <button className="mo-button-primary" style={{ background: '#f43f5e', width: '100%', marginTop: '1rem', padding: '10px' }}>Initiate Audit</button>
              </div>
           </div>
        </div>
      </div>
      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2rem; }
        .badge { padding: 4px 10px; borderRadius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .badge.high { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .badge.critical { background: #f43f5e; color: var(--text); }
        .badge.medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .badge-outline { padding: 4px 10px; borderRadius: 6px; font-size: 0.7rem; font-weight: 800; border: 1px solid var(--border); color: var(--text-muted); }
        .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; }
        .mo-button-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--bg); border: 1px solid var(--border); color: var(--primary); cursor: pointer; display: flex; align-items: center; justify-content: center; }
      `}</style>
    </div>
  );
};

export default StatePolicyHub;
