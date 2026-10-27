import React, { useState } from 'react';
import { 
  ShieldAlert, Activity, Search, Filter, 
  ChevronRight, ArrowUpRight, Loader2, RefreshCw,
  Building2, MapPin, AlertCircle, CheckCircle2,
  TrendingUp, TrendingDown, Eye, Layers, 
  BarChart2, Zap, Globe, Database
} from 'lucide-react';

const DistrictSurveillanceMatrix = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const districts = [
    { name: "Alluri Sitharama Raju", cases: 612, outbreaks: 4, sync: 98, status: "Under Precaution", risk: "Medium", anomaly: "High Respiratory cases in tribal nodes" },
    { name: "Anakapalli", cases: 619, outbreaks: 2, sync: 99, status: "Under Precaution", risk: "Low", anomaly: "Data silence from 2 PHCs" },
    { name: "Anantapur", cases: 567, outbreaks: 5, sync: 94, status: "Under Precaution", risk: "Medium", anomaly: "Water-borne disease spike" },
    { name: "Annamayya", cases: 622, outbreaks: 8, sync: 91, status: "Critical", risk: "High", anomaly: "Delayed reports from CHC Hub" },
    { name: "Bapatla", cases: 612, outbreaks: 3, sync: 96, status: "Under Precaution", risk: "Low", anomaly: "Coastal node connectivity issues" },
    { name: "Chittoor", cases: 604, outbreaks: 12, sync: 88, status: "Critical", risk: "High", anomaly: "Cross-border transmission suspected" },
    { name: "Dr. B.R. Ambedkar Konaseema", cases: 489, outbreaks: 2, sync: 99, status: "Stable", risk: "Low", anomaly: "None" },
    { name: "East Godavari", cases: 742, outbreaks: 6, sync: 97, status: "Monitoring", risk: "Medium", anomaly: "Urban cluster fever spike" },
    { name: "Eluru", cases: 556, outbreaks: 3, sync: 95, status: "Monitoring", risk: "Low", anomaly: "None" },
    { name: "Guntur", cases: 891, outbreaks: 15, sync: 98, status: "Emergency", risk: "Extreme", anomaly: "Dengue cluster in 4 wards" },
    { name: "Kakinada", cases: 445, outbreaks: 1, sync: 99, status: "Stable", risk: "Low", anomaly: "None" },
    { name: "Krishna", cases: 678, outbreaks: 7, sync: 96, status: "Monitoring", risk: "Medium", anomaly: "Vector-borne upward trend" },
    { name: "Kurnool", cases: 599, outbreaks: 9, sync: 92, status: "Critical", risk: "High", anomaly: "Maternal health reporting delay" },
    { name: "Nandyal", cases: 412, outbreaks: 2, sync: 98, status: "Stable", risk: "Low", anomaly: "None" },
    { name: "NTR", cases: 924, outbreaks: 18, sync: 99, status: "Emergency", risk: "Extreme", anomaly: "Acute Diarrheal cluster" },
    { name: "Palnadu", cases: 534, outbreaks: 4, sync: 94, status: "Monitoring", risk: "Medium", anomaly: "High OP load in PHCs" },
    { name: "Parvathipuram Manyam", cases: 312, outbreaks: 1, sync: 99, status: "Stable", risk: "Low", anomaly: "None" },
    { name: "Prakasam", cases: 588, outbreaks: 5, sync: 95, status: "Monitoring", risk: "Medium", anomaly: "Fluorescent case reporting" },
    { name: "SPSR Nellore", cases: 645, outbreaks: 6, sync: 96, status: "Monitoring", risk: "Medium", anomaly: "None" },
    { name: "Sri Sathya Sai", cases: 421, outbreaks: 2, sync: 98, status: "Stable", risk: "Low", anomaly: "None" },
    { name: "Srikakulam", cases: 512, outbreaks: 3, sync: 97, status: "Monitoring", risk: "Low", anomaly: "Coastal surveillance silence" },
    { name: "Tirupati", cases: 789, outbreaks: 11, sync: 98, status: "Critical", risk: "High", anomaly: "High transient population risk" },
    { name: "Visakhapatnam", cases: 956, outbreaks: 22, sync: 99, status: "Emergency", risk: "Extreme", anomaly: "Industrial area pollution health risks" },
    { name: "Vizianagaram", cases: 467, outbreaks: 3, sync: 98, status: "Stable", risk: "Low", anomaly: "None" },
    { name: "West Godavari", cases: 532, outbreaks: 4, sync: 96, status: "Monitoring", risk: "Low", anomaly: "Prawn-farming node anomalies" },
    { name: "YSR (Kadapa)", cases: 611, outbreaks: 7, sync: 94, status: "Critical", risk: "High", anomaly: "Heat-wave related casualties" }
  ];

  const filteredDistricts = districts.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Emergency': return '#ef4444';
      case 'Critical': return '#f97316';
      case 'Monitoring': return '#8b5cf6';
      case 'Under Precaution': return '#f59e0b';
      default: return '#10b981';
    }
  };

  return (
    <div className="district-matrix-view animate-fade">
      <header className="matrix-header">
        <div className="header-content">
          <div className="tactical-badge">
            <ShieldAlert size={14} /> STATE SURVEILLANCE MISSION
          </div>
          <h1>District Surveillance Matrix</h1>
          <p>Real-time epidemiological monitoring across all 26 administrative districts of Andhra Pradesh.</p>
        </div>
        
        <div className="header-stats">
          <div className="mini-stat">
            <span className="val">26</span>
            <span className="lbl">Active Nodes</span>
          </div>
          <div className="mini-stat critical">
            <span className="val">4</span>
            <span className="lbl">Emergency</span>
          </div>
        </div>
      </header>

      <div className="matrix-controls">
        <div className="search-bar-premium">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by District Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="action-group">
          <div className="filter-chip">
            <Filter size={16} /> Filter by Risk Level
          </div>
          <button className="sync-btn" onClick={handleRefresh} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? "Calibrating..." : "Synchronize Nodes"}
          </button>
        </div>
      </div>

      <div className="h-card matrix-table-container">
        {loading ? (
          <div className="matrix-loader">
            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            <p>Aggregating District Intelligence...</p>
          </div>
        ) : (
          <div className="table-responsive-h">
            <table className="tactical-table">
              <thead>
                <tr>
                  <th>Administrative District</th>
                  <th>Intelligence metrics</th>
                  <th>Sync Quality</th>
                  <th>Risk Assessment</th>
                  <th>Anomalies Detected</th>
                  <th>Strategic Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDistricts.map((d, index) => (
                  <tr key={index} className={d.status === 'Emergency' ? 'row-emergency' : ''}>
                    <td>
                      <div className="district-identity">
                        <div className="dist-icon" style={{ background: `${getStatusColor(d.status)}15`, color: getStatusColor(d.status) }}>
                          <MapPin size={18} />
                        </div>
                        <div>
                          <div className="dist-name">{d.name}</div>
                          <div className="dist-meta">Andhra Pradesh Hub</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="metrics-group">
                        <div className="m-item">
                          <Activity size={12} />
                          <span>{d.cases} Cases</span>
                        </div>
                        <div className="m-item" style={{ color: d.outbreaks > 10 ? '#ef4444' : '#f59e0b' }}>
                          <AlertCircle size={12} />
                          <span>{d.outbreaks} Outbreaks</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="sync-gauge-h">
                        <div className="gauge-val">{d.sync}%</div>
                        <div className="gauge-track">
                          <div className="gauge-fill" style={{ width: `${d.sync}%`, background: d.sync > 95 ? '#10b981' : d.sync > 90 ? '#f59e0b' : '#ef4444' }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="risk-badge" style={{ background: `${getStatusColor(d.status)}15`, color: getStatusColor(d.status) }}>
                        <div className="risk-dot" style={{ background: getStatusColor(d.status) }}></div>
                        {d.status.toUpperCase()}
                      </div>
                    </td>
                    <td>
                      <div className="anomaly-cell" title={d.anomaly}>
                        {d.anomaly !== 'None' ? (
                          <div className="anomaly-flag">
                            <Zap size={14} color="#f59e0b" />
                            <span>{d.anomaly.length > 25 ? d.anomaly.substring(0, 25) + '...' : d.anomaly}</span>
                          </div>
                        ) : (
                          <span className="no-anomaly">Clear</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <button className="matrix-view-btn" onClick={() => setSelectedDistrict(d)}>
                        <Eye size={14} /> View Performance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedDistrict && (
        <div className="district-drilldown-overlay" onClick={() => setSelectedDistrict(null)}>
          <div className="drilldown-modal animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="header-title">
                <Building2 size={24} />
                <div>
                  <h2>{selectedDistrict.name} Analysis</h2>
                  <p>Performance & Anomaly Intelligence Drilldown</p>
                </div>
              </div>
              <button className="close-modal" onClick={() => setSelectedDistrict(null)}>&times;</button>
            </div>
            
            <div className="modal-body-tactical">
              <div className="metrics-overview">
                <div className="m-card">
                  <Activity size={20} />
                  <div className="m-info">
                    <h4>Clinical Load</h4>
                    <p>{selectedDistrict.cases} Records Tracked</p>
                  </div>
                  <TrendingUp size={16} color="#10b981" />
                </div>
                <div className="m-card">
                  <ShieldAlert size={20} />
                  <div className="m-info">
                    <h4>Urgency Score</h4>
                    <p>{selectedDistrict.risk} Priority</p>
                  </div>
                </div>
                <div className="m-card">
                  <Database size={20} />
                  <div className="m-info">
                    <h4>Node Efficiency</h4>
                    <p>{selectedDistrict.sync}% Reporting Rate</p>
                  </div>
                </div>
              </div>

              <div className="anomaly-deep-dive h-card">
                <div className="a-header">
                  <Zap size={20} color="#f59e0b" />
                  <h3>Active Anomaly Intelligence</h3>
                </div>
                <div className="a-content">
                  <p className="a-desc">{selectedDistrict.anomaly === 'None' ? "No significant anomalies detected in this jurisdictional node." : selectedDistrict.anomaly}</p>
                  <div className="a-action">
                    <AlertCircle size={14} />
                    <span>Auto-resolution pipeline active for this cluster.</span>
                  </div>
                </div>
              </div>

              <div className="performance-chart-placeholder h-card">
                <div className="chart-header-m">
                  <BarChart2 size={18} />
                  <span>7-Day Case Progression</span>
                </div>
                <div className="placeholder-viz">
                  <div className="viz-bar" style={{ height: '40%' }}></div>
                  <div className="viz-bar" style={{ height: '60%' }}></div>
                  <div className="viz-bar" style={{ height: '45%' }}></div>
                  <div className="viz-bar" style={{ height: '80%' }}></div>
                  <div className="viz-bar" style={{ height: '90%' }}></div>
                  <div className="viz-bar" style={{ height: '75%' }}></div>
                  <div className="viz-bar active" style={{ height: '95%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="h-btn-outline" onClick={() => setSelectedDistrict(null)}>Close Intelligence</button>
              <button className="h-btn h-btn-primary">Initiate Field Response <ArrowUpRight size={16} /></button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .district-matrix-view { padding: 2rem; max-width: 1600px; margin: 0 auto; }
        .matrix-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .header-content h1 { font-size: 2.8rem; font-weight: 900; margin: 0.5rem 0; letter-spacing: -1.5px; }
        .header-content p { color: var(--text-muted); font-weight: 600; font-size: 1.1rem; max-width: 600px; }
        .tactical-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--primary-glow); color: var(--primary); padding: 6px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; }
        
        .header-stats { display: flex; gap: 2rem; }
        .mini-stat { text-align: right; }
        .mini-stat .val { display: block; font-size: 2rem; font-weight: 900; line-height: 1; }
        .mini-stat .lbl { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .mini-stat.critical .val { color: #ef4444; }

        .matrix-controls { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .search-bar-premium { flex: 1; min-width: 300px; display: flex; align-items: center; gap: 12px; background: var(--surface-light); border: 1px solid var(--border); padding: 0 1.5rem; height: 60px; border-radius: 18px; }
        .search-bar-premium input { background: none; border: none; color: var(--text); font-weight: 600; width: 100%; outline: none; font-size: 1rem; }
        
        .action-group { display: flex; gap: 15px; }
        .filter-chip { display: flex; align-items: center; gap: 10px; background: var(--surface-light); border: 1px solid var(--border); padding: 0 20px; height: 60px; border-radius: 18px; font-weight: 800; font-size: 0.85rem; color: var(--text-muted); cursor: pointer; }
        .sync-btn { border: none; display: flex; align-items: center; gap: 10px; background: var(--primary); color: white; padding: 0 24px; height: 60px; border-radius: 18px; font-weight: 900; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px var(--primary-glow); }
        .sync-btn:hover { transform: translateY(-3px); filter: brightness(1.1); }

        .matrix-table-container { padding: 0; border-radius: 24px; overflow: hidden; }
        .table-responsive-h { overflow-x: auto; }
        .tactical-table { width: 100%; border-collapse: collapse; min-width: 1200px; }
        .tactical-table th { text-align: left; padding: 1.5rem 2rem; font-size: 0.7rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid var(--border); background: var(--surface-light); }
        .tactical-table td { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); transition: 0.2s; }
        .tactical-table tr:hover td { background: var(--surface-light); }
        .row-emergency td { border-left: 4px solid #ef4444; }

        .district-identity { display: flex; align-items: center; gap: 1.25rem; }
        .dist-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .dist-name { font-weight: 900; font-size: 1.1rem; color: var(--text); }
        .dist-meta { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; margin-top: 2px; }

        .metrics-group { display: flex; flex-direction: column; gap: 6px; }
        .m-item { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 800; }

        .sync-gauge-h { width: 120px; }
        .gauge-val { font-size: 0.75rem; font-weight: 900; margin-bottom: 6px; }
        .gauge-track { width: 100%; height: 6px; background: var(--border); border-radius: 10px; overflow: hidden; }
        .gauge-fill { height: 100%; border-radius: 10px; transition: 1s cubic-bezier(0.34, 1.56, 0.64, 1); }

        .risk-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 900; }
        .risk-dot { width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 10px currentColor; }

        .anomaly-flag { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 700; color: #f59e0b; background: rgba(245, 158, 11, 0.08); padding: 4px 10px; border-radius: 8px; }
        .no-anomaly { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; opacity: 0.5; }

        .matrix-view-btn { border: 1px solid var(--border); background: var(--surface); color: var(--text); padding: 10px 16px; border-radius: 12px; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.3s; }
        .matrix-view-btn:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-glow); }

        .district-drilldown-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .drilldown-modal { background: var(--surface); width: 100%; max-width: 800px; border-radius: 32px; border: 1px solid var(--border); overflow: hidden; box-shadow: 0 30px 100px rgba(0,0,0,0.4); }
        .modal-header { padding: 2rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: flex-start; }
        .header-title { display: flex; gap: 1.5rem; align-items: center; }
        .header-title h2 { font-size: 1.8rem; font-weight: 900; margin: 0; }
        .header-title p { margin: 4px 0 0; color: var(--text-muted); font-weight: 600; }
        .close-modal { background: none; border: none; font-size: 2.5rem; color: var(--text-muted); cursor: pointer; line-height: 0.5; }

        .modal-body-tactical { padding: 2.5rem; display: flex; flex-direction: column; gap: 2rem; }
        .metrics-overview { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .m-card { background: var(--surface-light); border: 1px solid var(--border); padding: 1.5rem; border-radius: 20px; display: flex; align-items: flex-start; gap: 1rem; }
        .m-info h4 { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; margin: 0; }
        .m-info p { font-size: 1.1rem; font-weight: 900; margin: 4px 0 0; }

        .anomaly-deep-dive { border: 1px solid rgba(245, 158, 11, 0.2); padding: 1.5rem; }
        .a-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; }
        .a-header h3 { font-size: 1.1rem; font-weight: 900; margin: 0; color: #f59e0b; }
        .a-desc { font-weight: 700; color: var(--text); line-height: 1.6; }
        .a-action { display: flex; align-items: center; gap: 8px; margin-top: 1.5rem; font-size: 0.8rem; font-weight: 800; color: var(--primary); background: var(--primary-glow); width: fit-content; padding: 6px 14px; border-radius: 8px; }

        .chart-header-m { display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; font-weight: 900; font-size: 0.9rem; color: var(--text-muted); }
        .placeholder-viz { height: 180px; display: flex; align-items: flex-end; gap: 12px; padding: 1rem 0; }
        .viz-bar { flex: 1; background: var(--border); border-radius: 6px; transition: 0.5s; }
        .viz-bar.active { background: var(--primary); box-shadow: 0 0 20px var(--primary-glow); }

        .modal-footer { padding: 1.5rem 2.5rem; background: var(--surface-light); border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 15px; }

        @media (max-width: 768px) {
          .matrix-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .header-stats { width: 100%; justify-content: space-between; }
          .matrix-controls { flex-direction: column; align-items: stretch; }
          .action-group { flex-direction: column; }
          .filter-chip, .sync-btn { width: 100%; justify-content: center; }
          .metrics-overview { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default DistrictSurveillanceMatrix;
