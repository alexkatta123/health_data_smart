import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  ChevronRight, 
  Zap, 
  Activity, 
  ShieldAlert,
  ChevronLeft,
  X
} from 'lucide-react';

const NotificationBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const alerts = [
    { type: 'emergency', text: 'CRITICAL ALERT: Outbreak detected in Gajuwaka Cluster. Immediate field survey triggered.', icon: <ShieldAlert size={16} />, color: '#f43f5e' },
    { type: 'info', text: 'SYSTEM UPDATE: AI Clinical Scribe v2.4 deployed. Enhanced medical terminology recognition active.', icon: <Zap size={16} />, color: '#0ea5e9' },
    { type: 'warning', text: 'CAPACITY ALERT: ICU occupancy at King George Hospital has reached 92%. Monitor bed availability.', icon: <Activity size={16} />, color: '#f59e0b' },
    { type: 'success', text: 'DATA SYNC: Statewide epidemiological datasets synchronized with Central Health Cloud.', icon: <Zap size={16} />, color: '#10b981' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % alerts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="notification-bar-p animate-slide-down">
       <div className="nb-container">
          <div className="nb-status-dot pulse"></div>
          <div className="nb-content">
             <div className="nb-alert-group" style={{ transform: `translateY(-${currentIndex * 40}px)` }}>
                {alerts.map((alert, i) => (
                  <div key={i} className="nb-alert-item" style={{ color: alert.color }}>
                     <span className="nb-icon">{alert.icon}</span>
                     <span className="nb-text">{alert.text}</span>
                  </div>
                ))}
             </div>
          </div>
          <div className="nb-actions">
             <div className="nb-controls">
                <button className="nb-ctrl-btn" onClick={() => setCurrentIndex(prev => (prev - 1 + alerts.length) % alerts.length)}><ChevronLeft size={16} /></button>
                <span className="nb-count">{currentIndex + 1}/{alerts.length}</span>
                <button className="nb-ctrl-btn" onClick={() => setCurrentIndex(prev => (prev + 1) % alerts.length)}><ChevronRight size={16} /></button>
             </div>
             <button className="nb-close" onClick={() => setIsVisible(false)}><X size={16} /></button>
          </div>
       </div>

       <style>{`
         .notification-bar-p {
           width: 100%;
           height: 40px;
           background: var(--surface);
           border-bottom: 1px solid rgba(255,255,255,0.05);
           position: relative;
           z-index: 6000;
           overflow: hidden;
         }

         .nb-container {
           max-width: 1600px;
           margin: 0 auto;
           height: 100%;
           display: flex;
           align-items: center;
           padding: 0 2rem;
           gap: 1.5rem;
         }

         .nb-status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--surface-light); box-shadow: 0 0 10px #10b981; flex-shrink: 0; }
         .nb-status-dot.pulse { animation: nbPulse 2s infinite; }

         .nb-content { flex: 1; height: 40px; overflow: hidden; position: relative; }
         .nb-alert-group { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
         .nb-alert-item { 
           height: 40px; 
           display: flex; 
           align-items: center; 
           gap: 12px; 
           font-size: 0.8rem; 
           font-weight: 900; 
           letter-spacing: 0.5px;
           text-transform: uppercase;
         }
         .nb-icon { display: flex; align-items: center; justify-content: center; opacity: 0.8; }
         .nb-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

         .nb-actions { display: flex; align-items: center; gap: 2rem; }
         .nb-controls { display: flex; align-items: center; gap: 12px; background: var(--surface); padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
         .nb-ctrl-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; transition: 0.3s; }
         .nb-ctrl-btn:hover { color: var(--text); }
         .nb-count { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); min-width: 30px; text-align: center; }
         
         .nb-close { background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 0; display: flex; align-items: center; transition: 0.3s; }
         .nb-close:hover { color: #f43f5e; transform: rotate(90deg); }

         @keyframes nbPulse { 0% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.4; transform: scale(0.8); } }
         @keyframes nbSlideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
       `}</style>
    </div>
  );
};

export default NotificationBar;
