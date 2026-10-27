import React, { useState } from 'react';
import { Layers, Globe, Shield, Activity, Database, Cpu, Share2, Server, Terminal, Lock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

const GlobalArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const architectureLayers = [
    {
      id: 'intelligence',
      title: 'Intelligence & Strategy Layer',
      subtitle: 'AI-6 Neural Core',
      icon: <Cpu size={32} />,
      color: '#8b5cf6',
      desc: 'The cognitive core of SurvAP, housing AI-6 models for disease classification, trend prediction, and strategic epidemiological forecasting.',
      components: ['Neural Outbreak Predictor', 'Automated SNOMED/ICD Classifier', 'Statewide Morbidity Matrix', 'Executive Strategy Engine']
    },
    {
      id: 'command',
      title: 'Command & Control Layer',
      subtitle: 'Administrative Hub',
      icon: <Globe size={32} />,
      color: '#0ea5e9',
      desc: 'Orchestrates regional health governance via 26 District Nodes and the Central State Command Center.',
      components: ['Central Command Deck', 'District Intelligence Hubs', 'Stakeholder Authorization API', 'Emergency Response Mobilizer']
    },
    {
      id: 'clinical',
      title: 'Clinical Data Layer',
      subtitle: 'Statewide Health Feed',
      icon: <Activity size={32} />,
      color: '#10b981',
      desc: 'The foundation of real-time data ingestion, processing streams from 1,145 PHCs and 192 CHCs.',
      components: ['Universal Patient EMR', 'Regional Lab Connectivity', 'Hospital Resource Tracker', 'Real-time Vital Telemetry']
    },
    {
      id: 'security',
      title: 'Security & Compliance Layer',
      subtitle: 'DPDP-2023 Shield',
      icon: <Shield size={32} />,
      color: '#ef4444',
      desc: 'Ensures absolute data integrity and citizen privacy through enterprise-grade encryption and policy governance.',
      components: ['AES-256 Encrypted Vaults', 'Zero-Trust Node Auth', 'DPDP Compliance Engine', 'Forensic Audit Chains']
    }
  ];

  return (
    <div className="architecture-portal animate-fade">
      <div className="arch-header-tactical">
        <div className="arch-title-group">
          <h1>Statewide Global Architecture</h1>
          <p>Technological blueprint of the Andhra Pradesh Health Intelligence Ecosystem.</p>
        </div>
        <div className="arch-version-badge">
          <Terminal size={14} />
          <span>SurvAP CORE v8.2.0</span>
        </div>
      </div>

      <div className="arch-visualizer-container">
        {/* Interactive 3D-Like Stack */}
        <div className="arch-stack-visual">
          {architectureLayers.map((layer, index) => (
            <div 
              key={layer.id}
              className={`arch-layer-slab ${activeLayer === index ? 'active' : ''}`}
              style={{ 
                '--layer-index': index,
                '--layer-color': layer.color,
                zIndex: architectureLayers.length - index 
              }}
              onClick={() => setActiveLayer(index)}
            >
              <div className="slab-content">
                <div className="slab-icon">{layer.icon}</div>
                <div className="slab-info">
                  <span className="s-id">LAYER 0{index + 1}</span>
                  <strong>{layer.id.toUpperCase()}</strong>
                </div>
              </div>
              <div className="slab-glow"></div>
            </div>
          ))}
        </div>

        {/* Detailed Layer Insight */}
        <div className="arch-layer-details animate-slide-up">
          <div className="layer-card-p">
            <div className="l-header" style={{ borderColor: architectureLayers[activeLayer].color }}>
              <div className="l-icon-box" style={{ background: `${architectureLayers[activeLayer].color}20`, color: architectureLayers[activeLayer].color }}>
                {architectureLayers[activeLayer].icon}
              </div>
              <div className="l-title">
                <h2>{architectureLayers[activeLayer].title}</h2>
                <span style={{ color: architectureLayers[activeLayer].color }}>{architectureLayers[activeLayer].subtitle}</span>
              </div>
            </div>

            <p className="l-desc">{architectureLayers[activeLayer].desc}</p>

            <div className="l-components-grid">
              <div className="comp-label">CORE ARCHITECTURAL COMPONENTS</div>
              <div className="c-grid">
                {architectureLayers[activeLayer].components.map((comp, i) => (
                  <div key={i} className="c-item">
                    <CheckCircle2 size={16} color={architectureLayers[activeLayer].color} />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="l-telemetry">
              <div className="t-item">
                <small>INTEGRATION STATUS</small>
                <div className="t-status">
                  <div className="pulse-dot"></div>
                  <span>OPERATIONAL</span>
                </div>
              </div>
              <div className="t-item">
                <small>LAST OPTIMIZATION</small>
                <strong>2.4ms (LATENCY)</strong>
              </div>
            </div>
          </div>

          <div className="arch-workflow-preview">
             <div className="w-header">
                <Share2 size={18} />
                <span>STATEWIDE DATA FLOW WORKFLOW</span>
             </div>
             <div className="w-nodes">
                <div className="w-node">PHC Node</div>
                <ChevronRight size={16} />
                <div className="w-node">Regional Hub</div>
                <ChevronRight size={16} />
                <div className="w-node active" style={{ borderColor: architectureLayers[activeLayer].color }}>{architectureLayers[activeLayer].id.toUpperCase()} LAYER</div>
                <ChevronRight size={16} />
                <div className="w-node">State Command</div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .architecture-portal {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .arch-header-tactical {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 2.5rem;
        }

        .arch-title-group h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: -1.5px; margin-bottom: 0.5rem; }
        .arch-title-group p { color: var(--text-muted); font-weight: 600; font-size: 1.1rem; }

        .arch-version-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 100px;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .arch-visualizer-container {
          display: grid;
          grid-template-columns: 450px 1fr;
          gap: 6rem;
          align-items: center;
        }

        /* 3D Stack Visualization */
        .arch-stack-visual {
          perspective: 1000px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .arch-layer-slab {
          background: var(--surface);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 20px;
          cursor: pointer;
          transform: rotateX(25deg) rotateY(-10deg);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          backdrop-filter: blur(20px);
        }

        .arch-layer-slab:hover {
          transform: rotateX(25deg) rotateY(-10deg) translateY(-10px) translateZ(20px);
          border-color: var(--layer-color);
          background: var(--surface);
        }

        .arch-layer-slab.active {
          transform: rotateX(15deg) rotateY(0deg) translateZ(40px);
          border-color: var(--layer-color);
          background: var(--surface);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(var(--layer-color), 0.1);
        }

        .slab-content { display: flex; align-items: center; gap: 2rem; }
        .slab-icon { color: var(--layer-color); transition: 0.3s; }
        .arch-layer-slab.active .slab-icon { transform: scale(1.1); filter: drop-shadow(0 0 10px var(--layer-color)); }

        .slab-info { display: flex; flex-direction: column; gap: 4px; }
        .s-id { font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; }
        .slab-info strong { font-size: 1.1rem; color: var(--text-muted); transition: 0.3s; }
        .arch-layer-slab.active .slab-info strong { color: var(--text); }

        .slab-glow {
          position: absolute;
          inset: -1px;
          border-radius: 20px;
          background: radial-gradient(circle at top right, var(--layer-color), transparent 70%);
          opacity: 0;
          transition: 0.3s;
          pointer-events: none;
        }
        .arch-layer-slab.active .slab-glow { opacity: 0.15; }

        /* Layer Details */
        .layer-card-p {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 4rem;
          border-radius: 40px;
          margin-bottom: 2.5rem;
        }

        .l-header {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 3rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .l-icon-box {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .l-title h2 { font-size: 2.2rem; font-weight: 900; margin: 0 0 5px; }
        .l-title span { font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; }

        .l-desc { font-size: 1.2rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 4rem; max-width: 800px; font-weight: 600; }

        .l-components-grid .comp-label { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 2rem; }
        .c-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .c-item { display: flex; align-items: center; gap: 15px; background: var(--surface); padding: 1.2rem 2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.03); }
        .c-item span { font-weight: 700; font-size: 0.95rem; color: var(--text-muted); }

        .l-telemetry {
          margin-top: 4rem;
          display: flex;
          gap: 4rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 3rem;
        }

        .t-item small { display: block; font-size: 0.65rem; font-weight: 800; color: var(--text-muted); margin-bottom: 6px; letter-spacing: 1px; }
        .t-status { display: flex; align-items: center; gap: 10px; color: #10b981; font-weight: 900; font-size: 0.85rem; }
        .pulse-dot { width: 8px; height: 8px; background: var(--surface-light); border-radius: 50%; box-shadow: 0 0 10px #10b981; animation: blink 2s infinite; }
        .t-item strong { font-size: 1.1rem; color: var(--text); font-weight: 900; }

        .arch-workflow-preview {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 1.5rem 2.5rem;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .w-header { display: flex; align-items: center; gap: 12px; color: var(--text-muted); }
        .w-header span { font-size: 0.7rem; font-weight: 900; letter-spacing: 1px; }

        .w-nodes { display: flex; align-items: center; gap: 15px; }
        .w-node { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); padding: 6px 12px; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; }
        .w-node.active { background: var(--surface); color: var(--text); border-width: 2px; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
};

export default GlobalArchitecture;
