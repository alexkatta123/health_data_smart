import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Database, 
  Zap, 
  Activity, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle,
  RefreshCw,
  Cpu,
  BarChart3,
  TrendingUp,
  FileText,
  ChevronDown,
  History,
  Settings,
  Shield,
  Gauge,
  Scan,
  Terminal,
  Layers
} from 'lucide-react';

const MedicalModelLoop = () => {
  const [selectedRecord, setSelectedRecord] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showHub, setShowHub] = useState(false);
  const [analysisLines, setAnalysisLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const formationSteps = [
    "INITIALIZING NEURAL FORMATION...",
    "SCANNING CLINICAL PAYLOAD: [Symptom Vector 0x8A]",
    "EXTRACTING ENTITIES: { Fever: 103F, Pain: Severe }",
    "ANALYZING CLUSTER COHERENCE: [District: Vizag North]",
    "CALCULATING ENTROPY SHIFT: Δ=0.042",
    "PROPAGATING CLINICAL OVERRIDE TO GOVERNMENT NODES",
    "STABILIZING MODEL WEIGHTS...",
    "NEURAL FORMATION COMPLETE: PAYLOAD SYNCHRONIZED"
  ];

  useEffect(() => {
    let interval;
    if (isSubmitting) {
      setAnalysisLines([]);
      setCurrentLineIndex(0);
      interval = setInterval(() => {
        setCurrentLineIndex(prev => {
          if (prev < formationSteps.length) {
            setAnalysisLines(lines => [...lines, formationSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleRetrainSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
       setIsSubmitting(false);
       setSelectedRecord('');
       setReason('');
    }, 5000);
  };

  const performanceLogs = [
    { date: '24 Apr 2026', action: 'Weight Calibration', impact: '+0.4%', status: 'Verified' },
    { date: '23 Apr 2026', action: 'Symptom Node Retraining', impact: '+0.8%', status: 'Verified' },
    { date: '22 Apr 2026', action: 'Regional Bias Correction', impact: '+0.2%', status: 'Verified' }
  ];

  return (
    <div className="retraining-tab animate-fade">
      <div className="mo-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
             <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>AI Model Performance & Retraining</h3>
             <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Orchestrate regional ML accuracy and clinical override propagation.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', background: 'rgba(14, 165, 233, 0.1)', padding: '6px 14px', borderRadius: '100px', letterSpacing: '1px' }}>
                <Cpu size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> DISTRICT NODE ACTIVE
             </span>
          </div>
        </div>

        <div className="retrain-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '3rem' }}>
           <div className="performance-stats-h">
              <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '1px' }}>MODEL TELEMETRY</h4>
              
              <div className="perf-card-h" style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1.5rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 900 }}>CLASSIFICATION ACCURACY</span>
                    <TrendingUp size={16} color="#10b981" />
                 </div>
                 <strong style={{ display: 'block', fontSize: '2.5rem', color: "var(--text)", fontWeight: 900 }}>96.2%</strong>
                 <p style={{ margin: '8px 0 0', color: '#10b981', fontSize: '0.75rem', fontWeight: 800 }}>+1.2% Gain in current cycle</p>
              </div>

              <div className="perf-card-h" style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 900 }}>PENDING CORRECTIONS</span>
                    <RefreshCw size={16} color="var(--primary)" />
                 </div>
                 <strong style={{ display: 'block', fontSize: '2.5rem', color: "var(--text)", fontWeight: 900 }}>142</strong>
                 <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800 }}>Awaiting neural propagation</p>
              </div>
           </div>

           <div className="feedback-console-h" style={{ background: 'var(--surface-light)', padding: '2.5rem', borderRadius: '28px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                 <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <BrainCircuit size={24} />
                 </div>
                 <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>Retraining Submission</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Help the AI distinguish between similar symptoms by flagging incorrect predictions.</p>
                 </div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                 <div className="tactical-input-group-h" style={{ position: 'relative' }}>
                    <select 
                       className="mo-input-h" 
                       value={selectedRecord}
                       onChange={(e) => setSelectedRecord(e.target.value)}
                       style={{ width: '100%', background: 'var(--surface-light)', border: "1px solid var(--border)", color: "var(--text)", padding: '14px 20px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 800, appearance: 'none', outline: 'none' }}
                    >
                       <option value="">Select Misclassified Record</option>
                       <option value="CASE-49210">CASE-49210 (Typhoid vs Dengue)</option>
                       <option value="CASE-49185">CASE-49185 (Malaria Cluster)</option>
                    </select>
                    <ChevronDown size={20} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
                 </div>

                 <textarea 
                    className="mo-textarea-h" 
                    placeholder="Explain the clinical reason for override..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{ width: '100%', height: '140px', background: 'var(--surface-light)', border: "1px solid var(--border)", color: "var(--text)", padding: '18px 20px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 700, resize: 'none', outline: 'none', lineHeight: 1.6 }}
                 ></textarea>

                 <button 
                    className="mo-h-btn h-btn-primary-h"
                    onClick={handleRetrainSubmit}
                    disabled={!selectedRecord || !reason}
                    style={{ width: '100%', background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '16px', borderRadius: '14px', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: '0.2s', opacity: (!selectedRecord || !reason) ? 0.5 : 1 }}
                 >
                    Submit to Government Retraining Pipeline
                 </button>
              </div>
           </div>
        </div>

        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '24px', border: '1px solid rgba(14, 165, 233, 0.2)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
           <Cpu size={32} color="var(--primary)" />
           <div>
              <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 900 }}>NEURAL NODE ACTIVE</h4>
              <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Regional AI nodes are currently processing active diagnostic feedback. Retraining cycles are propagated to the State Health Intelligence network every 24 hours.</p>
           </div>
        </div>
      </div>
      {/* Integrated Analytics & Optimization Sections */}
      <div className="integrated-insights-p" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        
        {/* Performance Audit Logs Section */}
        <div className="mo-card animate-slide-up" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
               <History size={24} />
            </div>
            <div>
               <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>Performance Audit Logs</h4>
               <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Historical retraining impact registry.</p>
            </div>
          </div>

          <div className="h-table-card" style={{ border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                   <tr style={{ background: 'var(--surface-light)' }}>
                      <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>DATE</th>
                      <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACTION</th>
                      <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>IMPACT</th>
                   </tr>
                </thead>
                <tbody>
                   {performanceLogs.map((log, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                         <td style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>{log.date}</td>
                         <td style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700 }}>{log.action}</td>
                         <td style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 900, color: '#10b981', textAlign: 'right' }}>{log.impact}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Neural Optimization Hub Section */}
        <div className="mo-card animate-slide-up" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                   <Settings size={24} />
                </div>
                <div>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>Optimization Hub</h4>
                   <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Configure regional ML thresholds.</p>
                </div>
             </div>
             <button className="h-btn-primary" style={{ background: '#f59e0b', border: 'none', padding: '8px 16px', fontSize: '0.7rem' }}>APPLY CONFIG</button>
          </div>

          <div className="opt-grid-compact" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             {[
                { label: 'Sensitivity', icon: <Gauge size={16} /> },
                { label: 'Outbreak', icon: <AlertTriangle size={16} /> },
                { label: 'Weighting', icon: <Database size={16} /> },
                { label: 'Security', icon: <Shield size={16} /> }
             ].map((opt, i) => (
                <div key={i} style={{ background: 'var(--surface-light)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#f59e0b' }}>
                      {opt.icon}
                      <strong style={{ fontSize: '0.75rem' }}>{opt.label}</strong>
                   </div>
                   <input type="range" style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }} />
                </div>
             ))}
          </div>
        </div>

      </div>


      {/* Line-by-Line Neural Formation Overlay */}
      {isSubmitting && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
           <div className="formation-container" style={{ width: '600px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem' }}>
                 <div className="radar-animation" style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 1s linear infinite' }}></div>
                    <Layers size={32} color="var(--primary)" />
                 </div>
                 <div>
                    <h2 style={{ margin: 0, letterSpacing: '4px', color: "var(--text)", fontWeight: 900 }}>NEURAL FORMATION</h2>
                    <p style={{ margin: '4px 0 0', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem' }}>LINE-BY-LINE CLINICAL ANALYSIS IN PROGRESS</p>
                 </div>
              </div>

              <div className="terminal-formation" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', minHeight: '300px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
                 <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', opacity: 0.5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f43f5e' }}></div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}></div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                 </div>
                 
                 <div className="formation-lines" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {analysisLines.map((line, i) => (
                       <div key={i} className="animate-slide-in" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900, minWidth: '40px' }}>[{i.toString().padStart(2, '0')}]</span>
                          <span style={{ color: "var(--text)", fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px' }}>{line}</span>
                          {i === analysisLines.length - 1 && <div style={{ width: 8, height: 16, background: 'var(--primary)', animation: 'pulse 0.5s infinite' }}></div>}
                       </div>
                    ))}
                 </div>

                 {/* Matrix-like Scanning Effect */}
                 <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--primary), transparent)', opacity: 0.5, animation: 'scanMove 2s linear infinite' }}></div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={20} color="#10b981" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)' }}>DPDP COMPLIANT ENCRYPTION</span>
                 </div>
                 <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)' }}>PROPAGATING TO STATE HUB...</div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .mo-input-h:focus, .mo-textarea-h:focus { border-color: var(--primary) !important; box-shadow: 0 0 15px rgba(14, 165, 233, 0.2); }
        .mo-h-btn h-btn-primary-h:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.2); box-shadow: 0 5px 20px rgba(14, 165, 233, 0.4); }
        .h-btn-secondary:hover { border-color: var(--primary) !important; background: rgba(14, 165, 233, 0.05) !important; }
        
        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scanMove { from { top: 0; } to { top: 100%; } }
        @keyframes pulse { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
        
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        @keyframes slideIn { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default MedicalModelLoop;
