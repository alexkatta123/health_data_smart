import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  ShieldAlert, 
  Activity, 
  Globe, 
  CheckCircle2, 
  Search, 
  Filter,
  BarChart3,
  Clock,
  MoreVertical,
  Navigation
} from 'lucide-react';
import StrategicSpatialMap from './StrategicSpatialMap';

const DecisionIntelligence = () => {
  const [activeDistrict, setActiveDistrict] = useState('All');
  const [interventions, setInterventions] = useState([
    { id: 1, district: 'Visakhapatnam', trend: '15% ↑ Febrile Illness', action: 'Deploy Mobile Testing', risk: 'High', status: 'Pending' },
    { id: 2, district: 'Guntur', trend: 'Cluster Detected (Ward 4)', action: 'Vector Control Spraying', risk: 'Critical', status: 'In Progress' },
    { id: 3, district: 'Chittoor', trend: 'Dengue Stabilization', action: 'De-escalate Response', risk: 'Moderate', status: 'Recommended' },
    { id: 4, district: 'Kurnool', trend: 'Emerging Waterborne Case', action: 'Water Quality Audit', risk: 'High', status: 'Pending' },
  ]);

  return (
    <div className="decision-intel-page animate-fade">
      <div className="mesh-gradient-intel"></div>
      
      <header className="intel-header">
        <div className="intel-brand">
          <div className="intel-icon-box">
            <Zap size={32} fill="white" />
          </div>
          <div>
            <h1>Real-time Decision Intelligence</h1>
            <p>Emerging trend detection and strategic intervention command center</p>
          </div>
        </div>
        
        <div className="system-status-pill">
          <div className="dot active"></div>
          Surveillance Engine: ACTIVE
        </div>
      </header>

      <div className="intel-grid">
        {/* Left Column: Trend Analysis & Map */}
        <div className="intel-main-col">
          <div className="v-card trend-visual-card">
            <div className="v-card-header">
              <h3><TrendingUp size={20} color="var(--primary)" /> Emerging Cluster Detection</h3>
              <div className="v-card-actions">
                <button className="icon-btn"><Filter size={16} /></button>
                <button className="icon-btn"><MoreVertical size={16} /></button>
              </div>
            </div>
            <div className="v-card-body" style={{ height: '400px', padding: 0 }}>
              <StrategicSpatialMap />
            </div>
              
              <div className="trend-stats-row">
                <div className="t-stat">
                  <span className="t-label">Anomalies Detected</span>
                  <span className="t-val">08</span>
                </div>
                <div className="t-stat">
                  <span className="t-label">Confidence Interval</span>
                  <span className="t-val">92%</span>
                </div>
                <div className="t-stat">
                  <span className="t-label">Actionable Alerts</span>
                  <span className="t-val">03</span>
                </div>
              </div>
            </div>
          </div>

          <div className="v-card interventions-card">
            <div className="v-card-header">
              <h3><ShieldAlert size={20} color="#f43f5e" /> Strategic Interventions</h3>
            </div>
            <div className="v-card-body" style={{ padding: 0 }}>
              <div className="intervention-list">
                {interventions.map((item) => (
                  <div key={item.id} className={`intervention-item ${item.risk.toLowerCase()}`}>
                    <div className="int-main">
                      <div className="int-top">
                        <strong>{item.district}</strong>
                        <span className={`risk-tag ${item.risk.toLowerCase()}`}>{item.risk} Risk</span>
                      </div>
                      <p className="int-trend">{item.trend}</p>
                      <p className="int-action">Action: {item.action}</p>
                    </div>
                    <div className="int-actions">
                      <span className="int-status">{item.status}</span>
                      <button className="primary-trigger">
                        {item.status === 'Pending' ? 'Authorize' : 'View Details'}
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* Right Column: Alerts & KPIs */}
        <div className="intel-side-col">
          <div className="v-card kpi-stack">
            <div className="kpi-item">
              <div className="kpi-icon"><Activity size={18} /></div>
              <div className="kpi-content">
                <span className="kpi-label">Throughput</span>
                <span className="kpi-val">1.2k rec/s</span>
              </div>
            </div>
            <div className="kpi-item">
              <div className="kpi-icon"><Clock size={18} /></div>
              <div className="kpi-content">
                <span className="kpi-label">Response Time</span>
                <span className="kpi-val">14m Avg</span>
              </div>
            </div>
            <div className="kpi-item">
              <div className="kpi-icon"><CheckCircle2 size={18} /></div>
              <div className="kpi-content">
                <span className="kpi-label">Success Rate</span>
                <span className="kpi-val">98.4%</span>
              </div>
            </div>
          </div>

          <div className="v-card alerts-feed">
            <div className="v-card-header">
              <h3>Live Surveillance Feed</h3>
            </div>
            <div className="v-card-body">
              <div className="alert-timeline">
                <div className="alert-node critical">
                  <div className="node-marker"></div>
                  <div className="node-text">
                    <span className="time">12:45 PM</span>
                    <p><strong>Vector Risk ↑</strong> East Godavari (Zone 4)</p>
                  </div>
                </div>
                <div className="alert-node warning">
                  <div className="node-marker"></div>
                  <div className="node-text">
                    <span className="time">11:30 AM</span>
                    <p><strong>Anomaly Detected</strong> Guntur Clinical Data</p>
                  </div>
                </div>
                <div className="alert-node info">
                  <div className="node-marker"></div>
                  <div className="node-text">
                    <span className="time">10:15 AM</span>
                    <p><strong>System Sync</strong> Statewide DB Update</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="global-response-btn">
            <Navigation size={20} /> Initiate Statewide Emergency Protocol
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .decision-intel-page {
          padding: 2rem;
          color: var(--text);
          max-width: 1400px;
          margin: 0 auto;
        }

        .mesh-gradient-intel {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 10% 10%, rgba(244, 63, 94, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 90% 90%, rgba(14, 165, 233, 0.05) 0%, transparent 40%);
          z-index: -1;
          pointer-events: none;
        }

        .intel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .intel-brand { display: flex; align-items: center; gap: 20px; }
        .intel-icon-box {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #f43f5e, #0ea5e9);
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text);
          box-shadow: 0 10px 30px rgba(244, 63, 94, 0.2);
        }

        .system-status-pill {
          background: var(--surface-light);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex; align-items: center; gap: 8px;
          border: 1px solid var(--border);
        }

        .intel-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
        }

        .intel-main-col { display: flex; flex-direction: column; gap: 2rem; }

        .trend-visual-card { min-height: 400px; }
        .trend-heatmap-placeholder {
          height: 300px;
          background: var(--surface);
          border-radius: 16px;
          border: 1px solid var(--border);
          position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .globe-bg { opacity: 0.1; color: var(--primary); }
        .hotspot { position: absolute; border-radius: 50%; filter: blur(15px); }

        .trend-stats-row {
          display: flex; justify-content: space-around; margin-top: 1.5rem;
          padding-top: 1.5rem; border-top: 1px solid var(--border);
        }
        .t-stat { text-align: center; }
        .t-label { display: block; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px; }
        .t-val { font-size: 1.5rem; font-weight: 800; color: var(--primary); }

        .intervention-list { display: flex; flex-direction: column; }
        .intervention-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.5rem; border-bottom: 1px solid var(--border);
          transition: background 0.3s ease;
        }
        .intervention-item:hover { background: var(--surface); }
        .intervention-item.critical { border-left: 4px solid #f43f5e; }
        .intervention-item.high { border-left: 4px solid #f59e0b; }
        .intervention-item.moderate { border-left: 4px solid #10b981; }

        .int-top { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
        .risk-tag { font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
        .risk-tag.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .risk-tag.high { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .risk-tag.moderate { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .int-trend { font-size: 0.9rem; font-weight: 600; color: var(--text); }
        .int-action { font-size: 0.8rem; color: var(--text-muted); }

        .int-actions { text-align: right; }
        .int-status { display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; }
        .primary-trigger {
          background: var(--primary); color: var(--text); border: none;
          padding: 8px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
        }

        .kpi-stack { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem; }
        .kpi-item { display: flex; align-items: center; gap: 15px; }
        .kpi-icon { width: 36px; height: 36px; background: var(--surface-light); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .kpi-label { display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }
        .kpi-val { font-size: 1.1rem; font-weight: 800; }

        .alert-timeline { display: flex; flex-direction: column; gap: 1.5rem; }
        .alert-node { display: flex; gap: 15px; position: relative; }
        .alert-node::after { content: ""; position: absolute; left: 7px; top: 20px; bottom: -20px; width: 1px; background: var(--border); }
        .alert-node:last-child::after { display: none; }
        .node-marker { width: 16px; height: 16px; border-radius: 50%; background: var(--surface-light); border: 3px solid var(--border); z-index: 1; }
        .alert-node.critical .node-marker { background: #f43f5e; border-color: rgba(244, 63, 94, 0.2); }
        .alert-node.warning .node-marker { background: #f59e0b; border-color: rgba(245, 158, 11, 0.2); }
        .alert-node.info .node-marker { background: var(--surface); border-color: rgba(14, 165, 233, 0.2); }

        .node-text .time { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }
        .node-text p { font-size: 0.85rem; margin-top: 2px; }

        .global-response-btn {
          margin-top: 2rem; width: 100%;
          background: linear-gradient(135deg, #f43f5e, #be123c);
          color: var(--text); border: none; padding: 16px; border-radius: 16px;
          font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px;
          box-shadow: 0 10px 25px rgba(244, 63, 94, 0.3);
          transition: transform 0.3s ease;
        }
        .global-response-btn:hover { transform: translateY(-2px); }

        @media (max-width: 1100px) {
          .intel-grid { grid-template-columns: 1fr; }
        }
      ` }} />
    </div>
  );
};

export default DecisionIntelligence;
