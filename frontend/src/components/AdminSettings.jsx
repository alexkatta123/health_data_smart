import React, { useState } from 'react';
import { Settings, Globe, Shield, Database, Cloud, RefreshCw, CheckCircle2, Zap, Brain, Activity, Target, Send, FileText } from 'lucide-react';

const AdminSettings = () => {
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSettingTab, setActiveSettingTab] = useState('global');
  const [showResourceMap, setShowResourceMap] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreStep, setRestoreStep] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(
    localStorage.getItem('survap_maintenance') === 'true'
  );

  const [showDraftModal, setShowDraftModal] = useState(false);
  const [newDirective, setNewDirective] = useState({
    title: '',
    type: 'Protocol',
    scope: 'Statewide',
    content: ''
  });

  const [isRetraining, setIsRetraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingLogs, setTrainingLogs] = useState([]);

  const handleRetrain = () => {
    setIsRetraining(true);
    setTrainingProgress(0);
    setTrainingLogs(['[INIT] Loading training datasets...', '[INFO] Allocated 128GB VRAM for GPU cluster']);
    
    const steps = [
      { p: 25, log: '[INFO] Initializing Weights (Epoch 0/500)', delay: 1000 },
      { p: 50, log: '[RUN] Loss: 0.842 -> 0.315 (Training)', delay: 2000 },
      { p: 75, log: '[INFO] Validation Accuracy: 94.8%', delay: 1500 },
      { p: 100, log: '[SUCCESS] Model v8.4.1 weights optimized and signed.', delay: 1500 }
    ];

    steps.forEach((s, i) => {
      setTimeout(() => {
        setTrainingProgress(s.p);
        setTrainingLogs(prev => [...prev, s.log]);
        if (s.p === 100) {
          setTimeout(() => {
            setIsRetraining(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          }, 1500);
        }
      }, steps.slice(0, i + 1).reduce((acc, curr) => acc + curr.delay, 0));
    });
  };

  const handleApply = () => {
    setIsApplying(true);
    // Simulate complex architectural update
    setTimeout(() => {
      setIsApplying(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2500);
  };

  const handleRestore = () => {
    setIsRestoring(true);
    setRestoreStep(1);
    
    const steps = [
      { delay: 1500, next: 2 }, // Decrypting
      { delay: 3000, next: 3 }, // Validating
      { delay: 4500, next: 4 }, // Injecting
      { delay: 2000, next: 5 }  // Finalizing
    ];

    steps.forEach((s, i) => {
      setTimeout(() => {
        setRestoreStep(s.next);
        if (s.next === 5) {
          setTimeout(() => {
            setIsRestoring(false);
            setShowRestoreModal(false);
            setRestoreStep(0);
          }, 2000);
        }
      }, steps.slice(0, i + 1).reduce((acc, curr) => acc + curr.delay, 0));
    });
  };

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployStep(1); // Fetching
    
    setTimeout(() => {
      setDeployStep(2); // Validation
      setTimeout(() => {
        setDeployStep(3); // Rolling
        setTimeout(() => {
          setIsDeploying(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }, 2000);
      }, 1500);
    }, 1500);
  };

  const toggleMaintenance = () => {
    const newState = !isMaintenanceActive;
    setIsMaintenanceActive(newState);
    localStorage.setItem('survap_maintenance', newState);
    // Notify App component
    window.dispatchEvent(new Event('maintenanceUpdate'));
  };

  return (
    <div className="admin-settings animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', padding: '2rem' }}>
      <div className="settings-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2.5rem', maxWidth: '1400px', width: '100%' }}>
         <div className="mo-card">
            <div className="s-nav">
               {[
                  { id: 'global', icon: <Settings size={18} />, label: 'Global Config' },
                  { id: 'jurisdiction', icon: <Map size={18} />, label: 'Jurisdiction Config' },
                  { id: 'readiness', icon: <Zap size={18} />, label: 'Operational Readiness' },
                  { id: 'exports', icon: <Download size={18} />, label: 'Data Exports' },
                  { id: 'logs', icon: <Activity size={18} />, label: 'System Logs' },
                  { id: 'protocols', icon: <Shield size={18} />, label: 'Emergency Protocols' },
                  { id: 'thresholds', icon: <Bell size={18} />, label: 'Alert Thresholds' },
                  { id: 'privacy', icon: <Database size={18} />, label: 'Data Anonymization' },
                  { id: 'api', icon: <Globe size={18} />, label: 'API Endpoints' },
                  { id: 'ai', icon: <Brain size={18} />, label: 'AI Model Intel' }
               ].map((tab) => (
                 <button 
                   key={tab.id}
                   className={`s-btn ${activeSettingTab === tab.id ? 'active' : ''}`}
                   onClick={() => setActiveSettingTab(tab.id)}
                 >
                   {tab.icon} {tab.label}
                 </button>
               ))}
            </div>
         </div>
         <div className="mo-card" style={{ position: 'relative' }}>
            {activeSettingTab === 'global' && (
              <>
                <div className="s-header" style={{ marginBottom: '2.5rem' }}>
                   <h3>Global Platform Architecture</h3>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Environment variables, infrastructure scaling policies, and global system overrides.</p>
                </div>
                
                <div className="form-sections">
                   <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 700 }}>Primary Database URI</label>
                      <input type="password" value="****************************************" readOnly style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: "var(--text)" }} />
                   </div>
                   
                   <div style={{ padding: '1.5rem', background: 'var(--bg)', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                         <strong>Production Maintenance Mode</strong>
                         <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Redirect all traffic to static maintenance page.</p>
                      </div>
                      <div 
                        className={`toggle ${isMaintenanceActive ? 'active' : ''}`} 
                        onClick={toggleMaintenance}
                      ></div>
                   </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                   <button 
                     className={`mo-button-primary ${isApplying ? 'applying' : ''}`} 
                     style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                     onClick={handleApply}
                     disabled={isApplying || isDeploying}
                   >
                     {isApplying ? (
                       <><RefreshCw size={18} className="animate-spin" /> Propagating...</>
                     ) : (
                       'Apply Changes'
                     )}
                   </button>
                   <button 
                     className="mo-button-primary" 
                     style={{ flex: 1, background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                     onClick={handleDeploy}
                     disabled={isApplying || isDeploying}
                   >
                     {isDeploying ? (
                       <><RefreshCw size={18} className="animate-spin" /> Deploying...</>
                     ) : (
                       <><RefreshCw size={18} /> Deploy New Version</>
                     )}
                   </button>
                </div>
               </>
            )}

            {activeSettingTab === 'jurisdiction' && (
               <div className="tab-content animate-fade">
                  <div className="s-header" style={{ marginBottom: '2.5rem' }}>
                     <h3>Jurisdiction Configuration Hub</h3>
                     <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage regional health hierarchies, administrative boundaries, and facility assignments.</p>
                  </div>

                  <div className="jurisdiction-grid-h" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
                     <div className="j-config-form">
                        <div className="filter-header-h" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.01)', padding: '1rem 1.5rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)' }}>
                           <Filter size={18} color="var(--primary)" />
                           <span style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '1px' }}>HIERARCHY FILTERS</span>
                        </div>

                        <div className="form-sections" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                              <div className="form-group-h">
                                 <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '1px' }}>REGION TYPE</label>
                                 <select style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', color: "var(--text)", fontWeight: 700 }}>
                                    <option>All Regions</option>
                                    <option>Metropolitan</option>
                                    <option>Rural Tier-1</option>
                                    <option>Tribal Cluster</option>
                                 </select>
                              </div>
                              <div className="form-group-h">
                                 <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '1px' }}>FACILITY TIER</label>
                                 <select style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', color: "var(--text)", fontWeight: 700 }}>
                                    <option>All Tiers</option>
                                    <option>District Hospital</option>
                                    <option>CHC</option>
                                    <option>PHC / Wellness</option>
                                 </select>
                              </div>
                           </div>

                           <div className="form-group-h">
                              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '1px' }}>ACTIVE DISTRICT</label>
                              <div style={{ position: 'relative' }}>
                                 <select style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', color: "var(--text)", fontWeight: 700, appearance: 'none' }}>
                                    <option>Visakhapatnam (Metropolitan)</option>
                                    <option>Chittoor (Cluster Hub)</option>
                                    <option>Anantapur (Rural Tier-1)</option>
                                    <option>East Godavari</option>
                                 </select>
                                 <ChevronRight size={18} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', opacity: 0.5 }} />
                              </div>
                           </div>

                           <div className="form-group-h">
                              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '1px' }}>MANDAL NODE SELECTION</label>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                 {['Gajuwaka', 'Pendurthi', 'MVP Colony', 'Rushikonda', 'Bheemili'].map(m => (
                                    <div key={m} style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                                       {m} <span style={{ opacity: 0.5, cursor: 'pointer' }}>✕</span>
                                    </div>
                                 ))}
                                 <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Plus size={14} /> Add Mandal Node
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div style={{ marginTop: '3rem', display: 'flex', gap: '15px' }}>
                           <button 
                              className="mo-button-primary" 
                              style={{ flex: 1, padding: '16px', background: 'var(--primary)', border: 'none', color: "var(--text)", fontWeight: 900, borderRadius: '14px', boxShadow: '0 4px 15px rgba(14, 165, 233, 0.2)', cursor: 'pointer' }}
                              onClick={handleApply}
                           >
                              {isApplying ? <><RefreshCw size={18} className="animate-spin" /> SYNCHRONIZING FILTERS...</> : 'Save Jurisdiction Config'}
                           </button>
                        </div>
                     </div>

                     <div className="j-hierarchy-viz">
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '1px' }}>HIERARCHY PREVIEW</h4>
                        <div style={{ background: '#0a0d17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '28px', padding: '2rem', position: 'relative' }}>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                                 <strong style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>STATE HUB (AP)</strong>
                              </div>
                              <div style={{ marginLeft: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: "1px solid var(--border)" }}>
                                 <strong style={{ fontSize: '0.8rem' }}>DISTRICT: VISAKHAPATNAM</strong>
                              </div>
                              <div style={{ marginLeft: '4rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                 {['MTU-Gajuwaka', 'PHC-Pendurthi', 'CHC-Rushikonda'].map(n => (
                                    <div key={n} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.01)', borderRadius: '10px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>{n}</div>
                                 ))}
                              </div>
                           </div>
                           <div style={{ position: 'absolute', top: '3rem', bottom: '4rem', left: '2.5rem', width: '2px', background: 'rgba(255,255,255,0.05)' }}></div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeSettingTab === 'readiness' && (
               <div className="tab-content animate-fade">
                  <div className="s-header" style={{ marginBottom: '2.5rem' }}>
                     <h3>Operational Readiness Command</h3>
                     <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Orchestrate state-level preparedness, resource mobilization forecasts, and tactical readiness scores.</p>
                  </div>

                  <div className="readiness-dashboard-h" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '1.5rem', marginBottom: '3rem' }}>
                     {[
                        { label: 'Strategic Readiness', val: '94.2%', icon: <Target color="#10b981" />, status: 'Optimal' },
                        { label: 'MTU Deployment Capability', val: '100%', icon: <Activity color="#0ea5e9" />, status: 'Mission Ready' },
                        { label: 'Emergency Staff Latency', val: '< 15min', icon: <Zap color="#f59e0b" />, status: 'Critical Path' }
                     ].map((stat, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.01)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                              {stat.icon}
                              <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>{stat.status.toUpperCase()}</span>
                           </div>
                           <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 700 }}>{stat.label}</span>
                           <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>{stat.val}</h3>
                           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', opacity: 0.3 }}></div>
                        </div>
                     ))}
                  </div>

                  <div className="readiness-controls-h" style={{ background: '#0a0d17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '3rem', textAlign: 'center', position: 'relative' }}>
                     <div className="radar-sweep" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, pointerEvents: 'none' }}></div>
                     <div style={{ position: 'relative', zIndex: 1 }}>
                        <Zap size={48} color="var(--primary)" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 15px var(--primary))' }} />
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem' }}>Recalibrate Strategic Forecast</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
                           Synchronize real-time regional transmission vectors with state resource mobilization logs to optimize emergency response latency and strategic readiness scores.
                        </p>
                        
                        <button 
                           className="mo-button-primary" 
                           style={{ width: '100%', padding: '18px', background: 'var(--primary)', border: 'none', color: "var(--text)", fontWeight: 900, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)', cursor: 'pointer' }}
                           onClick={handleApply}
                        >
                           {isApplying ? (
                              <><RefreshCw size={20} className="animate-spin" /> PERFORMING RECALIBRATION...</>
                           ) : (
                              <><Zap size={20} fill="white" /> Recalibrate Strategic Forecast</>
                           )}
                        </button>
                     </div>
                  </div>

                  <div className="readiness-log-h" style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem' }}>
                     <h5 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '1px' }}>LATEST READINESS LOGS</h5>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                           { time: '14:20:01', msg: 'MTU Cluster-Alpha synchronized with State Hub.', type: 'info' },
                           { time: '13:45:12', msg: 'Strategic Readiness score optimized to 94.2%.', type: 'success' },
                           { time: '12:00:00', msg: 'State-wide resource audit finalized.', type: 'info' }
                        ].map((log, i) => (
                           <div key={i} style={{ display: 'flex', gap: '15px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                              <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>
                              <span style={{ color: log.type === 'success' ? '#10b981' : 'white' }}>{log.msg}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {activeSettingTab === 'exports' && (
               <div className="tab-content animate-fade">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                     <div>
                        <h3>Strategic Data Exports</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Synthesize and archive statewide clinical datasets, infrastructure audits, and epidemiological logs.</p>
                     </div>
                     <button 
                        className="mo-button-primary" 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 28px', background: '#0ea5e9', borderRadius: '100px', fontWeight: 900 }}
                        onClick={handleApply}
                     >
                        {isApplying ? <><RefreshCw size={18} className="animate-spin" /> SYNTHESIZING...</> : <><Download size={18} /> Export All (XLS)</>}
                     </button>
                  </div>

                  <div className="export-grid-h" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                     {[
                        { title: 'Weekly Epidemiological Summary', type: 'XLS', size: '4.2MB', date: '24 Apr 2026' },
                        { title: 'District Infrastructure Audit', type: 'JSON', size: '1.8MB', date: '22 Apr 2026' },
                        { title: 'Clinical Morbidity Dataset', type: 'CSV', size: '12.5MB', date: '20 Apr 2026' },
                        { title: 'State-Wide Staffing Matrix', type: 'XLS', size: '2.1MB', date: '18 Apr 2026' }
                     ].map((exp, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div style={{ width: '48px', height: '48px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                                 <FileText size={20} />
                              </div>
                              <div>
                                 <strong style={{ display: 'block', fontSize: '0.9rem' }}>{exp.title}</strong>
                                 <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{exp.date} • {exp.size}</span>
                              </div>
                           </div>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '0.65rem', fontWeight: 900, background: 'rgba(255,255,255,0.02)', padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)' }}>{exp.type}</span>
                              <button className="icon-btn-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                 <Download size={16} />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'rgba(14, 165, 233, 0.02)', border: '1px dashed rgba(14, 165, 233, 0.2)', borderRadius: '28px', textAlign: 'center' }}>
                     <Database size={32} color="#0ea5e9" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                     <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>All exports are cryptographically signed and optimized for Government of AP clinical audits.</p>
                  </div>
               </div>
            )}

            {activeSettingTab === 'logs' && (
               <div className="tab-content animate-fade">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                     <div>
                        <h3>System Activity & Event Logs</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Monitor mission-critical system events, administrative actions, and strategic state updates.</p>
                     </div>
                     <button 
                        className="mo-button-primary" 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 24px', background: '#0ea5e9' }}
                        onClick={handleApply}
                     >
                        {isApplying ? <><RefreshCw size={18} className="animate-spin" /> EXPORTING...</> : <><FileText size={18} /> Export System Audit</>}
                     </button>
                  </div>

                  <div className="log-registry-h" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     {[
                        { time: '2026-04-24 14:20:01', event: 'Jurisdiction Config Updated', actor: 'State Admin (ID-42)', status: 'Success' },
                        { time: '2026-04-24 13:45:12', event: 'Emergency Protocol Activated', actor: 'Health Secretary', status: 'Authorized' },
                        { time: '2026-04-24 12:00:00', event: 'AI Model Weights Retrained', actor: 'System Auto-Task', status: 'Success' },
                        { time: '2026-04-24 10:15:30', event: 'Mandal Nodes Re-assigned', actor: 'District Officer (Vizag)', status: 'Success' }
                     ].map((log, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '18px', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                 <Activity size={18} color="var(--primary)" />
                              </div>
                              <div>
                                 <strong style={{ display: 'block', fontSize: '0.95rem' }}>{log.event}</strong>
                                 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.time} • Actor: {log.actor}</span>
                              </div>
                           </div>
                           <span style={{ background: log.status === 'Success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(14, 165, 233, 0.1)', color: log.status === 'Success' ? '#10b981' : '#0ea5e9', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800 }}>{log.status.toUpperCase()}</span>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {activeSettingTab === 'protocols' && (
               <div className="tab-content animate-fade">
                  <div className="s-header" style={{ marginBottom: '2.5rem' }}>
                     <h3>Emergency Health Protocols</h3>
                     <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Orchestrate statewide emergency response mandates and clinical mobilization pathways.</p>
                  </div>

                  <div className="protocol-orchestrator-h">
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        {[
                           { title: 'Vector-Borne Rapid Response', code: 'PRO-824', status: 'Standby' },
                           { title: 'Infectious Disease Isolation', code: 'PRO-112', status: 'Active' }
                        ].map(p => (
                           <div key={p.code} style={{ background: '#0a0d17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                 <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>{p.code}</span>
                                 <span style={{ background: p.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)', color: p.status === 'Active' ? '#10b981' : 'var(--text-muted)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900 }}>{p.status.toUpperCase()}</span>
                              </div>
                              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 900 }}>{p.title}</h4>
                              <button className="mo-button-primary" style={{ width: '100%', padding: '10px', borderRadius: '12px', fontSize: '0.85rem' }}>Configure Pathway</button>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {activeSettingTab === 'thresholds' && (
               <div className="tab-content animate-fade">
                  <div className="s-header" style={{ marginBottom: '2.5rem' }}>
                     <h3>Regional Alert Thresholds</h3>
                     <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure AI-driven triggers for regional health alerts and automated mobilization signals.</p>
                  </div>

                  <div className="threshold-config-h" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     {[
                        { disease: 'Dengue Fever', threshold: '20% Surge', district: 'Statewide' },
                        { disease: 'ILI / SARI', threshold: '15% Admission Spike', district: 'Vizag Metropolitan' }
                     ].map(t => (
                        <div key={t.disease} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                              <strong style={{ display: 'block', fontSize: '1rem', fontWeight: 900 }}>{t.disease}</strong>
                              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)' }}>Trigger: {t.threshold} • Scope: {t.district}</span>
                           </div>
                           <button className="mo-button-outline" style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '0.8rem' }}>Modify Trigger</button>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {activeSettingTab === 'privacy' && (
               <div className="tab-content animate-fade">
                  <div className="s-header" style={{ marginBottom: '2.5rem' }}>
                     <h3>Data Anonymization Governance</h3>
                     <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage patient privacy mandates and state-level data masking protocols for public reporting.</p>
                  </div>

                  <div className="privacy-config-h" style={{ background: '#0a0d17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '28px', padding: '2.5rem' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                              <strong style={{ display: 'block', fontSize: '1rem' }}>Differential Privacy Masking</strong>
                              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Inject mathematical noise into district datasets to prevent re-identification.</p>
                           </div>
                           <div className="toggle active"></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                              <strong style={{ display: 'block', fontSize: '1rem' }}>State-Wide PII Purge Schedule</strong>
                              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automatically purge identifiable clinical traces after 36 months.</p>
                           </div>
                           <div style={{ display: 'flex', gap: '10px' }}>
                              <span style={{ background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>Every 90 Days</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeSettingTab === 'ai' && (
               <div className="tab-content animate-fade">
                  <h3>AI Model Intelligence</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Monitor neural network health, detection accuracy, and trigger state-wide model recalibration.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '1.5rem', marginBottom: '2.5rem' }}>
                     {[
                       { label: 'Detection Accuracy', val: '94.2%', icon: <Target color="#10b981" />, status: 'Optimal' },
                       { label: 'Inference Latency', val: '12ms', icon: <Activity color="#0ea5e9" />, status: 'Sub-ms' },
                       { label: 'Model Version', val: 'v8.4.1', icon: <Brain color="#8b5cf6" />, status: 'Latest' }
                     ].map((stat, i) => (
                       <div key={i} style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                             {stat.icon}
                             <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)' }}>{stat.status}</span>
                          </div>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{stat.label}</span>
                          <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{stat.val}</h3>
                       </div>
                     ))}
                  </div>

                  <div style={{ padding: '2rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '24px', border: '1px solid rgba(14, 165, 233, 0.2)', textAlign: 'center' }}>
                     <Brain size={48} color="var(--primary)" style={{ marginBottom: '1.5rem', opacity: 0.6 }} />
                     <h4>Stale Weights Detected</h4>
                     <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 2rem' }}>
                        The model hasn't been retrained with recent regional transmission data. Recalibrating now can improve accuracy by up to 4.2%.
                     </p>
                     
                     <button 
                       className="mo-button-primary" 
                       style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                       onClick={handleRetrain}
                       disabled={isRetraining}
                     >
                       {isRetraining ? <RefreshCw size={18} className="animate-spin" /> : <Zap size={18} fill="white" />}
                       {isRetraining ? 'Retraining Neural Cluster...' : 'Retrain Model'}
                     </button>
                  </div>

                  {isRetraining && (
                     <div className="deploy-overlay animate-fade" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10, 13, 23, 0.96)', backdropFilter: 'blur(16px)', zIndex: 100, display: 'flex', alignItems: 'center', padding: '3rem' }}>
                        <div style={{ width: '100%' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1rem' }}>
                              <span style={{ fontWeight: 800, color: "var(--text)", display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Brain size={20} color="var(--primary)" /> Neural Weight Optimization
                              </span>
                              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{trainingProgress}%</span>
                           </div>
                           <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden', marginBottom: '2.5rem' }}>
                              <div style={{ width: `${trainingProgress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), #8b5cf6)', borderRadius: '100px', transition: 'width 1s ease-in-out' }}></div>
                           </div>
                           <div style={{ background: "var(--surface-light)", padding: '1.5rem', borderRadius: '20px', border: "1px solid var(--border)", fontFamily: 'monospace', fontSize: '0.8rem', height: '160px', overflowY: 'auto' }}>
                              {trainingLogs.map((log, i) => (
                                <p key={i} style={{ margin: '8px 0', color: log.startsWith('[SUCCESS]') ? '#10b981' : log.startsWith('[ERR]') ? '#f43f5e' : 'var(--text-muted)' }}>{log}</p>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {isDeploying && (
               <div className="deploy-overlay animate-fade" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(10, 13, 23, 0.95)', backdropFilter: 'blur(12px)', zIndex: 100, display: 'flex', alignItems: 'center', padding: '2.5rem' }}>
                  <div style={{ width: '100%' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 800, color: "var(--text)" }}>
                           {deployStep === 1 ? 'Fetching Deployment Artifacts...' : deployStep === 2 ? 'Pre-flight Validation...' : 'Executing Rolling Update...'}
                        </span>
                        <span style={{ color: '#0ea5e9', fontWeight: 800 }}>{Math.round((deployStep / 3) * 100)}%</span>
                     </div>
                     <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden', marginBottom: '20px' }}>
                        <div style={{ width: `${(deployStep / 3) * 100}%`, height: '100%', background: '#0ea5e9', borderRadius: '100px', transition: 'width 1.5s ease-in-out' }}></div>
                     </div>
                     <div style={{ background: "var(--surface-light)", padding: '1.25rem', borderRadius: '16px', border: "1px solid var(--border)", fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {deployStep >= 1 && <p style={{ margin: '5px 0', color: '#10b981' }}>[SUCCESS] Pulled build-v4.8.2-stable</p>}
                        {deployStep >= 2 && <p style={{ margin: '5px 0', color: '#10b981' }}>[SUCCESS] Health check passed for 12 nodes</p>}
                        {deployStep >= 3 && <p style={{ margin: '5px 0', color: '#0ea5e9' }}>[RUNNING] Updating cluster secondary... 75%</p>}
                     </div>
                  </div>
               </div>
            )}

            {activeSettingTab === 'api' && (
              <div className="tab-content animate-fade">
                <h3>System API Gateway</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Configure and monitor internal and external interface endpoints.</p>
                <div className="api-list">
                   {[
                     { name: 'Core Surveillance API', url: 'https://api.survap.gov.in/v1', status: 'Healthy' },
                     { name: 'AI Inference Gateway', url: 'https://ai-node.survap.gov.in/inference', status: 'Healthy' },
                     { name: 'District Data Sync', url: 'https://sync.survap.gov.in/v2', status: 'Optimal' }
                   ].map((api, i) => (
                     <div key={i} className="api-item" style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <strong>{api.name}</strong>
                           <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981' }}>{api.status}</span>
                        </div>
                        <code style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{api.url}</code>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeSettingTab === 'cloud' && (
              <div className="tab-content animate-fade">
                <h3>Cloud Resources & Scaling</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>State-wide infrastructure distribution and autoscaling parameters.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                   <div style={{ background: 'var(--bg)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                      <strong>Active Nodes</strong>
                      <h2 style={{ margin: '10px 0', color: 'var(--primary)' }}>12 / 24</h2>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Autoscaling Enabled</span>
                   </div>
                   <div style={{ background: 'var(--bg)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                      <strong>Daily Egress</strong>
                      <h2 style={{ margin: '10px 0', color: '#10b981' }}>420 GB</h2>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Within Quota</span>
                   </div>
                </div>
                <button 
                  className="mo-button-outline" 
                  style={{ width: '100%' }}
                  onClick={() => setShowResourceMap(true)}
                >
                  View Resource Map
                </button>
              </div>
            )}

            {showResourceMap && (
              <div className="resource-map-overlay animate-fade">
                <div className="resource-map-content mo-card">
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                      <div>
                         <h3 style={{ margin: 0 }}>Logical Resource Topology</h3>
                         <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time distribution of compute and storage nodes across regional hubs.</p>
                      </div>
                      <button className="icon-btn" onClick={() => setShowResourceMap(false)}>✕</button>
                   </div>
                   
                   <div className="topology-view" style={{ height: '600px', borderRadius: '24px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      
                      {/* Connection Lines Container */}
                      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
                         <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="var(--primary)" strokeWidth="1.5" />
                         <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="var(--primary)" strokeWidth="1.5" />
                         <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="var(--primary)" strokeWidth="1.5" />
                         <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="var(--primary)" strokeWidth="1.5" />
                      </svg>

                      {/* Central Hub */}
                      <div className="topo-node central" style={{ zIndex: 20 }}>
                         <div className="node-icon primary pulse-glow"><Database size={40} /></div>
                         <span className="node-label" style={{ marginTop: '20px', fontSize: '1rem' }}>STATE CORE HUB</span>
                      </div>

                      {/* Regional Nodes */}
                      {[
                        { label: 'North Node', pos: { top: '10%', left: '15%' }, status: 'Optimal' },
                        { label: 'Central Hub B', pos: { top: '10%', right: '15%' }, status: 'Optimal' },
                        { label: 'Coastal Node', pos: { bottom: '10%', left: '15%' }, status: 'Optimal' },
                        { label: 'South Node', pos: { bottom: '10%', right: '15%' }, status: 'Scaling' }
                      ].map((node, i) => (
                        <div key={i} className="topo-node regional animate-fade" style={{ position: 'absolute', ...node.pos }}>
                           <div className="node-icon" style={{ width: '56px', height: '56px', background: 'rgba(14, 165, 233, 0.05)' }}><Cloud size={24} /></div>
                           <div className="node-info" style={{ top: '65px' }}>
                              <strong style={{ fontSize: '0.8rem' }}>{node.label}</strong>
                              <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800 }}>{node.status}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {activeSettingTab === 'backup' && (
              <div className="tab-content animate-fade">
                <h3>Disaster Recovery & Backups</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Statewide database snapshots and recovery orchestration.</p>
                <div className="backup-log">
                   {[
                     { date: '24 Apr 2026, 02:00 AM', size: '1.2 TB', type: 'Full Snapshot', status: 'Success' },
                     { date: '23 Apr 2026, 02:00 AM', size: '1.1 TB', type: 'Full Snapshot', status: 'Success' }
                   ].map((b, i) => (
                     <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                        <div>
                           <strong>{b.date}</strong>
                           <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.type} • {b.size}</p>
                        </div>
                        <CheckCircle2 size={18} color="#10b981" />
                     </div>
                   ))}
                </div>
                <button 
                  className="mo-button-primary" 
                  style={{ marginTop: '2rem', width: '100%', background: '#ef4444' }}
                  onClick={() => setShowRestoreModal(true)}
                >
                  Initiate Emergency Restore
                </button>
              </div>
            )}

            {showRestoreModal && (
              <div className="resource-map-overlay animate-fade">
                <div className="resource-map-content mo-card" style={{ maxWidth: '500px' }}>
                   <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>⚠ Emergency Disaster Recovery</h3>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                      You are about to initiate a full state-wide database restoration. This will overwrite all clinical data with the snapshot from 24 Apr 2026, 02:00 AM.
                   </p>

                   {restoreStep === 0 ? (
                     <div className="confirm-restore animate-fade">
                        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                           Type <strong>RESTORE</strong> to confirm this destructive action.
                        </div>
                        <input type="text" placeholder="CONFIRMATION CODE" style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', color: "var(--text)", marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '2px' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                           <button className="mo-button-outline" style={{ flex: 1 }} onClick={() => setShowRestoreModal(false)}>Cancel</button>
                           <button className="mo-button-primary" style={{ flex: 1, background: '#ef4444' }} onClick={handleRestore}>Confirm Restore</button>
                        </div>
                     </div>
                   ) : (
                     <div className="restore-progress animate-fade">
                        <div className="progress-steps" style={{ marginBottom: '2rem' }}>
                           {[
                             { id: 1, label: 'Decrypting Snapshot' },
                             { id: 2, label: 'Integrity Verification' },
                             { id: 3, label: 'Database Injection' },
                             { id: 4, label: 'Node Synchronization' }
                           ].map((s) => (
                             <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', opacity: restoreStep >= s.id ? 1 : 0.3 }}>
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: restoreStep > s.id ? '#10b981' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                   {restoreStep > s.id ? <CheckCircle2 size={14} color="white" /> : <RefreshCw size={12} className={restoreStep === s.id ? 'animate-spin' : ''} />}
                                </div>
                                <span style={{ fontSize: '0.85rem' }}>{s.label}</span>
                             </div>
                           ))}
                        </div>
                        {restoreStep === 5 && (
                          <div className="animate-fade" style={{ textAlign: 'center', color: '#10b981', fontWeight: 700 }}>
                             RESTORE COMPLETE. REBOOTING CLUSTERS...
                          </div>
                        )}
                     </div>
                   )}
                </div>
              </div>
            )}

            {showSuccess && activeSettingTab === 'global' && (
              <div className="success-toast animate-slide-up">
                 <CheckCircle2 size={18} color="#10b981" />
                 <span>Architecture successfully updated and propagated across nodes.</span>
              </div>
            )}
         </div>
      </div>
      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2rem; }
        .s-btn { width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px 1.25rem; border-radius: 14px; background: transparent; color: var(--text-muted); border: none; font-size: 0.95rem; font-weight: 700; cursor: pointer; text-align: left; transition: all 0.2s; }
        .s-btn:hover { background: var(--surface); color: var(--text); }
        .s-btn.active { background: rgba(14, 165, 233, 0.1); color: var(--primary); }
        
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 12px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .mo-button-outline:hover { border-color: var(--primary); color: var(--primary); }
        
        .toggle { width: 44px; height: 24px; background: var(--surface-light); border-radius: 100px; position: relative; cursor: pointer; transition: background 0.3s; }
        .toggle::after { content: ''; position: absolute; left: 4px; top: 4px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: 0.3s; }
        .toggle.active { background: var(--primary); }
        .toggle.active::after { left: 24px; }

        .resource-map-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--surface);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .resource-map-content {
          width: 100%;
          max-width: 1000px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 2.5rem;
        }

         .topology-view {
           background: transparent;
         }

        .topo-node { display: flex; flex-direction: column; align-items: center; gap: 10px; z-index: 10; }
        .node-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--surface-light); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--text-muted); position: relative; }
        .node-icon.primary { width: 60px; height: 60px; background: var(--primary); color: var(--text); border: none; box-shadow: 0 0 30px rgba(14, 165, 233, 0.4); }
        .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.4); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(14, 165, 233, 0.7); transform: scale(1.05); }
        }
        
        .node-label { font-size: 0.75rem; font-weight: 800; color: var(--text); letter-spacing: 1px; }
        .node-info { background: var(--surface); padding: 8px 12px; border-radius: 10px; border: 1px solid var(--border); position: absolute; top: 50px; white-space: nowrap; text-align: center; }
        .node-info strong { display: block; font-size: 0.7rem; }

        .node-line {
          position: absolute;
          width: 2px;
          background: linear-gradient(to top, var(--primary), transparent);
          height: 100px;
          bottom: 100%;
          opacity: 0.3;
        }

        .icon-btn { background: transparent; border: none; color: var(--text); font-size: 1.5rem; cursor: pointer; opacity: 0.6; transition: 0.2s; }
        .icon-btn:hover { opacity: 1; }
        
        .mo-button-primary { 
          background: var(--primary); 
          color: var(--text); 
          border: none; 
          padding: 14px; 
          border-radius: 14px; 
          font-weight: 700; 
          cursor: pointer; 
          transition: all 0.3s;
        }
        .mo-button-primary.applying { background: var(--surface); opacity: 0.8; cursor: wait; }
        .mo-button-primary:disabled { opacity: 0.7; pointer-events: none; }

        .success-toast {
          position: absolute;
          bottom: -60px;
          left: 0;
          right: 0;
          background: var(--surface);
          border: 1px solid #059669;
          padding: 12px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          color: #ecfdf5;
          z-index: 100;
        }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AdminSettings;
