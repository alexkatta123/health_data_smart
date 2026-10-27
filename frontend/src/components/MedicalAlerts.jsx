import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  Send, 
  AlertTriangle, 
  ChevronRight, 
  Filter, 
  Zap,
  MoreVertical,
  Crosshair,
  Search,
  ArrowUpRight,
  X
} from 'lucide-react';

const MedicalAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'CRITICAL', title: 'Sudden Spike in Acute Diarrhea', location: 'Gajuwaka Sector 2', description: '12 cases reported within a 3-hour window. Pattern suggests potential water contamination cluster.', time: '2m ago', cases: 12, trajectory: '+180%', color: '#f43f5e' },
    { id: 2, type: 'MODERATE', title: 'Unusual Symptom Cluster', location: 'MVP Colony East', description: 'Multiple pediatric patients reporting high fever and joint pain. Dengue/Chikungunya screening recommended.', time: '1h ago', cases: 5, trajectory: '+45%', color: '#f59e0b' },
    { id: 3, type: 'WARNING', title: 'Low Stock: Anti-Venom', location: 'Regional Hub - Vizag South', description: 'Regional inventory falling below 15% threshold. Demand surge noted in rural sectors.', time: '4h ago', cases: null, trajectory: '-12%', color: '#0ea5e9' },
    { id: 4, type: 'CRITICAL', title: 'Undiagnosed Febrile Illness', location: 'Mangalagiri Urban', description: 'Cluster of 8 high-fever cases with atypical neurological symptoms. Sample collection initiated.', time: '15m ago', cases: 8, trajectory: '+220%', color: '#f43f5e' },
    { id: 5, type: 'MODERATE', title: 'Respiratory Syndrome Increase', location: 'Tenali CHC Catchment', description: 'Significant deviation from 5-year seasonal baseline. Monitoring for potential influenza-like outbreak.', time: '3h ago', cases: 24, trajectory: '+18%', color: '#f59e0b' },
    { id: 6, type: 'OPERATIONAL', title: 'IDSP Report Latency', location: 'Bapatla District', description: 'Reporting lag detected in 4 PHCs. System sync issues suspected.', time: '6h ago', cases: null, trajectory: 'Stable', color: '#8b5cf6' },
    { id: 7, type: 'CRITICAL', title: 'Potential Malaria Outbreak', location: 'Repalle Coastal Belt', description: 'RDT positivity rate exceeded 25% threshold in routine screening.', time: '30m ago', cases: 14, trajectory: '+95%', color: '#f43f5e' },
    { id: 8, type: 'WARNING', title: 'Power Backup Instability', location: 'Guntur Central Vaccine Store', description: 'Voltage fluctuations affecting cold chain integrity. Manual monitoring active.', time: '12h ago', cases: null, trajectory: 'Caution', color: '#0ea5e9' }
  ]);

  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('compact'); // 'large' or 'compact'
  const [notification, setNotification] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    showToast("Signal cleared from active queue.");
  };

  const triggerSurvey = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, surveyActive: true } : a));
    showToast("Field Survey Unit Mobilized. Real-time tracking active.");
  };

  const escalateAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, escalated: true } : a));
    showToast("Escalation Protocol Propagated to State Command Hub.", "warning");
  };

  return (
    <div className="early-warning-portal animate-fade">
      
      {/* Tactical Header */}
      <div className="ew-header">
        <div className="h-left">
          <div className="ew-icon-box">
             <Bell size={28} className="animate-pulse" />
          </div>
          <div className="h-text">
            <h1>Early Warning Intelligence</h1>
            <p>Automated anomaly detection from statewide clinical data streams.</p>
          </div>
        </div>
        <div className="h-right">
           <div className="ew-stats-summary">
              <div className="s-item">
                 <small>CRITICAL</small>
                 <strong>01</strong>
              </div>
              <div className="s-divider"></div>
               <div className="s-item">
                  <small>ACTIVE</small>
                  <strong>{alerts.length}</strong>
               </div>
               <div className="s-divider"></div>
               <div className="view-toggle-p">
                  <button className={`vt-btn ${viewMode === 'large' ? 'active' : ''}`} onClick={() => setViewMode('large')} title="Standard View">
                     <MoreVertical size={16} />
                  </button>
                  <button className={`vt-btn ${viewMode === 'compact' ? 'active' : ''}`} onClick={() => setViewMode('compact')} title="Compact View">
                     <Filter size={16} />
                  </button>
               </div>
           </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="ew-filters">
         <div className="f-tabs">
            {['All', 'Critical', 'Moderate', 'Operational'].map(t => (
              <button 
                key={t} 
                className={`f-tab ${filter === t ? 'active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
         </div>
         <div className="f-search">
            <Search size={16} />
            <input type="text" placeholder="Search signals..." />
         </div>
      </div>

      {/* Alerts Feed */}
      <div className={`ew-feed ${viewMode}`}>
        {alerts.filter(a => filter === 'All' || a.type.toLowerCase() === filter.toLowerCase()).map((alert) => (
          viewMode === 'large' ? (
            <div key={alert.id} className="alert-card-tactical animate-slide-up" style={{ '--accent': alert.color }}>
              <div className="ac-top">
                <div className="ac-status-badge">
                  <span className="dot"></span>
                  {alert.type}
                </div>
                <div className="ac-time">
                  <Clock size={12} />
                  {alert.time}
                </div>
              </div>

              <div className="ac-body" onClick={() => setSelectedAlert(alert)}>
                <div className="ac-main">
                  <h3>{alert.title}</h3>
                  <div className="ac-meta">
                    <div className="am-item">
                      <MapPin size={14} />
                      {alert.location}
                    </div>
                    <div className="am-item">
                      <Crosshair size={14} />
                      Surveillance Sector 4
                    </div>
                  </div>
                  <p>{alert.description}</p>
                </div>

                {alert.cases && (
                  <div className="ac-telemetry">
                    <div className="at-item">
                      <small>CLUSTER LOAD</small>
                      <strong>{alert.cases} CASES</strong>
                    </div>
                    <div className="at-item">
                      <small>TRAJECTORY</small>
                      <div className="t-val" style={{ color: alert.trajectory.startsWith('+') ? '#f43f5e' : '#10b981' }}>
                        <ArrowUpRight size={14} />
                        {alert.trajectory}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="ac-actions">
                <div className="aca-left">
                   <button className="ew-btn secondary" onClick={() => removeAlert(alert.id)}>
                      <CheckCircle2 size={16} /> Mark Reviewed
                   </button>
                   <button 
                     className={`ew-btn ${alert.surveyActive ? 'active-success' : 'primary'}`}
                     onClick={() => triggerSurvey(alert.id)}
                     disabled={alert.surveyActive}
                   >
                      <Zap size={16} /> {alert.surveyActive ? 'Survey Active' : 'Trigger Field Survey'}
                   </button>
                </div>
                <button 
                  className={`ew-btn ${alert.escalated ? 'escalated-active' : 'ghost-escalate'}`}
                  onClick={() => escalateAlert(alert.id)}
                  disabled={alert.escalated}
                >
                   <Send size={18} /> {alert.escalated ? 'Escalated to State' : 'Escalate to State Official'}
                </button>
              </div>
            </div>
          ) : (
            <div key={alert.id} className="compact-alert-row animate-fade" onClick={() => setSelectedAlert(alert)}>
              <div className="c-status" style={{ background: alert.color }}></div>
              <div className="c-info">
                <strong>{alert.title}</strong>
                <small>{alert.location} • {alert.time}</small>
              </div>
              <div className="c-stats">
                 <div className="cs-item">
                    <small>TYPE</small>
                    <span style={{ color: alert.color }}>{alert.type}</span>
                 </div>
                 {alert.cases && (
                   <div className="cs-item">
                      <small>LOAD</small>
                      <strong>{alert.cases}</strong>
                   </div>
                 )}
              </div>
              <div className="c-actions">
                 <button onClick={(e) => { e.stopPropagation(); removeAlert(alert.id); }}><CheckCircle2 size={16} /></button>
                 <button onClick={(e) => { e.stopPropagation(); triggerSurvey(alert.id); }}><Zap size={16} /></button>
                 <button><ChevronRight size={18} /></button>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Deep-Dive Tactical Popup Modal */}
      {selectedAlert && (
        <div className="modal-overlay animate-fade" onClick={() => setSelectedAlert(null)}>
          <div className="tactical-popup mo-card-p animate-scale-up" onClick={e => e.stopPropagation()}>
            <div className="tp-header" style={{ borderLeft: `6px solid ${selectedAlert.color}` }}>
              <div className="tph-info">
                <span className="type-badge" style={{ color: selectedAlert.color }}>{selectedAlert.type} SIGNAL ACTIVE</span>
                <h2>{selectedAlert.title}</h2>
                <div className="tph-meta">
                   <MapPin size={14} /> {selectedAlert.location} • <Clock size={14} /> Detect: {selectedAlert.time}
                </div>
              </div>
              <button className="close-btn-p" onClick={() => setSelectedAlert(null)}><X size={24} /></button>
            </div>

            <div className="tp-body">
              <div className="tp-story">
                <h5>EPIDEMIOLOGICAL SUMMARY</h5>
                <p>{selectedAlert.description}</p>
                <div className="cluster-intel">
                  <div className="ci-box">
                    <small>CLUSTER DENSITY</small>
                    <strong>{selectedAlert.cases || 'N/A'} IDENTIFIED</strong>
                  </div>
                  <div className="ci-box">
                    <small>TRAJECTORY</small>
                    <strong style={{ color: selectedAlert.trajectory?.startsWith('+') ? '#f43f5e' : '#10b981' }}>{selectedAlert.trajectory}</strong>
                  </div>
                </div>
              </div>

              <div className="tp-actions-grid">
                <h5>SURVEILLANCE PROTOCOLS</h5>
                <div className="action-row" onClick={() => { triggerSurvey(selectedAlert.id); setSelectedAlert(null); }}>
                  <div className="ar-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)' }}><Zap size={18} /></div>
                  <div className="ar-text">
                    <strong>Mobilize Field Survey</strong>
                    <span>Deploy RRT to {selectedAlert.location}</span>
                  </div>
                  <ChevronRight size={18} />
                </div>
                <div className="action-row" onClick={() => { escalateAlert(selectedAlert.id); setSelectedAlert(null); }}>
                  <div className="ar-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}><Send size={18} /></div>
                  <div className="ar-text">
                    <strong>State Level Escalation</strong>
                    <span>Synchronize with State Health Cloud</span>
                  </div>
                  <ChevronRight size={18} />
                </div>
                <div className="action-row" onClick={() => { removeAlert(selectedAlert.id); setSelectedAlert(null); }}>
                  <div className="ar-icon" style={{ background: 'var(--surface-light)', color: 'var(--text-muted)' }}><CheckCircle2 size={18} /></div>
                  <div className="ar-text">
                    <strong>Archive as Resolved</strong>
                    <span>Close tactical signal investigation</span>
                  </div>
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tactical Toast Notification */}
      {notification && (
        <div className={`tactical-toast ${notification.type} animate-slide-up`}>
          <div className="t-icon">
            {notification.type === 'success' ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
          </div>
          <div className="t-msg">{notification.msg}</div>
          <div className="t-progress"></div>
        </div>
      )}

      <style>{`
        .early-warning-portal {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 0;
        }

        .ew-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          background: var(--surface);
          padding: 2.5rem;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .h-left { display: flex; align-items: center; gap: 2rem; }
        .ew-icon-box {
          width: 64px;
          height: 64px;
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(14, 165, 233, 0.2);
        }

        .h-text h1 { font-size: 2rem; font-weight: 900; letter-spacing: -1px; margin: 0 0 5px; }
        .h-text p { color: var(--text-muted); font-weight: 600; font-size: 1rem; }

        .ew-stats-summary { display: flex; align-items: center; gap: 2.5rem; }
        .s-item { text-align: center; }
        .s-item small { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; margin-bottom: 4px; }
        .s-item strong { font-size: 1.5rem; font-weight: 900; color: var(--text); }
        .s-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.1); }

        .ew-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .f-tabs { display: flex; gap: 10px; background: var(--surface); padding: 6px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.05); }
        .f-tab {
          padding: 8px 20px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 800;
          font-size: 0.85rem;
          cursor: pointer;
          transition: 0.2s;
        }
        .f-tab.active { background: var(--surface); color: var(--text); }

        .f-search {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          padding: 10px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
          width: 300px;
        }
        .f-search input { background: transparent; border: none; color: var(--text); outline: none; font-size: 0.9rem; width: 100%; }

        .ew-feed { display: flex; flex-direction: column; gap: 1.5rem; }

        .alert-card-tactical {
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 6px solid var(--accent);
          border-radius: 28px;
          padding: 2.5rem;
          transition: 0.3s;
          position: relative;
        }
        .alert-card-tactical:hover { border-color: var(--accent); transform: translateX(5px); }

        .ac-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .ac-status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: var(--surface);
          border-radius: 100px;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1px;
          color: var(--accent);
        }
        .ac-status-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
        .ac-time { display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; }

        .ac-body { display: grid; grid-template-columns: 1fr 220px; gap: 3rem; margin-bottom: 2.5rem; }
        .ac-main h3 { font-size: 1.6rem; font-weight: 900; margin: 0 0 1rem; color: var(--text); }
        .ac-meta { display: flex; gap: 2rem; margin-bottom: 1.25rem; }
        .am-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
        .ac-main p { color: var(--text-muted); font-weight: 600; line-height: 1.6; font-size: 1.1rem; }

        .ac-telemetry {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: var(--surface);
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.02);
        }
        .at-item small { display: block; font-size: 0.6rem; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; letter-spacing: 1px; }
        .at-item strong { font-size: 1.1rem; font-weight: 900; }
        .t-val { display: flex; align-items: center; gap: 6px; font-weight: 900; }

        .ac-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .aca-left { display: flex; gap: 1rem; }
        .ew-btn {
          padding: 14px 28px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: 0.3s;
          border: 1px solid transparent;
        }
        .ew-btn.primary { 
          background: var(--surface); 
          color: var(--text); 
          border: none; 
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
          font-weight: 900;
          letter-spacing: -0.2px;
        }
        .ew-btn.primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4); filter: brightness(1.1); }
        
        .ew-btn.secondary { background: var(--surface); color: var(--text); border: 1px solid rgba(255,255,255,0.1); }
        
        .ew-btn.ghost-escalate { 
          background: transparent; 
          border: none; 
          color: var(--text-muted); 
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.5px;
          padding: 10px;
        }
        .ew-btn.ghost-escalate:hover { color: var(--text); transform: translateY(-2px); }
        
        /* Tactical Popup Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .tactical-popup { width: 100%; max-width: 700px; background: var(--surface); border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.08); border: 1px solid var(--border); }
        .tp-header { padding: 2rem 2.5rem; display: flex; justify-content: space-between; align-items: flex-start; background: var(--surface-light); border-bottom: 1px solid var(--border); }
        .type-badge { font-size: 0.6rem; font-weight: 900; letter-spacing: 1.5px; margin-bottom: 8px; display: block; }
        .tp-header h2 { font-size: 1.6rem; font-weight: 900; margin: 0 0 8px; color: var(--text); }
        .tph-meta { display: flex; align-items: center; gap: 12px; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }
        .close-btn-p { background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.3s; }
        .close-btn-p:hover { color: var(--text); transform: rotate(90deg); }

        .tp-body { padding: 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .tp-story h5, .tp-actions-grid h5 { font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; margin-bottom: 1.5rem; text-transform: uppercase; }
        .tp-story p { font-size: 0.95rem; font-weight: 600; line-height: 1.6; color: var(--text-muted); margin-bottom: 2rem; }
        
        .cluster-intel { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .ci-box { background: var(--surface-light); border: 1px solid var(--border); padding: 16px; border-radius: 20px; }
        .ci-box small { display: block; font-size: 0.55rem; font-weight: 900; color: var(--text-muted); margin-bottom: 4px; }
        .ci-box strong { font-size: 1rem; font-weight: 900; color: var(--text); }

        .tp-actions-grid { border-left: 1px solid var(--border); padding-left: 3rem; }
        .action-row { display: flex; align-items: center; gap: 15px; padding: 16px; border-radius: 16px; border: 1px solid var(--border); cursor: pointer; transition: 0.3s; margin-bottom: 12px; }
        .action-row:hover { border-color: var(--primary); background: var(--surface-light); transform: translateX(8px); }
        .ar-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ar-text { flex: 1; }
        .ar-text strong { display: block; font-size: 0.85rem; font-weight: 900; color: var(--text); }
        .ar-text span { font-size: 0.65rem; color: var(--text-muted); font-weight: 700; }
        
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        @media (max-width: 768px) {
          .tp-body { grid-template-columns: 1fr; gap: 2rem; }
          .tp-actions-grid { border-left: none; padding-left: 0; }
        }
        
        .ew-btn.active-success { background: #10b981; color: white; border: none; }
        .ew-btn.escalated-active { color: #f43f5e; font-weight: 900; }

        /* Tactical Toast Styles */
        .tactical-toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 12px 24px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          z-index: 9999;
          min-width: 320px;
          backdrop-filter: blur(20px);
        }
        .tactical-toast.success .t-icon { color: #10b981; }
        .tactical-toast.warning .t-icon { color: #f59e0b; }
        .t-msg { font-size: 0.85rem; font-weight: 800; color: var(--text); }
        .t-progress { position: absolute; bottom: 0; left: 0; height: 3px; background: var(--primary); border-radius: 0 0 16px 16px; animation: toastProgress 3s linear forwards; }
        @keyframes toastProgress { from { width: 100%; } to { width: 0%; } }
        
        /* Compact View Styles */
        .view-toggle-p { display: flex; gap: 8px; background: var(--surface); padding: 4px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .vt-btn { width: 36px; height: 36px; border-radius: 8px; border: none; background: transparent; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .vt-btn.active { background: var(--surface); color: var(--primary); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

        .compact-alert-row {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          cursor: pointer;
          transition: 0.2s;
        }
        .compact-alert-row:hover { border-color: var(--primary); transform: translateX(5px); background: rgba(255,255,255,0.02); }
        .c-status { width: 6px; height: 32px; border-radius: 100px; flex-shrink: 0; }
        .c-info { flex: 1; display: flex; flex-direction: column; }
        .c-info strong { font-size: 1rem; color: var(--text); }
        .c-info small { color: var(--text-muted); font-size: 0.75rem; font-weight: 700; margin-top: 2px; }
        
        .c-stats { display: flex; gap: 2rem; border-left: 1px solid var(--border); border-right: 1px solid var(--border); padding: 0 2rem; }
        .cs-item { display: flex; flex-direction: column; min-width: 80px; }
        .cs-item small { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); margin-bottom: 2px; letter-spacing: 0.5px; }
        .cs-item span, .cs-item strong { font-size: 0.8rem; font-weight: 900; }
        
        .c-actions { display: flex; gap: 10px; }
        .c-actions button { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .c-actions button:hover { border-color: var(--primary); color: var(--primary); background: var(--surface-light); }

        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default MedicalAlerts;
