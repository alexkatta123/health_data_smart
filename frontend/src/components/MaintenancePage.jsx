import React from 'react';
import { Hammer, AlertTriangle, Clock, ShieldAlert } from 'lucide-react';

const MaintenancePage = () => {
  return (
    <div className="maintenance-page animate-fade">
      <div className="maintenance-content mo-card">
        <div className="m-icon-container">
           <Hammer size={60} className="m-icon" />
           <div className="pulse-circle"></div>
        </div>
        
        <h1 className="m-title">System Under Maintenance</h1>
        <p className="m-description">
          The SurvAP Health Intelligence Platform is currently undergoing scheduled architectural upgrades. 
          We are strengthening our state-wide surveillance infrastructure to better serve Andhra Pradesh.
        </p>

        <div className="m-info-grid">
           <div className="m-info-card">
              <Clock size={20} color="var(--primary)" />
              <div>
                 <strong>Estimated Up-time</strong>
                 <p>Within 45 minutes</p>
              </div>
           </div>
           <div className="m-info-card">
              <ShieldAlert size={20} color="#f59e0b" />
              <div>
                 <strong>Emergency Access</strong>
                 <p>Contact State Command Center</p>
              </div>
           </div>
        </div>

        <div className="m-gov-footer">
           <AlertTriangle size={16} />
           <span>Department of Health, Medical & Family Welfare | Govt. of Andhra Pradesh</span>
        </div>
      </div>

      <style>{`
        .maintenance-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--surface);
          color: var(--text);
          text-align: center;
        }

        .maintenance-content {
          max-width: 600px;
          padding: 4rem 3rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }

        .m-icon-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .m-icon {
          color: var(--primary);
          z-index: 10;
          filter: drop-shadow(0 0 20px rgba(14, 165, 233, 0.4));
          animation: m-float 4s ease-in-out infinite;
        }

        .pulse-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid var(--primary);
          border-radius: 50%;
          animation: m-pulse 3s ease-out infinite;
          opacity: 0;
        }

        @keyframes m-float {
          0%, 100% { transform: translateY(0) rotate(-10deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }

        @keyframes m-pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .m-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .m-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .m-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .m-info-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 1.25rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          text-align: left;
        }

        .m-info-card strong {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .m-info-card p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .m-gov-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #f59e0b;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;
