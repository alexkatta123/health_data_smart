import React from 'react';
import { Shield, Map, Bell, Database } from 'lucide-react';

const DistrictSettings = () => (
  <div className="district-settings animate-fade">
    <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
       <div className="mo-card">
          <div className="settings-nav">
             <button className="s-nav-btn active"><Map size={18} /> Jurisdiction Config</button>
             <button className="s-nav-btn"><Shield size={18} /> Emergency Protocols</button>
             <button className="s-nav-btn"><Bell size={18} /> Alert Thresholds</button>
             <button className="s-nav-btn"><Database size={18} /> Data Anonymization</button>
          </div>
       </div>
       <div className="mo-card">
          <h3>Jurisdiction: Visakhapatnam District</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Configure regional boundaries, facility mapping, and command chain authority.</p>
          
          <div className="settings-form">
             <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700 }}>Primary Reporting Station</label>
                <select style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: "var(--text)" }}>
                   <option>District Medical & Health Office (DMHO), Vizag</option>
                   <option>Regional Health Hub, Gajuwaka</option>
                </select>
             </div>
             
             <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700 }}>Automatic Outbreak Escalation</label>
                <div style={{ padding: '1.25rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                      <strong>Auto-Alert State Level</strong>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Escalate to State Health Authority if risk score &gt; 75% for 48h.</p>
                   </div>
                   <div className="toggle active"></div>
                </div>
             </div>
          </div>
          <button className="mo-button-primary" style={{ marginTop: '2rem', width: '100%' }}>Save Configuration</button>
       </div>
    </div>
    <style>{`
      .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
      .s-nav-btn { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 1rem; border-radius: 12px; background: transparent; border: none; color: var(--text-muted); font-size: 0.95rem; font-weight: 600; cursor: pointer; text-align: left; }
      .s-nav-btn.active { background: rgba(59, 130, 246, 0.1); color: var(--primary); font-weight: 700; }
      .toggle { width: 40px; height: 20px; background: var(--surface-light); border-radius: 100px; position: relative; }
      .toggle.active { background: var(--primary); }
      .toggle::after { content: ''; position: absolute; left: 3px; top: 3px; width: 14px; height: 14px; background: white; border-radius: 50%; transition: 0.3s; }
      .toggle.active::after { left: 23px; }
      .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; }
    `}</style>
  </div>
);

export default DistrictSettings;
