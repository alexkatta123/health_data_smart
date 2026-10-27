import React, { useState } from 'react';
import { ShieldCheck, Lock, EyeOff, Terminal, Download, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

const AdminSecurity = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const [showVerifyOverlay, setShowVerifyOverlay] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 2500);
  };

  const handleExport = () => {
    setIsExporting(true);
    setShowComplete(false);
    setExportStep(1); // Compiling
    
    setTimeout(() => {
      setExportStep(2); // Encrypting
      setTimeout(() => {
        setExportStep(3); // Packaging
        setTimeout(() => {
          setIsExporting(false);
          setShowComplete(true);
          setTimeout(() => setShowComplete(false), 3000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="admin-security animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', padding: '2rem' }}>
      <div className="security-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '1400px', width: '100%' }}>
         <div className="mo-card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <div>
                  <h3 style={{ margin: 0 }}>DPDP & Data Privacy</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time compliance orchestration for digital personal data protection.</p>
               </div>
               <div style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(16, 185, 129, 0.2)', height: 'fit-content' }}>COMPLIANT</div>
            </div>
            <div className="security-ops">
               <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem' }}>
                  <div style={{ flex: 1, padding: '1.25rem', background: 'var(--surface-light)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                     <EyeOff size={24} color="var(--primary)" />
                     <h4 style={{ margin: '12px 0 5px' }}>Redaction</h4>
                     <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-PII mask: <strong style={{ color: '#10b981' }}>Active</strong></p>
                  </div>
                  <div style={{ flex: 1, padding: '1.25rem', background: 'var(--surface-light)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                     <Lock size={24} color="#8b5cf6" />
                     <h4 style={{ margin: '12px 0 5px' }}>Encryption</h4>
                     <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>AES-256-GCM: <strong style={{ color: '#8b5cf6' }}>Enabled</strong></p>
                  </div>
               </div>
               <button 
                  className="mo-button-primary" 
                  style={{ width: '100%' }}
                  onClick={() => setShowVerifyOverlay(true)}
               >
                  Verify Anonymization Logs
               </button>
            </div>
         </div>

         <div className="mo-card relative overflow-hidden">
            <h3 style={{ marginBottom: '1.5rem' }}>System Audit Trail</h3>
             <div className="audit-terminal" style={{ background: 'var(--surface-light)', borderRadius: '20px', padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text)', height: '240px', overflowY: 'auto', border: '1px solid var(--border)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
                <p style={{ margin: '0 0 10px 0' }}><span style={{ color: 'var(--text-muted)' }}>[11:42:01]</span> SEC_AUDIT: User 'dho_vizag' verified clinical cluster CL-82.</p>
                <p style={{ margin: '0 0 10px 0' }}><span style={{ color: 'var(--text-muted)' }}>[11:45:12]</span> SYS_EVENT: Rotated database access keys for PHC-South.</p>
                <p style={{ margin: '0 0 10px 0' }}><span style={{ color: 'var(--text-muted)' }}>[11:48:44]</span> DPDP_CHECK: Successfully anonymized 42 clinical records.</p>
                <p style={{ margin: '0 0 10px 0' }}><span style={{ color: 'var(--text-muted)' }}>[11:52:05]</span> <span style={{ color: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>ALRT_AUTH</span>: Failed login attempt from 192.168.1.42.</p>
                <p style={{ margin: '0 0 10px 0' }}><span style={{ color: 'var(--text-muted)' }}>[11:55:18]</span> INFRA_SYNC: Regional node Guntur synchronized with Core.</p>
                <div style={{ width: '8px', height: '14px', background: 'var(--primary)', display: 'inline-block', animation: 'blink 1s infinite' }}></div>
             </div>
            
            <button 
               className="mo-button-outline" 
               style={{ width: '100%', marginTop: '1.5rem', gap: '12px' }}
               onClick={handleExport}
               disabled={isExporting}
            >
               {isExporting ? (
                  <><RefreshCw size={18} className="animate-spin" /> Preparing Forensic Package...</>
               ) : showComplete ? (
                  <><CheckCircle2 size={18} color="#10b981" /> Export Complete</>
               ) : (
                  <><Terminal size={18} /> Export Forensic Log</>
               )}
            </button>

            {isExporting && (
               <div className="export-overlay animate-fade">
                  <div className="progress-container">
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem' }}>
                        <span>{exportStep === 1 ? 'Compiling Audit Trail...' : exportStep === 2 ? 'AES-256 Encryption...' : 'Packaging for Secure Download...'}</span>
                        <span>{Math.round((exportStep / 3) * 100)}%</span>
                     </div>
                     <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(exportStep / 3) * 100}%` }}></div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>

      {showVerifyOverlay && (
        <div className="global-overlay animate-fade" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
           <div className="mo-card" style={{ maxWidth: '900px', width: '100%', border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                 <div>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}><ShieldCheck color="#10b981" /> Anonymization Integrity Scan</h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Validating PII scrubbing and differential privacy metrics across DPDP clinical data streams.</p>
                    <button onClick={() => setShowVerifyOverlay(false)} style={{ background: 'transparent', border: 'none', color: "var(--text)", fontSize: '1.5rem', cursor: 'pointer', opacity: 0.6 }}>✕</button>
                 </div>
              </div>

              <div className="verification-metrics" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '1.5rem', marginBottom: '2.5rem' }}>
                 {[
                    { label: 'Scanned Records', val: '1.24M', icon: <Terminal size={16} /> },
                    { label: 'PII Leakage', val: '0.00%', icon: <ShieldAlert size={16} color="#10b981" /> },
                    { label: 'Epsilon (ε)', val: '0.042', icon: <Lock size={16} /> },
                    { label: 'Verified Blocks', val: '8,421', icon: <CheckCircle2 size={16} color="#10b981" /> }
                 ].map((stat, i) => (
                    <div key={i} style={{ background: 'var(--bg)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                          {stat.icon} {stat.label}
                       </div>
                       <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stat.val}</div>
                    </div>
                 ))}
              </div>

              <div className="verification-log" style={{ background: "var(--surface-light)", borderRadius: '16px', padding: '1.5rem', maxHeight: '250px', overflowY: 'auto', border: '1px solid var(--border)' }}>
                 {[
                    { time: '11:38:04', node: 'Vizag-Core', action: 'Masking: Patient_Name, Mobile_No', status: 'Passed' },
                    { time: '11:35:12', node: 'Kurnool-Hub', action: 'Redaction: Aadhaar_Ref, Address', status: 'Passed' },
                    { time: '11:32:45', node: 'Guntur-Reg', action: 'Encryption: Clinical_Notes_Blob', status: 'Passed' },
                    { time: '11:30:11', node: 'State-Auth', action: 'PII Scrub: Admission_ID_Internal', status: 'Passed' }
                 ].map((log, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 150px 1fr 100px', padding: '12px 0', borderBottom: i === 3 ? 'none' : '1px solid var(--border)', fontSize: '0.85rem' }}>
                       <span style={{ opacity: 0.5 }}>{log.time}</span>
                       <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{log.node}</span>
                       <span style={{ color: 'var(--text-muted)' }}>{log.action}</span>
                       <span style={{ color: '#10b981', textAlign: 'right' }}>{log.status}</span>
                    </div>
                 ))}
              </div>

              <button 
                 className="mo-button-primary" 
                 style={{ width: '100%', marginTop: '2.5rem', gap: '12px', justifyContent: 'center' }}
                 onClick={handleVerify}
                 disabled={isVerifying}
              >
                 {isVerifying ? (
                    <><RefreshCw size={20} className="animate-spin" /> Deep Scanning Security Blocks...</>
                 ) : (
                    <><RefreshCw size={20} /> Re-Run Integrity Verification</>
                 )}
              </button>
           </div>
        </div>
      )}

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2.5rem; position: relative; }
        .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; display: flex; align-items: center; }
        .mo-button-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3); }
        .mo-button-primary:disabled { opacity: 0.7; cursor: wait; }
        
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 14px; border-radius: 14px; cursor: pointer; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s; }
        .mo-button-outline:hover:not(:disabled) { background: var(--surface); border-color: var(--primary); color: var(--primary); }
        .mo-button-outline:disabled { opacity: 0.7; cursor: wait; }

        .export-overlay {
           position: absolute;
           top: 0; left: 0; right: 0; bottom: 0;
           background: var(--surface);
           backdrop-filter: blur(4px);
           display: flex;
           align-items: center;
           padding: 2.5rem;
           z-index: 10;
        }

        .progress-container { width: 100%; }
        .progress-bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 100px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--primary); border-radius: 100px; transition: width 1.5s ease-in-out; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};


export default AdminSecurity;
