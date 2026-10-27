import React from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  Activity, 
  ChevronRight, 
  Lock, 
  ArrowLeft,
  Home,
  CheckCircle2,
  RefreshCcw
} from 'lucide-react';

const LogoutPortal = ({ onReturn }) => {
  return (
    <div className="logout-portal-p animate-fade">
      <div className="logout-mesh-gradient"></div>
      
      <div className="logout-container-p">
         <div className="lc-header-p">
            <div className="lc-icon-glow"><Lock size={32} /></div>
            <h2 style={{ color: '#0f172a' }}>Session Terminated Successfully</h2>
            <p style={{ color: '#64748b' }}>Your intelligence session has been cryptographically secured and closed.</p>
         </div>

         <div className="lc-audit-box" style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div className="audit-item">
               <div className="ai-left">
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ color: '#0f172a' }}>DATA INTEGRITY VERIFIED</span>
               </div>
               <div className="ai-right" style={{ color: '#64748b' }}>SECURE</div>
            </div>
            <div className="audit-item">
               <div className="ai-left">
                  <ShieldCheck size={18} color="#10b981" />
                  <span style={{ color: '#0f172a' }}>DPDP COMPLIANCE LOGGED</span>
               </div>
               <div className="ai-right" style={{ color: '#64748b' }}>AUDITED</div>
            </div>
            <div className="audit-item">
               <div className="ai-left">
                  <RefreshCcw size={18} color="var(--primary)" />
                  <span style={{ color: '#0f172a' }}>SYSTEM CACHE PURGED</span>
               </div>
               <div className="ai-right" style={{ color: '#64748b' }}>COMPLETE</div>
            </div>
         </div>

         <div className="lc-footer-p">
            <button className="h-btn-primary" onClick={onReturn}>
               <Home size={18} /> Return to Access Portal
            </button>
            <div className="footer-note" style={{ color: '#94a3b8' }}>
               <Activity size={14} /> SurvAP Intelligence Platform • Govt of Andhra Pradesh
            </div>
         </div>
      </div>

      <style>{`
        .logout-portal-p {
          position: fixed;
          inset: 0;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .logout-mesh-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, hsla(225,100%,95%,0.8) 0, transparent 70%);
          filter: blur(100px);
        }

        .logout-container-p {
          width: 550px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(40px);
          border: 1px solid #e2e8f0;
          border-radius: 40px;
          padding: 4rem;
          text-align: center;
          position: relative;
          z-index: 10;
          box-shadow: 0 40px 100px rgba(0,0,0,0.05);
        }

        .lc-header-p { margin-bottom: 3.5rem; }
        .lc-icon-glow {
          width: 80px;
          height: 80px;
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2.5rem;
          border: 1px solid rgba(14, 165, 233, 0.2);
          box-shadow: 0 0 30px rgba(14, 165, 233, 0.1);
        }
        .lc-header-p h2 { font-size: 2rem; font-weight: 900; letter-spacing: -1px; margin: 0 0 10px; }
        .lc-header-p p { font-weight: 600; font-size: 1.1rem; line-height: 1.5; }

        .lc-audit-box {
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .audit-item { display: flex; justify-content: space-between; align-items: center; }
        .ai-left { display: flex; align-items: center; gap: 12px; font-size: 0.85rem; font-weight: 800; }
        .ai-right { font-size: 0.7rem; font-weight: 900; letter-spacing: 1px; }

        .lc-footer-p .h-btn-primary {
          width: 100%;
          padding: 1.25rem;
          border-radius: 18px;
          margin-bottom: 2rem;
          background: var(--primary);
          color: white;
          border: none;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .lc-footer-p .h-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px var(--primary-glow);
        }

        .footer-note { display: flex; align-items: center; gap: 10px; justify-content: center; font-size: 0.75rem; font-weight: 800; }
      `}</style>
    </div>
  );
};

export default LogoutPortal;
