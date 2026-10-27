import React, { useState, useEffect } from 'react';
import { Rocket, RefreshCw, CheckCircle2, Terminal, ShieldCheck, History, ArrowLeftRight, AlertTriangle } from 'lucide-react';

const AdminDeploy = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const deploymentSteps = [
    { label: 'Fetching Build Artifacts', description: 'Retrieving build-v4.8.2-stable from secure S3 bucket...' },
    { label: 'Pre-flight Validation', description: 'Executing dependency integrity checks and node handshake...' },
    { label: 'Database Migration', description: 'Applying non-blocking schema updates to primary cluster...' },
    { label: 'Rolling Update', description: 'Deploying to 25% of nodes (Canary Phase)...' },
    { label: 'Synchronization', description: 'Waiting for node health convergence...' }
  ];

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);
  };

  const handleStartDeploy = () => {
    setIsDeploying(true);
    setDeployStep(1);
    setLogs([]);
    setShowSuccess(false);
    
    addLog('Initiating deployment sequence...', 'system');
    
    // Simulate steps
    setTimeout(() => {
      setDeployStep(2);
      addLog('Artifact build-v4.8.2 retrieved. SHA-256: 0x9f8e...7a2b', 'success');
      setTimeout(() => {
        setDeployStep(3);
        addLog('Integrity check passed. All 12 nodes responding.', 'success');
        setTimeout(() => {
          setDeployStep(4);
          addLog('DB Migration successful. No lock detected.', 'success');
          setTimeout(() => {
            setDeployStep(5);
            addLog('Rolling update in progress. Node Cluster Vizag-01 updated.', 'info');
            setTimeout(() => {
              setIsDeploying(false);
              setShowSuccess(true);
              addLog('Deployment COMPLETE. System stabilized.', 'system');
            }, 2500);
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="admin-deploy animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div className="deploy-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div>
            <h2 style={{ margin: 0 }}>Platform Version Control</h2>
            <p style={{ margin: '5px 0 0', color: 'var(--text-muted)' }}>Orchestrate rolling updates, canary releases, and regional node deployments.</p>
         </div>
         <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ padding: '10px 20px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: '12px', textAlign: 'right' }}>
               <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800 }}>ACTIVE VERSION</span>
               <strong style={{ color: 'var(--primary)' }}>v4.8.1-stable</strong>
            </div>
         </div>
      </div>

      <div className="deploy-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
         <div className="deploy-main-card mo-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="steps-container" style={{ marginBottom: '3rem' }}>
               {deploymentSteps.map((s, i) => {
                  const stepNum = i + 1;
                  const isActive = deployStep === stepNum;
                  const isCompleted = deployStep > stepNum;
                  
                  return (
                     <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', opacity: deployStep > 0 && !isActive && !isCompleted ? 0.3 : 1, transition: '0.3s' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                           <div style={{ 
                              width: '40px', height: '40px', borderRadius: '50%', 
                              background: isCompleted ? '#10b981' : isActive ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                              border: `2px solid ${isCompleted ? '#10b981' : isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--text)", fontWeight: 800
                           }}>
                              {isCompleted ? <CheckCircle2 size={20} /> : stepNum}
                           </div>
                           {i < deploymentSteps.length - 1 && <div style={{ flex: 1, width: '2px', background: isCompleted ? '#10b981' : 'rgba(255,255,255,0.1)', margin: '10px 0' }}></div>}
                        </div>
                        <div style={{ flex: 1, paddingTop: '5px' }}>
                           <h4 style={{ margin: 0, color: isActive ? 'var(--primary)' : isCompleted ? '#10b981' : 'white' }}>{s.label}</h4>
                           <p style={{ margin: '5px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.description}</p>
                        </div>
                     </div>
                  );
               })}
            </div>

            <div className="action-bar" style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
               <button 
                  className="mo-button-primary" 
                  style={{ flex: 2, padding: '18px', fontSize: '1rem', background: '#0ea5e9' }}
                  onClick={handleStartDeploy}
                  disabled={isDeploying}
               >
                  {isDeploying ? (
                     <><RefreshCw size={22} className="animate-spin" /> EXECUTING DEPLOYMENT...</>
                  ) : showSuccess ? (
                     <><CheckCircle2 size={22} /> VERSION v4.8.2 DEPLOYED</>
                  ) : (
                     <><Rocket size={22} /> DEPLOY NEW VERSION</>
                  )}
               </button>
               <button className="mo-button-outline" style={{ flex: 1 }} disabled={isDeploying}>
                  <History size={18} /> Rollback
               </button>
            </div>

            {isDeploying && <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--primary)', boxShadow: '0 0 20px var(--primary)', animation: 'scan 3s infinite' }}></div>}
         </div>

         <div className="side-controls" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="mo-card" style={{ padding: '1.5rem' }}>
               <h4 style={{ margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Terminal size={18} /> Live Deployment Log</h4>
               <div className="terminal-body" style={{ background: '#0a0d17', borderRadius: '12px', padding: '1rem', height: '350px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                  {logs.length === 0 && <p style={{ opacity: 0.3 }}>Waiting for sequence...</p>}
                  {logs.map((log, i) => (
                     <div key={i} style={{ marginBottom: '8px', color: log.type === 'system' ? '#8b5cf6' : log.type === 'success' ? '#10b981' : 'var(--text-muted)' }}>
                        <span style={{ opacity: 0.5 }}>[{log.time}]</span> {log.msg}
                     </div>
                  ))}
                  {isDeploying && <div style={{ width: '8px', height: '12px', background: 'var(--primary)', display: 'inline-block', animation: 'blink 1s infinite' }}></div>}
               </div>
            </div>

            <div className="mo-card" style={{ padding: '1.5rem', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
               <h4 style={{ margin: '0 0 10px', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertTriangle size={18} /> High Risk Zone</h4>
               <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Force re-sync all nodes. This will cause a 2-3s platform-wide freeze.</p>
               <button className="mo-button-outline" style={{ width: '100%', marginTop: '1.5rem', borderColor: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}>Force Regional Sync</button>
            </div>
         </div>
      </div>

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2.5rem; }
        .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 14px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .mo-button-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4); }
        .mo-button-primary:disabled { opacity: 0.7; cursor: wait; }
        
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 14px; border-radius: 14px; cursor: pointer; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s; }
        .mo-button-outline:hover:not(:disabled) { background: var(--surface); border-color: var(--primary); color: var(--primary); }
        .mo-button-outline:disabled { opacity: 0.5; cursor: not-allowed; }

        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AdminDeploy;
