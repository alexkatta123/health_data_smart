import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Database, 
  Cloud, 
  Filter, 
  Download, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ChevronRight,
  X,
  Layers,
  Activity,
  Cpu
} from 'lucide-react';

const AdminLogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');
  
  const [logs, setLogs] = useState([
    { id: 1, type: 'Info', service: 'Ingestion-API', msg: 'Batch of 1,200 records processed successfully.', time: '12:04:12', status: 'Secure' },
    { id: 2, type: 'Warn', service: 'NLP-Processor', msg: 'Confidence threshold low for 2 records in District Kurnool.', time: '11:58:04', status: 'Review' },
    { id: 3, type: 'Error', service: 'State-Sync', msg: 'Timed out connecting to Regional Hub Guntur.', time: '11:55:12', status: 'Fail' },
    { id: 4, type: 'Info', service: 'User-Auth', msg: 'Successful login: state_official_ap', time: '11:52:45', status: 'Secure' },
    { id: 5, type: 'Security', service: 'DPDP-Vault', msg: 'Anonymization sequence completed for IP records.', time: '11:50:01', status: 'Secure' },
    { id: 6, type: 'Info', service: 'Cloud-Compute', msg: 'Autoscaling event: Spun up 2 additional nodes.', time: '11:45:30', status: 'Optimal' },
    { id: 7, type: 'Error', service: 'DB-Cluster', msg: 'Secondary node synchronization latency detected (450ms).', time: '11:42:12', status: 'Alert' }
  ]);

  const filteredLogs = logs.filter(log => {
    const matchesType = activeType === 'All' || log.type === activeType;
    const matchesSearch = log.msg.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         log.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const fetchMoreLogs = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newLogs = [
        { id: Date.now(), type: 'Info', service: 'Storage-Mgr', msg: 'Snapshot-102 successful. Backup integrity 100%.', time: '11:35:04', status: 'Secure' },
        { id: Date.now() + 1, type: 'Security', service: 'Firewall-AP', msg: 'Detected and blocked 12 unauthorized ingress attempts.', time: '11:32:12', status: 'Secure' }
      ];
      setLogs(prev => [...prev, ...newLogs]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="admin-logs-portal animate-fade">
      
      {/* Tactical Header */}
      <div className="logs-header-p">
         <div className="lh-left">
            <div className="lh-icon"><Terminal size={28} /></div>
            <div>
               <h1>System Activity & Event Logs</h1>
               <p>Real-time telemetry and cryptographic audit stream for statewide services.</p>
            </div>
         </div>
         <div className="lh-right">
            <div className="logs-search-box">
               <Search size={18} />
               <input 
                 type="text" 
                 placeholder="Search log fingerprints..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            <button className={`tactical-btn-p ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
               <Filter size={18} /> {showFilters ? 'Hide Filters' : 'Filters'}
            </button>
            <button className="tactical-btn-p"><Download size={18} /> Export CSV</button>
         </div>
      </div>

      <div className="logs-main-grid">
         
         {/* Filter Sidebar (Conditional) */}
         {showFilters && (
           <div className="filters-sidebar-p animate-slide-right">
              <div className="fs-section">
                 <label>EVENT SEVERITY</label>
                 <div className="filter-pill-grid">
                    {['All', 'Info', 'Warn', 'Error', 'Security'].map(t => (
                      <button 
                        key={t} 
                        className={`filter-pill ${activeType === t ? 'active' : ''}`}
                        onClick={() => setActiveType(t)}
                      >
                        {t}
                      </button>
                    ))}
                 </div>
              </div>
              <div className="fs-section">
                 <label>SYSTEM SOURCE</label>
                 <select className="fs-select">
                    <option>All Services</option>
                    <option>NLP Processor</option>
                    <option>Data Ingestion</option>
                    <option>State Sync</option>
                    <option>User Auth</option>
                 </select>
              </div>
              <div className="fs-section">
                 <label>TIME WINDOW</label>
                 <div className="time-select">
                    <button className="ts-btn active">Last Hour</button>
                    <button className="ts-btn">24H</button>
                    <button className="ts-btn">7 Days</button>
                 </div>
              </div>
              
              <div className="audit-summary-card">
                 <ShieldAlert size={20} color="#f59e0b" />
                 <div>
                    <strong>Audit Priority</strong>
                    <p>3 Warning events require manual verification in Kurnool hub.</p>
                 </div>
              </div>
           </div>
         )}

         {/* Cinematic Log Stream */}
         <div className="logs-stream-container">
            <div className="stream-stats-bar">
               <div className="ss-item"><Activity size={14} /> LIVE STREAM: <strong>ACTIVE</strong></div>
               <div className="ss-item"><Layers size={14} /> EVENTS: <strong>{filteredLogs.length}</strong></div>
               <div className="ss-item"><Clock size={14} /> UPTIME: <strong>99.98%</strong></div>
            </div>

            <div className="log-entries-viewport">
               {filteredLogs.map((log) => (
                 <div key={log.id} className={`log-entry-row ${log.type.toLowerCase()}`}>
                    <div className="le-meta">
                       <span className="le-time">{log.time}</span>
                       <span className="le-badge">{log.type}</span>
                    </div>
                    <div className="le-service">[{log.service}]</div>
                    <div className="le-msg">{log.msg}</div>
                    <div className="le-status">
                       <div className="status-indicator"></div>
                       {log.status}
                    </div>
                 </div>
               ))}
               
               {filteredLogs.length === 0 && (
                 <div className="no-logs">
                    <Search size={48} opacity={0.1} />
                    <p>No log signatures match your current filters.</p>
                 </div>
               )}
            </div>

            <button 
              className="fetch-more-btn" 
              onClick={fetchMoreLogs}
              disabled={isLoading}
            >
               {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
               {isLoading ? 'ACQUIRING MORE LOGS...' : 'FETCH HISTORICAL STREAM'}
            </button>
         </div>
      </div>

      <style>{`
        .admin-logs-portal {
          padding: 1rem 0;
        }

        .logs-header-p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--surface);
          padding: 2.5rem 3rem;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 2.5rem;
        }

        .lh-left { display: flex; align-items: center; gap: 20px; }
        .lh-icon { width: 56px; height: 56px; background: rgba(14, 165, 233, 0.1); color: var(--primary); border-radius: 16px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(14, 165, 233, 0.2); }
        .lh-left h1 { font-size: 1.8rem; font-weight: 900; letter-spacing: -1px; margin: 0 0 5px; }
        .lh-left p { color: var(--text-muted); font-weight: 600; font-size: 0.95rem; }

        .lh-right { display: flex; gap: 15px; }
        .logs-search-box { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); padding: 10px 18px; border-radius: 12px; display: flex; align-items: center; gap: 12px; min-width: 300px; }
        .logs-search-box input { background: transparent; border: none; color: var(--text); outline: none; font-size: 0.9rem; width: 100%; font-weight: 600; }
        .tactical-btn-p { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
        .tactical-btn-p:hover { background: var(--surface); color: var(--text); }
        .tactical-btn-p.active { background: var(--primary); color: var(--text); }

        .logs-main-grid { display: grid; grid-template-columns: ${showFilters ? '320px 1fr' : '1fr'}; gap: 2.5rem; }

        .filters-sidebar-p {
          background: rgba(11, 18, 36, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 32px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          height: fit-content;
        }

        .fs-section label { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 1.5rem; }
        .filter-pill-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .filter-pill { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); cursor: pointer; transition: 0.2s; }
        .filter-pill.active { background: var(--primary); color: var(--text); border-color: var(--primary); }

        .fs-select { width: 100%; background: var(--surface); border: 1px solid rgba(255,255,255,0.05); color: var(--text); padding: 12px; border-radius: 12px; font-weight: 700; outline: none; }
        
        .time-select { display: flex; background: var(--surface); padding: 4px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }
        .ts-btn { flex: 1; padding: 8px; border: none; background: transparent; color: var(--text-muted); font-size: 0.7rem; font-weight: 900; cursor: pointer; border-radius: 8px; transition: 0.2s; }
        .ts-btn.active { background: var(--surface); color: var(--text); }

        .audit-summary-card { margin-top: 1rem; background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.1); padding: 1.5rem; border-radius: 20px; display: flex; gap: 15px; }
        .audit-summary-card strong { display: block; color: #f59e0b; font-size: 0.9rem; margin-bottom: 4px; }
        .audit-summary-card p { color: var(--text-muted); font-size: 0.8rem; line-height: 1.5; font-weight: 600; margin: 0; }

        .logs-stream-container {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 32px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .stream-stats-bar { background: var(--surface); padding: 12px 2rem; display: flex; gap: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ss-item { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; display: flex; align-items: center; gap: 8px; }
        .ss-item strong { color: var(--text); }

        .log-entries-viewport { height: 600px; overflow-y: auto; font-family: 'JetBrains Mono', 'Monaco', monospace; }
        
        .log-entry-row {
          display: grid;
          grid-template-columns: 180px 180px 1fr 120px;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          align-items: center;
          transition: 0.2s;
        }
        .log-entry-row:hover { background: var(--surface); }
        
        .le-meta { display: flex; gap: 15px; align-items: center; }
        .le-time { font-size: 0.8rem; color: var(--text-muted); }
        .le-badge { font-size: 0.65rem; font-weight: 900; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
        
        .info .le-badge { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .warn .le-badge { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .error .le-badge { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .security .le-badge { background: rgba(139, 92, 246, 0.1); color: var(--primary); }

        .le-service { color: var(--primary); font-weight: 700; font-size: 0.85rem; }
        .le-msg { color: var(--text-muted); font-size: 0.85rem; padding-right: 2rem; }
        
        .le-status { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; }
        .status-indicator { width: 6px; height: 6px; border-radius: 50%; background: var(--surface-light); }
        .error .status-indicator { background: #f43f5e; box-shadow: 0 0 10px #f43f5e; }
        .warn .status-indicator { background: #f59e0b; }

        .fetch-more-btn {
          width: 100%;
          padding: 1.5rem;
          background: var(--surface);
          border: none;
          border-top: 1px solid rgba(255,255,255,0.05);
          color: var(--text);
          font-weight: 900;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transition: 0.3s;
        }
        .fetch-more-btn:hover { background: var(--surface); color: var(--primary); }

        .no-logs { padding: 5rem; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .no-logs p { font-weight: 700; font-size: 1.1rem; }

        .animate-slide-right { animation: slideRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes slideRight { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AdminLogs;
