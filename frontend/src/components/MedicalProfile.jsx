import React from 'react';
import { Stethoscope } from 'lucide-react';

const MedicalProfile = () => (
  <div className="settings-tab mo-card animate-fade">
     <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="profile-sidebar">
           <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: 80, height: 80, background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justify: 'center', color: '#10b981' }}>
                 <Stethoscope size={40} />
              </div>
              <h3>Dr. Aruna Varma</h3>
              <span className="badge">Medical Officer</span>
           </div>
           <div className="info-block">
              <div className="info-row"><span>Reg No</span><strong>APMC-82441</strong></div>
              <div className="info-row"><span>Facility</span><strong>Vizag West PHC</strong></div>
           </div>
        </div>
        <div className="settings-forms">
           <div className="form-section">
              <h4>Notification Preferences</h4>
              <div className="toggle-row"><span>Email Reports</span><input type="checkbox" defaultChecked /></div>
              <div className="toggle-row"><span>High Risk SMS Alerts</span><input type="checkbox" defaultChecked /></div>
           </div>
           <div className="form-section" style={{ marginTop: '2rem' }}>
              <h4>Security</h4>
              <button className="mo-button-outline">Change Access Password</button>
              <button className="mo-button-outline" style={{ marginTop: '1rem' }}>MFA Settings</button>
           </div>
        </div>
     </div>
     <style>{`
       .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
       .badge { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; }
       .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 0.85rem; }
       .info-row span { color: var(--text-muted); }
       .toggle-row { display: flex; justify-content: space-between; padding: 12px 0; }
       .mo-button-outline { width: 100%; padding: 12px; background: transparent; border: 1px solid var(--border); color: var(--text); border-radius: 10px; font-weight: 700; cursor: pointer; }
     `}</style>
  </div>
);

export default MedicalProfile;
