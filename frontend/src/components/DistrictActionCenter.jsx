import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Send, 
  Clock, 
  Activity, 
  MessageSquare, 
  User, 
  Signal, 
  Radio, 
  CheckCheck,
  ShieldAlert,
  Target,
  Command,
  Plus
} from 'lucide-react';

const DistrictActionCenter = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'sent', content: 'Requesting status update on Chittoor cluster.', time: '14:20', status: 'delivered' },
    { id: 2, type: 'received', content: 'Testing kits deployed. 80% coverage complete.', time: '14:22', sender: 'Officer Ramesh' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [authLines, setAuthLines] = useState([]);
  const [authStep, setAuthStep] = useState(0);
  const [transmissionLines, setTransmissionLines] = useState([]);
  const [transmissionStep, setTransmissionStep] = useState(0);
  const scrollRef = useRef(null);

  const authSteps = [
    "ACQUIRING ADMINISTRATIVE CREDENTIALS...",
    "CRYPTOGRAPHIC SIGNING: [AUTH-82441-A]",
    "ALLOCATING MOBILE TESTING RESOURCES...",
    "DISPATCHING UNIT-MTU-12 TO VIZAG NORTH...",
    "MOBILIZATION DIRECTIVE PROPAGATED.",
    "AUTHORIZATION SUCCESSFUL."
  ];

  const transmissionSteps = [
    "ACQUIRING SECURE UPLINK...",
    "ENCRYPTING PAYLOAD (ECC-384)...",
    "ROUTING TO DISTRICT CLUSTER HUB...",
    "HANDSHAKE VERIFIED: [CMO-VIZAG]",
    "MESSAGE DISPATCHED SUCCESSFULLY."
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let interval;
    if (isTransmitting) {
      setTransmissionLines([]);
      setTransmissionStep(0);
      interval = setInterval(() => {
        setTransmissionStep(prev => {
          if (prev < transmissionSteps.length) {
            setTransmissionLines(lines => [...lines, transmissionSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isTransmitting]);

  useEffect(() => {
    let interval;
    if (isAuthorizing) {
      setAuthLines([]);
      setAuthStep(0);
      interval = setInterval(() => {
        setAuthStep(prev => {
          if (prev < authSteps.length) {
            setAuthLines(lines => [...lines, authSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isAuthorizing]);

  const handleAuthorize = (action) => {
    setIsAuthorizing(true);
    setTimeout(() => {
       setIsAuthorizing(false);
       // In a real app, this would update the action status in the list
    }, 5500);
  };

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setIsTransmitting(true);
    setTimeout(() => {
       const newMsg = {
          id: Date.now(),
          type: 'sent',
          content: inputMsg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
       };
       setMessages([...messages, newMsg]);
       setInputMsg('');
       setIsTransmitting(false);
    }, 3500);
  };

  const actions = [
    { title: 'Authorize Mobile Testing Unit', district: 'Vizag North', priority: 'High', status: 'Pending Approval', time: '10m ago' },
    { title: 'Emergency Serum Dispatch', district: 'Anantapur', priority: 'Critical', status: 'In Transit', time: '2m ago' },
    { title: 'District-Wide Health Advisory', district: 'All Regions', priority: 'Medium', status: 'Draft', time: '1h ago' }
  ];

  return (
    <div className="district-action-center animate-fade">
      <div className="action-grid-h" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem' }}>
        
        {/* Command & Control Suite */}
        <div className="command-suite-h">
           <div className="section-header-h" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                 <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900 }}>Resource Allocation Command</h2>
                 <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Regional mobilization & automated resource allocation center.</p>
              </div>
              <button className="mo-button-primary" style={{ background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                 <Plus size={18} /> Allocate All Resources
              </button>
           </div>

           <div className="action-list-h" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {actions.map((a, i) => (
                <div key={i} className="action-card-h" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2rem', position: 'relative', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
                   <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: a.priority === 'Critical' ? 'var(--danger)' : a.priority === 'High' ? 'var(--primary)' : '#f59e0b' }}></div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <div>
                         <span style={{ fontSize: '0.7rem', fontWeight: 900, color: a.priority === 'Critical' ? 'var(--danger)' : 'var(--primary)', letterSpacing: '2px' }}>{a.priority.toUpperCase()} PRIORITY</span>
                         <h4 style={{ margin: '4px 0 0', fontSize: '1.25rem', fontWeight: 900, color: 'var(--text)' }}>{a.title}</h4>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)' }}>{a.time.toUpperCase()}</span>
                         <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--success)' }}>{a.status}</span>
                      </div>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} /> {a.district}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} /> AUTH-82441-A</span>
                   </div>
                   <div style={{ display: 'flex', gap: '12px' }}>
                      <button 
                         className="h-btn h-btn-primary" 
                         style={{ flex: 2, padding: '14px', borderRadius: '12px' }}
                         onClick={() => handleAuthorize(a)}
                      >
                         Approve & Execute Allocation
                      </button>
                      <button 
                         className="secondary-btn" 
                         style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'var(--surface-light)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontWeight: 600 }}
                         onClick={() => {
                            setSelectedAction(a);
                            setShowReviewModal(true);
                         }}
                      >
                         Review Data
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Real-time Comms Hub */}
        <div className="comms-suite-h" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem', display: 'flex', flexDirection: 'column', height: '800px', boxShadow: 'var(--card-shadow)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)' }}>
                 <Signal size={20} color="var(--primary)" /> Personalized Support Comms
              </h3>
              <div style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900 }}>SECURE CHANNEL ACTIVE</div>
           </div>

           <div className="comms-display-h" ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '10px' }}>
              {messages.map((m) => (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.type === 'sent' ? 'flex-end' : 'flex-start' }}>
                   {m.type === 'received' && <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '5px', marginLeft: '10px' }}>{m.sender}</span>}
                   <div style={{ 
                      maxWidth: '85%', 
                      padding: '1.25rem 1.5rem', 
                      borderRadius: m.type === 'sent' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                      background: m.type === 'sent' ? 'var(--primary)' : 'var(--surface-light)',
                      border: m.type === 'sent' ? 'none' : '1px solid var(--border)',
                      color: m.type === 'sent' ? 'white' : 'var(--text)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      position: 'relative'
                   }}>
                      {m.content}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 900 }}>
                      {m.time}
                      {m.type === 'sent' && <CheckCheck size={14} color="var(--success)" />}
                   </div>
                </div>
              ))}
           </div>

           <div className="comms-input-h" style={{ marginTop: '2rem', position: 'relative' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                 <input 
                    type="text" 
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Coordinate with Regional Health Officers..." 
                    style={{ flex: 1, background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '18px', padding: '16px 24px', color: "var(--text)", fontSize: '0.95rem', fontWeight: 600 }}
                 />
                 <button 
                    onClick={handleSend}
                    className="h-btn-primary" 
                    style={{ width: 56, height: 56, background: 'var(--primary)', color: "var(--text)", border: 'none', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                 >
                    <Send size={24} />
                 </button>
              </div>

              {/* Signal Transmission Formation Overlay */}
              {isTransmitting && (
                <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--primary-glow)', borderRadius: '24px', padding: '1.5rem', marginBottom: '1rem', boxShadow: 'var(--card-shadow)', zIndex: 100 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.25rem' }}>
                      <Radio size={20} color="var(--primary)" className="animate-pulse" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 900, color: "var(--text)", letterSpacing: '1px' }}>TRANSMITTING SIGNAL...</span>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {transmissionLines.map((line, i) => (
                        <div key={i} className="animate-slide-in" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                           <span style={{ color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 900 }}>[{i}]</span>
                           <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>{line}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>

      </div>

      {/* Authorization Formation Overlay */}
       {isAuthorizing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'var(--modal-bg)', zIndex: 9500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(10px)' }}>
           <div className="auth-formation-container" style={{ width: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '3.5rem' }}>
                 <div className="radar-animation" style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 1s linear infinite' }}></div>
                    <ShieldCheck size={44} color="var(--primary)" />
                 </div>
                 <div>
                    <h2 style={{ margin: 0, letterSpacing: '5px', color: "var(--text)", fontWeight: 900 }}>ALLOCATION AUTHORIZED</h2>
                    <p style={{ margin: '4px 0 0', color: 'var(--success)', fontWeight: 900, fontSize: '0.9rem' }}>ACTION ID: AUTH-82441-A • VIZAG NORTH</p>
                 </div>
              </div>

              <div className="formation-terminal" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2.5rem', minHeight: '320px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
                 <div className="formation-lines" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {authLines.map((line, i) => (
                       <div key={i} className="animate-slide-in" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 900, minWidth: '45px' }}>[{i.toString().padStart(2, '0')}]</span>
                          <span style={{ color: "var(--text)", fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px' }}>{line}</span>
                       </div>
                    ))}
                    {authStep < authSteps.length && (
                       <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 900, minWidth: '45px' }}>[{authStep.toString().padStart(2, '0')}]</span>
                          <div style={{ width: 10, height: 20, background: 'var(--primary)', animation: 'pulse 0.5s infinite' }}></div>
                       </div>
                    )}
                 </div>
                 <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--success), transparent)', opacity: 0.4, animation: 'scanMove 3s linear infinite' }}></div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck size={24} color="#10b981" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)' }}>SECURE AUTHORIZATION • STATE HUB AP</span>
                 </div>
                 <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#10b981' }}>DIRECTIVE ACTIVE</div>
              </div>
           </div>
        </div>
      )}

      {/* Clinical Data Review Modal */}
      {showReviewModal && (
        <div className="mo-modal-overlay" style={{ position: 'fixed', inset: 0, background: "var(--surface-light)", zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowReviewModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '800px', background: 'var(--surface)', padding: '3rem', borderRadius: '32px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)' }} onClick={e => e.stopPropagation()}>
              <div className="modal-header-h" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                 <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '2px' }}>ALLOCATION DATA REVIEW</span>
                    <h2 style={{ margin: '5px 0 0', fontSize: '1.8rem', color: 'var(--text)' }}>{selectedAction?.title}</h2>
                    <p style={{ margin: '5px 0 0', color: 'var(--text-muted)', fontWeight: 600 }}>Target Region: {selectedAction?.district} • Vector ID: V-8244</p>
                 </div>
                 <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '10px 24px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 900 }}>CRITICAL RISK SIGNAL</div>
              </div>

              <div className="review-grid-h" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem' }}>
                 <div className="trend-viz-h">
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '1px' }}>MORBIDITY TREND ANALYSIS</h4>
                    <div style={{ height: '240px', background: 'var(--surface-light)', borderRadius: '24px', border: '1px solid var(--border)', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                       {/* Mock Chart Visualization */}
                       <div style={{ position: 'absolute', bottom: '20%', left: '10%', right: '10%', height: '2px', background: 'var(--border)' }}></div>
                       <svg style={{ width: '100%', height: '100%' }}>
                          <path d="M 0 150 Q 50 140 100 120 T 200 60 T 300 20" fill="none" stroke="var(--primary)" strokeWidth="4" className="animate-draw" />
                          <circle cx="300" cy="20" r="6" fill="#f43f5e" className="animate-pulse" />
                       </svg>
                       <div style={{ position: 'absolute', top: '20px', right: '20px', textAlign: 'right' }}>
                          <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: 900, color: '#f43f5e' }}>+142%</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)' }}>7-DAY CLUSTER SURGE</span>
                       </div>
                    </div>
                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                       <div style={{ background: 'var(--surface-light)', padding: '1.25rem', borderRadius: '18px', border: '1px solid var(--border)' }}>
                          <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '4px' }}>CLUSTER DENSITY</span>
                          <strong style={{ fontSize: '1rem', color: 'var(--text)' }}>8.4 Cases/km²</strong>
                       </div>
                       <div style={{ background: 'var(--surface-light)', padding: '1.25rem', borderRadius: '18px', border: '1px solid var(--border)' }}>
                          <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '4px' }}>SYMPTOM CORRELATION</span>
                          <strong style={{ fontSize: '1rem', color: 'var(--text)' }}>94.2% [ILI]</strong>
                       </div>
                    </div>
                 </div>

                 <div className="justification-hub-h">
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '1px' }}>ACTION JUSTIFICATION</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                       {[
                          { icon: <Activity size={18} />, text: 'Detection of localized ILI cluster in high-density mandates.' },
                          { icon: <ShieldAlert size={18} />, text: 'Predictive models indicate threshold breach in T-48h.' },
                          { icon: <Clock size={18} />, text: 'Delay in stationary testing reporting requires mobile intervention.' }
                       ].map((item, i) => (
                          <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', padding: '1.25rem', background: 'var(--surface-light)', borderRadius: '18px', border: '1px solid var(--border)' }}>
                             <div style={{ color: 'var(--primary)', marginTop: '2px' }}>{item.icon}</div>
                             <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5, fontWeight: 500 }}>{item.text}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div style={{ marginTop: '3.5rem', display: 'flex', gap: '15px' }}>
                 <button className="secondary-btn" style={{ flex: 1, padding: '16px', borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--surface-light)', cursor: 'pointer', fontWeight: 800 }} onClick={() => setShowReviewModal(false)}>Close Review</button>
                 <button 
                    className="h-btn h-btn-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none', padding: '16px', borderRadius: '14px', color: "var(--text)", fontWeight: 800, cursor: 'pointer' }}
                    onClick={() => {
                       setShowReviewModal(false);
                       handleAuthorize(selectedAction);
                    }}
                 >
                    CONFIRM & EXECUTE ALLOCATION
                 </button>
              </div>
           </div>
        </div>
      )}
         <style>{`
        .action-card-h:hover { border-color: var(--primary) !important; background: var(--surface-light) !important; transform: translateY(-5px); }
        .mo-button-primary:hover { filter: brightness(1.1); transform: scale(1.02); }
        .h-btn-primary:hover { filter: brightness(1.1); transform: scale(1.05); }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        @keyframes slideIn { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scanMove { from { top: 0; } to { top: 100%; } }
      `}</style>
    </div>
  );
};

export default DistrictActionCenter;
