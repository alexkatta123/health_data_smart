import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Siren, 
  Radio, 
  Users, 
  MapPin, 
  PhoneCall, 
  AlertOctagon, 
  Zap, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Send,
  Lock,
  ChevronRight,
  Truck,
  Activity,
  Heart,
  AlertTriangle
} from 'lucide-react';

const EmergencyResponse = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [dispatchStatus, setDispatchStatus] = useState('Operational Standby');

  useEffect(() => {
    let timer;
    if (isEmergencyActive && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && isEmergencyActive) {
      setIsEmergencyActive(false);
    }
    return () => clearInterval(timer);
  }, [isEmergencyActive, countdown]);

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setCountdown(3600); // 1 hour mission clock
    setDispatchStatus('STATEWIDE RED ALERT: ACTIVE DEPLOYMENT');
  };

  return (
    <div className={`emergency-page animate-fade ${isEmergencyActive ? 'emergency-mode' : ''}`}>
      <div className="emergency-overlay"></div>
      
      <header className="emergency-header">
        <div className="header-branding">
          <div className={`status-dot ${isEmergencyActive ? 'pulse' : ''}`}></div>
          <div className="title-group">
            <span className="system-label">Command & Control v4.0</span>
            <h2>{isEmergencyActive ? 'Statewide Emergency Protocol Active' : 'Emergency Response System'}</h2>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-pill">
            <Clock size={16} />
            <span>{isEmergencyActive ? `${Math.floor(countdown / 60)}m ${countdown % 60}s` : '00:00:00'}</span>
          </div>
          <div className={`status-text ${isEmergencyActive ? 'alert' : ''}`}>
            {dispatchStatus}
          </div>
        </div>
      </header>

      <div className="emergency-grid">
        {/* Left Column: Command */}
        <div className="grid-left">
          <div className="v-card central-command">
            <div className="command-ring">
              <button 
                className={`trigger-btn ${isEmergencyActive ? 'active' : ''}`}
                onClick={triggerEmergency}
                disabled={isEmergencyActive}
              >
                {isEmergencyActive ? <Zap size={64} fill="white" /> : <Siren size={64} />}
                <span className="btn-label">{isEmergencyActive ? 'RESPONSE ACTIVE' : 'TRIGGER ALERT'}</span>
              </button>
              <div className="ring r1"></div>
              <div className="ring r2"></div>
              <div className="ring r3"></div>
            </div>
            <div className="command-footer">
              <div className="auth-note">
                <Lock size={12} /> Biometric Security Active
              </div>
              <div className="protocol-hint">Click to initiate Statewide Response Protocol-Alpha</div>
            </div>
          </div>
        </div>

        {/* Right Column: Resources & Comms */}
        <div className="grid-right">
          {/* Resource Deployment */}
          <div className="v-card resources-card">
            <div className="v-card-header">
              <h3><Truck size={20} color="var(--primary)" /> Resource Allocation</h3>
            </div>
            <div className="resource-grid">
              <div className="res-item">
                <div className="res-val">124</div>
                <div className="res-label">Ambulances</div>
                <div className="res-bar"><div style={{ width: '82%' }}></div></div>
              </div>
              <div className="res-item">
                <div className="res-val">42</div>
                <div className="res-label">RRT Units</div>
                <div className="res-bar"><div style={{ width: '65%' }}></div></div>
              </div>
              <div className="res-item">
                <div className="res-val">850</div>
                <div className="res-label">ICU Beds</div>
                <div className="res-bar"><div style={{ width: '45%' }}></div></div>
              </div>
              <div className="res-item">
                <div className="res-val">12k</div>
                <div className="res-label">PPE Kits</div>
                <div className="res-bar"><div style={{ width: '92%' }}></div></div>
              </div>
            </div>
          </div>

          {/* District Risk Mini-Map */}
          <div className="v-card district-risk-card">
            <div className="v-card-header">
              <h3><Activity size={20} color="#f43f5e" /> Regional Threat Level</h3>
            </div>
            <div className="risk-heatmap">
              {['Visakhapatnam', 'Guntur', 'Krishna', 'Chittoor', 'Nellore'].map(dist => (
                <div key={dist} className="risk-row">
                  <span>{dist}</span>
                  <div className="risk-meter">
                    <div className="step active"></div>
                    <div className="step active"></div>
                    <div className="step active"></div>
                    <div className="step"></div>
                    <div className="step"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Field Comms Hub */}
          <div className="v-card comms-card">
            <div className="v-card-header">
              <h3><Radio size={20} color="var(--primary)" /> Field Comms Hub</h3>
            </div>
            <div className="comms-feed">
              <div className="msg field">
                <strong>RRT-ALPHA:</strong> Cluster isolated in Nellore Sector 4.
              </div>
              <div className="msg system">
                <strong>HQ:</strong> Copy. Logistics deployed to your location.
              </div>
            </div>
            <div className="comms-input">
              <input type="text" placeholder="Direct command..." />
              <button className="send-btn"><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .emergency-page { padding: 2rem; color: var(--text); height: calc(100vh - 80px); position: relative; overflow: hidden; background: var(--surface); }
        
        .emergency-overlay { position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(244, 63, 94, 0.05) 0%, transparent 70%); pointer-events: none; opacity: 0; transition: opacity 0.5s ease; }
        .emergency-mode .emergency-overlay { opacity: 1; animation: pulseOverlay 2s infinite; }
        @keyframes pulseOverlay { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.5; } }

        .emergency-header { display: flex; justify-content: space-between; align-items: center; background: var(--surface); border: 1px solid var(--border); padding: 1.5rem 2.5rem; border-radius: 24px; margin-bottom: 2rem; }
        .header-branding { display: flex; align-items: center; gap: 20px; }
        .status-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--surface-light); }
        .pulse { animation: statusPulse 1s infinite; background: #f43f5e; box-shadow: 0 0 15px #f43f5e; }
        @keyframes statusPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.2); } }
        
        .system-label { font-size: 0.7rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; }
        .header-branding h2 { font-size: 1.4rem; font-weight: 800; margin-top: 2px; }

        .header-stats { display: flex; align-items: center; gap: 2rem; }
        .stat-pill { background: var(--surface-light); padding: 8px 16px; border-radius: 100px; display: flex; align-items: center; gap: 10px; font-family: monospace; font-size: 1.1rem; font-weight: 700; color: var(--primary); border: 1px solid var(--border); }
        .emergency-mode .stat-pill { color: #f43f5e; border-color: rgba(244, 63, 94, 0.3); }
        .status-text { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .status-text.alert { color: #f43f5e; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

        .emergency-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; height: calc(100% - 120px); }
        .grid-left, .grid-right { display: flex; flex-direction: column; gap: 2rem; }

        .v-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; position: relative; overflow: hidden; }
        .v-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .v-card-header h3 { font-size: 1rem; font-weight: 800; display: flex; align-items: center; gap: 10px; }

        .central-command { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, #0f172a 0%, #050914 100%); }
        .command-ring { position: relative; width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
        .trigger-btn { width: 140px; height: 140px; border-radius: 50%; border: none; background: linear-gradient(135deg, #f43f5e, #9f1239); color: var(--text); cursor: pointer; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 0 40px rgba(244, 63, 94, 0.4); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .trigger-btn:hover:not(:disabled) { transform: scale(1.08); box-shadow: 0 0 60px rgba(244, 63, 94, 0.6); }
        .trigger-btn:disabled { background: #334155; opacity: 0.8; transform: scale(0.95); box-shadow: none; }
        .btn-label { font-size: 0.7rem; font-weight: 900; letter-spacing: 1px; }

        .ring { position: absolute; border: 2px solid rgba(244, 63, 94, 0.1); border-radius: 50%; }
        .r1 { width: 180px; height: 180px; border-style: dashed; animation: spin 10s linear infinite; }
        .r2 { width: 220px; height: 220px; border-style: dotted; animation: spin 15s linear infinite reverse; }
        .r3 { width: 260px; height: 260px; border-style: solid; opacity: 0.05; animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .command-footer { text-align: center; }
        .auth-note { font-size: 0.65rem; font-weight: 800; color: #10b981; text-transform: uppercase; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 4px; }
        .protocol-hint { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }

        .resource-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .res-item { background: var(--surface-light); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border); }
        .res-val { font-size: 1.5rem; font-weight: 800; color: var(--text); }
        .res-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 8px; }
        .res-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .res-bar div { height: 100%; background: var(--primary); border-radius: 2px; }

        .risk-heatmap { display: flex; flex-direction: column; gap: 12px; }
        .risk-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; }
        .risk-meter { display: flex; gap: 4px; }
        .step { width: 16px; height: 8px; background: var(--border); border-radius: 2px; }
        .step.active { background: #f43f5e; box-shadow: 0 0 5px rgba(244, 63, 94, 0.3); }

        .comms-feed { height: 100px; overflow-y: auto; background: var(--surface-light); border-radius: 12px; padding: 1rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 10px; }
        .msg { font-size: 0.8rem; line-height: 1.4; }
        .msg.field { color: var(--primary); }
        .msg.system { color: #10b981; }
        .comms-input { display: flex; gap: 10px; }
        .comms-input input { flex: 1; background: var(--surface-light); border: 1px solid var(--border); border-radius: 10px; padding: 10px; color: var(--text); outline: none; font-size: 0.8rem; }
        .send-btn { background: var(--primary); border: none; color: var(--text); width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
      ` }} />
    </div>
  );
};

export default EmergencyResponse;
