import React from 'react';
import ClassificationForm from './ClassificationForm';
import { ClipboardList, ShieldCheck, Zap, Info } from 'lucide-react';

const PatientIntake = () => {
  return (
    <div className="patient-intake-page animate-fade">
      <div className="mesh-gradient-intake"></div>
      
      <div className="intake-container">
        <header className="page-header">
          <div className="header-icon">
            <ClipboardList size={32} />
          </div>
          <div>
            <h1>Statewide Patient Intake</h1>
            <p>Direct entry portal for clinical data processing and AI disease classification.</p>
          </div>
        </header>

        <div className="intake-grid">
          <div className="intake-main">
            <ClassificationForm />
          </div>

          <div className="intake-sidebar">
            <div className="info-card">
              <h3><Zap size={20} color="var(--primary)" /> Real-time NLP</h3>
              <p>The system automatically extracts symptoms and clinical entities from your notes to map them to ICD-10 codes.</p>
            </div>

            <div className="info-card">
              <h3><ShieldCheck size={20} color="#10b981" /> Data Security</h3>
              <p>All patient data is encrypted and anonymized according to DPDP protocols before being sent to the AI cluster.</p>
            </div>

            <div className="guide-card">
              <h3><Info size={20} color="var(--secondary)" /> Quick Guide</h3>
              <ul>
                <li>Enter age and gender precisely.</li>
                <li>Be descriptive in the symptoms field.</li>
                <li>Include clinical observations in notes.</li>
                <li>Verify AI results after submission.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .patient-intake-page {
          padding: 2rem;
          min-height: 100vh;
          position: relative;
        }

        .mesh-gradient-intake {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.03) 0%, transparent 40%),
                      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.03) 0%, transparent 40%);
          z-index: -1;
          pointer-events: none;
        }

        .intake-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 3rem;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .page-header h1 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .page-header p {
          color: var(--text-muted);
          font-weight: 500;
        }

        .intake-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
        }

        .intake-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card, .guide-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 1.5rem;
          border-radius: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .info-card h3, .guide-card h3 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          margin-bottom: 12px;
        }

        .info-card p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .guide-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guide-card li {
          font-size: 0.85rem;
          color: var(--text-muted);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .guide-card li::before {
          content: "•";
          color: var(--primary);
          font-weight: bold;
        }

        .guide-card li:last-child {
          border-bottom: none;
        }

        @media (max-width: 1024px) {
          .intake-grid {
            grid-template-columns: 1fr;
          }
          .intake-sidebar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default PatientIntake;
