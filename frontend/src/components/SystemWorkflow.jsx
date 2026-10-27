import React from 'react';
import { 
  Cpu, Database, ShieldAlert, ArrowRight, Activity, 
  Layers, Globe, Zap, CheckCircle2, FileText, 
  Network, Search, BarChart3, Microscope
} from 'lucide-react';

const SystemWorkflow = () => {
  const aiFlow = [
    { icon: <FileText />, title: 'Data Input', desc: 'OP/IP symptoms & notes ingested' },
    { icon: <Cpu />, title: 'NLP Processing', desc: 'Symptom extraction & semantics' },
    { icon: <Microscope />, title: 'Classification', desc: 'AI-driven disease identification' },
    { icon: <Network />, title: 'Mapping', desc: 'ICD-10 & SNOMED CT integration' },
    { icon: <Database />, title: 'Storage', desc: 'Secure, anonymized vault' },
    { icon: <BarChart3 />, title: 'Visualization', desc: 'Live tactical dashboards' }
  ];

  const alertFlow = [
    { icon: <Activity />, title: 'Data Stream', desc: 'Real-time ingestion monitor' },
    { icon: <Search />, title: 'Trend Analysis', desc: 'Pattern detection engine' },
    { icon: <Layers />, title: 'Threshold Check', desc: 'Statistical anomaly trigger' },
    { icon: <ShieldAlert />, title: 'Alert Trigger', desc: 'Outbreak node mobilization' },
    { icon: <Zap />, title: 'Notification', desc: 'Push to District/State DHO' }
  ];

  return (
    <div className="workflow-vibrant-container animate-fade">
      <div className="workflow-header">
        <div className="dept-tag">Govt. of Andhra Pradesh | Surveillance Dept.</div>
        <h1>System Architecture & Operational Flows</h1>
        <p>Tactical visualization of AI intelligence and data mobilization telemetry.</p>
      </div>

      <div className="flow-section">
        <div className="section-title">
           <Cpu size={24} color="var(--primary)" />
           <h3>🧠 AI Processing Flow (NLP to Classification)</h3>
        </div>
        <div className="v-flow-line">
           {aiFlow.map((node, i) => (
             <React.Fragment key={i}>
               <div className="flow-node-premium">
                 <div className="node-icon-box">{node.icon}</div>
                 <h4>{node.title}</h4>
                 <p>{node.desc}</p>
               </div>
               {i < aiFlow.length - 1 && <div className="node-connector"><ArrowRight size={20} /></div>}
             </React.Fragment>
           ))}
        </div>
      </div>

      <div className="workflow-grid-secondary">
        <div className="flow-card-premium">
          <div className="section-title">
             <ShieldAlert size={24} color="#f43f5e" />
             <h3>🚨 Alert Detection Flow</h3>
          </div>
          <div className="vertical-flow">
             {alertFlow.map((node, i) => (
               <div key={i} className="v-node-item">
                 <div className="v-node-icon">{node.icon}</div>
                 <div className="v-node-content">
                   <strong>{node.title}</strong>
                   <span>{node.desc}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="flow-card-premium">
           <div className="section-title">
              <Globe size={24} color="#10b981" />
              <h3>🏥 Data Flow (Hospital to State Hub)</h3>
           </div>
           <div className="tactical-data-map">
              <div className="map-node">PHC / CHC Entry <small>Local Data</small></div>
              <div className="map-arrow">↓ Validation ↓</div>
              <div className="map-node secondary">District Server <small>Regional Sync</small></div>
              <div className="map-arrow">↓ Aggregation ↓</div>
              <div className="map-node primary">State Data Hub <small>Strategic Command</small></div>
              <div className="map-status">
                 <CheckCircle2 size={16} /> AI Analysis Engine Live
              </div>
           </div>
        </div>
      </div>

      <div className="end-to-end-workflow">
        <div className="section-title">
           <Layers size={24} color="#f59e0b" />
           <h3>🎯 Complete End-to-End Strategic Workflow</h3>
        </div>
        <div className="workflow-steps-p">
           {[
             { step: '01', title: 'Data Ingestion', desc: 'Manual entry or CSV upload at facility level.' },
             { step: '02', title: 'AI Synthesis', desc: 'NLP reads symptoms and maps to ICD standards.' },
             { step: '03', title: 'Trend Discovery', desc: 'ML models detect spikes and regional clusters.' },
             { step: '04', title: 'Strategic Alert', desc: 'Notifications pushed to DHO for immediate review.' },
             { step: '05', title: 'Field Action', desc: 'Officers validate cases and deploy resources.' }
           ].map((item, i) => (
             <div key={i} className="step-card-premium">
               <div className="step-num">{item.step}</div>
               <h4>{item.title}</h4>
               <p>{item.desc}</p>
             </div>
           ))}
        </div>
      </div>

      <style>{`
        .workflow-vibrant-container { padding: 3rem; color: var(--text); }
        .workflow-header { margin-bottom: 4rem; text-align: center; }
        .dept-tag { font-size: 0.8rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; }
        .workflow-header h1 { font-size: 3rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -1px; }
        .workflow-header p { color: var(--text-muted); font-size: 1.1rem; font-weight: 600; }

        .section-title { display: flex; align-items: center; gap: 12px; margin-bottom: 2.5rem; }
        .section-title h3 { font-size: 1.5rem; font-weight: 800; margin: 0; }

        .v-flow-line { display: flex; align-items: center; justify-content: space-between; background: var(--surface); padding: 3rem; border-radius: 32px; border: 1px solid rgba(255,255,255,0.05); }
        .flow-node-premium { text-align: center; width: 160px; }
        .node-icon-box { width: 60px; height: 60px; background: rgba(var(--primary-rgb), 0.1); border: 1px solid rgba(var(--primary-rgb), 0.2); border-radius: 18px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--primary); transition: 0.3s; }
        .flow-node-premium:hover .node-icon-box { transform: translateY(-5px); background: var(--primary); color: var(--text); box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.4); }
        .flow-node-premium h4 { margin-bottom: 0.5rem; font-size: 1rem; font-weight: 800; }
        .flow-node-premium p { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; font-weight: 600; }
        .node-connector { color: var(--text-muted); opacity: 0.3; }

        .workflow-grid-secondary { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-top: 3rem; }
        .flow-card-premium { background: var(--surface); padding: 3rem; border-radius: 32px; border: 1px solid rgba(255,255,255,0.05); }
        
        .vertical-flow { display: flex; flex-direction: column; gap: 1.5rem; }
        .v-node-item { display: flex; align-items: center; gap: 20px; }
        .v-node-icon { width: 44px; height: 44px; background: rgba(244, 63, 94, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.2); }
        .v-node-content strong { display: block; font-size: 1rem; margin-bottom: 2px; }
        .v-node-content span { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }

        .tactical-data-map { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .map-node { width: 100%; padding: 1.5rem; background: var(--surface); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; font-weight: 800; font-size: 1.1rem; }
        .map-node small { display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; }
        .map-node.primary { border-color: var(--primary); background: rgba(var(--primary-rgb), 0.05); color: var(--primary); }
        .map-node.secondary { border-color: #10b981; background: rgba(16, 185, 129, 0.05); color: #10b981; }
        .map-arrow { margin: 10px 0; color: var(--text-muted); font-weight: 900; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; }
        .map-status { margin-top: 2rem; display: flex; align-items: center; gap: 8px; color: #10b981; font-weight: 800; font-size: 0.85rem; }

        .end-to-end-workflow { margin-top: 4rem; }
        .workflow-steps-p { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; }
        .step-card-premium { background: var(--surface); padding: 2rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); position: relative; }
        .step-num { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 1.5rem; font-weight: 900; color: rgba(255,255,255,0.05); }
        .step-card-premium h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.8rem; color: var(--text); }
        .step-card-premium p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; font-weight: 600; }
      `}</style>
    </div>
  );
};

export default SystemWorkflow;
