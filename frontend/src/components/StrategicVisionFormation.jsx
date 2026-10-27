import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Brain, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Database, 
  Cpu, 
  Activity,
  Globe,
  FileText,
  Building2,
  Stethoscope,
  Users,
  Compass,
  Rocket,
  LayoutDashboard,
  Search,
  Scan,
  Terminal,
  Layers
} from 'lucide-react';

const StrategicVisionFormation = ({ onNavigate }) => {
  const [activePhase, setActivePhase] = useState('challenge');
  const [formationLines, setFormationLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);

  const missionText = [
    "OUTCOME: 94.2% AI ACCURACY IN AUTOMATED DISEASE CLASSIFICATION (COMMUNICABLE/NCD).",
    "OUTCOME: REAL-TIME GENERATION OF ACTIONABLE IDSP TREND INSIGHTS FOR GUNTUR POC.",
    "IMPACT: REDUCED MANUAL BURDEN FOR DOCTORS VIA AUTOMATED SNOMED/ICD CODING.",
    "IMPACT: FASTER DETECTION OF REGIONAL RISKS ENABLING PROACTIVE INTERVENTIONS.",
    "INTEGRATION: SEAMLESS FHIR-BASED INTERFACE WITH STATE HEALTH PORTALS & HMIS.",
    "FEEDBACK: CONTINUOUS MODEL IMPROVEMENT THROUGH SURVEILLANCE OFFICER VALIDATION.",
    "POC SUCCESS: DEMONSTRATING REAL-TIME VISUALIZATION FOR BOTH OP AND IP RECORDS."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex(prev => {
        if (prev < missionText.length) {
          setFormationLines(lines => [...lines, missionText[prev]]);
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="strategic-vision-formation animate-fade" style={{ margin: '6rem 0' }}>
      <div className="mo-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '40px', padding: '4rem', position: 'relative', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
        {/* Abstract Background Elements */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-150px', left: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', zIndex: 0 }}></div>

        <div className="vision-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
           <div>
              <div className="gov-badge-tactical" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface-light)', padding: '10px 24px', borderRadius: '100px', border: '1px solid var(--border)', width: 'fit-content', marginBottom: '2rem' }}>
                 <Globe size={18} color="var(--primary)" />
                 <span style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '1px', color: 'var(--text-muted)' }}>GOVERNMENT OF ANDHRA PRADESH | HM&FW DEPT.</span>
              </div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, letterSpacing: '-1.5px', lineHeight: 1.1, color: 'var(--text)' }}>
                 Strategic AI <br />
                 <span className="text-gradient">Vision Formation</span>
              </h2>
           </div>
           <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                 <button 
                    onClick={() => setActivePhase('challenge')}
                    className={`tactical-tab-btn ${activePhase === 'challenge' ? 'active' : ''}`}
                    style={{ background: activePhase === 'challenge' ? 'var(--primary)' : 'var(--surface-light)', color: activePhase === 'challenge' ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', padding: '14px 28px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer', transition: 'var(--transition)' }}
                 >
                    THE CHALLENGE
                 </button>
                 <button 
                    onClick={() => setActivePhase('solution')}
                    className={`tactical-tab-btn ${activePhase === 'solution' ? 'active' : ''}`}
                    style={{ background: activePhase === 'solution' ? 'var(--primary)' : 'var(--surface-light)', color: activePhase === 'solution' ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', padding: '14px 28px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer', transition: 'var(--transition)' }}
                 >
                    THE SOLUTION
                 </button>
                 <button 
                    onClick={() => setActivePhase('impact')}
                    className={`tactical-tab-btn ${activePhase === 'impact' ? 'active' : ''}`}
                    style={{ background: activePhase === 'impact' ? 'var(--primary)' : 'var(--surface-light)', color: activePhase === 'impact' ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', padding: '14px 28px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer', transition: 'var(--transition)' }}
                 >
                    DECISION INTELLIGENCE
                 </button>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '1px' }}>
                {activePhase === 'challenge' ? 'PHASE 01: SYSTEM RESTRUCTURING' : activePhase === 'solution' ? 'PHASE 02: AI INTEGRATION' : 'PHASE 03: AUTONOMOUS SURVEILLANCE'}
              </span>
           </div>
        </div>

        <div className="vision-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', position: 'relative', zIndex: 1 }}>
           <div className="formation-engine" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '32px', padding: '3rem', position: 'relative', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '8px' }}>
                 <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>
                 <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-glow)' }}></div>
                 <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#7A635F' }}></div>
              </div>
              
              <div className="formation-lines-h" style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '2rem' }}>
                 {formationLines.map((line, i) => (
                    <div key={i} className="animate-slide-in" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                       <span style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 900, minWidth: '45px', marginTop: '4px' }}>[{i.toString().padStart(2, '0')}]</span>
                       <span style={{ color: i < 3 ? 'var(--text-muted)' : 'var(--text)', fontSize: '1.2rem', fontWeight: i < 3 ? 600 : 800, letterSpacing: '0.3px', lineHeight: 1.5 }}>{line}</span>
                    </div>
                 ))}
                 {lineIndex < missionText.length && (
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                       <span style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 900, minWidth: '45px' }}>[{lineIndex.toString().padStart(2, '0')}]</span>
                       <div className="cursor-blink" style={{ width: 12, height: 28, background: 'var(--primary)' }}></div>
                    </div>
                 )}
              </div>
              
              {/* Data Stream Decoration */}
              <div style={{ position: 'absolute', right: '30px', top: '30px', bottom: '30px', width: '2px', background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)', opacity: 0.3 }}></div>
           </div>

            <div className="vision-architecture">
              {activePhase === 'impact' ? (
                <>
                  <div className="arch-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2.5rem', marginBottom: '2rem', boxShadow: 'var(--card-shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                          <Activity size={28} />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--text)' }}>Smart Alert System</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>
                      Strengthening preventive health measures under the Integrated Disease Surveillance Program (IDSP) through proactive interventions.
                    </p>
                  </div>
                  <div className="arch-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2.5rem', boxShadow: 'var(--card-shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(255, 139, 113, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                          <Zap size={28} />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--text)' }}>Geo-Spatial Heatmaps</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>
                      Identifying emerging disease patterns across regions to improve reporting accuracy and strengthen preventive health measures.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="arch-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2.5rem', marginBottom: '2rem', boxShadow: 'var(--card-shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                          <Activity size={28} />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--text)' }}>NLP-Core Integration</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>
                        Developing an AI-based system that automatically reads, classifies, and analyzes unstructured text (symptoms, diagnosis, treatments).
                    </p>
                  </div>
                  <div className="arch-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2.5rem', boxShadow: 'var(--card-shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(255, 176, 156, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-glow)' }}>
                          <ShieldCheck size={28} />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--text)' }}>IDSP Compliance</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>
                        Addressing fragmented and inconsistent systems at PHCs, CHCs, and District Hospitals to strengthen preventive health measures.
                    </p>
                  </div>
                </>
              )}
            </div>
        </div>

        <div className="vision-footer" style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
           <div style={{ display: 'flex', gap: '4rem' }}>
              <div className="v-stat-h">
                 <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '6px' }}>DATA SYSTEM NODES</span>
                 <strong style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)' }}>PHC • CHC • DISTRICT</strong>
              </div>
              <div className="v-stat-h">
                 <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '6px' }}>STANDARD PROTOCOL</span>
                 <strong style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)' }}>ICD • SNOMED CT</strong>
              </div>
           </div>
           <button 
              className="h-btn-primary" 
              onClick={() => onNavigate('poc-success')}
              style={{ background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '18px 36px', borderRadius: '18px', fontWeight: 900, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'var(--transition)', boxShadow: '0 10px 30px var(--primary-glow)' }}
           >
              Initialize Command Deck <ArrowRight size={22} />
           </button>
        </div>
      </div>

      <style>{`
        .text-gradient { background: linear-gradient(135deg, var(--primary), var(--accent-glow)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .tactical-tab-btn:hover { border-color: var(--primary) !important; background: var(--primary-glow) !important; color: var(--primary) !important; }
        .tactical-tab-btn.active { box-shadow: 0 8px 20px var(--primary-glow); }
        .cursor-blink { animation: blink 0.8s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-slide-in { animation: slideIn 0.5s ease-out forwards; }
        @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default StrategicVisionFormation;
