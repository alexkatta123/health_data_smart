import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  User, 
  Hospital, 
  Globe, 
  ChevronRight, 
  Lock, 
  Command,
  ArrowRight,
  Zap,
  LayoutDashboard
} from 'lucide-react';

const UnifiedLogin = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const roles = [
    { id: 'Admin', title: 'State Administrator', desc: 'Full-spectrum surveillance & policy control', icon: <Globe size={24} />, color: '#8b5cf6' },
    { id: 'Hospital', title: 'Medical Officer', desc: 'Clinical review & anomaly validation', icon: <Hospital size={24} />, color: '#10b981' },
    { id: 'DataEntry', title: 'Field Staff / PHC', desc: 'Rapid data acquisition & facility ops', icon: <Activity size={24} />, color: '#0ea5e9' }
  ];

  const handleAuth = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      onLogin(selectedRole.id);
    }, 2000);
  };

  return (
    <div className="unified-login-portal">
      <div className="login-mesh-gradient"></div>
      
      <div className="login-container">
        {/* Left Side: Strategic Branding */}
        <div className="login-branding">
           <div className="brand-apex">
              <div className="apex-logo"><Command size={32} /></div>
              <div className="apex-text">
                 <h1>SURV-AP</h1>
                 <span>Health Intelligence Platform</span>
              </div>
           </div>
           
           <div className="branding-content">
              <div className="bc-item">
                 <div className="bc-icon"><Zap size={20} /></div>
                 <div className="bc-text">
                    <strong>AI-Enabled Surveillance</strong>
                    <p>Statewide automation of disease classification and trend prediction.</p>
                 </div>
              </div>
              <div className="bc-item">
                 <div className="bc-icon"><ShieldCheck size={20} /></div>
                 <div className="bc-text">
                    <strong>DPDP 2023 Compliant</strong>
                    <p>Securing patient data with government-approved anonymization.</p>
                 </div>
              </div>
           </div>

           <div className="branding-footer">
              <p>© 2026 Health, Medical & Family Welfare Department</p>
              <small>Government of Andhra Pradesh</small>
           </div>
        </div>

        {/* Right Side: Auth Core */}
        <div className="login-auth-core">
           {!selectedRole ? (
             <div className="role-selection animate-fade">
                <h2 className="auth-title">Select Intelligence Tier</h2>
                <p className="auth-subtitle">Authorized personnel only. Choose your command tier to proceed.</p>
                
                <div className="role-grid">
                   {roles.map(role => (
                     <div 
                        key={role.id} 
                        className="role-card-p" 
                        onClick={() => setSelectedRole(role)}
                        style={{ '--accent': role.color }}
                     >
                        <div className="rc-icon">{role.icon}</div>
                        <div className="rc-text">
                           <strong>{role.title}</strong>
                           <p>{role.desc}</p>
                        </div>
                        <ChevronRight className="rc-arrow" size={18} />
                     </div>
                   ))}
                </div>
             </div>
           ) : (
             <form className="auth-form animate-slide-in" onSubmit={handleAuth}>
                <button className="back-to-roles" onClick={() => setSelectedRole(null)}>
                   <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Selection
                </button>
                
                <div className="selected-role-display">
                   <div className="srd-icon" style={{ background: selectedRole.color }}>{selectedRole.icon}</div>
                   <div className="srd-text">
                      <h3>{selectedRole.title}</h3>
                      <span>Tier {selectedRole.id === 'Admin' ? '03' : selectedRole.id === 'Hospital' ? '02' : '01'} Access</span>
                   </div>
                </div>

                <div className="form-group">
                   <label>CREDENTIAL ID</label>
                   <div className="input-p">
                      <User size={18} />
                      <input type="text" placeholder="AP-HLTH-XXXXX" required />
                   </div>
                </div>

                <div className="form-group">
                   <label>SECURITY PASSPHRASE</label>
                   <div className="input-p">
                      <Lock size={18} />
                      <input type="password" placeholder="••••••••" required />
                   </div>
                </div>

                <button 
                  className={`login-submit-btn ${isAuthenticating ? 'loading' : ''}`}
                  disabled={isAuthenticating}
                >
                   {isAuthenticating ? 'INITIALIZING COMMAND...' : 'AUTHENTICATE & ENTER'}
                   {!isAuthenticating && <LayoutDashboard size={18} />}
                </button>

                <p className="auth-security-note">
                   <ShieldCheck size={14} /> Secure session governed by National Informatics Center protocols.
                </p>
             </form>
           )}
        </div>
      </div>

      <style>{`
        .unified-login-portal {
          position: fixed;
          inset: 0;
          background: var(--background);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .login-mesh-gradient {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(at 0% 0%, hsla(210, 100%, 95%, 1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(180, 100%, 90%, 1) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(280, 100%, 90%, 1) 0, transparent 50%);
          opacity: 0.8;
          filter: blur(120px);
        }

        .login-container {
          width: 1200px;
          height: 750px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 48px;
          display: grid;
          grid-template-columns: 450px 1fr;
          overflow: hidden;
          position: relative;
          z-index: 10;
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.08);
        }

        .login-branding {
          background: rgba(255, 255, 255, 0.6);
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .brand-apex { display: flex; align-items: center; gap: 15px; }
        .apex-logo { width: 48px; height: 48px; background: var(--primary); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--text); box-shadow: 0 0 20px rgba(14, 165, 233, 0.4); }
        .apex-text h1 { font-size: 1.8rem; font-weight: 900; letter-spacing: -1px; margin: 0; color: var(--text); }
        .apex-text span { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; }

        .branding-content { display: flex; flex-direction: column; gap: 2rem; }
        .bc-item { display: flex; gap: 15px; }
        .bc-icon { width: 40px; height: 40px; border-radius: 12px; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--text-muted); border: 1px solid rgba(255,255,255,0.05); }
        .bc-text strong { display: block; color: var(--text); font-size: 0.95rem; margin-bottom: 4px; }
        .bc-text p { color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; font-weight: 600; }

        .branding-footer p { font-size: 0.85rem; font-weight: 800; color: var(--text-muted); margin: 0; }
        .branding-footer small { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); opacity: 0.6; }

        .login-auth-core { padding: 4rem 6rem; position: relative; }
        
        .auth-title { font-size: 2.2rem; font-weight: 900; letter-spacing: -1.5px; margin: 0 0 10px; color: var(--text); }
        .auth-subtitle { color: var(--text-muted); font-weight: 600; margin-bottom: 3rem; font-size: 1.1rem; }

        .role-grid { display: flex; flex-direction: column; gap: 1.25rem; }
        .role-card-p {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.05);
          padding: 1.5rem 2rem;
          border-radius: 24px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          cursor: pointer;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }
        .role-card-p:hover { background: var(--surface); border-color: var(--accent); transform: translateX(10px); }
        .rc-icon { width: 50px; height: 50px; border-radius: 14px; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--accent); }
        .rc-text strong { display: block; color: var(--text); font-size: 1.1rem; margin-bottom: 4px; }
        .rc-text p { color: var(--text-muted); font-size: 0.85rem; font-weight: 600; }
        .rc-arrow { color: var(--text-muted); margin-left: auto; transition: 0.3s; }
        .role-card-p:hover .rc-arrow { color: var(--accent); transform: translateX(5px); }

        .back-to-roles { background: transparent; border: none; color: var(--text-muted); font-weight: 800; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 3rem; padding: 0; }
        .back-to-roles:hover { color: var(--text); }

        .selected-role-display { display: flex; align-items: center; gap: 20px; margin-bottom: 3.5rem; }
        .srd-icon { width: 64px; height: 64px; border-radius: 18px; display: flex; align-items: center; justify-content: center; color: var(--text); }
        .srd-text h3 { font-size: 1.5rem; font-weight: 900; margin: 0; color: var(--text); }
        .srd-text span { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; }

        .form-group { margin-bottom: 2rem; }
        .form-group label { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 12px; }
        .input-p {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-muted);
          transition: 0.3s;
        }
        .input-p:focus-within { border-color: var(--primary); background: var(--surface); color: var(--primary); }
        .input-p input { background: transparent; border: none; color: var(--text); font-size: 1rem; width: 100%; outline: none; font-weight: 600; }

        .login-submit-btn {
          width: 100%;
          padding: 1.25rem;
          background: var(--primary);
          color: var(--text);
          border: none;
          border-radius: 18px;
          font-weight: 900;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 10px 40px rgba(14, 165, 233, 0.3);
          margin-top: 1rem;
        }
        .login-submit-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 50px rgba(14, 165, 233, 0.4); }
        .login-submit-btn.loading { opacity: 0.8; cursor: wait; }

        .auth-security-note { display: flex; align-items: center; gap: 10px; justify-content: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; }

        @keyframes slideIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-in { animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
};

export default UnifiedLogin;
