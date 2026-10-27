import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  Search, 
  Filter, 
  Phone, 
  Navigation, 
  Bed, 
  Activity, 
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Info,
  Globe,
  Zap,
  Plus,
  Minus,
  Clipboard,
  FileText,
  TrendingUp,
  UserCheck
} from 'lucide-react';

const HospitalCommandCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleLocate = () => setZoomLevel(1);

  const hospitals = [
    { id: 1, name: 'Apollo Health City', district: 'Visakhapatnam', type: 'Tertiary Care', beds: 45, status: 'Operational', rating: 4.8, distance: '2.4 km', phone: '+91 891 2727272', ipData: { admissions: 1240, procedures: 450, discharged: 1180, outcomes: '98.2% Recovery' } },
    { id: 2, name: 'KIMS ICON Hospital', district: 'Visakhapatnam', type: 'Multi-Specialty', beds: 12, status: 'Near Capacity', rating: 4.5, distance: '5.1 km', phone: '+91 891 6609999', ipData: { admissions: 890, procedures: 310, discharged: 850, outcomes: '97.5% Recovery' } },
    { id: 3, name: 'Care Hospitals', district: 'Visakhapatnam', type: 'Super Specialty', beds: 30, status: 'Operational', rating: 4.6, distance: '3.8 km', phone: '+91 891 3920000', ipData: { admissions: 720, procedures: 280, discharged: 690, outcomes: '99.1% Recovery' } },
    { id: 4, name: 'SevenHills Hospital', district: 'Visakhapatnam', type: 'General', beds: 0, status: 'Critical', rating: 4.2, distance: '1.2 km', phone: '+91 891 2708090', ipData: null },
  ];

  return (
    <div className="hospital-command-page animate-fade">
      <div className="mesh-gradient-map"></div>
      
      <div className="command-layout">
        {/* Sidebar: Search & List */}
        <div className="command-sidebar">
          <header className="sidebar-header">
            <div className="header-badge">
              <Building2 size={16} />
              <span>Statewide Infrastructure</span>
            </div>
            <h1>Hospital Locator</h1>
            <p>Real-time resource tracking and facility discovery across Andhra Pradesh.</p>
          </header>

          <div className="search-box">
            <div className="input-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search hospital or district..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="filter-pill">
              <Filter size={16} />
              Filters
            </button>
          </div>

          <div className="hospital-list">
            {hospitals.map(hospital => (
              <div 
                key={hospital.id} 
                className={`hospital-card ${selectedHospital?.id === hospital.id ? 'active' : ''}`}
                onClick={() => setSelectedHospital(hospital)}
              >
                <div className="card-top">
                  <div className="hospital-info">
                    <h3>{hospital.name}</h3>
                    <span className="h-type">{hospital.type}</span>
                  </div>
                  <div className={`status-dot ${hospital.status.toLowerCase().replace(' ', '-')}`}></div>
                </div>
                
                <div className="card-metrics">
                  <div className="metric">
                    <Bed size={14} />
                    <span>{hospital.beds} Beds</span>
                  </div>
                  <div className="metric">
                    <Clock size={14} />
                    <span>{hospital.distance}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn-call"><Phone size={14} /> Contact</button>
                  <button className="btn-route">Navigate <Navigation size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content: Map & Details */}
        <div className="command-main">
          <div className="map-view">
            {/* Abstract Map UI */}
            <div className="map-grid-overlay"></div>
            <div className="map-canvas" style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <div className="map-placeholder">
                <Globe size={120} className="globe-icon" />
                <h3>Rendering Statewide Spatial Infrastructure...</h3>
                <p>Establishing secure connection to Geo-Analytics Cluster</p>
              </div>

              {/* Mock Markers */}
              {hospitals.map((hospital, idx) => (
                <div 
                  key={hospital.id} 
                  className={`map-marker ${hospital.status.toLowerCase().replace(' ', '-')}`}
                  style={{ 
                    top: `${[30, 50, 40, 60][idx]}%`, 
                    left: `${[40, 60, 30, 50][idx]}%`,
                    transform: `scale(${1 / zoomLevel})` 
                  }}
                >
                  <div className="marker-dot"></div>
                  <div className="marker-label">{hospital.name}</div>
                </div>
              ))}
            </div>

            {/* Map Controls */}
            <div className="map-controls">
              <button className="ctrl-btn" onClick={handleZoomIn} title="Zoom In"><Plus size={18} /></button>
              <button className="ctrl-btn" onClick={handleZoomOut} title="Zoom Out"><Minus size={18} /></button>
              <button className="ctrl-btn locate" onClick={handleLocate} title="Reset View"><Navigation size={18} /></button>
            </div>
          </div>

          {selectedHospital && (
            <div className="facility-details animate-slide-up">
              <div className="detail-header">
                <div className="title-group">
                  <h2>{selectedHospital.name}</h2>
                  <div className="tag-row">
                    <span className="tag">{selectedHospital.district}</span>
                    <span className={`status-pill ${selectedHospital.status.toLowerCase().replace(' ', '-')}`}>{selectedHospital.status}</span>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setSelectedHospital(null)}>×</button>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <label><Activity size={14} /> Live Capacity</label>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: '65%' }}></div>
                  </div>
                  <span>65% Occupied</span>
                </div>
                <div className="detail-item">
                  <label><Stethoscope size={14} /> Specialties</label>
                  <div className="spec-tags">
                    <span>Cardiology</span>
                    <span>Emergency</span>
                    <span>Neurology</span>
                  </div>
                </div>
                <div className="detail-item">
                  <label><Info size={14} /> Contact Details</label>
                  <p>{selectedHospital.phone}</p>
                </div>
              </div>

              {selectedHospital.ipData && (
                <div className="ip-intelligence-section">
                  <div className="ip-header">
                    <h3><Clipboard size={18} /> Inpatient (IP) Intelligence</h3>
                    <span className="ip-badge">Live EMR Stream</span>
                  </div>
                  <div className="ip-stats-grid">
                    <div className="ip-stat-card">
                      <div className="ip-stat-icon"><FileText size={16} /></div>
                      <div className="ip-stat-info">
                        <span className="ip-stat-val">{selectedHospital.ipData.admissions}</span>
                        <span className="ip-stat-label">Total Admissions</span>
                      </div>
                    </div>
                    <div className="ip-stat-card">
                      <div className="ip-stat-icon"><Activity size={16} /></div>
                      <div className="ip-stat-info">
                        <span className="ip-stat-val">{selectedHospital.ipData.procedures}</span>
                        <span className="ip-stat-label">Procedures Done</span>
                      </div>
                    </div>
                    <div className="ip-stat-card">
                      <div className="ip-stat-icon"><UserCheck size={16} /></div>
                      <div className="ip-stat-info">
                        <span className="ip-stat-val">{selectedHospital.ipData.discharged}</span>
                        <span className="ip-stat-label">Discharged</span>
                      </div>
                    </div>
                    <div className="ip-stat-card outcome">
                      <div className="ip-stat-icon"><TrendingUp size={16} /></div>
                      <div className="ip-stat-info">
                        <span className="ip-stat-val">{selectedHospital.ipData.outcomes}</span>
                        <span className="ip-stat-label">Clinical Outcomes</span>
                      </div>
                    </div>
                  </div>

                  <div className="ip-activity-feed">
                    <h4 className="feed-title">Recent Clinical Activity</h4>
                    <div className="feed-list">
                      {[
                        { type: 'Admission', patient: 'P. Rajesh', detail: 'Emergency Ward (B-12)', time: '12 mins ago' },
                        { type: 'Procedure', patient: 'K. Sunita', detail: 'Cardiac Bypass Surgery', time: '1 hr ago' },
                        { type: 'Discharge', patient: 'M. Varma', detail: 'Recovery Complete', time: '3 hrs ago' }
                      ].map((log, i) => (
                        <div key={i} className="feed-item">
                          <div className={`feed-dot ${log.type.toLowerCase()}`}></div>
                          <div className="feed-info">
                            <span className="f-type">{log.type}: {log.patient}</span>
                            <span className="f-detail">{log.detail}</span>
                          </div>
                          <span className="f-time">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="detail-actions">
                <button className="btn-emergency">Emergency Response <Zap size={16} fill="white" /></button>
                <button className="btn-secondary">View Capacity Logs <ArrowRight size={16} /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hospital-command-page {
          height: calc(100vh - 40px);
          padding: 1rem;
          color: var(--text);
          position: relative;
          overflow: hidden;
        }

        .mesh-gradient-map {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 10% 10%, rgba(14, 165, 233, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 90% 90%, rgba(99, 102, 241, 0.05) 0%, transparent 40%);
          z-index: -1;
        }

        .command-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 1.5rem;
          height: 100%;
        }

        .command-sidebar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .sidebar-header {
          padding: 2rem;
          background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);
          border-bottom: 1px solid var(--border);
        }

        .header-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .sidebar-header h1 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .sidebar-header p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .search-box {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .input-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .input-wrapper input {
          width: 100%;
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 12px 12px 42px;
          color: var(--text);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .input-wrapper input:focus {
          border-color: var(--primary);
        }

        .filter-pill {
          background: var(--surface-light);
          border: 1px solid var(--border);
          padding: 10px;
          border-radius: 12px;
          color: var(--text);
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .hospital-list {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hospital-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 1.25rem;
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hospital-card:hover {
          background: var(--surface);
          border-color: var(--primary);
        }

        .hospital-card.active {
          background: rgba(14, 165, 233, 0.05);
          border-color: var(--primary);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .hospital-info h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .h-type {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-dot.operational { background: var(--surface-light); box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
        .status-dot.near-capacity { background: #f59e0b; box-shadow: 0 0 10px rgba(245, 158, 11, 0.5); }
        .status-dot.critical { background: #f43f5e; box-shadow: 0 0 10px rgba(244, 63, 94, 0.5); }

        .card-metrics {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .metric {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .btn-call, .btn-route {
          padding: 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-call {
          background: var(--surface-light);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .btn-route {
          background: var(--primary);
          border: none;
          color: var(--text);
        }

        .command-main {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
        }

        .map-view {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }

        .map-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.2;
        }

        .map-canvas {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .map-placeholder {
          text-align: center;
          z-index: 1;
        }

        .globe-icon {
          color: var(--primary);
          opacity: 0.1;
          margin-bottom: 1.5rem;
          animation: rotateGlobe 20s linear infinite;
        }

        @keyframes rotateGlobe {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .map-placeholder h3 { font-size: 1.2rem; margin-bottom: 8px; }
        .map-placeholder p { color: var(--text-muted); font-size: 0.9rem; }

        .map-marker {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 0.3s ease;
          z-index: 2;
        }

        .map-marker:hover { transform: scale(1.1); }

        .marker-dot {
          width: 14px;
          height: 14px;
          background: var(--primary);
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 15px var(--primary);
        }

        .marker-label {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .map-controls {
          position: absolute;
          right: 1.5rem;
          bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ctrl-btn {
          width: 48px;
          height: 48px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          color: #e2e8f0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
          transition: all 0.2s ease;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .ctrl-btn:hover {
          background: var(--surface);
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .ctrl-btn.locate { 
          color: var(--secondary);
        }

        .facility-details {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.2);
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .title-group h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; }
        .tag-row { display: flex; gap: 10px; }
        .tag { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); background: var(--surface-light); padding: 4px 10px; border-radius: 6px; }

        .status-pill {
          font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase;
        }
        .status-pill.operational { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill.near-capacity { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

        .close-btn { background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .detail-item label { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted); font-weight: 700; margin-bottom: 10px; text-transform: uppercase; }

        .progress-container { width: 100%; height: 8px; background: var(--surface-light); border-radius: 4px; overflow: hidden; margin-bottom: 6px; }
        .progress-bar { height: 100%; background: var(--primary); border-radius: 4px; }
        .detail-item span { font-size: 0.85rem; font-weight: 700; }

        .spec-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .spec-tags span { background: var(--surface-light); border: 1px solid var(--border); padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; }

        .detail-actions { display: flex; gap: 1rem; }
        .btn-emergency {
          background: var(--primary); color: var(--text); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 10px;
          box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2);
        }
        .btn-emergency:hover { background: var(--surface); }

        .ip-intelligence-section {
          background: rgba(14, 165, 233, 0.03);
          border: 1px solid rgba(14, 165, 233, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .ip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .ip-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 800;
          color: var(--primary);
        }

        .ip-badge {
          background: rgba(14, 165, 233, 0.1);
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .ip-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .ip-stat-card {
          background: var(--surface-light);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ip-stat-card.outcome {
          background: rgba(16, 185, 129, 0.05);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .ip-stat-icon {
          width: 32px;
          height: 32px;
          background: var(--surface);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }

        .ip-stat-info {
          display: flex;
          flex-direction: column;
        }

        .ip-stat-val {
          font-size: 1rem;
          font-weight: 800;
        }

        .ip-stat-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }

        .ip-activity-feed {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .feed-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
        }

        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feed-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          background: var(--surface);
          border-radius: 8px;
        }

        .feed-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .feed-dot.admission { background: var(--primary); box-shadow: 0 0 10px var(--primary); }
        .feed-dot.procedure { background: var(--primary); box-shadow: 0 0 10px #8b5cf6; }
        .feed-dot.discharge { background: var(--surface-light); box-shadow: 0 0 10px #10b981; }

        .feed-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .f-type {
          font-size: 0.85rem;
          font-weight: 700;
        }

        .f-detail {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .f-time {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-style: italic;
        }

        @media (max-width: 1024px) {
          .command-layout { grid-template-columns: 1fr; }
          .map-view { height: 400px; }
          .detail-grid { grid-template-columns: 1fr; }
        }
      ` }} />
    </div>
  );
};

export default HospitalCommandCenter;
