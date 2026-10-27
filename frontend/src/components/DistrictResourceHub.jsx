import React from 'react';
import { Building2, Truck, Users, Activity, Download, RefreshCw, FileText, Globe, Map, Zap, Layers, Cpu, ShieldCheck } from 'lucide-react';

const DistrictResourceHub = () => {
  const [isExporting, setIsExporting] = React.useState(false);
  const [synthesisStep, setSynthesisStep] = React.useState(0);
  const [synthesisLines, setSynthesisLines] = React.useState([]);

  const facilities = [
    { name: 'Vizag West PHC', staff: '12/15', beds: '18/20', status: 'Optimal', load: 82 },
    { name: 'Gajuwaka CHC', staff: '24/30', beds: '45/50', status: 'High Load', load: 94 },
    { name: 'Anakapalli DH', staff: '85/100', beds: '142/200', status: 'Optimal', load: 65 }
  ];

  const exportSteps = [
    "AGGREGATING DISTRICT RESOURCE VECTORS...",
    "MAPPING MTU SPATIAL COORDINATES: [HUB-01]",
    "SYNCHRONIZING FACILITY LOAD MATRICES...",
    "VERIFYING MOBILIZATION READINESS SCORES...",
    "ENCRYPTING RESOURCE MAP PAYLOAD (AES-256)...",
    "SUCCESS: STRATEGIC RESOURCE MAP FINALIZED"
  ];

  React.useEffect(() => {
    let interval;
    if (isExporting) {
      setSynthesisLines([]);
      setSynthesisStep(0);
      interval = setInterval(() => {
        setSynthesisStep(prev => {
          if (prev < exportSteps.length) {
            setSynthesisLines(lines => [...lines, exportSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isExporting]);

  const [isDeploying, setIsDeploying] = React.useState(false);
  const [deploymentStep, setDeploymentStep] = React.useState(0);

  const deploymentSteps = [
    "INITIALIZING MTU FLEET...",
    "ASSIGNING RAPID RESPONSE TEAMS...",
    "PROPAGATING DEPLOYMENT VECTORS...",
    "SUCCESS: FLEET MOBILIZED"
  ];

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeploymentStep(0);
    const interval = setInterval(() => {
      setDeploymentStep(prev => {
        if (prev < deploymentSteps.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setIsDeploying(false), 2000);
        return prev;
      });
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 5500);
  };

  return (
    <div className="district-resource-hub animate-fade" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: '2rem', marginBottom: '3rem' }}>
         {/* Main Resource Stats */}
         <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '1.5rem' }}>
            <div className="mo-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ color: 'var(--primary)', marginBottom: '15px' }}><Truck size={32} /></div>
               <h3 style={{ fontSize: '1.8rem', margin: '0 0 5px 0' }}>24/30</h3>
               <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800 }}>Ambulances Active</span>
            </div>
            <div className="mo-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ color: '#10b981', marginBottom: '15px' }}><Building2 size={32} /></div>
               <h3 style={{ fontSize: '1.8rem', margin: '0 0 5px 0' }}>42</h3>
               <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800 }}>Functional PHCs</span>
            </div>
            <div className="mo-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ color: '#8b5cf6', marginBottom: '15px' }}><Users size={32} /></div>
               <h3 style={{ fontSize: '1.8rem', margin: '0 0 5px 0' }}>1,240</h3>
               <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800 }}>Staff on Duty</span>
            </div>
         </div>

         {/* Resource Deployment (As per Screenshot) */}
         <div className="mo-card" style={{ background: '#0a0d17', border: '1px solid rgba(14, 165, 233, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem' }}>
            <h4 style={{ margin: '0 0 2rem 0', fontSize: '1.2rem', fontWeight: 900, alignSelf: 'flex-start' }}>Resource Deployment</h4>
            
            <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
               <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(14, 165, 233, 0.1)" strokeWidth="8" />
                  <circle cx="70" cy="70" r="60" fill="none" stroke="var(--primary)" strokeWidth="8" strokeDasharray="377" strokeDashoffset={377 * (1 - 0.82)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
               </svg>
               <span style={{ position: 'absolute', fontSize: '1.5rem', fontWeight: 900 }}>82%</span>
            </div>

            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2rem' }}>Fleet Utilization</span>

            <button 
               className="h-btn-primary" 
               onClick={handleDeploy}
               style={{ width: '100%', background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '16px', borderRadius: '16px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)' }}
            >
               {isDeploying ? <><RefreshCw size={20} className="animate-spin" /> {deploymentSteps[deploymentStep]}</> : "Deploy Rapid Response"}
            </button>
         </div>
      </div>

      <div className="mo-card" style={{ padding: '3rem' }}>
         <div className="card-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>Facility Readiness & Load</h3>
            <button 
               className="mo-button-outline" 
               onClick={handleExport}
               style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 40px', borderRadius: '100px', background: 'rgba(255,255,255,0.02)', border: "1px solid var(--border)" }}
            >
               {isExporting ? <RefreshCw size={18} className="animate-spin" /> : <Map size={18} />}
               <span style={{ fontSize: '1rem', fontWeight: 900 }}>Export Strategic Resource Map</span>
            </button>
         </div>
         <div className="facility-table">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                     <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>FACILITY</th>
                     <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>STAFFING</th>
                     <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>BEDS</th>
                     <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>LOAD (%)</th>
                     <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>STATUS</th>
                  </tr>
               </thead>
               <tbody>
                  {facilities.map((f, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                       <td style={{ padding: '1.5rem' }}><strong style={{ fontSize: '1.1rem' }}>{f.name}</strong></td>
                       <td style={{ padding: '1.5rem', fontWeight: 700 }}>{f.staff}</td>
                       <td style={{ padding: '1.5rem', fontWeight: 700 }}>{f.beds}</td>
                       <td style={{ padding: '1.5rem' }}>
                          <div style={{ width: '200px', height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', overflow: 'hidden' }}>
                             <div style={{ width: `${f.load}%`, height: '100%', background: f.load > 90 ? '#f43f5e' : '#3b82f6', boxShadow: `0 0 10px ${f.load > 90 ? '#f43f5e' : '#3b82f6'}44` }}></div>
                          </div>
                       </td>
                       <td style={{ padding: '1.5rem' }}>
                          <span className={`status-pill ${f.status.replace(' ', '-').toLowerCase()}`} style={{ padding: '6px 16px', fontSize: '0.8rem' }}>{f.status}</span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {isExporting && (
         <div className="synthesis-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(7, 9, 15, 0.98)', backdropFilter: 'blur(20px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem' }}>
            <div style={{ maxWidth: '800px', width: '100%', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', opacity: 0.1 }}>
                  <Globe size={240} className="animate-spin-slow" color="#8b5cf6" />
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                     <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                        <Layers size={32} />
                     </div>
                     <div>
                        <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900 }}>Resource Synthesis Hub</h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Orchestrating statewide mobilization maps...</p>
                     </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, background: 'rgba(255,255,255,0.05)', padding: '10px 24px', borderRadius: '100px', border: "1px solid var(--border)", color: '#8b5cf6' }}>
                     {Math.round((synthesisStep / exportSteps.length) * 100)}% COMPILED
                  </div>
               </div>

               <div style={{ background: "var(--surface-light)", borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', padding: '3rem', minHeight: '380px', position: 'relative', overflow: 'hidden' }}>
                  <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)', opacity: 0.2, animation: 'scanMove 2s infinite' }}></div>
                  
                  {synthesisStep < exportSteps.length ? (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {synthesisLines.map((line, i) => (
                           <div key={i} className="animate-slide-up" style={{ display: 'flex', gap: '20px', alignItems: 'center', opacity: i === synthesisLines.length - 1 ? 1 : 0.4 }}>
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: line.includes('SUCCESS') ? '#10b981' : '#8b5cf6', boxShadow: `0 0 10px ${line.includes('SUCCESS') ? '#10b981' : '#8b5cf6'}` }} />
                              <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 600, color: line.includes('SUCCESS') ? '#10b981' : 'white', letterSpacing: '0.5px' }}>{line}</span>
                           </div>
                        ))}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                           <RefreshCw size={14} className="animate-spin" color="#8b5cf6" />
                           <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', opacity: 0.3 }}>POOLING REGIONAL VECTORS...</span>
                        </div>
                     </div>
                  ) : (
                     <div className="animate-fade" style={{ textAlign: 'center', paddingTop: '2rem' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                           <ShieldCheck size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>Resource Report Finalized</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem' }}>All district data vectors have been synthesized and cryptographically signed for Government of AP clinical audits.</p>
                        
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                           <button className="h-btn-primary" style={{ padding: '16px 32px', borderRadius: '16px', background: '#10b981', color: "var(--text)", border: 'none', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                              <FileText size={20} /> Download Full Report (XLS)
                           </button>
                           <button className="mo-button-outline" style={{ padding: '16px 32px', borderRadius: '16px', border: "1px solid var(--border)", color: "var(--text)", fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                              <Download size={20} /> PDF Summary
                           </button>
                        </div>
                     </div>
                  )}
               </div>

               <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                  <div style={{ textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '5px' }}>MTUs SYNCED</span>
                     <strong style={{ fontSize: '1.4rem', color: '#10b981' }}>100%</strong>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '5px' }}>FACILITY LOAD</span>
                     <strong style={{ fontSize: '1.4rem', color: '#8b5cf6' }}>ANALYZED</strong>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '5px' }}>ARCHIVE TYPE</span>
                     <strong style={{ fontSize: '1.4rem' }}>SECURE-XLS</strong>
                  </div>
               </div>
            </div>
         </div>
      )}

      {isDeploying && (
         <div className="deployment-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(7, 9, 15, 0.99)', backdropFilter: 'blur(30px)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', opacity: 0.15 }}>
                  <Zap size={300} className="animate-pulse" color="var(--primary)" />
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                     <div style={{ width: 72, height: 72, borderRadius: '20px', background: 'rgba(14, 165, 233, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                        <ShieldCheck size={36} />
                     </div>
                     <div>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>Rapid Response Orchestrator</h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>Propagating statewide mobilization protocols...</p>
                     </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 900, background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '12px 28px', borderRadius: '100px', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                     PHASE {deploymentStep + 1} ACTIVE
                  </div>
               </div>

               <div style={{ background: 'rgba(255,255,255,0.01)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', padding: '3.5rem', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
                  <div className="deployment-grid-pattern" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.03 }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative' }}>
                     {deploymentSteps.slice(0, deploymentStep + 1).map((line, i) => (
                        <div key={i} className="animate-slide-up" style={{ display: 'flex', gap: '25px', alignItems: 'center', opacity: i === deploymentStep ? 1 : 0.3 }}>
                           <div style={{ width: 10, height: 10, borderRadius: '50%', background: line.includes('SUCCESS') ? '#10b981' : 'var(--primary)', boxShadow: `0 0 15px ${line.includes('SUCCESS') ? '#10b981' : 'var(--primary)'}` }} />
                           <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: line.includes('SUCCESS') ? '#10b981' : 'white', letterSpacing: '1px' }}>{line}</span>
                        </div>
                     ))}
                     {deploymentStep < deploymentSteps.length - 1 && (
                        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                           <div className="animate-spin" style={{ width: 14, height: 14, border: '2px solid rgba(14, 165, 233, 0.3)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
                           <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', opacity: 0.2, fontWeight: 700 }}>SYNCHRONIZING REGIONAL HUB VECTORS...</span>
                        </div>
                     )}
                  </div>
               </div>

               <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '2rem' }}>
                  <div className="mo-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '8px' }}>MTU STATUS</span>
                     <strong style={{ fontSize: '1.6rem', color: '#10b981' }}>ENGAGED</strong>
                  </div>
                  <div className="mo-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '8px' }}>LOGISTICS SYNC</span>
                     <strong style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>PROPAGATING</strong>
                  </div>
                  <div className="mo-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '8px' }}>TEAM READINESS</span>
                     <strong style={{ fontSize: '1.6rem' }}>100%</strong>
                  </div>
               </div>
            </div>
         </div>
      )}

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; transition: 0.3s; }
        .mo-card:hover { border-color: var(--primary); transform: translateY(-5px); }
        .status-pill { padding: 4px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; }
        .status-pill.optimal { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill.high-load { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: 0.2s; }
        .mo-button-outline:hover { border-color: var(--primary); color: var(--primary); background: rgba(139, 92, 246, 0.05); }
        @keyframes scanMove { 0% { top: 0; } 100% { top: 100%; } }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default DistrictResourceHub;
