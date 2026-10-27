import React from 'react';
import { 
  Building2, CheckCircle2, AlertCircle, 
  BarChart3, Clock, Filter, Search,
  ChevronRight, ArrowUpRight, Target
} from 'lucide-react';

const DistrictPHCPerformance = () => {
  const facilities = [
    { name: 'Sector 4 PHC', type: 'PHC', sync: '2m ago', accuracy: '98%', status: 'Optimal', caseload: 120 },
    { name: 'Pendurthi CHC', type: 'CHC', sync: '5m ago', accuracy: '94%', status: 'Optimal', caseload: 340 },
    { name: 'Gajuwaka Area Hospital', type: 'AH', sync: '1m ago', accuracy: '99%', status: 'Optimal', caseload: 850 },
    { name: 'Bheemili PHC', type: 'PHC', sync: '18m ago', accuracy: '82%', status: 'Delayed', caseload: 95 },
    { name: 'Anakapalle CHC', type: 'CHC', sync: '45m ago', accuracy: '75%', status: 'Critical', caseload: 210 },
    { name: 'Vizag General', type: 'DH', sync: 'Live', accuracy: '100%', status: 'Optimal', caseload: 1450 }
  ];

  return (
    <div className="module-padding animate-fade">
      <div className="performance-layout">
        {/* Top Metric Row */}
        <div className="metrics-row">
           <div className="p-metric-card">
              <div className="m-icon"><Target size={24} /></div>
              <div className="m-info">
                 <span className="m-label">Avg. Reporting Accuracy</span>
                 <h3 className="m-value">94.8%</h3>
              </div>
           </div>
           <div className="p-metric-card">
              <div className="m-icon text-success"><Clock size={24} /></div>
              <div className="m-info">
                 <span className="m-label">Median Sync Time</span>
                 <h3 className="m-value">12.4m</h3>
              </div>
           </div>
           <div className="p-metric-card">
              <div className="m-icon text-warning"><Building2 size={24} /></div>
              <div className="m-info">
                 <span className="m-label">Facilities Online</span>
                 <h3 className="m-value">42/45</h3>
              </div>
           </div>
        </div>

        {/* Search and Filters */}
        <div className="filter-bar-v4">
           <div className="search-box-v4">
              <Search size={18} />
              <input type="text" placeholder="Search facilities..." />
           </div>
           <div className="filter-group-v4">
              <button className="f-pill active">All Facilities</button>
              <button className="f-pill">PHCs</button>
              <button className="f-pill">CHCs</button>
              <button className="f-pill text-danger">At Risk</button>
           </div>
        </div>

        {/* Facility Matrix */}
        <div className="dho-card-v4">
           <div className="matrix-header">
              <h3>Facility Surveillance Matrix</h3>
              <button className="audit-btn"><BarChart3 size={16} /> Performance Audit</button>
           </div>
           
           <div className="matrix-grid">
              {facilities.map((f, i) => (
                <div key={i} className={`facility-card-v4 ${f.status.toLowerCase()}`}>
                   <div className="f-top">
                      <div className="f-identity">
                         <div className="f-type-tag">{f.type}</div>
                         <h4>{f.name}</h4>
                      </div>
                      <div className={`f-status-dot ${f.status.toLowerCase()}`}></div>
                   </div>
                   
                   <div className="f-stats">
                      <div className="f-stat-item">
                         <span>Reporting</span>
                         <strong>{f.accuracy}</strong>
                      </div>
                      <div className="f-stat-item">
                         <span>Last Sync</span>
                         <strong>{f.sync}</strong>
                      </div>
                      <div className="f-stat-item">
                         <span>Daily Load</span>
                         <strong>{f.caseload}</strong>
                      </div>
                   </div>

                   <div className="f-progress">
                      <div className="progress-bar-v4">
                         <div className="progress-fill-v4" style={{ width: f.accuracy }}></div>
                      </div>
                   </div>

                   <button className="f-action-btn">
                      View Details <ChevronRight size={14} />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>

      <style>{`
        .performance-layout { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        
        .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .p-metric-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .m-icon { width: 48px; height: 48px; background: var(--surface); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .m-info .m-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; }
        .m-info .m-value { margin: 4px 0 0 0; font-size: 1.5rem; font-weight: 900; }

        .filter-bar-v4 { display: flex; justify-content: space-between; align-items: center; background: var(--surface); padding: 0.75rem 1.5rem; border-radius: 18px; border: 1px solid var(--border); }
        .search-box-v4 { display: flex; align-items: center; gap: 10px; flex: 1; max-width: 400px; }
        .search-box-v4 input { background: transparent; border: none; color: var(--text); outline: none; width: 100%; font-size: 0.9rem; }
        
        .filter-group-v4 { display: flex; gap: 8px; }
        .f-pill { padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .f-pill:hover, .f-pill.active { background: var(--surface-light); color: var(--text); border-color: var(--primary); }

        .dho-card-v4 { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; padding: 2rem; }
        .matrix-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .matrix-header h3 { margin: 0; font-size: 1.2rem; }
        .audit-btn { padding: 8px 16px; border-radius: 10px; background: var(--primary); color: var(--text); border: none; font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .matrix-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        
        .facility-card-v4 {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .facility-card-v4:hover { border-color: var(--primary); transform: translateY(-5px); background: var(--surface); }
        
        .f-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .f-type-tag { font-size: 0.65rem; font-weight: 900; color: var(--primary); background: rgba(14, 165, 233, 0.1); padding: 2px 8px; border-radius: 4px; margin-bottom: 6px; display: inline-block; }
        .f-identity h4 { margin: 0; font-size: 1rem; font-weight: 800; }
        
        .f-status-dot { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 10px transparent; }
        .f-status-dot.optimal { background: var(--surface-light); box-shadow: 0 0 10px #10b981; }
        .f-status-dot.delayed { background: #f59e0b; }
        .f-status-dot.critical { background: #f43f5e; animation: pulse-red 2s infinite; }

        @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

        .f-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 1.5rem; }
        .f-stat-item span { display: block; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }
        .f-stat-item strong { font-size: 0.9rem; font-weight: 800; }

        .progress-bar-v4 { height: 4px; background: var(--surface); border-radius: 10px; margin-bottom: 1.5rem; }
        .progress-fill-v4 { height: 100%; background: var(--primary); border-radius: 10px; }

        .f-action-btn { width: 100%; padding: 10px; border-radius: 12px; background: transparent; border: 1px solid var(--border); color: var(--text); font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; }
        .f-action-btn:hover { background: white; color: black; border-color: var(--text); }

        .facility-card-v4.critical { border-left: 4px solid #f43f5e; }
        .facility-card-v4.delayed { border-left: 4px solid #f59e0b; }
      `}</style>
    </div>
  );
};

export default DistrictPHCPerformance;
