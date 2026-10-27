import React from 'react';
import { Shield, Database, Users, Globe } from 'lucide-react';

const StateSettings = () => (
  <div className="state-settings animate-fade">
    <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
       <div className="mo-card">
          <div className="s-nav">
             <button className="s-btn active"><Globe size={18} /> Statewide Config</button>
             <button className="s-btn"><Shield size={18} /> Security & DPDP</button>
             <button className="s-btn"><Database size={18} /> Model Management</button>
             <button className="s-btn"><Users size={18} /> Stakeholder Access</button>
          </div>
       </div>
       <div className="mo-card">
          <div className="s-header" style={{ marginBottom: '2.5rem' }}>
             <h3>Statewide System Configuration</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage high-level parameters for health surveillance and AI auditing across Andhra Pradesh.</p>
          </div>
          <div className="form-sections">
             <div className="s-section" style={{ marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Data Anonymization Policy</h4>
                <div style={{ padding: '1.5rem', background: 'var(--bg)', borderRadius: '20px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                      <strong>DPDP v2.0 Compliance Mode</strong>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automatically redact all PII before state-level data ingestion.</p>
                   </div>
                   <div className="toggle active"></div>
                </div>
             </div>

             <div className="s-section">
                <h4 style={{ marginBottom: '1rem' }}>AI Model Auto-Training</h4>
                <div style={{ padding: '1.5rem', background: 'var(--bg)', borderRadius: '20px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                      <strong>Nightly Calibration</strong>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Trigger model retraining if confidence drops below 85%.</p>
                   </div>
                   <div className="toggle"></div>
                </div>
             </div>
          </div>
          <button className="mo-button-primary" style={{ marginTop: '2rem', width: '100%' }}>Save State Configuration</button>
       </div>
    </div>
    <style>{`
      .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2rem; }
      .s-btn { width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px 1.25rem; border-radius: 14px; background: transparent; border: none; color: var(--text-muted); font-size: 0.95rem; font-weight: 700; cursor: pointer; text-align: left; }
      .s-btn.active { background: rgba(59, 130, 246, 0.1); color: var(--primary); }
      .toggle { width: 44px; height: 24px; background: var(--surface-light); border-radius: 100px; position: relative; cursor: pointer; }
      .toggle.active { background: var(--primary); }
      .toggle::after { content: ''; position: absolute; left: 4px; top: 4px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: 0.3s; }
      .toggle.active::after { left: 24px; }
      .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; }
    `}</style>
  </div>
);

export default StateSettings;
