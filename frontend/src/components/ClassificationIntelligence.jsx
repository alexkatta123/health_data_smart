import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Map, 
  Activity, 
  Database, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  PieChart,
  Target,
  RefreshCcw,
  Globe,
  Share2,
  ChevronRight
} from 'lucide-react';

const ClassificationIntelligence = () => {
  const [pipelineStep, setPipelineStep] = useState(0);
  
  const pipelineSteps = [
    { id: 1, label: "DATA ACQUISITION", icon: <Database size={20} />, status: "Completed" },
    { id: 2, label: "AI CLASSIFICATION", icon: <Cpu size={20} />, status: "Active" },
    { id: 3, label: "ACCURACY VALIDATION", icon: <Target size={20} />, status: "Pending" },
    { id: 4, label: "STATE INTEGRATION", icon: <Globe size={20} />, status: "Pending" }
  ];

  const districtReports = [
    { district: "Visakhapatnam", accuracy: "96.4%", trend: "Critical Surge", status: "Action Required", reports: 240 },
    { district: "Tirupati", accuracy: "94.8%", trend: "Cluster Stable", status: "Monitoring", reports: 185 },
    { district: "Nellore", accuracy: "93.1%", trend: "Emerging Risk", status: "Priority 2", reports: 112 }
  ];

  return (
    <div className="intel-workflow-portal animate-fade">
      
      {/* Strategic Intelligence Header */}
      <div className="intel-header-p">
        <div className="ih-left">
           <div className="ih-icon-glow"><Zap size={32} /></div>
           <div>
              <h1>Classification Intelligence Engine</h1>
              <p>Automated disease trend reports with authoritative 90%+ classification accuracy.</p>
           </div>
        </div>
        <div className="ih-right">
           <div className="accuracy-gauge-p">
              <div className="gauge-text">
                 <small>GLOBAL ACCURACY</small>
                 <strong>94.2%</strong>
              </div>
              <div className="gauge-sub">VALIDATED DATA</div>
           </div>
        </div>
      </div>

      {/* Visual Workflow Pipeline */}
      <div className="workflow-pipeline-p">
         {pipelineSteps.map((step, i) => (
           <React.Fragment key={step.id}>
             <div className={`pipeline-node-p ${step.status.toLowerCase()}`}>
                <div className="node-icon-p">{step.icon}</div>
                <div className="node-text-p">
                   <small>STEP 0{step.id}</small>
                   <strong>{step.label}</strong>
                   <span className="node-status-p">{step.status}</span>
                </div>
             </div>
             {i < pipelineSteps.length - 1 && <div className="pipeline-connector-p"><ChevronRight size={24} /></div>}
           </React.Fragment>
         ))}
      </div>

      <div className="intel-content-grid">
        
        {/* Hospital Level Reports */}
        <div className="intel-main-column">
           <div className="section-header-p">
              <h3 className="section-title-p">ACTIONABLE HOSPITAL REPORTS</h3>
              <button className="tactical-btn-p"><RefreshCcw size={16} /> Refresh Feed</button>
           </div>

           <div className="report-feed-p">
              {[
                { hospital: "GGH Visakhapatnam", category: "Respiratory", impact: "High", action: "Deploy RRT Unit 4", color: "#f43f5e" },
                { hospital: "Apollo Health City", category: "Enteric", impact: "Medium", action: "Initiate Water Audit", color: "#f59e0b" },
                { hospital: "Seven Hills", category: "Viral", impact: "Critical", action: "Activate Level 2 Protocol", color: "#f43f5e" }
              ].map((r, i) => (
                <div key={i} className="action-report-card-p animate-slide-up" style={{ '--accent': r.color }}>
                   <div className="arc-header-p">
                      <div className="arc-title-p">
                         <strong>{r.hospital}</strong>
                         <span>{r.category} Intelligence</span>
                      </div>
                      <div className="arc-impact-badge" style={{ background: `${r.color}15`, color: r.color }}>{r.impact.toUpperCase()} IMPACT</div>
                   </div>
                   <div className="arc-body-p">
                      <p>Automated classification identifies a localized cluster. Diagnostic certainty: 92.8%.</p>
                      <div className="arc-action-row">
                         <div className="arc-action-box">
                            <small>RECOMMENDED ACTION</small>
                            <strong>{r.action}</strong>
                         </div>
                         <button className="arc-execute-btn">EXECUTE ACTION <ArrowRight size={16} /></button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* District Level Analytics */}
        <div className="intel-sidebar-column">
           <div className="mo-card-p classification-stats-p">
              <h3 className="sidebar-label-p">DISTRICT VALIDATION MATRIX</h3>
              <div className="dist-list-p">
                 {districtReports.map((d, i) => (
                   <div key={i} className="dist-item-p">
                      <div className="di-left">
                         <strong>{d.district}</strong>
                         <small>{d.reports} SYNDROMIC REPORTS</small>
                      </div>
                      <div className="di-right">
                         <div className="accuracy-pill-p">
                            <Target size={12} /> {d.accuracy}
                         </div>
                         <div className={`trend-pill-p ${d.trend.toLowerCase().replace(' ', '-')}`}>{d.trend}</div>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="full-matrix-btn">
                 <FileText size={18} /> View Comprehensive Matrix
              </button>
           </div>

           <div className="mo-card-p state-integration-p">
              <div className="si-header-p">
                 <Share2 size={24} color="var(--primary)" />
                 <h3>State Dashboard Sync</h3>
              </div>
              <p>Seamless real-time integration with the Andhra Pradesh Health Surveillance Command Center.</p>
              <div className="sync-status-p">
                 <div className="sync-dot animate-pulse"></div>
                 UPSTREAM CONNECTION SECURE
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .intel-workflow-portal {
          padding: 1rem 0;
        }

        .intel-header-p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 32px;
          padding: 2.5rem;
          margin-bottom: 3rem;
        }

        .ih-left { display: flex; align-items: center; gap: 2rem; }
        .ih-icon-glow {
          width: 64px;
          height: 64px;
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(14, 165, 233, 0.2);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.2);
        }
        .ih-left h1 { font-size: 2rem; font-weight: 900; letter-spacing: -1px; margin: 0 0 5px; }
        .ih-left p { color: var(--text-muted); font-weight: 600; font-size: 1rem; }

        .accuracy-gauge-p {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 1.5rem 2.5rem;
          border-radius: 24px;
          text-align: center;
          box-shadow: var(--card-shadow);
        }
        .gauge-text small { display: block; font-size: 0.8rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; }
        .gauge-text strong { font-size: 2.5rem; font-weight: 900; color: #40916C; }
        .gauge-sub { font-size: 0.8rem; font-weight: 900; color: var(--text-muted); margin-top: 6px; }

        .workflow-pipeline-p {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4rem;
          padding: 0 2rem;
        }
        .pipeline-node-p {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 1.5rem;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          flex: 1;
        }
        .pipeline-node-p.completed { border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        .pipeline-node-p.active { border-color: var(--primary); background: rgba(14, 165, 233, 0.05); box-shadow: 0 0 20px rgba(14, 165, 233, 0.1); }
        
        .node-icon-p { width: 44px; height: 44px; border-radius: 12px; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }
        .completed .node-icon-p { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .active .node-icon-p { background: rgba(14, 165, 233, 0.1); color: var(--primary); }
        
        .node-text-p small { display: block; font-size: 0.6rem; font-weight: 900; color: var(--text-muted); }
        .node-text-p strong { display: block; font-size: 0.85rem; font-weight: 900; margin: 2px 0; }
        .node-status-p { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: var(--text-muted); }
        .completed .node-status-p { color: #10b981; }
        .active .node-status-p { color: var(--primary); }

        .pipeline-connector-p { color: #1e293b; }

        .intel-content-grid { display: grid; grid-template-columns: 1fr 400px; gap: 2.5rem; }
        
        .section-header-p { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .section-title-p { font-size: 0.9rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin: 0; }
        .tactical-btn-p { background: var(--surface); border: 1px solid rgba(255,255,255,0.1); color: var(--text); padding: 8px 16px; border-radius: 10px; font-size: 0.75rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .report-feed-p { display: flex; flex-direction: column; gap: 1.5rem; }
        .action-report-card-p {
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 6px solid var(--accent);
          border-radius: 28px;
          padding: 2rem;
          transition: 0.3s;
        }
        .action-report-card-p:hover { transform: translateX(8px); border-color: var(--accent); }
        
        .arc-header-p { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .arc-title-p strong { display: block; font-size: 1.5rem; font-weight: 900; color: var(--text); }
        .arc-title-p span { font-size: 1rem; color: var(--text-muted); font-weight: 600; }
        .arc-impact-badge { padding: 6px 16px; border-radius: 100px; font-size: 0.8rem; font-weight: 900; letter-spacing: 1px; }

        .arc-body-p p { color: var(--text-muted); font-weight: 600; line-height: 1.6; margin-bottom: 2rem; font-size: 1.1rem; }
        .arc-action-row { display: flex; justify-content: space-between; align-items: center; background: var(--surface-light); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); }
        .arc-action-box small { display: block; font-size: 0.75rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; margin-bottom: 6px; }
        .arc-action-box strong { font-size: 1.1rem; font-weight: 900; color: #40916C; }
        .arc-execute-btn { background: var(--primary); color: var(--text); border: none; padding: 14px 24px; border-radius: 14px; font-weight: 900; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 20px var(--primary-glow); }

        .mo-card-p { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; padding: 2.5rem; margin-bottom: 2rem; }
        .sidebar-label-p { font-size: 0.75rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 2rem; }
        
        .dist-list-p { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; }
        .dist-item-p { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.02); padding-bottom: 1rem; }
        .di-left strong { display: block; font-size: 1rem; }
        .di-left small { font-size: 0.7rem; color: var(--text-muted); font-weight: 900; letter-spacing: 0.5px; }
        
        .di-right { text-align: right; }
        .accuracy-pill-p { font-size: 0.8rem; font-weight: 900; color: #10b981; display: flex; align-items: center; gap: 4px; justify-content: flex-end; margin-bottom: 5px; }
        .trend-pill-p { font-size: 0.65rem; font-weight: 900; padding: 3px 8px; border-radius: 6px; }
        .trend-pill-p.critical-surge { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .trend-pill-p.cluster-stable { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .trend-pill-p.emerging-risk { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .full-matrix-btn { width: 100%; padding: 18px; border-radius: 18px; background: var(--surface-light); border: 1px solid var(--border); color: var(--text); font-weight: 900; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: var(--transition); }
        .full-matrix-btn:hover { background: var(--primary); color: var(--text); transform: translateY(-3px); }

        .si-header-p { display: flex; align-items: center; gap: 15px; margin-bottom: 1.5rem; }
        .si-header-p h3 { margin: 0; font-size: 1.6rem; font-weight: 900; color: var(--text); }
        .state-integration-p p { font-size: 1.1rem; color: var(--text-muted); font-weight: 600; line-height: 1.6; margin-bottom: 2.5rem; }
        .sync-status-p { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; font-weight: 900; color: #40916C; background: rgba(64, 145, 108, 0.05); padding: 14px 28px; border-radius: 100px; border: 1px solid rgba(64, 145, 108, 0.1); }
        .sync-dot { width: 10px; height: 10px; background: #40916C; border-radius: 50%; box-shadow: 0 0 10px #40916C; }

        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ClassificationIntelligence;
