import React from 'react';
import { FileText, Download, Share2, Award, ChevronRight, CheckCircle2, FileCheck } from 'lucide-react';

const StateExecutiveReports = () => {
  const dossiers = [
    { title: 'Andhra Pradesh Health Intelligence Dossier', quarter: 'Q1 2026', status: 'Ready', verified: true },
    { title: 'AI Surveillance Impact Assessment', quarter: 'Q4 2025', status: 'Archived', verified: true },
    { title: 'Statewide Epidemic Preparedness Index', quarter: 'Q2 2026', status: 'Draft', verified: false }
  ];

  return (
    <div className="state-reports animate-fade">
      <div className="mo-card">
         <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
               <div style={{ background: 'var(--primary)', width: 52, height: 52, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--text)", boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)' }}>
                  <Award size={28} />
               </div>
               <div>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Executive Intelligence Hub</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>High-fidelity strategic summaries for the Department of Health.</p>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
               <button className="mo-button-outline">Archive</button>
               <button className="mo-button-primary">Request New Insight</button>
            </div>
         </div>
         
         <div className="reports-table-header" style={{ display: 'flex', padding: '0 1.5rem', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '2px' }}>
            <div style={{ flex: 1 }}>DOSSIER IDENTITY</div>
            <div style={{ width: '150px', textAlign: 'center' }}>ACTION</div>
         </div>

         <div className="reports-list">
            {dossiers.map((d, i) => (
              <div key={i} className="dossier-row animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', color: 'var(--primary)', width: 64, height: 64, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                       <FileText size={32} opacity={0.6} />
                    </div>
                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '1px' }}>{d.quarter}</span>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border)' }}></div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: d.status === 'Ready' ? '#10b981' : 'var(--text-muted)' }}>{d.status.toUpperCase()}</span>
                       </div>
                       <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{d.title}</h4>
                    </div>
                 </div>
                 
                 <div style={{ display: 'flex', gap: '12px', width: '150px', justifyContent: 'center' }}>
                    <div className="tactical-icon-btn" title="Verified Protocol">
                       <CheckCircle2 size={20} color={d.verified ? '#10b981' : 'var(--text-muted)'} />
                    </div>
                    <div className="tactical-icon-btn" title="View Executive Summary">
                       <FileText size={20} color="var(--primary)" />
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; padding: 3rem; }
        
        .dossier-row { 
          background: var(--surface); 
          padding: 1.5rem; 
          border-radius: 24px; 
          border: 1px solid var(--border); 
          marginBottom: 1.5rem; 
          display: flex; 
          align-items: center; 
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .dossier-row:hover {
          background: var(--surface);
          border-color: var(--primary);
          transform: translateX(10px);
        }

        .tactical-icon-btn {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tactical-icon-btn:hover {
          background: var(--surface);
          border-color: var(--text-muted);
        }

        .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 12px 28px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .mo-button-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(14, 165, 233, 0.3); }

        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 12px 28px; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .mo-button-outline:hover { background: var(--surface); border-color: var(--text-muted); }

        .action-btn-h { 
          padding: 12px 24px; 
          border-radius: 14px; 
          background: var(--primary); 
          border: none; 
          color: var(--text); 
          font-weight: 800; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          cursor: pointer;
          font-size: 0.85rem;
          margin-left: 10px;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      ` }} />
    </div>
  );
};

export default StateExecutiveReports;
