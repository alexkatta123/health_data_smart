import React, { useEffect, useState } from 'react';
import { ShieldCheck, LogIn, Activity, Globe, Lock as LockIcon, ArrowRight, CheckCircle2, RefreshCw, Home } from 'lucide-react';

const Logout = ({ onReturn }) => {
  const [erasing, setErasing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setErasing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="logout-gateway animate-fade">
      <div className="mesh-bg-erasure"></div>
      
      <div className="logout-card-premium">
        {erasing ? (
          <div className="erasure-sequence">
            <div className="erasure-glow"></div>
            <Activity className="erasure-icon animate-spin-slow" size={60} />
            <h2>Securely Terminating Session...</h2>
            <div className="erasure-bar">
              <div className="erasure-fill"></div>
            </div>
            <p>Purging intelligence buffers and rotating encryption keys.</p>
          </div>
        ) : (
          <div className="logout-success animate-slide-up">
            <div className="success-icon-box">
              <CheckCircle2 size={40} />
            </div>
            <h1>Session Terminated</h1>
            <p>Your local intelligence cache has been securely erased. <br /> All DPDP 2023 compliance protocols have been satisfied.</p>
            
            <div className="security-summary">
               <div className="s-row"><ShieldCheck size={14} /> <span>AES-256 Bit Encryption: Rotated</span></div>
               <div className="s-row"><LockIcon size={14} /> <span>Local Buffers: Purged</span></div>
               <div className="s-row"><Globe size={14} /> <span>Node Integrity: Verified</span></div>
            </div>

            <div className="tactical-actions">
              <button className="re-init-btn primary" onClick={onReturn}>
                Re-initialize Session <RefreshCw size={18} />
              </button>
              <button className="re-init-btn outline" onClick={() => window.location.href = '/'}>
                <Home size={18} /> Return to Portal Home
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .logout-gateway {
          min-height: 100vh;
          width: 100vw;
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          color: var(--text);
        }

        .mesh-bg-erasure {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.05) 0%, transparent 50%);
          z-index: 1;
        }

        .logout-card-premium {
          width: 100%;
          max-width: 550px;
          background: var(--surface);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 40px;
          padding: 4rem;
          text-align: center;
          position: relative;
          z-index: 10;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }

        .erasure-sequence h2 { font-size: 1.5rem; font-weight: 800; margin: 2rem 0 1rem; }
        .erasure-icon { color: #f43f5e; filter: drop-shadow(0 0 15px rgba(244, 63, 94, 0.4)); }
        .erasure-bar { width: 100%; height: 6px; background: var(--surface); border-radius: 100px; overflow: hidden; margin-bottom: 1.5rem; }
        .erasure-fill { width: 100%; height: 100%; background: #f43f5e; animation: fill-bar 2.5s ease-in-out forwards; }
        .erasure-sequence p { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }

        .success-icon-box {
          width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981; border-radius: 24px; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 2rem; box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
        }

        .logout-success h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; letter-spacing: -1px; }
        .logout-success p { color: var(--text-muted); line-height: 1.6; font-size: 1rem; margin-bottom: 2.5rem; font-weight: 600; }

        .security-summary { background: var(--surface); padding: 1.5rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.03); margin-bottom: 2.5rem; text-align: left; }
        .s-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
        .s-row:last-child { margin-bottom: 0; }
        .s-row svg { color: #10b981; }

        .tactical-actions { display: flex; flex-direction: column; gap: 15px; }

        .re-init-btn {
          width: 100%; padding: 18px; border-radius: 18px; border: none; font-weight: 900; font-size: 1rem;
          display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: all 0.3s;
        }
        .re-init-btn.primary { background: #fff; color: #000; box-shadow: 0 10px 30px rgba(255,255,255,0.1); }
        .re-init-btn.primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(255,255,255,0.2); }
        .re-init-btn.outline { background: var(--surface); border: 1px solid rgba(255,255,255,0.1); color: var(--text); }
        .re-init-btn.outline:hover { background: var(--surface); border-color: var(--text); }

        @keyframes fill-bar { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default Logout;