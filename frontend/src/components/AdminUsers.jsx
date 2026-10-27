import React, { useState } from 'react';
import { Users, Shield, Key, MoreVertical, ShieldCheck, Download, Copy, RefreshCw, X } from 'lucide-react';

const AdminUsers = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState(null);
  const [serviceAccountName, setServiceAccountName] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);
  const [selectedTrace, setSelectedTrace] = useState(null);

  const handleTraceView = (log) => {
    setSelectedTrace({
      ...log,
      hash: `TRC_${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
      ip: `10.12.8.${Math.floor(Math.random() * 255)}`,
      ua: 'SurvAP Official Terminal (v4.2.0) - DPDP Compliant',
      integrity: 'VERIFIED'
    });
  };
  
  const closeAndReset = () => {
    setShowCreateModal(false);
    setIsGenerating(false);
    setGeneratedKey(null);
    setServiceAccountName('');
    setSelectedTrace(null);
  };

  const rolePermissions = {
    'State Officials': [
      { id: 'spatial', label: 'Spatial Intelligence Access', enabled: true },
      { id: 'policy', label: 'Policy Hub Override', enabled: true },
      { id: 'forensic', label: 'Forensic Audit View', enabled: true },
      { id: 'infra', label: 'Infrastructure Control', enabled: false }
    ],
    'District Officers': [
      { id: 'spatial', label: 'Spatial Intelligence Access', enabled: true },
      { id: 'policy', label: 'Policy Hub Override', enabled: false },
      { id: 'forensic', label: 'Forensic Audit View', enabled: false },
      { id: 'infra', label: 'Infrastructure Control', enabled: false }
    ],
    'Medical Officers': [
      { id: 'cases', label: 'Clinical Case Management', enabled: true },
      { id: 'spatial', label: 'Outbreak Visualization', enabled: true },
      { id: 'report', label: 'IDSP Report Generation', enabled: true },
      { id: 'forensic', label: 'Audit Trail Access', enabled: false }
    ]
  };

  const handleSavePermissions = () => {
    setIsSavingPermissions(true);
    setTimeout(() => {
      setIsSavingPermissions(false);
      setEditingRole(null);
    }, 1500);
  };

  const userLogs = [
    { user: 'dho_vizag', role: 'District Officer', action: 'Authorized Deployment', time: '5m ago' },
    { user: 'admin_sys', role: 'System Admin', action: 'Updated Policy', time: '12m ago' },
    { user: 'doctor_phc1', role: 'Medical Officer', action: 'Validated Case', time: '20m ago' }
  ];

  const handleCreateAccount = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedKey({
        type: "service_account",
        project_id: "survap-ap-core",
        private_key_id: Math.random().toString(36).substring(2, 15),
        client_email: `${serviceAccountName || 'svc-worker'}@survap-ap-core.iam.serviceaccount.com`,
        client_id: "10928374650918273645",
        auth_uri: "https://auth.survap.in/o/oauth2/auth"
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="admin-users animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', padding: '2rem' }}>
      <div className="mo-card" style={{ maxWidth: '1200px', width: '100%' }}>
         <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'center' }}>
            <div>
               <h3 style={{ margin: 0 }}>Stakeholder Access & Permissions</h3>
               <p style={{ margin: '5px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage human and machine identities across the statewide health infrastructure.</p>
            </div>
            <button className="mo-button-primary" onClick={() => setShowCreateModal(true)}>
               <Key size={18} /> Create Service Account
            </button>
         </div>
         
         <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
            {['State Officials', 'District Officers', 'Medical Officers'].map((role, i) => (
              <div key={i} className="role-card" style={{ background: 'var(--surface-light)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', transition: '0.3s' }}>
                 <div style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', width: 60, height: 60, borderRadius: '18px', margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={28} /></div>
                 <h4 style={{ margin: '0 0 5px' }}>{role}</h4>
                 <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{20 + i * 50} Active Accounts</p>
                 <button className="mo-button-outline" style={{ width: '100%' }} onClick={() => setEditingRole(role)}>Manage Permissions</button>
              </div>
            ))}
         </div>

         <div className="access-logs">
            <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} color="var(--primary)" /> Real-time Access Audit</h4>
            <div style={{ background: "var(--surface-light)", borderRadius: '20px', border: '1px solid var(--border)', overflow: 'hidden' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                     <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                        <th style={{ padding: '1.25rem' }}>Principal Identity</th>
                        <th style={{ padding: '1.25rem' }}>Authority Level</th>
                        <th style={{ padding: '1.25rem' }}>System Interaction</th>
                        <th style={{ padding: '1.25rem' }}>Relative Time</th>
                        <th style={{ padding: '1.25rem' }}>Trace</th>
                     </tr>
                  </thead>
                  <tbody>
                     {userLogs.map((l, i) => (
                       <tr key={i} style={{ borderBottom: i === userLogs.length - 1 ? 'none' : '1px solid var(--border)' }}>
                          <td style={{ padding: '1.25rem' }}><strong>{l.user}</strong></td>
                          <td style={{ padding: '1.25rem' }}><span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.75rem' }}>{l.role}</span></td>
                          <td style={{ padding: '1.25rem' }}>{l.action}</td>
                          <td style={{ padding: '1.25rem', color: 'var(--text-muted)' }}>{l.time}</td>
                          <td style={{ padding: '1.25rem' }}>
                             <button className="trace-trigger" onClick={() => handleTraceView(l)}>
                                <MoreVertical size={16} />
                                <span className="trace-pulse"></span>
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      {selectedTrace && (
         <div className="modal-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="mo-card forensic-card" style={{ maxWidth: '650px', width: '100%', border: '1px solid var(--border)', position: 'relative' }}>
               <div className="f-header">
                  <div className="f-badge">FORENSIC AUDIT TRACE</div>
                  <h2>Intelligence Pulse Trace</h2>
                  <p>Deep-packet audit log for cryptographic verification of stakeholder interaction.</p>
               </div>

               <div className="trace-metadata-grid">
                  <div className="tm-item">
                     <small>PRINCIPAL IDENTITY</small>
                     <strong>{selectedTrace.user}</strong>
                  </div>
                  <div className="tm-item">
                     <small>AUTHORITY LEVEL</small>
                     <strong>{selectedTrace.role}</strong>
                  </div>
                  <div className="tm-item">
                     <small>INTEGRITY STATUS</small>
                     <span className="status-glow-green">VERIFIED</span>
                  </div>
               </div>

               <div className="trace-log-box">
                  <div className="tl-row">
                     <span className="tl-label">TRANSACTION HASH</span>
                     <code className="tl-value" style={{ color: 'var(--primary)' }}>{selectedTrace.hash}</code>
                  </div>
                  <div className="tl-row">
                     <span className="tl-label">TERMINAL IP</span>
                     <code className="tl-value" style={{ color: 'var(--primary)' }}>{selectedTrace.ip}</code>
                  </div>
                  <div className="tl-row">
                     <span className="tl-label">ACTION PERFORMED</span>
                     <span className="tl-value-text">{selectedTrace.action}</span>
                  </div>
                  <div className="tl-row">
                     <span className="tl-label">CLIENT SIGNATURE</span>
                     <span className="tl-value-text" style={{ fontSize: '0.65rem', opacity: 0.5 }}>{selectedTrace.ua}</span>
                  </div>
               </div>

               <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="mo-button-primary" onClick={() => setSelectedTrace(null)}>Acknowledge & Close</button>
               </div>
            </div>
         </div>
      )}

      {editingRole && (
         <div className="modal-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--modal-bg)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="mo-card" style={{ maxWidth: '500px', width: '100%', border: '1px solid var(--border)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div>
                     <h3 style={{ margin: 0 }}>Permissions: {editingRole}</h3>
                     <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Configure capability scope for this stakeholder group.</p>
                  </div>
                  <button onClick={() => setEditingRole(null)} style={{ background: 'transparent', border: 'none', color: "var(--text)", cursor: 'pointer', opacity: 0.6 }}><X /></button>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  {(rolePermissions[editingRole] || rolePermissions['State Officials']).map((p, i) => (
                     <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg)', borderRadius: '14px', border: '1px solid var(--border)' }}>
                        <div>
                           <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600 }}>{p.label}</span>
                           <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.id === 'forensic' ? 'Access to encrypted audit trails' : 'Live system interaction'}</span>
                        </div>
                        <div className={`toggle ${p.enabled ? 'active' : ''}`} style={{ transform: 'scale(0.85)' }}></div>
                     </div>
                  ))}
               </div>

               <button 
                  className="mo-button-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
                  onClick={handleSavePermissions}
                  disabled={isSavingPermissions}
               >
                  {isSavingPermissions ? <><RefreshCw size={18} className="animate-spin" /> Propagating Changes...</> : 'Save Authorization Policy'}
               </button>
            </div>
         </div>
      )}

      {showCreateModal && (
         <div className="modal-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--modal-bg)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="mo-card" style={{ maxWidth: '600px', width: '100%', border: '1px solid var(--border)' }}>
               {!generatedKey ? (
                  <>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h3 style={{ margin: 0 }}>Create Service Account</h3>
                        <button onClick={closeAndReset} style={{ background: 'transparent', border: 'none', color: "var(--text)", cursor: 'pointer', opacity: 0.6 }}><X /></button>
                     </div>
                     <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Service accounts represent non-human identities used for machine-to-machine interaction (APIs, automated reports, ETL pipelines).</p>
                     
                     <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 700 }}>Account Name</label>
                        <input 
                           type="text" 
                           placeholder="e.g., vizag-data-pipeline" 
                           style={{ width: '100%', padding: '14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', color: "var(--text)" }}
                           value={serviceAccountName}
                           onChange={(e) => setServiceAccountName(e.target.value)}
                        />
                     </div>

                     <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 700 }}>Permission Scope</label>
                        <select style={{ width: '100%', padding: '14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', color: "var(--text)" }}>
                           <option>Read-Only Analytics</option>
                           <option>Infrastructure Monitor</option>
                           <option>Editor (Write Access)</option>
                           <option>State Admin Delegate</option>
                        </select>
                     </div>

                     <button 
                        className="mo-button-primary" 
                        style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
                        onClick={handleCreateAccount}
                        disabled={isGenerating || !serviceAccountName}
                     >
                        {isGenerating ? <><RefreshCw size={18} className="animate-spin" /> Generating Secure Key...</> : 'Generate JSON Key'}
                     </button>
                  </>
               ) : (
                  <div className="animate-fade">
                     <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <ShieldCheck size={32} />
                        </div>
                        <h3>Service Account Generated</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Credential for <strong>{serviceAccountName}</strong> created successfully.</p>
                     </div>

                     <div style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '2.5rem', fontFamily: 'monospace', fontSize: '0.75rem', position: 'relative' }}>
                        <pre style={{ margin: 0, color: 'var(--primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                           {JSON.stringify(generatedKey, null, 2)}
                        </pre>
                        <button style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--surface)', border: "1px solid var(--border)", borderRadius: '8px', padding: '8px', color: "var(--text)", cursor: 'pointer' }}>
                           <Copy size={14} />
                        </button>
                     </div>

                     <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                           className="mo-button-primary" 
                           style={{ flex: 1, justifyContent: 'center' }}
                           onClick={() => {
                              const blob = new Blob([JSON.stringify(generatedKey, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `${serviceAccountName}-key.json`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              URL.revokeObjectURL(url);
                           }}
                        >
                           <Download size={18} /> Download JSON
                        </button>
                        <button className="mo-button-outline" style={{ flex: 1 }} onClick={closeAndReset}>Done</button>
                     </div>
                     <p style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: '#f43f5e', textAlign: 'center' }}><strong>Warning:</strong> This key cannot be recovered once this window is closed.</p>
                  </div>
               )}
            </div>
         </div>
      )}

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2.5rem; }
        .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
        .mo-button-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3); }
        .mo-button-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 12px 16px; border-radius: 12px; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: 0.3s; }
        .mo-button-outline:hover { border-color: var(--primary); color: var(--primary); }
        
        .icon-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s; }
        .icon-btn:hover { color: var(--text); }
        
        .toggle { width: 44px; height: 24px; background: var(--surface-light); border-radius: 100px; position: relative; cursor: pointer; transition: background 0.3s; }
        .toggle::after { content: ''; position: absolute; left: 4px; top: 4px; width: 16px; height: 16px; background: var(--text); border-radius: 50%; transition: 0.3s; }
        .toggle.active { background: var(--primary); }
        .toggle.active::after { left: 24px; background: white; }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .trace-trigger {
          background: var(--surface);
          border: 1px solid var(--border);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
          transition: 0.3s;
        }
        .trace-trigger:hover { background: var(--primary); color: var(--text); border-color: var(--primary); }
        .trace-pulse { position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; background: var(--surface-light); border-radius: 50%; box-shadow: 0 0 10px #10b981; }

        .forensic-card { border: 1px solid var(--border) !important; background: var(--surface) !important; backdrop-filter: blur(40px); }
        .f-header { text-align: center; margin-bottom: 3rem; }
        .f-badge { display: inline-block; padding: 6px 14px; background: rgba(16, 185, 129, 0.1); color: #10b981; border-radius: 100px; font-size: 0.65rem; font-weight: 900; margin-bottom: 1rem; border: 1px solid rgba(16, 185, 129, 0.2); }
        .f-header h2 { font-size: 1.75rem; font-weight: 900; margin-bottom: 0.5rem; }
        .f-header p { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }

        .trace-metadata-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; padding: 1.5rem; background: var(--surface-light); border-radius: 20px; border: 1px solid var(--border); }
        .tm-item small { display: block; font-size: 0.6rem; font-weight: 800; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; }
        .tm-item strong { font-size: 0.9rem; color: var(--text); }
        .status-glow-green { color: #10b981; font-weight: 900; font-size: 0.8rem; text-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }

        .trace-log-box { display: flex; flex-direction: column; gap: 12px; }
        .tl-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: var(--surface-light); border-radius: 12px; border: 1px solid var(--border); }
        .tl-label { font-size: 0.65rem; font-weight: 900; color: var(--text-muted); }
        .tl-value { font-family: monospace; font-size: 0.85rem; }
        .tl-value-text { color: var(--text); font-weight: 700; font-size: 0.85rem; }
      `}</style>
    </div>
  );
};

export default AdminUsers;
