import React from 'react';
import { 
  Database, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Search, 
  Zap, 
  FileText, 
  Users, 
  Activity, 
  Server,
  CloudLightning,
  ChevronRight,
  Target
} from 'lucide-react';

const PlatformFlowchart = () => {
  return (
    <div className="platform-flowchart-portal animate-fade">
      <div className="flowchart-header">
         <div className="fh-icon"><Cpu size={32} /></div>
         <div>
            <h1>Platform Operational Blueprint</h1>
            <p>End-to-end tactical intelligence flow for statewide surveillance.</p>
         </div>
      </div>

      <div className="flowchart-visual">
         <svg width="100%" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Connection Lines (Animated) */}
            <path className="flow-path" d="M150 400 H350" stroke="var(--primary)" strokeWidth="2" strokeDasharray="10 10" />
            <path className="flow-path" d="M550 400 H750" stroke="var(--primary)" strokeWidth="2" strokeDasharray="10 10" />
            <path className="flow-path" d="M950 400 H1100" stroke="var(--primary)" strokeWidth="2" strokeDasharray="10 10" />
            
            {/* Branching to State Command */}
            <path className="flow-path" d="M850 350 V200 H1000" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="10 10" />
            
            {/* Node 1: PHC/CHC Data */}
            <g transform="translate(50, 320)">
               <rect width="200" height="160" rx="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
               <foreignObject width="200" height="160">
                  <div className="flow-node-content">
                     <Database size={32} color="#64748b" />
                     <strong>Clinical Source</strong>
                     <p>OP/IP Records • Diagnosis Notes</p>
                  </div>
               </foreignObject>
            </g>

            {/* Node 2: AI Core */}
            <g transform="translate(350, 320)">
               <rect width="250" height="160" rx="32" fill="rgba(14, 165, 233, 0.05)" stroke="var(--primary)" />
               <foreignObject width="250" height="160">
                  <div className="flow-node-content active">
                     <Cpu size={40} color="var(--primary)" />
                     <strong>AI INTELLIGENCE CORE</strong>
                     <p>NLP Classification • Trend Prediction</p>
                  </div>
               </foreignObject>
            </g>

            {/* Node 3: District Hub */}
            <g transform="translate(700, 320)">
               <rect width="250" height="160" rx="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
               <foreignObject width="250" height="160">
                  <div className="flow-node-content">
                     <Globe size={32} color="#10b981" />
                     <strong>Regional Hub</strong>
                     <p>Morbidity Matrix • Validation</p>
                  </div>
               </foreignObject>
            </g>

            {/* Node 4: State Command */}
            <g transform="translate(950, 120)">
               <rect width="200" height="160" rx="24" fill="rgba(139, 92, 246, 0.05)" stroke="#8b5cf6" />
               <foreignObject width="200" height="160">
                  <div className="flow-node-content">
                     <Target size={32} color="#8b5cf6" />
                     <strong>State Command</strong>
                     <p>Policy Dashboards • IDSP Sync</p>
                  </div>
               </foreignObject>
            </g>

            {/* Node 5: Real-time Response */}
            <g transform="translate(1000, 320)">
               <rect width="180" height="160" rx="24" fill="rgba(244, 63, 94, 0.05)" stroke="#f43f5e" />
               <foreignObject width="180" height="160">
                  <div className="flow-node-content">
                     <Zap size={32} color="#f43f5e" />
                     <strong>Rapid Intervene</strong>
                     <p>Field Mobilization • Alerts</p>
                  </div>
               </foreignObject>
            </g>
         </svg>
      </div>

      <div className="flow-legend-p">
         <div className="fl-item"><ShieldCheck size={16} /> DPDP 2023 ANONYMIZATION APPLIED AT EVERY NODE</div>
         <div className="fl-item"><Activity size={16} /> LIVE DATA FLOW FROM 26 DISTRICTS</div>
      </div>

      <style>{`
        .platform-flowchart-portal {
          padding: 3rem;
          background: var(--surface);
          border-radius: 40px;
          border: 1px solid rgba(255,255,255,0.05);
          margin-top: 2rem;
        }

        .flowchart-header { display: flex; align-items: center; gap: 25px; margin-bottom: 4rem; }
        .fh-icon { width: 64px; height: 64px; background: var(--primary-glow); color: var(--primary); border-radius: 20px; display: flex; align-items: center; justify-content: center; }
        .fh-icon h1 { font-size: 2.2rem; font-weight: 900; margin: 0; color: var(--text); letter-spacing: -1.5px; }
        .fh-icon p { color: var(--text-muted); font-weight: 600; font-size: 1.1rem; }

        .flowchart-visual { width: 100%; display: flex; justify-content: center; }
        
        .flow-node-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
        }
        .flow-node-content strong { display: block; color: var(--text); font-size: 1.1rem; margin: 15px 0 5px; text-transform: uppercase; letter-spacing: 1px; }
        .flow-node-content p { color: var(--text-muted); font-size: 0.8rem; font-weight: 700; margin: 0; }
        .flow-node-content.active strong { color: var(--primary); }

        .flow-path {
          stroke-dashoffset: 100;
          animation: flowDash 5s linear infinite;
        }

        @keyframes flowDash {
          to { stroke-dashoffset: 0; }
        }

        .flow-legend-p {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 4rem;
          padding: 2rem;
          background: var(--surface);
          border-radius: 24px;
        }
        .fl-item { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; }
      `}</style>
    </div>
  );
};

export default PlatformFlowchart;
