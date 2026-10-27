import React, { useState } from 'react';
import { Database, User, Lock, ArrowRight, ShieldCheck, LayoutDashboard, Database as DataIcon } from 'lucide-react';

const FieldStaffLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('DataEntry');
  };

  return (
    <div className="staff-login-container animate-fade">
      <div className="login-split">
        <div className="login-visual-panel">
          <div className="visual-content">
            <div className="premium-staff-icon">
              <Database size={120} />
            </div>
            <h2 className="title-h">Operational Hub</h2>
            <p className="subtitle-h">Field Intelligence & Data Entry</p>
            <div className="data-streams"></div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="form-wrapper-h">
            <div className="staff-branding">
              <LayoutDashboard size={24} color="#f59e0b" />
              <span>SurvAP Field Operations</span>
            </div>
            
            <div className="header-box">
              <h1>Field Staff Portal</h1>
              <p>Secure authentication for Data Entry Operators and Field Health Workers.</p>
            </div>

            <form onSubmit={handleSubmit} className="premium-form">
              <div className="input-field">
                <label>OPERATOR IDENTIFIER (USER ID)</label>
                <div className="text-box-h">
                  <User size={18} />
                  <input type="text" placeholder="AP-FIELD-9921" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
              </div>

              <div className="input-field">
                <label>FIELD PASSKEY</label>
                <div className="text-box-h">
                  <Lock size={18} />
                  <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
              </div>

              <div className="form-utils">
                <label className="shortcut-check">
                  <input type="checkbox" defaultChecked />
                  <span>Launch Upload Form immediately after login</span>
                </label>
              </div>

              <button type="submit" className="staff-submit-btn">
                Launch Operational Hub <ArrowRight size={20} />
              </button>
            </form>

            <div className="footer-meta">
              <div className="shield-tag">
                <ShieldCheck size={14} /> FIELD VALIDATION ACTIVE
              </div>
              <p>© 2026 SurvAP Field Intelligence</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .staff-login-container { min-height: 100vh; background: var(--surface); overflow: hidden; }
        .login-split { display: flex; height: 100vh; }
        
        .login-visual-panel { 
          flex: 1; background: linear-gradient(135deg, #f59e0b 0%, #fff7ed 100%); 
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .visual-content { text-align: center; color: var(--text); z-index: 10; }
        .premium-staff-icon { margin-bottom: 2rem; filter: drop-shadow(0 0 30px rgba(245, 158, 11, 0.4)); animation: data-spin 10s linear infinite; }
        .title-h { font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 0.5rem; }
        .subtitle-h { font-size: 1.1rem; font-weight: 600; opacity: 0.8; }

        .login-form-panel { flex: 1; background: var(--surface); display: flex; align-items: center; justify-content: center; padding: 4rem; }
        .form-wrapper-h { width: 100%; max-width: 440px; }
        
        .staff-branding { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 0.85rem; color: #f59e0b; margin-bottom: 3rem; text-transform: uppercase; letter-spacing: 1px; }
        
        .header-box h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 1rem; color: var(--text); }
        .header-box p { color: var(--text-muted); line-height: 1.6; margin-bottom: 2.5rem; font-weight: 600; }

        .premium-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-field label { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); margin-bottom: 0.6rem; letter-spacing: 1px; }
        
        .text-box-h { position: relative; }
        .text-box-h svg { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .text-box-h input {
          width: 100%; background: var(--surface); border: 1px solid rgba(255,255,255,0.08);
          padding: 16px 16px 16px 50px; border-radius: 14px; color: var(--text); font-size: 1rem; outline: none; transition: 0.3s;
        }
        .text-box-h input:focus { border-color: #f59e0b; background: rgba(245, 158, 11, 0.05); }
        
        .form-utils { margin-top: -0.5rem; }
        .shortcut-check { display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-muted); font-size: 0.8rem; font-weight: 600; }
        .shortcut-check input { accent-color: #f59e0b; width: 16px; height: 16px; }

        .staff-submit-btn {
          width: 100%; padding: 18px; border-radius: 16px; border: none; background: #f59e0b; color: var(--text);
          font-weight: 900; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
          gap: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3); margin-top: 0.5rem;
        }
        .staff-submit-btn:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 8px 30px rgba(245, 158, 11, 0.4); }

        .footer-meta { margin-top: 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem; }
        .shield-tag { display: inline-flex; align-items: center; gap: 8px; color: #f59e0b; font-weight: 800; font-size: 0.75rem; margin-bottom: 0.8rem; }
        
        @keyframes data-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { .login-visual-panel { display: none; } }
      `}</style>
    </div>
  );
};

export default FieldStaffLogin;
