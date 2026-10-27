import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Send, 
  ShieldCheck, 
  History, 
  ChevronRight,
  FileText,
  CloudUpload,
  Activity,
  CheckCircle2,
  Loader2,
  Terminal,
  Zap
} from 'lucide-react';

const MedicalIDSPReports = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeReport, setActiveReport] = useState(null);
  const [submissionLines, setSubmissionLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [activeFacility, setActiveFacility] = useState('All Facilities');
  const [reportState, setReportState] = useState({}); // { reportId: 'submitted' | 'pending' }

  const facilities = [
    { name: 'All Facilities', type: 'DISTRICT' },
    { name: 'Guntur PHC-1', type: 'PHC', mandal: 'Guntur Urban' },
    { name: 'Mangalagiri CHC', type: 'CHC', mandal: 'Mangalagiri' },
    { name: 'Tenali Area Hospital', type: 'AH', mandal: 'Tenali' },
    { name: 'Gajuwaka Sect-2 PHC', type: 'PHC', mandal: 'Visakhapatnam' }
  ];

  const initialReports = [
    { id: 'IDSP-P-901', name: 'Form P: Presumptive Case Registry', indicator: 'Acute Febrile Illness', facility: 'Guntur PHC-1', mandal: 'Guntur Urban', date: '23 Apr 2026', type: 'FORM-P', status: 'Pending', cases: 24, deaths: 0 },
    { id: 'IDSP-L-402', name: 'Form L: Laboratory Confirmation', indicator: 'Enteric Fever (Typhoid)', facility: 'Mangalagiri CHC', mandal: 'Mangalagiri', date: '23 Apr 2026', type: 'FORM-L', status: 'Submitted', cases: 8, deaths: 0 },
    { id: 'IDSP-S-103', name: 'Form S: Syndromic Surveillance', indicator: 'Acute Diarrheal Disease', facility: 'Tenali Area Hospital', mandal: 'Tenali', date: '23 Apr 2026', type: 'FORM-S', status: 'Pending', cases: 45, deaths: 1 },
    { id: 'IDSP-P-904', name: 'Form P: Presumptive Case Registry', indicator: 'Viral Hepatitis', facility: 'Gajuwaka Sect-2 PHC', mandal: 'Visakhapatnam', date: '23 Apr 2026', type: 'FORM-P', status: 'Submitted', cases: 12, deaths: 0 }
  ];

  const [displayReports, setDisplayReports] = useState(initialReports);

  const submissionSteps = [
    "INITIALIZING IDSP SECURE GATEWAY...",
    "EXTRACTING FORM-P PAYLOAD: [Andhra Pradesh State Hub]",
    "VALIDATING ICD-10 DIAGNOSTIC CODES...",
    "ENCRYPTING CLINICAL METADATA (AES-256)...",
    "ESTABLISHING HANDSHAKE WITH IDSP SERVER...",
    "UPLOADING REGIONAL MORBIDITY VECTORS...",
    "AWAITING GOVERNMENT ACKNOWLEDGMENT...",
    "SUBMISSION SUCCESSFUL: TRANSMISSION ID #8921-X"
  ];

  useEffect(() => {
    let interval;
    if (isSubmitting) {
      setSubmissionLines([]);
      setCurrentLineIndex(0);
      interval = setInterval(() => {
        setCurrentLineIndex(prev => {
          if (prev < submissionSteps.length) {
            setSubmissionLines(lines => [...lines, submissionSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleIDSPReady = (report) => {
    setActiveReport(report);
    setIsSubmitting(true);
    setTimeout(() => {
       setIsSubmitting(false);
       setReportState(prev => ({ ...prev, [report.id]: 'submitted' }));
       setDisplayReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'Submitted' } : r));
       setActiveReport(null);
    }, 5500);
  };

  const handleDownload = (report) => {
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("download", `${report.id}_FORM_P.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-tab animate-fade">
      <div className="mo-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2.5rem', boxShadow: 'var(--card-shadow)' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
             <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>IDSP Reports & Submissions</h3>
             <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Official Guntur District epidemiological registry.</p>
             
             <div className="facility-selector-h" style={{ marginTop: '20px', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                {facilities.map(f => (
                   <button 
                      key={f.name}
                      onClick={() => setActiveFacility(f.name)}
                      style={{ 
                        padding: '8px 16px', 
                        borderRadius: '100px', 
                        border: '1px solid var(--border)', 
                        background: activeFacility === f.name ? 'var(--primary)' : 'var(--surface-light)',
                        color: activeFacility === f.name ? 'white' : 'var(--text-muted)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: '0.3s'
                      }}
                   >
                      {f.name}
                   </button>
                ))}
             </div>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             <button 
                className="h-btn-secondary"
                style={{ padding: '12px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
             >
                <Zap size={18} /> New IDSP Entry
             </button>
             <button 
                className="h-btn-primary" 
                onClick={() => {
                   const csvContent = "data:text/csv;charset=utf-8," 
                     + "FORM_TYPE,INDICATOR,FACILITY,MANDAL,CASES,DEATHS,STATUS\n"
                     + displayReports.map(r => `${r.type},${r.indicator},${r.facility},${r.mandal},${r.cases},${r.deaths},${r.status}`).join("\n");
                   const encodedUri = encodeURI(csvContent);
                   const link = document.createElement("a");
                   link.setAttribute("href", encodedUri);
                   link.setAttribute("download", "GUNTUR_IDSP_MASTER_DASHBOARD.xls");
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
                }}
                style={{ 
                   background: '#0ea5e9', 
                   border: 'none', 
                   padding: '14px 32px', 
                   borderRadius: '16px', 
                   color: "var(--text)", 
                   fontWeight: 900, 
                   cursor: 'pointer', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '12px', 
                   boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
                   fontSize: '1rem',
                   transition: '0.3s'
                }}
             >
                <Download size={20} /> Export Master Dossier
             </button>
          </div>
        </div>

        <div className="reports-list-h" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           {displayReports.filter(r => activeFacility === 'All Facilities' || r.facility === activeFacility).map((r, i) => (
             <div 
                key={r.id} 
                className="report-item-h" 
                style={{ 
                   display: 'flex', 
                   justifyContent: 'space-between', 
                   alignItems: 'center', 
                   padding: '1.5rem 2rem', 
                   background: 'var(--surface-light)', 
                   borderRadius: '24px', 
                   border: '1px solid var(--border)',
                   transition: '0.3s'
                }}
             >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                   <div style={{ width: 52, height: 52, borderRadius: '14px', background: r.type.includes('P') ? 'rgba(14, 165, 233, 0.1)' : r.type.includes('L') ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.type.includes('P') ? 'var(--primary)' : r.type.includes('L') ? '#f59e0b' : '#10b981', flexShrink: 0 }}>
                      <FileSpreadsheet size={26} />
                   </div>
                   <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                         <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{r.name}</h4>
                         <span style={{ fontSize: '0.6rem', fontWeight: 900, background: 'var(--surface)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}>{r.id}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text)', fontWeight: 900 }}>INDICATOR: {r.indicator}</span>
                         <span className="dot-separator"></span>
                         <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>{r.facility}</span>
                         <span className="dot-separator"></span>
                         <span style={{ fontSize: '0.7rem', color: r.status === 'Submitted' ? '#10b981' : '#f59e0b', fontWeight: 900 }}>{r.status.toUpperCase()}</span>
                      </div>
                   </div>
                </div>
                
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                   <div style={{ textAlign: 'center' }}>
                      <small style={{ display: 'block', fontSize: '0.55rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '2px' }}>CASES</small>
                      <strong style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text)' }}>{r.cases}</strong>
                   </div>
                   <div style={{ textAlign: 'center' }}>
                      <small style={{ display: 'block', fontSize: '0.55rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '2px' }}>DEATHS</small>
                      <strong style={{ fontSize: '1.1rem', fontWeight: 900, color: r.deaths > 0 ? '#f43f5e' : 'var(--text)' }}>{r.deaths}</strong>
                   </div>
                   <div style={{ width: '1px', height: '30px', background: 'var(--border)' }}></div>
                   <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                         className="tactical-btn-icon" 
                         onClick={() => handleDownload(r)}
                         style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--surface)', border: '1px solid var(--border)', color: "var(--text)", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                         <Download size={18} />
                      </button>
                      {r.status !== 'Submitted' ? (
                        <button 
                           className="idsp-submit-btn"
                           onClick={() => handleIDSPReady(r)}
                           style={{ background: '#10b981', color: "var(--text)", border: 'none', padding: '10px 20px', borderRadius: '100px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}
                        >
                           Submit <Send size={14} />
                        </button>
                      ) : (
                        <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, fontSize: '0.8rem' }}>
                           <CheckCircle2 size={18} /> Sync
                        </div>
                      )}
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
           <ShieldCheck size={32} color="#10b981" />
           <div>
              <h4 style={{ margin: 0, color: '#10b981', fontSize: '0.9rem', fontWeight: 900 }}>IDSP COMPLIANCE VERIFIED</h4>
              <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>All reports are formatted according to Integrated Disease Surveillance Programme (IDSP) Form-P standards. Authoritative data integrity is maintained through regional encryption nodes.</p>
           </div>
        </div>
      </div>

      {/* Line-by-Line IDSP Submission Overlay */}
      {isSubmitting && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
           <div className="submission-container" style={{ width: '100%', maxWidth: '650px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
                 <div className="radar-animation" style={{ width: 90, height: 90, borderRadius: '50%', border: '2px solid #10b981', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, #10b981 0%, transparent 20%)', animation: 'sweep 1s linear infinite' }}></div>
                    <CloudUpload size={40} color="#10b981" />
                 </div>
                 <div>
                    <h2 style={{ margin: 0, letterSpacing: '4px', color: "var(--text)", fontWeight: 900 }}>STATE IDSP SUBMISSION</h2>
                    <p style={{ margin: '4px 0 0', color: '#10b981', fontWeight: 900, fontSize: '0.85rem' }}>TRANSMITTING: {activeReport?.name}</p>
                 </div>
              </div>

              <div className="terminal-submission" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2rem', minHeight: '350px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
                 <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', opacity: 0.5 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f43f5e' }}></div>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }}></div>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }}></div>
                 </div>
                 
                 <div className="submission-lines" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {submissionLines.map((line, i) => (
                       <div key={i} className="animate-slide-in" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                          <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 900, minWidth: '45px' }}>[{i.toString().padStart(2, '0')}]</span>
                          <span style={{ color: "var(--text)", fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.5px' }}>{line}</span>
                          {i === submissionLines.length - 1 && <div style={{ width: 10, height: 18, background: '#10b981', animation: 'pulse 0.5s infinite' }}></div>}
                       </div>
                    ))}
                 </div>

                 {/* Matrix-like Scanning Effect */}
                 <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, #10b981, transparent)', opacity: 0.3, animation: 'scanMove 2.5s linear infinite' }}></div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck size={22} color="#10b981" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)' }}>ENCRYPTED END-TO-END TRANSMISSION</span>
                 </div>
                 <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#10b981' }}>SYNCING WITH NATIONAL HUB...</div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .report-item-h:hover { background: var(--surface) !important; border-color: var(--primary) !important; transform: translateX(5px); }
        .idsp-submit-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
        .tactical-btn-icon:hover { border-color: var(--primary) !important; color: var(--primary) !important; background: rgba(14, 165, 233, 0.1) !important; }
        
        .dot-separator { width: 4px; height: 4px; background: var(--border); border-radius: 50%; }
        
        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scanMove { from { top: 0; } to { top: 100%; } }
        @keyframes pulse { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
        
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        @keyframes slideIn { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        @media (max-width: 768px) {
          .card-header { flex-direction: column; align-items: flex-start !important; }
          .report-item-h { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
};

export default MedicalIDSPReports;
