import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Globe, 
  TrendingUp, 
  FileText, 
  Users, 
  Network, 
  Lock, 
  Zap, 
  Activity, 
  Search,
  MapPin,
  BarChart3,
  RefreshCcw,
  Server,
  CloudLightning,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

const StrategicWorkflowFormation = () => {
  return (
    <div className="strategic-workflow-portal animate-fade">
      
      {/* Platform Branding Header */}
      <div className="wf-header">
        <div className="branding">
           <div className="b-icon"><Globe size={32} /></div>
           <div className="b-text">
              <h1>SURV-AP STRATEGIC ARCHITECTURE</h1>
              <p>Health, Medical & Family Welfare Department • Government of Andhra Pradesh</p>
           </div>
        </div>
        <div className="compliance-tag">
           <ShieldCheck size={18} />
           <span>DPDP ACT 2023 COMPLIANT • SECURE GOV-CLOUD</span>
        </div>
      </div>

      {/* 3D Layered Schematic */}
      <div className="schematic-container">
         
         {/* Layer 4: State Command (Apex) */}
         <div className="wf-layer layer-state">
            <div className="layer-tag">LEVEL 03: STATE COMMAND CENTER</div>
            <div className="layer-content">
               <div className="wf-node primary">
                  <BarChart3 size={24} />
                  <strong>Strategic Executive Dossiers</strong>
                  <small>Statewide Public Health Policy</small>
               </div>
               <div className="wf-node primary">
                  <CloudLightning size={24} />
                  <strong>IDSP Rapid Submission</strong>
                  <small>Automated National Reporting</small>
               </div>
            </div>
         </div>

         <div className="layer-connector"><ChevronRight size={32} className="rotate-90" /></div>

         {/* Layer 3: Intelligence Core (ML/NLP) */}
         <div className="wf-layer layer-intel">
            <div className="layer-tag">LEVEL 02: AI INTELLIGENCE CORE (NLP/ML)</div>
            <div className="layer-content">
               <div className="wf-node intel-node">
                  <Cpu size={24} />
                  <strong>NLP Classification Engine</strong>
                  <small>ICD-10 & SNOMED CT Mapping</small>
               </div>
               <div className="wf-node intel-node">
                  <TrendingUp size={24} />
                  <strong>Spatio-Temporal Trend Detection</strong>
                  <small>94.2% Classification Accuracy</small>
               </div>
               <div className="wf-node intel-node">
                  <RefreshCcw size={24} />
                  <strong>Learning Feedback Loop</strong>
                  <small>Continuous Officer Validation</small>
               </div>
            </div>
         </div>

         <div className="layer-connector"><ChevronRight size={32} className="rotate-90" /></div>

         {/* Layer 2: District Integration Hub */}
         <div className="wf-layer layer-district">
            <div className="layer-tag">LEVEL 01: DISTRICT INTEGRATION HUB</div>
            <div className="layer-content">
               <div className="wf-node">
                  <MapPin size={24} />
                  <strong>Regional Morbidity Matrix</strong>
                  <small>District Health Officer Portal</small>
               </div>
               <div className="wf-node">
                  <Database size={24} />
                  <strong>Data Anonymization Vault</strong>
                  <small>DPDP Compliant Scrubbing</small>
               </div>
            </div>
         </div>

         <div className="layer-connector"><ChevronRight size={32} className="rotate-90" /></div>

         {/* Layer 1: Data Acquisition (PHC/CHC) */}
         <div className="wf-layer layer-acquisition">
            <div className="layer-tag">LEVEL 00: DATA ACQUISITION (FACILITY LEVEL)</div>
            <div className="layer-content">
               <div className="source-grid">
                  <div className="source-item">
                     <Stethoscope size={18} />
                     <span>OP RECORDS (PHC)</span>
                  </div>
                  <div className="source-item">
                     <Users size={18} />
                     <span>IP RECORDS (CHC/DH)</span>
                  </div>
                  <div className="source-item">
                     <Activity size={18} />
                     <span>CLINICAL SYMPTOMS</span>
                  </div>
                  <div className="source-item">
                     <Search size={18} />
                     <span>DIAGNOSTIC NOTES</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Strategic Outcome Metrics */}
      <div className="outcome-metrics">
         <div className="om-item">
            <div className="om-icon"><Zap size={20} /></div>
            <div className="om-text">
               <strong>Improved Data Quality</strong>
               <p>Automated classification reduces manual workload and reporting latency.</p>
            </div>
         </div>
         <div className="om-item">
            <div className="om-icon"><ShieldCheck size={20} /></div>
            <div className="om-text">
               <strong>Actionable Insights</strong>
               <p>Early detection of regional risks for proactive health interventions.</p>
            </div>
         </div>
         <div className="om-item">
            <div className="om-icon"><Network size={20} /></div>
            <div className="om-text">
               <strong>Resource Optimization</strong>
               <p>Data-driven allocation of medical assets based on disease dynamics.</p>
            </div>
         </div>
      </div>

      <style>{`
        .strategic-workflow-portal {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .wf-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5rem;
          background: var(--surface);
          padding: 2.5rem 3.5rem;
          border-radius: 40px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .branding { display: flex; align-items: center; gap: 2rem; }
        .b-icon { width: 64px; height: 64px; background: var(--primary-glow); color: var(--primary); border-radius: 20px; display: flex; align-items: center; justify-content: center; }
        .b-text h1 { font-size: 2.2rem; font-weight: 900; letter-spacing: -1.5px; margin: 0 0 5px; }
        .b-text p { color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px; }

        .compliance-tag { display: flex; align-items: center; gap: 10px; background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 12px 24px; border-radius: 100px; font-size: 0.8rem; font-weight: 900; }

        .schematic-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          perspective: 1500px;
          padding-bottom: 5rem;
        }

        .wf-layer {
          width: 100%;
          max-width: 1000px;
          background: rgba(11, 18, 36, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 40px;
          padding: 3rem;
          position: relative;
          transform-style: preserve-3d;
          transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 80px rgba(0,0,0,0.4);
        }
        
        .wf-layer:hover { transform: translateZ(20px) scale(1.02); border-color: var(--primary); }

        .layer-tag { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--surface); border: 1px solid rgba(255,255,255,0.1); padding: 8px 24px; border-radius: 100px; font-size: 0.7rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; }

        .layer-content { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }

        .wf-node {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 2rem;
          width: 280px;
          text-align: center;
          transition: 0.3s;
        }
        .wf-node:hover { transform: translateY(-10px); background: var(--surface); }
        .wf-node strong { display: block; font-size: 1.1rem; font-weight: 900; color: var(--text); margin: 1.5rem 0 0.5rem; }
        .wf-node small { color: var(--text-muted); font-weight: 700; font-size: 0.85rem; line-height: 1.4; }
        .wf-node svg { color: var(--primary); }

        .intel-node { border-color: rgba(14, 165, 233, 0.2); }
        .intel-node svg { color: var(--primary); }

        .layer-state { border-top: 5px solid var(--primary); }
        .layer-intel { border-top: 5px solid #8b5cf6; }
        .layer-district { border-top: 5px solid #10b981; }
        .layer-acquisition { border-top: 5px solid #64748b; }

        .source-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; width: 100%; }
        .source-item { background: var(--surface); padding: 1.5rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .source-item span { font-size: 0.75rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; }

        .layer-connector { height: 60px; display: flex; align-items: center; justify-content: center; color: #1e293b; }
        .rotate-90 { transform: rotate(90deg); }

        .outcome-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-top: 3rem;
        }
        .om-item {
          display: flex;
          gap: 20px;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 2.5rem;
          border-radius: 32px;
          transition: 0.3s;
        }
        .om-item:hover { border-color: var(--primary); transform: translateY(-5px); }
        .om-icon { width: 48px; height: 48px; background: var(--primary-glow); color: var(--primary); border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .om-text strong { display: block; font-size: 1.2rem; font-weight: 900; color: var(--text); margin-bottom: 8px; }
        .om-text p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; font-weight: 600; }

        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default StrategicWorkflowFormation;
