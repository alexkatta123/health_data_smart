import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  ExternalLink,
  Download,
  Zap,
  FileSpreadsheet,
  ShieldAlert
} from 'lucide-react';

const MedicalCaseExplorer = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isInitiating, setIsInitiating] = useState(false);

  const cases = [
    { 
      id: 'CASE-49210', 
      patient: 'Ravi Kumar', 
      age: 42, 
      gender: 'Male',
      location: 'Visakhapatnam North',
      status: 'Confirmed', 
      diagnosis: 'Enteric Fever (Typhoid)', 
      date: '24 Apr 2026',
      risk: 'Medium',
      symptoms: 'High-grade fever (103°F), abdominal pain, rose spots on chest, generalized weakness.',
      nlpEntities: ['Fever', 'Abdominal Pain', 'Rose Spots', 'Weakness'],
      timeline: [
        { date: '24 Apr', event: 'AI Classification: Enteric Fever (94.2% Conf)' },
        { date: '23 Apr', event: 'Widal Test: Positive (O: 1:160)' },
        { date: '22 Apr', event: 'Admitted with symptoms' }
      ]
    },
    { 
      id: 'CASE-49185', 
      patient: 'Latha Devi', 
      age: 29, 
      gender: 'Female',
      location: 'Gajuwaka Cluster',
      status: 'Suspected', 
      diagnosis: 'Dengue Hemorrhagic Fever', 
      date: '23 Apr 2026',
      risk: 'High',
      symptoms: 'Retro-orbital pain, severe joint pain, petechiae on lower limbs, nausea.',
      nlpEntities: ['Orbital Pain', 'Joint Pain', 'Petechiae', 'Nausea'],
      timeline: [
        { date: '23 Apr', event: 'Triggered Outbreak Warning: Cluster 08' },
        { date: '22 Apr', event: 'Clinical evaluation completed' }
      ]
    },
    { 
      id: 'CASE-49150', 
      patient: 'Satish Rao', 
      age: 55, 
      gender: 'Male',
      location: 'Anakapalli Hub',
      status: 'Monitoring', 
      diagnosis: 'Seasonal Influenza (H1N1)', 
      date: '22 Apr 2026',
      risk: 'Low',
      symptoms: 'Cough, sore throat, nasal congestion, body aches.',
      nlpEntities: ['Cough', 'Sore Throat', 'Congestion'],
      timeline: [
        { date: '22 Apr', event: 'Protocol Follow-up: Stable' },
        { date: '21 Apr', event: 'Prescribed Oseltamivir' }
      ]
    }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 3500);
  };

  const handleInitiateProtocol = () => {
    setIsInitiating(true);
    setTimeout(() => setIsInitiating(false), 3500);
  };

  return (
    <div className="medical-case-explorer animate-fade">
      <div className="explorer-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '1.5rem', height: 'calc(100vh - 180px)' }}>
        
        {/* Left Panel: Case List */}
        <div className="mo-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', boxShadow: 'var(--card-shadow)' }}>
           <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', fontWeight: 900 }}>Clinical Case Registry</h3>
              <div style={{ position: 'relative' }}>
                 <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                 <input 
                   type="text" 
                   placeholder="Search by ID, Patient or Disease..." 
                   className="explorer-search"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
           </div>

           <div className="case-scroll-area" style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
              {cases.map((c, i) => (
                <div 
                   key={i} 
                   className={`case-mini-card ${selectedCase?.id === c.id ? 'active' : ''}`}
                   onClick={() => setSelectedCase(c)}
                >
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '1px' }}>{c.id}</span>
                      <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', background: c.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: c.status === 'Confirmed' ? '#10b981' : '#f59e0b', fontWeight: 900 }}>{c.status.toUpperCase()}</span>
                   </div>
                   <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800 }}>{c.patient}</h4>
                   <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{c.diagnosis}</p>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 900 }}>{c.date}</span>
                      <ChevronRight size={14} color="var(--primary)" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right Panel: Case Intelligence */}
        <div className="mo-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', boxShadow: 'var(--card-shadow)' }}>
           {!selectedCase ? (
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(14, 165, 233, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                   <Search size={64} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Clinical Intelligence Node</h3>
                <p style={{ fontWeight: 600 }}>Select a case to initiate longitudinal analysis.</p>
             </div>
           ) : (
             <div className="case-intelligence-suite animate-fade" style={{ flex: 1, overflowY: 'auto', padding: '2.5rem' }}>
                <div className="case-intel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                   <div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                         <span style={{ fontSize: '0.65rem', padding: '4px 12px', borderRadius: '100px', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', fontWeight: 900 }}>Case Intelligence Profile</span>
                         <span style={{ fontSize: '0.65rem', padding: '4px 12px', borderRadius: '100px', background: 'var(--surface-light)', color: "var(--text)", fontWeight: 900, border: '1px solid var(--border)' }}>{selectedCase.location}</span>
                      </div>
                      <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>{selectedCase.patient}</h2>
                      <div style={{ display: 'flex', gap: '15px', marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                         <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16} /> {selectedCase.age}Y • {selectedCase.gender}</span>
                         <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> Issued: {selectedCase.date}</span>
                         <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {selectedCase.location}</span>
                      </div>
                   </div>
                   <div style={{ display: 'flex', gap: '12px' }}>
                      <button 
                         className="tactical-btn-outline"
                         onClick={handleExport}
                         style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', color: "var(--text)", padding: '12px 24px', borderRadius: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                      >
                         <Download size={18} /> Export
                      </button>
                      <button 
                         className="tactical-btn-primary"
                         onClick={handleInitiateProtocol}
                         style={{ background: 'var(--primary)', border: 'none', color: "var(--text)", padding: '12px 24px', borderRadius: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)' }}
                      >
                         Initiate Protocol <ExternalLink size={18} />
                      </button>
                   </div>
                </div>

                <div className="intelligence-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                   
                   {/* Symptom Intelligence */}
                   <div className="intel-section">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: 'var(--primary)' }}>
                         <Activity size={18} />
                         <strong style={{ fontSize: '0.85rem', letterSpacing: '1px', fontWeight: 900 }}>NLP SYMPTOM EXTRACTION</strong>
                      </div>
                      <div style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                         <p style={{ margin: '0 0 1.5rem', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>"{selectedCase.symptoms}"</p>
                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {selectedCase.nlpEntities.map((ent, i) => (
                               <span key={i} style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, border: '1px solid rgba(14, 165, 233, 0.2)' }}>{ent}</span>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Case Risk & Prediction */}
                   <div className="intel-section">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: '#10b981' }}>
                         <TrendingUp size={18} />
                         <strong style={{ fontSize: '0.85rem', letterSpacing: '1px', fontWeight: 900 }}>AI DIAGNOSTIC PROJECTION</strong>
                      </div>
                      <div style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                            <div>
                               <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 900 }}>Classification</span>
                               <strong style={{ fontSize: '1.1rem', fontWeight: 900 }}>{selectedCase.diagnosis}</strong>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                               <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 900 }}>Risk Assessment</span>
                               <strong style={{ fontSize: '1.1rem', color: selectedCase.risk === 'High' ? '#f43f5e' : '#f59e0b', fontWeight: 900 }}>{selectedCase.risk} Intensity</strong>
                            </div>
                         </div>
                         <div style={{ height: '8px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: selectedCase.risk === 'High' ? '85%' : '45%', height: '100%', background: selectedCase.risk === 'High' ? '#f43f5e' : '#f59e0b', borderRadius: '10px' }}></div>
                         </div>
                         <span style={{ display: 'block', marginTop: '10px', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>*Based on regional cluster analysis and symptom patterns.</span>
                      </div>
                   </div>

                   {/* Longitudinal Timeline */}
                   <div className="intel-section" style={{ gridColumn: 'span 2' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
                         <Clock size={18} />
                         <strong style={{ fontSize: '0.85rem', letterSpacing: '1px', fontWeight: 900 }}>CASE INVESTIGATION TIMELINE</strong>
                      </div>
                      <div className="timeline-container" style={{ position: 'relative', paddingLeft: '2.5rem' }}>
                         <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }}></div>
                         {selectedCase.timeline.map((t, i) => (
                            <div key={i} style={{ position: 'relative', marginBottom: '2.5rem' }}>
                               <div style={{ position: 'absolute', left: '-33px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', border: '4px solid var(--surface)', boxShadow: '0 0 15px var(--primary-glow)' }}></div>
                               <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '6px' }}>{t.date.toUpperCase()}</span>
                               <p style={{ margin: 0, fontSize: '1rem', color: "var(--text)", fontWeight: 700 }}>{t.event}</p>
                            </div>
                         ))}
                      </div>
                   </div>

                </div>
             </div>
           )}
        </div>

      </div>

      {/* Strategic Registry Export Overlay */}
      {isExporting && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
           <div style={{ width: '400px', padding: '3rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', textAlign: 'center', boxShadow: 'var(--card-shadow)' }}>
              <div className="radar-animation" style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                 <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
                 <FileSpreadsheet size={40} color="var(--primary)" />
              </div>
              <h3 style={{ margin: 0, letterSpacing: '2px', fontWeight: 900 }}>SYNTHESIZING REGISTRY</h3>
              <p style={{ margin: '10px 0 2rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 800 }}>Compiling Clinical Case Payload...</p>
              
              <div style={{ height: '6px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                 <div className="export-progress-fill" style={{ height: '100%', background: 'var(--primary)', borderRadius: '10px', animation: 'progressFill 3.5s ease-out forwards' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                 <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)' }}>ENCRYPTING CLINICAL DATA</span>
                 <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)' }}>DPDP VERIFIED</span>
              </div>
           </div>
        </div>
      )}

      {/* Strategic Protocol Mobilization Overlay */}
      {isInitiating && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid #f43f5e', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, #f43f5e 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <ShieldAlert size={48} color="#f43f5e" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: '#f43f5e' }}>INITIATING CLINICAL PROTOCOL...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontWeight: 800 }}>ACTIVATING STRATEGIC RESPONSE • CASE ID: {selectedCase?.id}</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .explorer-search {
          width: 100%;
          padding: 14px 14px 14px 44px;
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 14px;
          color: var(--text);
          font-weight: 800;
          transition: all 0.3s;
        }

        .explorer-search:focus {
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(14, 165, 233, 0.2);
          outline: none;
        }

        .case-mini-card {
          background: var(--surface-light);
          border: 1px solid var(--border);
          padding: 1.25rem;
          border-radius: 18px;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .case-mini-card:hover {
          background: var(--surface);
          border-color: var(--primary);
        }

        .case-mini-card.active {
          background: rgba(14, 165, 233, 0.05);
          border-color: var(--primary);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .tactical-btn-outline:hover {
          border-color: var(--primary) !important;
          background: rgba(14, 165, 233, 0.05) !important;
        }

        .tactical-btn-primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.2);
        }

        .case-scroll-area::-webkit-scrollbar { width: 5px; }
        .case-scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes progressFill { 0% { width: 0%; } 100% { width: 100%; } }
      ` }} />
    </div>
  );
};

export default MedicalCaseExplorer;
