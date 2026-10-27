import React from 'react';
import { 
  ShieldAlert, ArrowUpRight, MapPin, 
  Users, Activity, Filter, Download,
  ChevronRight, AlertCircle, Zap
} from 'lucide-react';

const DistrictHotspots = () => {
  const hotspots = [
    { mandal: 'Gajuwaka', cluster: 'Water-Borne', intensity: 'Critical', cases: 142, trend: '+24%', status: 'Active' },
    { mandal: 'Pendurthi', cluster: 'Vector-Borne', intensity: 'High', cases: 85, trend: '+12%', status: 'Active' },
    { mandal: 'Bheemili', cluster: 'Febrile Illness', intensity: 'Medium', cases: 42, trend: '-5%', status: 'Under Control' },
    { mandal: 'Anakapalle', cluster: 'Respiratory', intensity: 'Low', cases: 28, trend: '+2%', status: 'Monitoring' },
    { mandal: 'Madurawada', cluster: 'Vector-Borne', intensity: 'High', cases: 67, trend: '+18%', status: 'Active' }
  ];

  return (
    <div className="module-padding animate-fade">
      <div className="hotspots-container">
        {/* Header Stats */}
        <div className="hotspots-summary">
          <div className="summary-card crit">
            <ShieldAlert size={24} />
            <div>
              <h3>02</h3>
              <p>Critical Mandals</p>
            </div>
          </div>
          <div className="summary-card warn">
            <Activity size={24} />
            <div>
              <h3>364</h3>
              <p>Total Cluster Cases</p>
            </div>
          </div>
          <div className="summary-card info">
            <Users size={24} />
            <div>
              <h3>12</h3>
              <p>Active Response Teams</p>
            </div>
          </div>
        </div>

        {/* Main Hotspots Table */}
        <div className="dho-card-v3">
          <div className="card-header-v3">
            <div className="title-area">
              <h3>Active Outbreak Clusters</h3>
              <span>Spatial intelligence & case concentration</span>
            </div>
            <div className="action-area">
              <button className="filter-btn"><Filter size={16} /> Filter</button>
              <button className="export-btn"><Download size={16} /> Export</button>
            </div>
          </div>

          <div className="table-responsive-v3">
            <table className="hotspots-table">
              <thead>
                <tr>
                  <th>Mandal / Location</th>
                  <th>Cluster Type</th>
                  <th>Intensity</th>
                  <th>Total Cases</th>
                  <th>Trend (7d)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotspots.map((h, i) => (
                  <tr key={i}>
                    <td>
                      <div className="location-cell">
                        <MapPin size={14} className="text-muted" />
                        <div>
                          <div className="mandal-name">{h.mandal}</div>
                          <div className="mandal-sub">District Hub Zone</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="cluster-tag">{h.cluster}</span>
                    </td>
                    <td>
                      <span className={`intensity-pill ${h.intensity.toLowerCase()}`}>
                        {h.intensity}
                      </span>
                    </td>
                    <td className="cases-cell">{h.cases}</td>
                    <td>
                      <div className={`trend-tag ${h.trend.includes('+') ? 'up' : 'down'}`}>
                        {h.trend.includes('+') ? <ArrowUpRight size={14} /> : <Zap size={14} />}
                        {h.trend}
                      </div>
                    </td>
                    <td>
                      <button className="dispatch-btn">
                        Dispatch Team <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .hotspots-container { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        
        .hotspots-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .summary-card {
          padding: 1.5rem;
          border-radius: 24px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 20px;
          background: var(--surface);
          transition: transform 0.2s;
        }

        .summary-card:hover { transform: translateY(-3px); }
        .summary-card.crit { border-left: 5px solid #f43f5e; color: #f43f5e; }
        .summary-card.warn { border-left: 5px solid #f59e0b; color: #f59e0b; }
        .summary-card.info { border-left: 5px solid #0ea5e9; color: var(--secondary); }

        .summary-card h3 { margin: 0; font-size: 1.8rem; font-weight: 900; line-height: 1; }
        .summary-card p { margin: 4px 0 0 0; font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }

        .dho-card-v3 {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .card-header-v3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .title-area h3 { margin: 0; font-size: 1.3rem; font-weight: 800; }
        .title-area span { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }

        .action-area { display: flex; gap: 10px; }
        .filter-btn, .export-btn {
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .filter-btn:hover { background: var(--primary); border-color: var(--primary); }

        .hotspots-table { width: 100%; border-collapse: collapse; }
        .hotspots-table th {
          text-align: left;
          padding: 1rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid var(--border);
        }

        .hotspots-table td { padding: 1.25rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.03); }

        .location-cell { display: flex; gap: 12px; align-items: center; }
        .mandal-name { font-weight: 800; font-size: 0.95rem; }
        .mandal-sub { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }

        .cluster-tag {
          background: rgba(14, 165, 233, 0.1);
          color: var(--secondary);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .intensity-pill {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .intensity-pill.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.2); }
        .intensity-pill.high { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
        .intensity-pill.medium { background: rgba(14, 165, 233, 0.1); color: var(--secondary); }
        .intensity-pill.low { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .cases-cell { font-weight: 900; font-size: 1.1rem; }

        .trend-tag { display: flex; align-items: center; gap: 4px; font-weight: 800; font-size: 0.85rem; }
        .trend-tag.up { color: #f43f5e; }
        .trend-tag.down { color: #10b981; }

        .dispatch-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
          padding: 8px 15px;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dispatch-btn:hover { background: white; color: black; border-color: var(--text); }
      `}</style>
    </div>
  );
};

export default DistrictHotspots;
