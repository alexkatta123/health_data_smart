import React, { useState } from 'react';
import { Hospital, User, Lock, ArrowRight, ShieldCheck, Stethoscope, Building2, ChevronDown } from 'lucide-react';

const HospitalLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('Hospital');
  };

  return (
    <div className="hospital-login-container animate-fade">
      <div className="login-split">
        <div className="login-visual-panel">
          <div className="visual-content">
            <div className="premium-hospital-icon">
              <Building2 size={120} />
            </div>
            <h2 className="title-h">Clinical Gateway</h2>
            <p className="subtitle-h">Facility & Patient Intelligence Hub</p>
            <div className="pulse-medical"></div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="form-wrapper-h">
            <div className="hospital-branding">
              <Stethoscope size={24} color="#10b981" />
              <span>SurvAP Clinical Access</span>
            </div>
            
            <div className="header-box">
              <h1>Medical Officer Login</h1>
              <p>Secure clinical access for Hospital Admins and Medical Practitioners.</p>
            </div>

            <form onSubmit={handleSubmit} className="premium-form">
              <div className="input-field">
                <label>FACILITY CLASSIFICATION</label>
                <div className="select-box-h">
                  <select>
                    <option>Primary Health Center (PHC)</option>
                    <option>Community Health Center (CHC)</option>
                    <option>Area Hospital</option>
                    <option>District HQ Hospital</option>
                    <option>Private Medical College</option>
                  </select>
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="input-field">
                <label>HOSPITAL ID / MEDICAL UID</label>
                <div className="text-box-h">
                  <User size={18} />
                  <input type="text" placeholder="HOSP-8829-AP" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
              </div>

              <div className="input-field">
                <label>CLINICAL PASSKEY</label>
                <div className="text-box-h">
                  <Lock size={18} />
                  <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
              </div>

              <div className="form-utils">
                <div className="sync-status">
                  <div className="status-dot"></div>
                  <span>Last Sync: 2m ago</span>
                </div>
                <button type="button" className="role-switch-btn">Switch Role (Admin/Doctor)</button>
              </div>

              <button type="submit" className="hospital-submit-btn">
                Authorize Clinical Access <ArrowRight size={20} />
              </button>
            </form>

            <div className="footer-meta">
              <div className="shield-tag">
                <ShieldCheck size={14} /> HIPAA & DPDP COMPLIANT
              </div>
              <p>© 2026 AP Health Intelligence Network</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hospital-login-container { min-height: 100vh; background: var(--surface); overflow: hidden; }
        .login-split { display: flex; height: 100vh; }
        
        .login-visual-panel { 
          flex: 1; background: linear-gradient(135deg, #10b981 0%, #ecfdf5 100%); 
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .visual-content { text-align: center; color: var(--text); z-index: 10; }
        .premium-hospital-icon { margin-bottom: 2rem; filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.4)); animation: medical-pulse 4s ease-in-out infinite; }
        .title-h { font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 0.5rem; }
        .subtitle-h { font-size: 1.1rem; font-weight: 600; opacity: 0.8; }

        .login-form-panel { flex: 1; background: var(--surface); display: flex; align-items: center; justify-content: center; padding: 4rem; }
        .form-wrapper-h { width: 100%; max-width: 440px; }
        
        .hospital-branding { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 0.85rem; color: #10b981; margin-bottom: 3rem; text-transform: uppercase; letter-spacing: 1px; }
        
        .header-box h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 1rem; color: var(--text); }
        .header-box p { color: var(--text-muted); line-height: 1.6; margin-bottom: 2.5rem; font-weight: 600; }

        .premium-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-field label { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); margin-bottom: 0.6rem; letter-spacing: 1px; }
        
        .text-box-h, .select-box-h { position: relative; }
        .text-box-h svg, .select-box-h svg { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .text-box-h input, .select-box-h select {
          width: 100%; background: var(--surface); border: 1px solid rgba(255,255,255,0.08);
          padding: 16px 16px 16px 50px; border-radius: 14px; color: var(--text); font-size: 1rem; outline: none; transition: 0.3s;
        }
        .select-box-h select { padding-left: 16px; appearance: none; font-weight: 700; }
        .select-box-h svg { left: auto; right: 16px; }
        
        .text-box-h input:focus { border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        
        .form-utils { display: flex; justify-content: space-between; align-items: center; margin-top: -0.5rem; }
        .sync-status { display: flex; align-items: center; gap: 6px; font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }
        .status-dot { width: 6px; height: 6px; background: var(--surface-light); border-radius: 50%; box-shadow: 0 0 10px #10b981; }
        .role-switch-btn { background: none; border: none; color: #10b981; font-size: 0.7rem; font-weight: 700; cursor: pointer; padding: 0; }

        .hospital-submit-btn {
          width: 100%; padding: 18px; border-radius: 16px; border: none; background: var(--surface-light); color: var(--text);
          font-weight: 900; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
          gap: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3); margin-top: 0.5rem;
        }
        .hospital-submit-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4); }

        .footer-meta { margin-top: 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem; }
        .shield-tag { display: inline-flex; align-items: center; gap: 8px; color: #10b981; font-weight: 800; font-size: 0.75rem; margin-bottom: 0.8rem; }
        
        @keyframes medical-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
        @media (max-width: 1024px) { .login-visual-panel { display: none; } }
      `}</style>
    </div>
  );
};

export default HospitalLogin;
