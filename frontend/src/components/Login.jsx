import React, { useState } from 'react';
import { 
  User, Lock, Shield, ArrowRight, Hospital, 
  MapPin, Building2, ChevronDown, UserCheck, 
  ShieldCheck, ArrowLeft, Activity, Database,
  LayoutDashboard, Server
} from 'lucide-react';

const Login = ({ onLogin, initialRole }) => {
  const [selectedRole, setSelectedRole] = useState(initialRole || 'Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('Visakhapatnam');

  const roleConfigs = {
    Admin: {
      title: 'Admin Intelligence',
      subtitle: 'State & District Governance',
      icon: <Shield size={32} />,
      color: '#10B981', // Emerald Green
      desc: 'State-wide analytics, district comparisons, and policy decision tools.',
      illustration: <Server size={180} color="white" opacity={0.2} />
    },
    Hospital: {
      title: 'Clinical Gateway',
      subtitle: 'Facility Management',
      icon: <Hospital size={32} />,
      color: '#059669', // Darker Green
      desc: 'Access patient records (OP/IP), AI disease classification, and local dashboards.',
      illustration: <Building2 size={180} color="white" opacity={0.2} />
    },
    DataEntry: {
      title: 'Operational Hub',
      subtitle: 'Field Data Entry',
      icon: <Database size={32} />,
      color: '#34D399', // Lighter Green
      desc: 'Upload OP/IP data, enter symptoms, and basic validation tools.',
      illustration: <LayoutDashboard size={180} color="white" opacity={0.2} />
    }
  };

  const currentRole = roleConfigs[selectedRole];

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="login-split-view animate-fade">
      <div className="login-left" style={{ background: `linear-gradient(135deg, ${currentRole.color} 0%, var(--primary-dark) 100%)` }}>

        <div className="illustration-area">
           <div className="floating-icons">
              {currentRole.icon}
           </div>
           {currentRole.illustration}
           <div className="brand-context">
              <h2 style={{ fontSize: '3.5rem' }}>Health - Data Smart</h2>
              <p style={{ fontSize: '1.4rem' }}>Statewide AI-Based Disease Surveillance Network</p>
           </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
           <div className="role-switcher">
              {Object.keys(roleConfigs).map(role => (
                <button 
                  key={role} 
                  className={selectedRole === role ? 'active' : ''}
                  onClick={() => setSelectedRole(role)}
                  style={{ '--active-c': roleConfigs[role].color, fontSize: '1rem' }}
                >
                  {role}
                </button>
              ))}
           </div>

           <div className="form-header">
              <h1 style={{ fontSize: '3rem' }}>{currentRole.title}</h1>
              <p style={{ fontSize: '1.2rem' }}>{currentRole.desc}</p>
           </div>

           <form onSubmit={handleSubmit} className="tactical-form">
              {selectedRole === 'Admin' && (
                <div className="input-group">
                   <label style={{ fontSize: '0.9rem' }}>ASSIGNED JURISDICTION</label>
                   <div className="select-wrapper-p">
                      <select value={district} onChange={(e) => setDistrict(e.target.value)} style={{ fontSize: '1.1rem' }}>
                         <option value="State">State Command Center</option>
                         <option value="Visakhapatnam">Visakhapatnam District</option>
                         <option value="Guntur">Guntur District</option>
                         <option value="Vijayawada">Vijayawada (NTR)</option>
                      </select>
                      <ChevronDown size={18} />
                   </div>
                </div>
              )}

              <div className="input-group">
                 <label style={{ fontSize: '0.9rem' }}>OFFICIAL IDENTIFIER</label>
                 <div className="field-p">
                    <User size={22} />
                    <input 
                      type="text" 
                      placeholder="Enter username..." 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required 
                      style={{ fontSize: '1.1rem', paddingLeft: '56px' }}
                    />
                 </div>
              </div>

              <div className="input-group">
                 <label style={{ fontSize: '0.9rem' }}>SECURE PASSKEY</label>
                 <div className="field-p">
                    <Lock size={22} />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      style={{ fontSize: '1.1rem', paddingLeft: '56px' }}
                    />
                 </div>
              </div>

              <button type="submit" className="login-submit-btn" style={{ background: currentRole.color, color: "var(--text)", fontSize: '1.3rem', padding: '20px' }}>
                 Authorize Access <ArrowRight size={24} />
              </button>
           </form>

           <div className="login-meta">
              <div className="compliance-tag" style={{ fontSize: '0.9rem' }}>
                 <ShieldCheck size={18} /> DPDP 2023 SECURE
              </div>
              <p style={{ fontSize: '0.9rem' }}>© 2026 AP Health, Medical & Family Welfare Dept.</p>
           </div>
        </div>
      </div>

      <style>{`
        .login-split-view {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          background: var(--background);
          overflow: hidden;
        }

        .login-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 4rem;
          color: var(--text);
        }

        .illustration-area {
          text-align: center;
          z-index: 10;
        }

        .floating-icons {
          margin-bottom: 2rem;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .brand-context h2 { font-weight: 900; margin-bottom: 0.5rem; }
        .brand-context p { opacity: 0.9; font-weight: 700; }

        .login-right {
          flex: 1;
          background: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
        }

        .login-form-container { width: 100%; max-width: 500px; }

        .role-switcher {
          display: flex;
          background: var(--surface-light);
          padding: 8px;
          border-radius: 16px;
          border: 1px solid var(--border);
          margin-bottom: 3.5rem;
        }

        .role-switcher button {
          flex: 1;
          padding: 14px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 800;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .role-switcher button.active {
          background: var(--active-c);
          color: var(--text);
          box-shadow: 0 8px 20px var(--primary-glow);
        }

        .form-header h1 { font-weight: 900; margin-bottom: 1rem; letter-spacing: -1px; color: var(--text); }
        .form-header p { color: var(--text-muted); line-height: 1.6; margin-bottom: 3rem; font-weight: 600; }

        .tactical-form { display: flex; flex-direction: column; gap: 2rem; }
        
        .input-group label {
          display: block; font-weight: 800; color: var(--text-muted);
          margin-bottom: 1rem; letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .field-p { position: relative; }
        .field-p svg { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .field-p input {
          width: 100%; background: var(--surface-light); border: 1px solid var(--border);
          padding: 18px 18px 18px 60px; border-radius: 16px; color: var(--text); outline: none;
          transition: all 0.3s;
          font-weight: 600;
        }
        .field-p input:focus { border-color: var(--primary); background: var(--surface); box-shadow: 0 0 0 4px var(--primary-glow); }

        .select-wrapper-p { position: relative; }
        .select-wrapper-p select {
          width: 100%; background: var(--surface-light); border: 1px solid var(--border);
          padding: 18px; border-radius: 16px; color: var(--text); appearance: none; outline: none; font-weight: 700;
        }
        .select-wrapper-p svg { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }

        .login-submit-btn {
          width: 100%; border-radius: 18px; border: none; color: var(--text);
          font-weight: 900; display: flex; align-items: center; justify-content: center;
          gap: 14px; cursor: pointer; transition: var(--transition); margin-top: 1.5rem;
          box-shadow: 0 10px 30px var(--primary-glow);
        }
        .login-submit-btn:hover { transform: translateY(-3px); filter: brightness(1.1); box-shadow: 0 15px 40px var(--primary-glow); }

        .login-meta {
          margin-top: 4rem; text-align: center; border-top: 1px solid var(--border); padding-top: 2rem;
        }
        .compliance-tag {
          display: inline-flex; align-items: center; gap: 10px; background: var(--primary-glow);
          color: var(--primary); padding: 8px 20px; border-radius: 100px; font-weight: 800;
          margin-bottom: 1.5rem; border: 1px solid var(--border);
        }
        .login-meta p { color: var(--text-muted); font-weight: 700; }

        @media (max-width: 1024px) {
          .login-left { display: none; }
          .login-right { flex: 1; }
        }
      `}</style>
    </div>
  );
};

export default Login;
