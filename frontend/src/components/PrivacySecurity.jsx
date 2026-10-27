import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Database, 
  Server, 
  FileCheck, 
  UserX,
  RefreshCw,
  History,
  Info,
  MapPin,
  CheckCircle2
} from 'lucide-react';

const PrivacySecurity = () => {
  const [anonymizing, setAnonymizing] = useState(false);
  const [encryptionStatus, setEncryptionStatus] = useState('Active');
  
  const mockLogs = [
    { id: 1, user: 'Dr. Arjun Reddy', action: 'Accessed Patient Registry', resource: 'District: Visakhapatnam', time: '2 mins ago', status: 'Success' },
    { id: 2, user: 'System Agent', action: 'Auto-Anonymization Run', resource: 'OPD Records Batch #882', time: '15 mins ago', status: 'Verified' },
    { id: 3, user: 'K. Sunita (Admin)', action: 'Exported Aggregated Data', resource: 'SNOMED-CT Trend Report', time: '1 hr ago', status: 'Success' },
    { id: 4, user: 'External API', action: 'Connection Attempt', resource: 'Geospatial Cluster', time: '3 hrs ago', status: 'Blocked (Unauthorized)' }
  ];

  const handleAnonymizationTest = () => {
    setAnonymizing(true);
    setTimeout(() => setAnonymizing(false), 2000);
  };

  return (
    <div className="privacy-security-page animate-fade">
      <header className="privacy-header">
        <div className="header-title">
          <div className="badge-secure"><ShieldCheck size={14} /> DPDP Act, 2023 Compliant</div>
          <h1>Sovereign Data Protection & Privacy</h1>
          <p>Ensuring end-to-end anonymization and secure health data handling for Andhra Pradesh.</p>
        </div>
        <div className="status-indicator">
          <div className="status-dot-pulse"></div>
          <span>Environment: Secure Gov-Cloud (India)</span>
        </div>
      </header>

      <div className="privacy-grid">
        {/* DPDP Compliance Card */}
        <div className="glass-card compliance-card">
          <div className="card-header">
            <div className="icon-wrap green"><FileCheck size={20} /></div>
            <h3>Compliance Checklist</h3>
          </div>
          <div className="checklist">
            {[
              'Digital Personal Data Protection Act, 2023',
              'Sovereign Data Residency (Stored in India)',
              'Zero-Knowledge Proof Architecture',
              'Automated PII Anonymization',
              'Immutable Access Audit Ledger',
              'Right to Erasure (RTBF) Protocols'
            ].map((item, i) => (
              <div key={i} className="check-item">
                <CheckCircle2 size={16} color="#10b981" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Anonymization Engine Simulator */}
        <div className="glass-card anonymization-card">
          <div className="card-header">
            <div className="icon-wrap blue"><EyeOff size={20} /></div>
            <h3>Real-time Anonymization Engine</h3>
            <button className="refresh-btn" onClick={handleAnonymizationTest} disabled={anonymizing}>
              <RefreshCw size={16} className={anonymizing ? 'spin' : ''} />
            </button>
          </div>
          <div className="simulator-grid">
            <div className="sim-pane">
              <label>Original Source (PII)</label>
              <div className="data-code">
                <div>Name: Ravi Kumar</div>
                <div>ID: AP-VSP-9928</div>
                <div>Phone: +91 98480 12345</div>
                <div>DOB: 12-05-1985</div>
              </div>
            </div>
            <div className="sim-arrow">
              <RefreshCw size={24} />
            </div>
            <div className="sim-pane masked">
              <label>Anonymized Output</label>
              <div className="data-code">
                <div>Name: {anonymizing ? '...' : 'R*** K****'}</div>
                <div>ID: {anonymizing ? '...' : 'AP-VSP-XXXX'}</div>
                <div>Phone: {anonymizing ? '...' : '+91 XXXXX XX345'}</div>
                <div>DOB: {anonymizing ? '...' : 'XX-XX-1985'}</div>
              </div>
            </div>
          </div>
          <p className="sim-note">AI-driven masking prevents re-identification while preserving epidemiological utility.</p>
        </div>

        {/* Data Storage Infrastructure */}
        <div className="glass-card infrastructure-card">
          <div className="card-header">
            <div className="icon-wrap purple"><Server size={20} /></div>
            <h3>Infrastructure Integrity</h3>
          </div>
          <div className="infra-stats">
            <div className="stat-row">
              <div className="s-label">Encryption Level</div>
              <div className="s-val">AES-256-GCM</div>
            </div>
            <div className="stat-row">
              <div className="s-label">Data Sovereignty</div>
              <div className="s-val">AP State Data Center</div>
            </div>
            <div className="stat-row">
              <div className="s-label">Access Protocol</div>
              <div className="s-val">RBAC + Multi-Factor</div>
            </div>
          </div>
          <div className="geo-indicator">
            <MapPin size={16} />
            <span>Geo-Fenced to Andhra Pradesh Region</span>
          </div>
        </div>

        {/* Audit Ledger */}
        <div className="glass-card audit-card full-width">
          <div className="card-header">
            <div className="icon-wrap gold"><History size={20} /></div>
            <h3>Immutable Access Audit Ledger</h3>
            <span className="live-pill">LIVE AUDIT</span>
          </div>
          <div className="audit-table-wrap">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>User Entity</th>
                  <th>Action Performed</th>
                  <th>Resource Path</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map(log => (
                  <tr key={log.id}>
                    <td className="u-cell"><Lock size={14} /> {log.user}</td>
                    <td>{log.action}</td>
                    <td className="r-cell">{log.resource}</td>
                    <td className="t-cell">{log.time}</td>
                    <td>
                      <span className={`status-badge ${log.status.toLowerCase().includes('success') || log.status.toLowerCase().includes('verified') ? 'success' : 'blocked'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .privacy-security-page {
          padding: 2rem;
          color: var(--text);
          min-height: 100vh;
        }

        .privacy-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
        }

        .badge-secure {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .privacy-header h1 { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }
        .privacy-header p { color: var(--text-muted); font-size: 1rem; }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .status-dot-pulse {
          width: 8px;
          height: 8px;
          background: var(--surface-light);
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .privacy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        .full-width { grid-column: span 3; }

        .glass-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2rem;
          backdrop-filter: blur(20px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-wrap.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .icon-wrap.blue { background: rgba(14, 165, 233, 0.1); color: var(--primary); }
        .icon-wrap.purple { background: rgba(139, 92, 246, 0.1); color: var(--primary); }
        .icon-wrap.gold { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .card-header h3 { font-size: 1.1rem; font-weight: 700; }

        .checklist { display: flex; flex-direction: column; gap: 12px; }
        .check-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }

        .simulator-grid {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .sim-pane {
          flex: 1;
          background: var(--surface);
          border-radius: 12px;
          padding: 12px;
        }

        .sim-pane label { display: block; font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; }
        .data-code { font-family: monospace; font-size: 0.8rem; line-height: 1.6; }

        .sim-arrow { color: var(--border); }
        .sim-pane.masked .data-code { color: var(--primary); }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .refresh-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; position: absolute; right: 0; }

        .infra-stats { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .stat-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
        .s-label { color: var(--text-muted); font-weight: 600; }
        .s-val { font-weight: 800; color: var(--text); }

        .geo-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 92, 246, 0.1);
          color: var(--primary);
          padding: 8px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .live-pill {
          margin-left: auto;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
        }

        .audit-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .audit-table th { text-align: left; padding: 12px; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .audit-table td { padding: 16px 12px; font-size: 0.85rem; border-bottom: 1px solid var(--border); }

        .u-cell { display: flex; align-items: center; gap: 8px; font-weight: 700; }
        .r-cell { color: var(--primary); font-weight: 600; }
        .t-cell { color: var(--text-muted); font-style: italic; }

        .status-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; }
        .status-badge.success { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-badge.blocked { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

        @media (max-width: 1200px) {
          .privacy-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
        }
      ` }} />
    </div>
  );
};

export default PrivacySecurity;
