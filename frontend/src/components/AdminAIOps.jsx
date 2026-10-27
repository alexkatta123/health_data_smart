import React, { useState } from 'react';
import { Brain, Zap, RefreshCw, AlertCircle, ShieldCheck, Search, CheckCircle2 } from 'lucide-react';

const AdminAIOps = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const models = [
    { name: 'SurvAP-NLP-v4', type: 'Clinical Entity Extraction', accuracy: '96.2%', status: 'Production' },
    { name: 'Trend-Predictor-X1', type: 'Epidemiological Forecasting', accuracy: '91.8%', status: 'Training' },
    { name: 'Disease-Classifier-ICD10', type: 'ICD-10 Mapping', accuracy: '94.5%', status: 'Production' }
  ];

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 2500);
  };

  return (
    <div className="admin-aiops animate-fade">
      <div className="mo-card">
         <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
            <div>
               <h3 style={{ margin: 0 }}>AI Model Governance & Ops</h3>
               <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lifecycle management and privacy compliance for health intelligence models.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
               <button className="mo-button-outline" onClick={() => setShowVerifyModal(true)}>
                  <ShieldCheck size={18} /> Verify Anonymization Logs
               </button>
               <button className="mo-button-primary"><RefreshCw size={16} /> Deploy New Version</button>
            </div>
         </div>
         
         <div className="models-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {models.map((m, i) => (
              <div key={i} className="model-card" style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', width: 44, height: 44, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Brain size={24} /></div>
                    <span className={`status-tag ${m.status.toLowerCase()}`}>{m.status}</span>
                 </div>
                 <h4 style={{ margin: '0 0 5px 0' }}>{m.name}</h4>
                 <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.type}</p>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.85rem' }}>Validation Accuracy: <strong>{m.accuracy}</strong></span>
                    <button className="icon-btn"><Zap size={16} /></button>
                 </div>
              </div>
            ))}
         </div>

         {/* NEW: State Dataset Training Section */}
         <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: '2rem' }}>
            <div className="mo-card" style={{ padding: '2rem', border: '1px dashed var(--primary)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                     <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <RefreshCw size={20} color="var(--primary)" /> State Dataset Retraining
                     </h4>
                     <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Fine-tune SurvAP-NLP on anonymized OP/IP datasets from all 26 districts.
                     </p>
                  </div>
                  <button className="h-btn h-btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>Start Training Run</button>
               </div>
               <div style={{ marginTop: '1.5rem', background: 'var(--surface-light)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 900, marginBottom: '8px' }}>
                     <span style={{ color: 'var(--text-muted)' }}>PHASE: DATA EXTRACTION</span>
                     <span style={{ color: 'var(--primary)' }}>WAITING</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px' }}></div>
               </div>
            </div>

            <div className="mo-card" style={{ padding: '2rem', background: 'var(--surface-light)' }}>
               <h4 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="#10b981" /> Accuracy Audit
               </h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ fontSize: '0.85rem' }}>Verified by Officers</span>
                     <span style={{ fontWeight: 900 }}>94.2%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ fontSize: '0.85rem' }}>ML Confidence (Avg)</span>
                     <span style={{ fontWeight: 900 }}>0.91</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ fontSize: '0.85rem' }}>Misclassification Rate</span>
                     <span style={{ fontWeight: 900, color: '#f43f5e' }}>2.1%</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="inference-logs" style={{ marginTop: '2.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}><AlertCircle size={20} color="#f59e0b" /> Inference Latency Alerts</h4>
            <div style={{ padding: '1.25rem', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '18px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
               Detecting 15% increase in P99 latency for NLP-v4 during peak morning hours. Autoscaling group adjusted to +4 nodes.
            </div>
         </div>
      </div>

      {showVerifyModal && (
        <div className="verify-overlay animate-fade">
           <div className="mo-card verify-card" style={{ maxWidth: '800px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                 <div>
                    <h3 style={{ margin: 0 }}>Privacy & Anonymization Audit</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verifying differential privacy and PII scrubbing across AI inference streams.</p>
                 </div>
                 <button className="icon-btn-close" onClick={() => setShowVerifyModal(false)}>✕</button>
              </div>

              <div className="audit-content">
                 <div style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '1.5rem' }}>
                       <div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Records Audited</span>
                          <h2 style={{ margin: '5px 0' }}>42.8k</h2>
                       </div>
                       <div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Anonymization Rate</span>
                          <h2 style={{ margin: '5px 0', color: '#10b981' }}>100%</h2>
                       </div>
                       <div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Privacy Budget (ε)</span>
                          <h2 style={{ margin: '5px 0' }}>0.08</h2>
                       </div>
                    </div>
                 </div>

                 <div className="audit-table">
                    {[
                      { ts: '11:38:04', model: 'NLP-v4', fields: 'Age, District, Symptoms', status: 'Verified' },
                      { ts: '11:35:12', model: 'Disease-Classifier', fields: 'Symptoms, Risk Score', status: 'Verified' },
                      { ts: '11:32:45', model: 'Trend-Predictor', fields: 'Time-series Heatmap', status: 'Verified' }
                    ].map((entry, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 150px 1fr 100px', padding: '1rem', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                         <span style={{ opacity: 0.6 }}>{entry.ts}</span>
                         <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{entry.model}</span>
                         <span style={{ color: 'var(--text-muted)' }}>Anonymized: {entry.fields}</span>
                         <span style={{ color: '#10b981', textAlign: 'right' }}>{entry.status}</span>
                      </div>
                    ))}
                 </div>

                 <button 
                   className="mo-button-primary" 
                   style={{ width: '100%', marginTop: '2.5rem', justifyContent: 'center' }}
                   onClick={handleVerify}
                   disabled={isVerifying}
                 >
                   {isVerifying ? (
                     <><RefreshCw size={18} className="animate-spin" /> Deep Scanning Logs...</>
                   ) : (
                     <><Search size={18} /> Run Verification Scan</>
                   )}
                 </button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2.5rem; }
        .status-tag { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; }
        .status-tag.production { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-tag.training { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .mo-button-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3); }
        .mo-button-primary:disabled { opacity: 0.7; cursor: wait; }
        
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 12px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .mo-button-outline:hover { border-color: var(--primary); color: var(--primary); }
        
        .icon-btn { background: transparent; border: none; color: var(--primary); cursor: pointer; }
        .icon-btn-close { background: transparent; border: none; color: var(--text); font-size: 1.5rem; cursor: pointer; opacity: 0.6; transition: 0.2s; }
        .icon-btn-close:hover { opacity: 1; }

        .verify-overlay {
           position: fixed;
           top: 0; left: 0; right: 0; bottom: 0;
           background: var(--surface);
           backdrop-filter: blur(10px);
           z-index: 1000;
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 2rem;
        }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AdminAIOps;
