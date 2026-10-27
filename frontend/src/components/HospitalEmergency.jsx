import React, { useState, useEffect } from 'react';
import { 
  Ambulance, 
  AlertCircle, 
  MapPin, 
  Phone, 
  Activity, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  User,
  HeartPulse, 
  Zap, 
  Radio, 
  CheckCircle2,
  Mic, 
  MessageSquare, 
  Volume2, 
  Shield,
  Signal, 
  Link,
  Truck,
  Users,
  Navigation,
  Wind,
  PlusCircle,
  Command,
  Target,
  ShieldCheck
} from 'lucide-react';

const HospitalEmergency = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [isMobilizing, setIsMobilizing] = useState(false);
  const [deploymentTarget, setDeploymentTarget] = useState(null);
  const [deploymentLines, setDeploymentLines] = useState([]);
  const [deploymentStep, setDeploymentStep] = useState(0);

  const activeEmergencies = [
    { id: 'EMG-001', condition: 'Cardiac Arrest', location: 'Gajuwaka, Sector 4', eta: '4 mins', ambulance: 'AP-31-TV-4021', vitals: 'Critical', paramedic: 'Srinivas Rao' },
    { id: 'EMG-002', condition: 'Major Trauma (RTA)', location: 'MVP Colony', eta: '8 mins', ambulance: 'AP-31-TV-5510', vitals: 'Unstable', paramedic: 'Anjali Sharma' },
    { id: 'EMG-003', condition: 'Severe Respiratory Distress', location: 'Rushikonda', eta: '12 mins', ambulance: 'AP-31-TV-2284', vitals: 'Monitoring', paramedic: 'K. Rajesh' },
  ];

  const deployableUnits = [
    { id: 'UNIT-A1', name: 'ALS Ambulance', type: 'Life Support', status: 'Available', icon: <Ambulance size={20} /> },
    { id: 'UNIT-R1', name: 'Rapid Response Team', type: 'Clinical', status: 'Available', icon: <Users size={20} /> },
    { id: 'UNIT-O2', name: 'Oxygen Dispatch', type: 'Logistics', status: 'Low Stock', icon: <Wind size={20} /> },
    { id: 'UNIT-S1', name: 'Specimen Carrier', type: 'Lab Ops', status: 'Available', icon: <Truck size={20} /> }
  ];

  const deploymentSteps = [
    "ACQUIRING RAPID RESPONSE TARGET...",
    "CALCULATING OPTIMAL LOGISTICS ROUTE...",
    "ESTABLISHING SECURE COMMS LINK...",
    "DISPATCHING UNIT-A1: ALS AMBULANCE",
    "MOBILIZING CLINICAL RESPONSE TEAM...",
    "DEPLOYMENT COMMAND FINALIZED."
  ];

  useEffect(() => {
    let interval;
    if (isMobilizing) {
      setDeploymentLines([]);
      setDeploymentStep(0);
      interval = setInterval(() => {
        setDeploymentStep(prev => {
          if (prev < deploymentSteps.length) {
            setDeploymentLines(lines => [...lines, deploymentSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isMobilizing]);

  const handleDeploy = (unit) => {
    setDeploymentTarget(unit);
    setIsMobilizing(true);
    setTimeout(() => {
       setIsMobilizing(false);
       setDeploymentTarget(null);
    }, 5000);
  };

  return (
    <div className="hospital-emergency animate-fade">
      <div className="emergency-header" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
           <div className="live-dot-tactical" style={{ width: 14, height: 14, background: '#f43f5e', borderRadius: '50%', boxShadow: '0 0 15px #f43f5e', animation: 'pulse 2s infinite' }}></div>
           <div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900 }}>Rapid Response Command</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time resource deployment & emergency orchestration.</p>
           </div>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
           <div className="header-stat-h" style={{ textAlign: 'right', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>AVAILABLE UNITS</span>
              <strong style={{ display: 'block', fontSize: '1.4rem', color: '#10b981' }}>12 Units</strong>
           </div>
           <div className="header-stat-h" style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>RESPONSE LATENCY</span>
              <strong style={{ display: 'block', fontSize: '1.4rem', color: 'var(--primary)' }}>4.2 mins</strong>
           </div>
        </div>
      </div>

      {/* Emergency Quick Actions (The Requested Buttons) */}
      <div className="emergency-quick-actions" style={{ display: 'flex', gap: '20px', marginBottom: '2.5rem' }}>
         <button className="eq-btn trauma-prep">
            <ShieldAlert size={20} />
            <span>Prepare Trauma Room</span>
         </button>
         <button className="eq-btn contact-bridge">
            <Radio size={20} />
            <span>Contact Bridge</span>
         </button>
      </div>

      <div className="emergency-layout-h" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '3rem' }}>
         <main className="e-main-h">
            <div style={{ display: 'flex', gap: '10px', marginBottom: '2.5rem' }}>
               <button 
                  onClick={() => setActiveTab('live')}
                  className={`tactical-tab-btn ${activeTab === 'live' ? 'active' : ''}`}
                  style={{ background: activeTab === 'live' ? 'var(--primary)' : 'rgba(255,255,255,0.02)', color: "var(--text)", border: "1px solid var(--border)", padding: '12px 24px', borderRadius: '14px', fontSize: '0.85rem', fontWeight: 900, cursor: 'pointer' }}
               >
                  ACTIVE RESPONSES
               </button>
               <button 
                  onClick={() => setActiveTab('deploy')}
                  className={`tactical-tab-btn ${activeTab === 'deploy' ? 'active' : ''}`}
                  style={{ background: activeTab === 'deploy' ? 'var(--primary)' : 'rgba(255,255,255,0.02)', color: "var(--text)", border: "1px solid var(--border)", padding: '12px 24px', borderRadius: '14px', fontSize: '0.85rem', fontWeight: 900, cursor: 'pointer' }}
               >
                  RESOURCE DEPLOYMENT
               </button>
            </div>

            {activeTab === 'live' ? (
              <div className="active-responses-h animate-fade">
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {activeEmergencies.map((e, i) => (
                      <div key={i} className="e-card-h" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '28px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                         <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', background: e.vitals === 'Critical' ? '#f43f5e' : '#f59e0b' }}></div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div>
                               <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '2px' }}>{e.id}</span>
                               <h4 style={{ margin: '4px 0 0', fontSize: '1.3rem', fontWeight: 900 }}>{e.condition}</h4>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> {e.location}</span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> ETA: <strong style={{ color: "var(--text)" }}>{e.eta}</strong></span>
                               </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>
                               <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>PARAMEDIC</span>
                               <strong style={{ fontSize: '0.9rem' }}>{e.paramedic}</strong>
                            </div>
                         </div>
                         <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="mo-button-primary" style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '0.9rem' }}>Prepare Trauma Room</button>
                            <button className="mo-button-outline" style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '0.9rem' }}>Contact Bridge</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : (
              <div className="deployment-hub-h animate-fade">
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {deployableUnits.map((u, i) => (
                      <div key={i} className="u-card-h" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem', transition: '0.3s' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(14, 165, 233, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                               {u.icon}
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: u.status === 'Available' ? '#10b981' : '#f59e0b', background: u.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '100px' }}>{u.status.toUpperCase()}</span>
                         </div>
                         <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>{u.name}</h4>
                         <p style={{ margin: '4px 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>{u.type} Resource</p>
                         <button 
                            className="h-btn-primary" 
                            onClick={() => handleDeploy(u)}
                            style={{ width: '100%', background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                         >
                            Deploy Rapid Response <Navigation size={16} />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
            )}
         </main>

         <aside className="e-sidebar-h">
             <div className="sidebar-section-h proximity-intelligence-h" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2.5rem' }}>
                <div className="h-meta-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                   <h3 className="section-title-p" style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px', margin: 0 }}>GEOSPATIAL PROXIMITY</h3>
                   <div className="status-badge-p" style={{ fontSize: '0.7rem', fontWeight: 900, color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}><Radio size={12} className="animate-pulse" /> LIVE TRACKING</div>
                </div>
                
                <div className="tactical-radar-p" style={{ height: '300px', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
                   <div className="radar-canvas">
                      <div className="radar-grid"></div>
                      <div className="radar-ring r1"></div>
                      <div className="radar-ring r2"></div>
                      <div className="radar-ring r3"></div>
                      
                      <div className="radar-sweep-tactical"></div>

                      <div className="outbreak-target-p" style={{ position: 'absolute', top: '35%', left: '30%' }}>
                         <div className="target-glow"></div>
                         <div className="target-icon" style={{ color: 'var(--primary)' }}><Target size={18} /></div>
                         <span className="target-label" style={{ color: "var(--text)", fontSize: '0.65rem', fontWeight: 900 }}>HOTSPOT: GAJUWAKA-4</span>
                      </div>

                      <div className="unit-tracker-p u1" style={{ position: 'absolute', bottom: '25%', right: '25%' }}>
                         <div className="unit-glow"></div>
                         <div className="unit-icon-p" style={{ color: '#10b981' }}><Ambulance size={14} /></div>
                         <span className="unit-tag" style={{ color: '#10b981', fontSize: '0.65rem', fontWeight: 900 }}>UNIT-A1</span>
                      </div>

                      <div className="unit-tracker-p u2" style={{ position: 'absolute', top: '65%', left: '15%' }}>
                         <div className="unit-glow" style={{ background: 'rgba(139, 92, 246, 0.2)' }}></div>
                         <div className="unit-icon-p" style={{ color: '#8b5cf6' }}><Users size={14} /></div>
                         <span className="unit-tag" style={{ color: '#8b5cf6', fontSize: '0.65rem', fontWeight: 900 }}>UNIT-R4</span>
                      </div>

                      <svg className="tactical-vectors" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                         <line className="vector-line" x1="30%" y1="35%" x2="75%" y2="75%" stroke="var(--primary)" strokeDasharray="4" />
                         <circle className="vector-tip" cx="75%" cy="75%" r="4" fill="var(--primary)" />
                      </svg>
                   </div>
                </div>

                <div className="deployment-metrics-p">
                   <div className="metric-row-p" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div className="m-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                         <MapPin size={14} /> <span>DISTANCE TO OUTBREAK</span>
                      </div>
                      <strong className="m-value" style={{ color: "var(--text)" }}>3.8 KM</strong>
                   </div>
                   <div className="metric-row-p" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div className="m-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                         <Clock size={14} /> <span>ESTIMATED ARRIVAL</span>
                      </div>
                      <strong className="m-value" style={{ color: 'var(--primary)' }}>T - 6.2 MINS</strong>
                   </div>
                   <div className="metric-row-p" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="m-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                         <Activity size={14} /> <span>ACTIVE MOBILIZATIONS</span>
                      </div>
                      <strong className="m-value" style={{ color: '#10b981' }}>04 TEAMS</strong>
                   </div>
                </div>
             </div>

            <div className="alert-intelligence-h" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(244, 63, 94, 0.05)', borderRadius: '28px', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', color: '#f43f5e' }}>
                  <AlertCircle size={20} />
                  <strong style={{ fontSize: '0.9rem', fontWeight: 900 }}>CRITICAL DISPATCH</strong>
               </div>
               <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  State Health Intelligence has flagged a localized cluster in Gajuwaka Sector 4. Immediate clinical mobilization prioritized.
               </p>
            </div>
         </aside>
      </div>

      {/* Deployment Formation Overlay */}
      {isMobilizing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 9, 15, 0.98)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
           <div className="deployment-formation-container" style={{ width: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '3.5rem' }}>
                 <div className="radar-animation" style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 1s linear infinite' }}></div>
                    <Navigation size={44} color="var(--primary)" />
                 </div>
                 <div>
                    <h2 style={{ margin: 0, letterSpacing: '5px', color: "var(--text)", fontWeight: 900 }}>RAPID RESPONSE INITIALIZED</h2>
                    <p style={{ margin: '4px 0 0', color: 'var(--primary)', fontWeight: 900, fontSize: '0.9rem' }}>DEPLOYING: {deploymentTarget?.name} • TARGET: GAJUWAKA-4</p>
                 </div>
              </div>

              <div className="formation-terminal" style={{ background: '#0a0d17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '2.5rem', minHeight: '320px', position: 'relative', overflow: 'hidden' }}>
                 <div className="formation-lines" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {deploymentLines.map((line, i) => (
                       <div key={i} className="animate-slide-in" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 900, minWidth: '45px' }}>[{i.toString().padStart(2, '0')}]</span>
                          <span style={{ color: "var(--text)", fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px' }}>{line}</span>
                       </div>
                    ))}
                    {deploymentStep < deploymentSteps.length && (
                       <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 900, minWidth: '45px' }}>[{deploymentStep.toString().padStart(2, '0')}]</span>
                          <div style={{ width: 10, height: 20, background: 'var(--primary)', animation: 'pulse 0.5s infinite' }}></div>
                       </div>
                    )}
                 </div>
                 <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--primary), transparent)', opacity: 0.4, animation: 'scanMove 3s linear infinite' }}></div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck size={24} color="#10b981" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)' }}>MISSION SECURE • ANDHRA PRADESH STATE HUB</span>
                 </div>
                 <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--primary)' }}>T - 04:12 TO ARRIVAL</div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .tactical-tab-btn:hover { border-color: var(--primary) !important; background: rgba(14, 165, 233, 0.1) !important; }
        .tactical-tab-btn.active { box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4); }
        .u-card-h:hover { transform: translateY(-5px); border-color: var(--primary) !important; background: rgba(14, 165, 233, 0.05) !important; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }

        .eq-btn { 
          flex: 1; 
          background: var(--surface); 
          border: 1px solid var(--border); 
          border-radius: 16px; 
          padding: 1.25rem; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 12px; 
          color: var(--text); 
          font-weight: 900; 
          font-size: 1.1rem; 
          cursor: pointer; 
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .eq-btn:hover { background: white; transform: translateY(-4px); box-shadow: 0 15px 30px rgba(0,0,0,0.4); }
        .trauma-prep:hover { color: #f43f5e; }
        .contact-bridge:hover { color: var(--primary); }

        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scanMove { from { top: 0; } to { top: 100%; } }
        @keyframes pulse { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }
        
        .radar-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.4; }
        .radar-ring { position: absolute; border: 1px solid rgba(14, 165, 233, 0.1); border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .r1 { width: 100px; height: 100px; }
        .r2 { width: 200px; height: 200px; }
        .r3 { width: 300px; height: 300px; }
        
        .radar-sweep-tactical { position: absolute; width: 150%; height: 150%; top: -25%; left: -25%; background: conic-gradient(from 0deg, var(--primary) 0%, transparent 20%); opacity: 0.1; animation: sweep 4s linear infinite; pointer-events: none; }
        
        .target-glow { position: absolute; width: 60px; height: 60px; background: rgba(14, 165, 233, 0.1); border: 1px solid var(--primary); border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: pulse 2s infinite; }
        .unit-glow { position: absolute; width: 30px; height: 30px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: pulse 3s infinite; }
        
        .vector-line { stroke: var(--primary); stroke-width: 1; stroke-dasharray: 4; opacity: 0.3; }
        .vector-tip { fill: var(--primary); opacity: 0.6; }

        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        @keyframes slideIn { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default HospitalEmergency;
