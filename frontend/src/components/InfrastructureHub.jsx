import React, { useState } from 'react';
import { 
  Zap, 
  FileText, 
  Activity, 
  Cpu, 
  Database, 
  Server, 
  BarChart3, 
  RefreshCcw, 
  ShieldCheck, 
  TrendingUp, 
  Search,
  Download,
  Terminal,
  Layers,
  CloudLightning,
  ChevronRight
} from 'lucide-react';

const InfrastructureHub = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 3000);
  };

  const performanceLogs = [
    { timestamp: '13:02:45', service: 'AI-Inference', metric: 'Latency', value: '42ms', status: 'Optimal' },
    { timestamp: '13:01:12', service: 'DB-Cluster', metric: 'IOPS', value: '12.4K', status: 'Stable' },
    { timestamp: '12:58:30', service: 'NLP-Engine', metric: 'Throughput', value: '85 req/s', status: 'High Load' },
    { timestamp: '12:55:04', service: 'State-Sync', metric: 'Payload', value: '2.4MB', status: 'Optimal' }
  ];

  return (
    <div className="infrastructure-hub-portal animate-fade">
      
      {/* Tactical Hub Navigation */}
      <div className="hub-nav-p">
         <button 
           className={`hub-tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
           onClick={() => setActiveTab('performance')}
         >
            <FileText size={20} /> Performance Logs
         </button>
         <button 
           className={`hub-tab-btn ${activeTab === 'optimization' ? 'active' : ''}`}
           onClick={() => setActiveTab('optimization')}
         >
            <Zap size={20} /> Optimization Hub
         </button>
      </div>

      <div className="hub-content-p">
         {activeTab === 'performance' ? (
           <div className="performance-suite animate-fade">
              <div className="suite-header">
                 <div className="sh-left">
                    <Activity size={24} color="var(--primary)" />
                    <h3>Live Performance Telemetry</h3>
                 </div>
                 <button className="tactical-btn-p"><Download size={16} /> Export Metrics</button>
              </div>

              <div className="metrics-grid-p">
                 {[
                   { label: 'AI LATENCY', value: '42ms', trend: '-2ms', icon: <Cpu /> },
                   { label: 'DB UPTIME', value: '99.99%', trend: 'Stable', icon: <Database /> },
                   { label: 'MEMORY LOAD', value: '64%', trend: '+4%', icon: <Layers /> }
                 ].map((m, i) => (
                   <div key={i} className="mini-metric-card">
                      <div className="mmc-icon">{m.icon}</div>
                      <div className="mmc-data">
                         <small>{m.label}</small>
                         <strong>{m.value}</strong>
                      </div>
                      <span className="mmc-trend" style={{ color: m.trend.startsWith('+') ? '#f43f5e' : '#10b981' }}>{m.trend}</span>
                   </div>
                 ))}
              </div>

              <div className="log-table-container">
                 <table className="tactical-table">
                    <thead>
                       <tr>
                          <th>TIMESTAMP</th>
                          <th>SERVICE</th>
                          <th>METRIC TYPE</th>
                          <th>VALUE</th>
                          <th>STATUS</th>
                          <th style={{ textAlign: 'center' }}>REPORT</th>
                       </tr>
                    </thead>
                    <tbody>
                       {performanceLogs.map((log, i) => (
                         <tr key={i}>
                            <td>{log.timestamp}</td>
                            <td className="text-primary">{log.service}</td>
                            <td>{log.metric}</td>
                            <td className="text-bold">{log.value}</td>
                            <td>
                               <span className={`status-pill-p ${log.status.toLowerCase().replace(' ', '-')}`}>
                                  {log.status.toUpperCase()}
                               </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                               <button className="row-download-btn">
                                  <Download size={18} />
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
         ) : (
           <div className="optimization-suite animate-fade">
              <div className="suite-header">
                 <div className="sh-left">
                    <Zap size={24} color="#f59e0b" />
                    <h3>System Optimization Control</h3>
                 </div>
                 <div className="active-tune-badge">AI MODEL: SURV-AP V2.1</div>
              </div>

              <div className="opt-grid">
                 <div className="opt-control-card">
                    <div className="occ-header">
                       <CloudLightning size={24} color="#8b5cf6" />
                       <h4>AI Inference Tuning</h4>
                    </div>
                    <p>Optimize batch sizes and quantization levels for real-time epidemiological synthesis.</p>
                    <div className="occ-footer">
                       <div className="slider-mock"></div>
                       <button className="h-btn-primary" onClick={handleOptimize} disabled={isOptimizing}>
                          {isOptimizing ? 'TUNING ENGINE...' : 'Execute Auto-Tune'}
                       </button>
                    </div>
                 </div>

                 <div className="opt-control-card">
                    <div className="occ-header">
                       <Database size={24} color="#10b981" />
                       <h4>Database Indexing</h4>
                    </div>
                    <p>Re-align spatial indices for 26 district hubs to ensure sub-second map rendering.</p>
                    <div className="occ-footer">
                       <div className="slider-mock"></div>
                       <button className="h-btn-secondary">Re-Index Matrix</button>
                    </div>
                 </div>
              </div>

              <div className="optimization-flow">
                 <div className="of-header">OPTIMIZATION PIPELINE</div>
                 <div className="of-visual">
                    <div className="of-node completed">
                       <div className="node-dot"></div>
                       <span>ACQUIRE</span>
                    </div>
                    <div className="of-path active"></div>
                    <div className="of-node active">
                       <div className="node-dot pulse"></div>
                       <span>CLASSIFY</span>
                    </div>
                    <div className="of-path"></div>
                    <div className="of-node">
                       <div className="node-dot"></div>
                       <span>PREDICT</span>
                    </div>
                 </div>
              </div>
           </div>
         )}
      </div>

      <style>{`
        .infrastructure-hub-portal { padding: 1rem 0; }
        
        .hub-nav-p {
          display: flex;
          gap: 2rem;
          margin-bottom: 3rem;
          background: var(--surface);
          padding: 1rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          width: fit-content;
        }

        .hub-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 12px 24px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.3s;
          font-family: inherit;
        }
        .hub-tab-btn:hover { color: var(--text); background: var(--surface); }
        .hub-tab-btn.active { background: var(--primary); color: var(--text); box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3); }
        .hub-tab-btn.active:last-child { background: var(--surface); } /* Matching user image colors */
        
        /* Optimization Hub specific color from user image */
        .hub-tab-btn:nth-child(1).active { background: rgba(11, 18, 36, 0.8); color: var(--text); border: 1px solid rgba(255,255,255,0.1); }
        .hub-tab-btn:nth-child(2).active { background: var(--surface); color: var(--text); }

        .hub-content-p {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 40px;
          padding: 3.5rem;
          min-height: 600px;
        }

        .suite-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3.5rem; }
        .sh-left { display: flex; align-items: center; gap: 20px; }
        .sh-left h3 { font-size: 1.6rem; font-weight: 900; margin: 0; }

        .metrics-grid-p { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3.5rem; }
        .mini-metric-card {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 1.5rem 2rem;
          border-radius: 24px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .mmc-icon { color: var(--primary); }
        .mmc-data small { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; }
        .mmc-data strong { font-size: 1.4rem; font-weight: 900; color: var(--text); }
        .mmc-trend { margin-left: auto; font-size: 0.75rem; font-weight: 900; }

        .log-table-container { background: var(--surface); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.03); }
        .tactical-table { width: 100%; border-collapse: collapse; }
        .tactical-table th { text-align: left; padding: 1.5rem 2rem; font-size: 0.7rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .tactical-table td { padding: 1.5rem 2rem; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.02); }
        .text-primary { color: var(--primary); }
        .text-bold { color: var(--text); font-weight: 800; }
        
        .status-pill-p { padding: 4px 12px; border-radius: 100px; font-size: 0.65rem; font-weight: 900; }
        .status-pill-p.optimal { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill-p.stable { background: rgba(14, 165, 233, 0.1); color: var(--primary); }
        .status-pill-p.high-load { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

        .opt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-bottom: 4rem; }
        .opt-control-card {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 2.5rem;
          border-radius: 32px;
        }
        .occ-header { display: flex; align-items: center; gap: 15px; margin-bottom: 1.5rem; }
        .occ-header h4 { font-size: 1.2rem; font-weight: 900; margin: 0; }
        .opt-control-card p { color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; margin-bottom: 2.5rem; }
        
        .occ-footer { display: flex; flex-direction: column; gap: 20px; }
        .slider-mock { height: 6px; background: var(--surface); border-radius: 10px; position: relative; }
        .slider-mock::after { content: ''; position: absolute; width: 16px; height: 16px; background: white; border-radius: 50%; top: -5px; left: 60%; box-shadow: 0 0 15px white; }

        .optimization-flow { background: var(--surface); padding: 2.5rem; border-radius: 32px; text-align: center; }
        .of-header { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); letter-spacing: 3px; margin-bottom: 3rem; }
        .of-visual { display: flex; align-items: center; justify-content: center; gap: 0; }
        .of-node { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .of-node span { font-size: 0.75rem; font-weight: 900; color: var(--text-muted); }
        .node-dot { width: 12px; height: 12px; background: var(--surface); border-radius: 50%; }
        .of-node.completed .node-dot { background: var(--surface-light); box-shadow: 0 0 15px #10b981; }
        .of-node.active .node-dot { background: var(--primary); box-shadow: 0 0 20px var(--primary); }
        .of-path { width: 100px; height: 2px; background: var(--surface); margin-top: -24px; }
        .of-path.active { background: linear-gradient(to right, #10b981, var(--primary)); }
        
        .row-download-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
          margin: 0 auto;
        }
        .row-download-btn:hover { background: rgba(14, 165, 233, 0.1); color: var(--primary); border-color: var(--primary); transform: translateY(-2px); }

        .active-tune-badge { background: rgba(245, 158, 11, 0.1); color: #f59e0b; padding: 6px 16px; border-radius: 100px; font-size: 0.7rem; font-weight: 900; border: 1px solid rgba(245, 158, 11, 0.2); }
      `}</style>
    </div>
  );
};

export default InfrastructureHub;
