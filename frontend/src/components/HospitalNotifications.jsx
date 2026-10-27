import React, { useState } from 'react';
import { 
  Bell, Ambulance, TestTube, Calendar, 
  Trash2, Filter, MoreVertical, 
  CheckCircle2, Clock, AlertCircle, ShoppingBag, 
  ChevronRight, X, Activity, Zap
} from 'lucide-react';

const HospitalNotifications = () => {
  const [notifFilter, setNotifFilter] = useState('all');
  const [showActionModal, setShowActionModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

  const notifications = [
    { id: 1, type: 'emergency', title: 'Critical Emergency Arrival', desc: 'Ambulance EM-242 arriving with a cardiac arrest patient in 3 mins.', time: 'Just Now', unread: true },
    { id: 2, type: 'field-staff', title: 'Field Staff Mobilization Triggered', desc: 'State Health Command has triggered a Field Survey for the Gajuwaka Cluster. Immediate mobilization required.', time: '5 mins ago', unread: true },
    { id: 3, type: 'lab', title: 'Lab Results Ready', desc: 'Diagnostic results for Patient P-1024 are now available for review.', time: '12 mins ago', unread: true },
    { id: 4, type: 'appointment', title: 'Appointment Reminder', desc: 'Consultation with Mr. Anil Gupta starts in 15 minutes.', time: '30 mins ago', unread: false },
    { id: 5, type: 'bed', title: 'Bed Occupancy Alert', desc: 'ICU capacity has reached 95%. Consider rescheduling elective cases.', time: '1 hour ago', unread: false },
  ];

  return (
    <div className="hospital-notifications animate-fade">
      <div className="page-header-h">
        <div className="title-area-h">
          <h2>Notifications Center</h2>
          <p>Real-time alerts for critical events, lab reports, and administrative updates.</p>
        </div>
        <div className="header-btns-h" style={{ display: 'flex', gap: '2px', background: '#e2e8f0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <button 
             className="tactical-header-btn" 
             style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}
          >
             Mark All Read
          </button>
          <button 
             className="tactical-header-btn"
             style={{ background: 'transparent', color: "#64748b", border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}
          >
             <Trash2 size={18} /> Clear Hub
          </button>
        </div>
      </div>

      <div className="notif-layout-h">
         {/* Filter Panel */}
         <aside className="notif-sidebar-h">
            <div className="h-card" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
               <h3>Filter by Category</h3>
               <div className="n-filter-list">
                  <button 
                     className={`n-filter-item ${notifFilter === 'all' ? 'active' : ''}`}
                     onClick={() => setNotifFilter('all')}
                  >
                     All Alerts <span>{notifications.length}</span>
                  </button>
                  <button 
                     className={`n-filter-item ${notifFilter === 'emergency' ? 'active' : ''}`}
                     onClick={() => setNotifFilter('emergency')}
                  >
                     Emergency <span>{notifications.filter(n => n.type === 'emergency').length}</span>
                  </button>
                  <button 
                     className={`n-filter-item ${notifFilter === 'lab' ? 'active' : ''}`}
                     onClick={() => setNotifFilter('lab')}
                  >
                     Clinical / Lab <span>{notifications.filter(n => n.type === 'lab').length}</span>
                  </button>
                  <button 
                     className={`n-filter-item ${notifFilter === 'appointment' ? 'active' : ''}`}
                     onClick={() => setNotifFilter('appointment')}
                  >
                     Appointments <span>{notifications.filter(n => n.type === 'appointment').length}</span>
                  </button>
                  <button 
                     className={`n-filter-item ${notifFilter === 'field-staff' ? 'active' : ''}`}
                     onClick={() => setNotifFilter('field-staff')}
                  >
                     Field Staff Alerts <span>{notifications.filter(n => n.type === 'field-staff').length}</span>
                  </button>
               </div>
            </div>
         </aside>

         {/* Notifications Feed */}
         <main className="notif-feed-h">
            {notifications
               .filter(n => notifFilter === 'all' || n.type === notifFilter)
               .map((n, i) => (
              <div key={i} className={`n-item-h ${n.unread ? 'unread' : ''}`} style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                 <div className={`n-icon-h ${n.type}`}>
                    {n.type === 'emergency' && <Ambulance size={20} />}
                    {n.type === 'field-staff' && <Zap size={20} />}
                    {n.type === 'lab' && <TestTube size={20} />}
                    {n.type === 'appointment' && <Calendar size={20} />}
                    {n.type === 'bed' && <AlertCircle size={20} />}
                    {n.type === 'pharmacy' && <CheckCircle2 size={20} />}
                 </div>
                 
                 <div className="n-content-h">
                    <div className="n-top-h">
                       <h4 style={{ color: '#0f172a' }}>{n.title}</h4>
                       <span className="n-time-h">{n.time}</span>
                    </div>
                    <p style={{ color: '#64748b' }}>{n.desc}</p>
                    <div className="n-actions-h" style={{ display: 'flex', gap: '10px' }}>
                       <button 
                          className="take-action-btn"
                          style={{ background: '#0ea5e9', color: "white", padding: '8px 20px', borderRadius: '12px', border: 'none', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer' }}
                          onClick={() => {
                             setSelectedNotif(n);
                             setShowActionModal(true);
                          }}
                       >
                          Take Action
                       </button>
                       <button 
                          className="dismiss-btn"
                          style={{ background: '#f1f5f9', color: '#64748b', padding: '8px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
                       >
                          Dismiss
                       </button>
                    </div>
                 </div>

                 <div className="n-more-h">
                    {n.unread && <div className="unread-pulse-h"></div>}
                    <button className="h-icon-btn" style={{ color: '#94a3b8' }}><MoreVertical size={16} /></button>
                 </div>
              </div>
            ))}
         </main>
      </div>

      {/* Action Orchestration Modal */}
      {showActionModal && (
        <div className="mo-modal-overlay" style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(10px)' }} onClick={() => setShowActionModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '600px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                       {selectedNotif?.type === 'emergency' ? <Ambulance size={32} /> : <Bell size={32} />}
                    </div>
                    <div>
                       <h2 style={{ margin: 0, color: '#0f172a' }}>Action: {selectedNotif?.title}</h2>
                       <p style={{ margin: '4px 0 0', color: '#64748b' }}>Emergency Coordination Hub • Unit 4</p>
                    </div>
                 </div>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
                 <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>{selectedNotif?.desc}</p>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                       <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b' }}>PRIORITY LEVEL</span>
                       <p style={{ margin: '4px 0 0', fontWeight: 800, color: '#ef4444' }}>CRITICAL</p>
                    </div>
                    <div style={{ padding: '1rem', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                       <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b' }}>RESPONSE UNIT</span>
                       <p style={{ margin: '4px 0 0', fontWeight: 800, color: '#0f172a' }}>TRAUMA TEAM A</p>
                    </div>
                 </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="mo-button-outline" style={{ flex: 1, border: '1px solid #e2e8f0', color: '#64748b' }} onClick={() => setShowActionModal(false)}>Cancel Action</button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none', color: 'white' }}
                    onClick={() => {
                       setShowActionModal(false);
                       setIsProcessing(true);
                       setTimeout(() => setIsProcessing(false), 3500);
                    }}
                 >
                    CONFIRM & MOBILIZE TEAM
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Action Mobilization Overlay */}
      {isProcessing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Activity size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>MOBILIZING RESPONSE UNIT...</h2>
           <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 800 }}>ALERT: {selectedNotif?.title} • COORDINATING WITH TRAUMA UNIT</p>
        </div>
      )}

      <style>{`
        .hospital-notifications { display: flex; flex-direction: column; gap: 2rem; }
        
        .notif-layout-h { display: grid; grid-template-columns: 260px 1fr; gap: 2rem; }
        .notif-sidebar-h .h-card { border-radius: 24px; padding: 1.5rem; }
        .notif-sidebar-h h3 { font-size: 0.85rem; font-weight: 800; color: #64748b; margin-bottom: 1.25rem; text-transform: uppercase; }
        
        .n-filter-list { display: flex; flex-direction: column; gap: 4px; }
        .n-filter-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 10px; border: none; background: transparent; color: #64748b; font-size: 0.9rem; font-weight: 600; cursor: pointer; text-align: left; }
        .n-filter-item:hover { background: #f8fafc; color: #0f172a; }
        .n-filter-item.active { background: rgba(59, 130, 246, 0.1); color: var(--primary); font-weight: 700; }
        .n-filter-item span { background: #f1f5f9; padding: 2px 8px; border-radius: 100px; font-size: 0.7rem; }

        .notif-feed-h { display: flex; flex-direction: column; gap: 12px; }
        .n-item-h { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; display: flex; gap: 1.5rem; transition: all 0.2s; position: relative; }
        .n-item-h.unread { border-left: 4px solid var(--primary); }
        .n-item-h:hover { transform: translateY(-2px); border-color: var(--primary); }

        .n-icon-h { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .n-icon-h.emergency { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .n-icon-h.field-staff { background: rgba(14, 165, 233, 0.1); color: var(--primary); }
        .n-icon-h.lab { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .n-icon-h.appointment { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .n-icon-h.bed { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .n-icon-h.pharmacy { background: rgba(139, 92, 246, 0.1); color: var(--primary); }

        .n-content-h { flex: 1; }
        .n-top-h { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .n-top-h h4 { margin: 0; font-size: 1rem; font-weight: 800; }
        .n-time-h { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .n-content-h p { margin: 0 0 1rem 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

        .take-action-btn:hover { background: #0284c7 !important; transform: scale(1.02); }
        .dismiss-btn:hover { background: #1e293b !important; color: var(--text) !important; }

        .unread-pulse-h { width: 10px; height: 10px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 10px var(--primary); margin-bottom: 10px; }
        .n-more-h { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; }
      `}</style>
    </div>
  );
};

export default HospitalNotifications;
