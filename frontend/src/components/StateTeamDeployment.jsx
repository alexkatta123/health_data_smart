import React, { useState } from 'react';
import { 
  Users, 
  Truck, 
  ShieldCheck, 
  AlertCircle, 
  MapPin, 
  Rocket, 
  Zap, 
  Activity, 
  ChevronRight,
  Clock,
  ExternalLink,
  ShieldAlert,
  RefreshCw
} from 'lucide-react';

const StateTeamDeployment = () => {
  const [isMobilizing, setIsMobilizing] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const hotspots = [
    { id: 'HOT-921', name: 'Gajuwaka Cluster', risk: 'Critical', cases: 42, location: 'Visakhapatnam District' },
    { id: 'HOT-918', name: 'Tirupati Urban Hub', risk: 'High', cases: 28, location: 'Chittoor District' },
    { id: 'HOT-885', name: 'Guntur East Corridor', risk: 'Medium', cases: 15, location: 'Guntur District' }
  ];

  const teams = [
    { id: 'TEAM-A', name: 'Epidemiological Task Force 01', type: 'Specialist', status: 'Ready', size: 12 },
    { id: 'TEAM-B', name: 'Regional Medical Response', type: 'Clinical', status: 'Deployed', size: 24 },
    { id: 'TEAM-C', name: 'Mobile Diagnostic Unit 04', type: 'Logistics', status: 'Ready', size: 6 }
  ];

  const handleMobilize = () => {
    if (!selectedHotspot) return;
    setIsMobilizing(true);
    setTimeout(() => {
      setIsMobilizing(false);
      setSelectedHotspot(null);
    }, 3000);
  };

  return (
    <div className="state-team-deploy animate-fade">
      <div className="deploy-formation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', height: 'calc(100vh - 180px)' }}>
        
        {/* Left Panel: Hotspot Selection & Team Registry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="mo-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                 <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', width: 44, height: 44, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertCircle size={22} />
                 </div>
                 <h3 style={{ margin: 0 }}>Active Hotspots</h3>
              </div>
              <div className="hotspot-list">
                 {hotspots.map((h, i) => (
                   <div 
                     key={i} 
                     className={`hotspot-mini-card ${selectedHotspot?.id === h.id ? 'active' : ''}`}
                     onClick={() => setSelectedHotspot(h)}
                   >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                         <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#f43f5e' }}>{h.id}</span>
                         <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', fontWeight: 800 }}>{h.risk}</span>
                      </div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>{h.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{h.location}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="mo-card" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                 <div style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', width: 44, height: 44, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={22} />
                 </div>
                 <h3 style={{ margin: 0 }}>Rapid Response Units</h3>
              </div>
              <div className="team-registry" style={{ flex: 1, overflowY: 'auto' }}>
                 {teams.map((t, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {t.type === 'Specialist' ? <ShieldCheck size={18} color="var(--primary)" /> : t.type === 'Clinical' ? <Activity size={18} color="#10b981" /> : <Truck size={18} color="#f59e0b" />}
                      </div>
                      <div style={{ flex: 1 }}>
                         <h5 style={{ margin: 0, fontSize: '0.9rem' }}>{t.name}</h5>
                         <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.type} • {t.size} Personnel</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: t.status === 'Ready' ? '#10b981' : 'var(--text-muted)' }}>{t.status}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Panel: Deployment Command & Logistics */}
        <div className="mo-card" style={{ padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
           
           {/* Deployment Background Map (Stylized) */}
           <div className="deploy-map-bg" style={{ position: 'absolute', inset: 0, opacity: 0.1, zIndex: 0 }}>
              <div style={{ position: 'absolute', top: '30%', left: '40%' }}><MapPin size={100} color="var(--primary)" /></div>
              <div style={{ position: 'absolute', bottom: '20%', right: '25%' }}><MapPin size={80} color="#f43f5e" /></div>
           </div>

           <div className="command-interface" style={{ position: 'relative', zIndex: 1, flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', background: 'var(--surface-light)', borderLeft: '1px solid var(--border)' }}>
              {!selectedHotspot ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                   {/* Background Elements */}
                   <div style={{ position: 'absolute', top: '15%', left: '45%', opacity: 0.05, color: 'var(--primary)' }}><MapPin size={120} /></div>
                   <div style={{ position: 'absolute', bottom: '15%', right: '20%', opacity: 0.05, color: '#f43f5e' }}><MapPin size={100} /></div>

                   <h2 style={{ margin: '0 0 5rem 0', fontSize: '3rem', fontWeight: 900, color: "var(--text)" }}>Orchestrate Strategic Response</h2>
                   
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                       <Rocket size={80} color="var(--primary)" strokeWidth={1.5} />
                       <div>
                          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)' }}>Select a hotspot cluster to initiate mobilization</h3>
                          <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>Authorized RRT command protocols only.</p>
                       </div>
                   </div>
                </div>
              ) : (
                <div className="mobilization-suite animate-slide-up" style={{ flex: 1 }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                      <div className="target-card" style={{ background: 'rgba(244, 63, 94, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                         <span style={{ fontSize: '0.7rem', color: '#f43f5e', fontWeight: 800, letterSpacing: '1px' }}>TARGET SECTOR</span>
                         <h3 style={{ margin: '10px 0 5px' }}>{selectedHotspot.name}</h3>
                         <p style={{ margin: 0, color: 'var(--text-muted)' }}>{selectedHotspot.location}</p>
                         <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
                            <div>
                               <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>SEVERITY</span>
                               <strong style={{ color: '#f43f5e' }}>{selectedHotspot.risk}</strong>
                            </div>
                            <div>
                               <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ACTIVE CASES</span>
                               <strong>{selectedHotspot.cases} Detected</strong>
                            </div>
                         </div>
                      </div>

                      <div className="logistics-prep" style={{ display: 'grid', gap: '1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                             <div style={{ width: 50, height: 50, borderRadius: '12px', background: "var(--surface-light)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={24} color="#f59e0b" /></div>
                             <div>
                                <strong style={{ display: 'block', color: 'var(--text)' }}>RRT Deployment Protocol 08</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mandatory containment & triage sequences enabled.</span>
                             </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                             <div style={{ width: 50, height: 50, borderRadius: '12px', background: "var(--surface-light)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={24} color="var(--primary)" /></div>
                             <div>
                                <strong style={{ display: 'block', color: 'var(--text)' }}>Mobilization Lead Time</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated RRT readiness: 45 Minutes.</span>
                             </div>
                          </div>
                      </div>
                   </div>

                   <div style={{ marginTop: '4rem' }}>
                      <button 
                        className={`mobilize-btn ${isMobilizing ? 'loading' : ''}`}
                        onClick={handleMobilize}
                        style={{ background: '#f43f5e', borderRadius: '100px', padding: '18px 45px', display: 'flex', alignItems: 'center', gap: '20px', fontSize: '1.5rem', fontWeight: 900, boxShadow: '0 10px 30px rgba(244, 63, 94, 0.3)' }}
                        disabled={isMobilizing}
                      >
                         {isMobilizing ? (
                           <><RefreshCw size={28} className="animate-spin" /> MOBILIZING...</>
                         ) : (
                           <><ShieldAlert size={32} strokeWidth={2.5} /> Deploy Team</>
                         )}
                      </button>
                      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>*Executing this command will notify all regional medical and logistics hubs instantly.</p>
                   </div>
                </div>
              )}
           </div>

           {/* Deployment Animation Overlay */}
           {isMobilizing && (
             <div className="deploy-overlay animate-fade" style={{ position: 'absolute', inset: 0, background: 'rgba(7, 9, 15, 0.9)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="radar-animation" style={{ width: 200, height: 200, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                   <div className="radar-sweep"></div>
                   <Rocket size={64} className="rocket-deploy" />
                </div>
                <h2 style={{ letterSpacing: '4px', fontWeight: 900 }}>MOBILIZING TASK FORCE...</h2>
                <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
                   <div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                   <div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%', animation: 'bounce 1s 0.2s infinite' }}></div>
                   <div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%', animation: 'bounce 1s 0.4s infinite' }}></div>
                </div>
             </div>
           )}

        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; transition: all 0.3s ease; }
        
        .hotspot-mini-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 1.25rem;
          border-radius: 20px;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: 0.3s;
        }

        .hotspot-mini-card:hover { background: var(--surface); border-color: var(--text-muted); }
        .hotspot-mini-card.active { border-color: #f43f5e; background: rgba(244, 63, 94, 0.05); transform: translateX(10px); }

        .mobilize-btn {
          width: 100%;
          padding: 24px;
          border-radius: 20px;
          background: var(--primary);
          border: none;
          color: var(--text);
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 15px 35px rgba(14, 165, 233, 0.3);
        }

        .mobilize-btn:hover:not(:disabled) {
          transform: translateY(-5px);
          box-shadow: 0 20px 45px rgba(14, 165, 233, 0.5);
        }

        .mobilize-btn.loading {
          background: var(--surface);
          border: 1px solid var(--border);
          cursor: wait;
        }

        .radar-sweep {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(from 0deg, var(--primary) 0%, transparent 20%);
          animation: sweep 2s linear infinite;
        }

        .rocket-deploy {
          animation: rock 1s ease-in-out infinite alternate;
        }

        @keyframes sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes rock { from { transform: translateY(-5px); } to { transform: translateY(5px); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      ` }} />
    </div>
  );
};

export default StateTeamDeployment;
