import React, { useState } from 'react';
import { Shield, User, Lock, ArrowRight, ChevronDown, ShieldCheck, Activity } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jurisdiction, setJurisdiction] = useState('State');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('Admin');
  };

  return (
    <div className="admin-login-container animate-fade">
      <div className="login-split">
        <div className="login-visual-panel">
          <div className="visual-content">
            <div className="premium-shield-icon">
              <Shield size={120} />
            </div>
            <h2 className="title-h">Admin Intelligence</h2>
            <p className="subtitle-h">Statewide Strategic Command Hub</p>
            <div className="network-dots"></div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="form-wrapper-h">
            <div className="govt-branding">
              <Activity size={24} color="#8b5cf6" />
              <span>SurvAP Strategic Network</span>
            </div>
            
            <div className="header-box">
              <h1>Authorize Command</h1>
              <p>Secure access for State Health Officials and District Officers.</p>
            </div>

            <form onSubmit={handleSubmit} className="premium-form">
              <div className="input-field">
                <label>COMMAND JURISDICTION</label>
                <div className="select-box-h">
                  <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)}>
                    <option value="State">State Command Center (Amaravati)</option>
                    <option value="Visakhapatnam">Visakhapatnam District</option>
                    <option value="Vijayawada">Vijayawada (NTR)</option>
                    <option value="Guntur">Guntur District HQ</option>
                  </select>
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="input-field">
                <label>OFFICIAL IDENTIFIER (EMAIL / UID)</label>
                <div className="text-box-h">
                  <User size={18} />
                  <input type="text" placeholder="admin@ap.gov.in" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
              </div>

              <div className="input-field">
                <label>SECURE PASSKEY</label>
                <div className="text-box-h">
                  <Lock size={18} />
                  <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
              </div>

              <div className="input-field">
                <label>OTP VERIFICATION (SECURE 2FA)</label>
                <div className="text-box-h">
                  <ShieldCheck size={18} />
                  <input type="text" placeholder="Enter 6-digit OTP" maxLength="6" />
                </div>
              </div>

              <div className="form-utils">
                <span className="role-detect">Auto-detecting: {jurisdiction === 'State' ? 'State Authority' : 'District Health Officer'}</span>
                <button type="button" className="forgot-link">Forgot Password?</button>
              </div>

              <button type="submit" className="admin-submit-btn">
                Authorize Command <ArrowRight size={20} />
              </button>
            </form>

            <div className="footer-meta">
              <div className="shield-tag">
                <ShieldCheck size={14} /> DPDP COMPLIANT | AES-256
              </div>
              <p>© 2026 Government of Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-login-container { min-height: 100vh; background: var(--surface); overflow: hidden; }
        .login-split { display: flex; height: 100vh; }
        
        .login-visual-panel { 
          flex: 1; background: linear-gradient(135deg, #8b5cf6 0%, #ede9fe 100%); 
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .visual-content { text-align: center; color: var(--text); z-index: 10; }
        .premium-shield-icon { margin-bottom: 2rem; filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.4)); animation: float 6s ease-in-out infinite; }
        .title-h { font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 0.5rem; }
        .subtitle-h { font-size: 1.1rem; font-weight: 600; opacity: 0.8; }

        .login-form-panel { flex: 1; background: var(--surface); display: flex; align-items: center; justify-content: center; padding: 4rem; }
        .form-wrapper-h { width: 100%; max-width: 440px; }
        
        .govt-branding { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 0.85rem; color: var(--primary); margin-bottom: 3rem; text-transform: uppercase; letter-spacing: 1px; }
        
        .header-box h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 1rem; color: var(--text); }
        .header-box p { color: var(--text-muted); line-height: 1.6; margin-bottom: 2.5rem; font-weight: 600; }

        .premium-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-field label { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); margin-bottom: 0.6rem; letter-spacing: 1px; }
        
        .text-box-h, .select-box-h { position: relative; }
        .text-box-h svg { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .text-box-h input, .select-box-h select {
          width: 100%; background: var(--surface); border: 1px solid rgba(255,255,255,0.08);
          padding: 16px 16px 16px 50px; border-radius: 14px; color: var(--text); font-size: 1rem; outline: none; transition: 0.3s;
        }
        .select-box-h select { padding-left: 16px; appearance: none; font-weight: 700; }
        .select-box-h svg { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        
        .text-box-h input:focus { border-color: var(--primary); background: rgba(139, 92, 246, 0.05); }
        
        .form-utils { display: flex; justify-content: space-between; align-items: center; margin-top: -0.5rem; }
        .role-detect { font-size: 0.7rem; color: #10b981; font-weight: 700; }
        .forgot-link { background: none; border: none; color: var(--primary); font-size: 0.75rem; font-weight: 700; cursor: pointer; padding: 0; }
        .forgot-link:hover { text-decoration: underline; }

        .admin-submit-btn {
          width: 100%; padding: 18px; border-radius: 16px; border: none; background: var(--primary); color: var(--text);
          font-weight: 900; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
          gap: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3); margin-top: 0.5rem;
        }
        .admin-submit-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4); }

        .footer-meta { margin-top: 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem; }
        .shield-tag { display: inline-flex; align-items: center; gap: 8px; color: #10b981; font-weight: 800; font-size: 0.75rem; margin-bottom: 0.8rem; }
        
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @media (max-width: 1024px) { .login-visual-panel { display: none; } }
      `}</style>
    </div>
  );
};

export default AdminLogin;
