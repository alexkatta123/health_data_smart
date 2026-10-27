import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Line
} from 'recharts';
import { 
  Activity, 
  Map as MapIcon, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  ArrowUpRight,
  ChevronRight,
  Filter,
  Download,
  Info,
  Layers,
  Globe
} from 'lucide-react';
import { useEffect, useRef } from 'react';

const gunturPHCData = [
  { name: 'Mangalagiri PHC', cases: 145, risk: 'High', trend: '+12%', population: '45k', diseases: { 'Vector-Borne': 60, 'Communicable': 45, 'Chronic': 40 } },
  { name: 'Tenali CHC', cases: 210, risk: 'Critical', trend: '+18%', population: '95k', diseases: { 'Vector-Borne': 90, 'Communicable': 70, 'Chronic': 50 } },
  { name: 'Amaravati PHC', cases: 88, risk: 'Medium', trend: '+5%', population: '32k', diseases: { 'Vector-Borne': 30, 'Communicable': 38, 'Chronic': 20 } },
  { name: 'Ponnur PHC', cases: 112, risk: 'High', trend: '+8%', population: '52k', diseases: { 'Vector-Borne': 45, 'Communicable': 42, 'Chronic': 25 } },
  { name: 'Guntur Urban PHC', cases: 320, risk: 'Critical', trend: '+22%', population: '180k', diseases: { 'Vector-Borne': 120, 'Communicable': 110, 'Chronic': 90 } },
  { name: 'Bapatla CHC', cases: 134, risk: 'Medium', trend: '-2%', population: '78k', diseases: { 'Vector-Borne': 50, 'Communicable': 44, 'Chronic': 40 } },
];

const COLORS = ['#0ea5e9', '#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6'];

const DistrictDiseaseIntelligence = () => {
  const [selectedPHC, setSelectedPHC] = useState(gunturPHCData[0]);
  const mapRef = useRef(null);
  const leafletMap = useRef(null);

  useEffect(() => {
    if (!window.L || !mapRef.current) return;
    
    if (!leafletMap.current) {
      leafletMap.current = window.L.map(mapRef.current).setView([16.3067, 80.4365], 10);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(leafletMap.current);
    }

    // Clear existing markers
    leafletMap.current.eachLayer((layer) => {
      if (layer instanceof window.L.Circle || layer instanceof window.L.Marker) {
        leafletMap.current.removeLayer(layer);
      }
    });

    // Add PHC markers
    gunturPHCData.forEach(d => {
      const coords = d.name === 'Mangalagiri PHC' ? [16.4333, 80.5667] :
                    d.name === 'Tenali CHC' ? [16.2430, 80.6465] :
                    d.name === 'Amaravati PHC' ? [16.5811, 80.3581] :
                    d.name === 'Ponnur PHC' ? [16.0660, 80.5505] :
                    d.name === 'Guntur Urban PHC' ? [16.3067, 80.4365] : [15.9042, 80.4674];

      const color = d.risk === 'Critical' ? '#f43f5e' : d.risk === 'High' ? '#f59e0b' : '#0ea5e9';
      
      const circle = window.L.circle(coords, {
        color: color,
        fillColor: color,
        fillOpacity: 0.3,
        radius: d.cases * 20
      }).addTo(leafletMap.current);

      circle.on('click', () => setSelectedPHC(d));
    });

  }, [selectedPHC]);

  return (
    <div className="district-intelligence animate-fade">
      <header className="intel-header">
        <div className="header-main">
          <h2 className="intel-title">Guntur District <span>Disease Surveillance</span></h2>
        </div>
        <div className="header-actions">
           <button className="h-btn-secondary" style={{ padding: '10px 20px', borderRadius: '12px', background: 'var(--surface-light)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} color="var(--primary)" /> Global Layer
           </button>
          <div className="time-selector">
            <span>Last 24 Hours</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </header>

      <div className="intel-grid">
        <div className="intel-main">
          <div className="map-viz-card">
            <div className="viz-header">
              <MapIcon size={20} color="var(--primary)" />
              <h3>Live Surveillance Map</h3>
              <div className="risk-legend">
                <div className="l-item"><div className="l-dot low"></div> Low</div>
                <div className="l-item"><div className="l-dot med"></div> Med</div>
                <div className="l-item"><div className="l-dot crit"></div> Crit</div>
              </div>
            </div>
            <div className="map-container-wrapper" style={{ height: '400px', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
               <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }}></div>
            </div>
          </div>

          <div className="district-table-card">
            <div className="viz-header">
              <Filter size={18} color="var(--primary)" />
              <h3>PHC / CHC Classification Matrix</h3>
            </div>
            <div className="intel-table">
              <table>
                <thead>
                  <tr>
                    <th>Facility Name</th>
                    <th>Burden</th>
                    <th>Risk Profile</th>
                    <th>Weekly Trend</th>
                    <th>Audit</th>
                  </tr>
                </thead>
                <tbody>
                  {gunturPHCData.map((d, i) => (
                    <tr key={i} className={selectedPHC.name === d.name ? 'selected' : ''} onClick={() => setSelectedPHC(d)}>
                      <td className="dist-name">{d.name}</td>
                      <td className="dist-cases">{d.cases}</td>
                      <td>
                        <span className={`risk-pill ${d.risk.toLowerCase()}`}>{d.risk}</span>
                      </td>
                      <td className={d.trend.startsWith('+') ? 'trend-up' : 'trend-down'}>{d.trend}</td>
                      <td><ArrowUpRight size={16} className="table-icon" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Analytics for Selected District */}
        <div className="intel-sidebar">
          <div className="district-detail-card">
            <div className="detail-header">
              <div className="d-icon">{selectedPHC.name[0]}</div>
              <div className="d-title">
                <h3>{selectedPHC.name}</h3>
                <span>Catchment: {selectedPHC.population}</span>
              </div>
            </div>
            
            <div className="stat-grid-intel">
              <div className="i-stat">
                <span className="i-val">{selectedPHC.cases}</span>
                <span className="i-lbl">Facility Cases</span>
              </div>
              <div className="i-stat">
                <span className="i-val" style={{ color: '#f43f5e' }}>{Math.round(selectedPHC.cases * 0.15)}</span>
                <span className="i-lbl">High Urgency</span>
              </div>
            </div>

            <div className="disease-split-viz">
              <h4>Disease Distribution</h4>
              <div style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(selectedPHC.diseases).map(([name, value]) => ({ name, value }))}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {Object.entries(selectedPHC.diseases).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px', color: "var(--text)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="disease-legend-intel">
                {Object.entries(selectedPHC.diseases).map(([name, value], i) => (
                  <div key={i} className="l-item-split">
                    <div className="dot" style={{ background: COLORS[i] }}></div>
                    <span>{name}: <strong>{value}</strong></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="trend-analysis-card">
              <h4>Infection Velocity (7d)</h4>
              <div style={{ height: '150px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { day: 'Mon', cases: 40 }, { day: 'Tue', cases: 45 }, { day: 'Wed', cases: 42 },
                    { day: 'Thu', cases: 50 }, { day: 'Fri', cases: 55 }, { day: 'Sat', cases: 52 }, { day: 'Sun', cases: 60 }
                  ]}>
                    <defs>
                      <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="cases" stroke="var(--primary)" fillOpacity={1} fill="url(#colorCases)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <button className="primary-intel-btn">
              <TrendingUp size={18} /> Deploy Response Team
            </button>
          </div>

          <div className="predictive-alert-card">
            <div className="alert-top">
              <AlertTriangle size={20} color="#f59e0b" />
              <h4>District Predictive Alert</h4>
            </div>
            <p>Epidemiological risks expected to increase by <strong>24%</strong> in {selectedPHC.name} area next week based on current patient inflow.</p>
            <div className="alert-meta">
              <Info size={14} /> Confidence: High (92%)
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .district-intelligence {
          padding: 0;
          margin-top: -1.5rem;
          margin-left: -1.5rem;
          margin-right: -1.5rem;
        }

        .intel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem 2rem;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(10px);
        }

        .intel-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.5px;
          margin: 0;
        }

        .intel-title span {
          color: var(--primary);
        }



        .header-actions { display: flex; gap: 15px; }
        .time-selector {
          background: var(--surface-light);
          padding: 10px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid var(--border);
          cursor: pointer;
        }

        .intel-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 1.5rem;
          padding: 0 1.5rem 1.5rem 1.5rem;
        }

        @media (max-width: 1200px) {
          .intel-grid { grid-template-columns: 1fr; height: auto; }
          .intel-sidebar { order: -1; }
        }

        .intel-main { display: flex; flex-direction: column; gap: 1.5rem; }
        .map-viz-card {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 1.8rem;
          position: relative;
        }

        .viz-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
        .viz-header h3 { font-size: 1.1rem; }

        .risk-legend { display: flex; gap: 15px; margin-left: auto; }
        .l-item { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .l-dot { width: 8px; height: 8px; border-radius: 50%; }
        .l-dot.low { background: var(--surface-light); }
        .l-dot.med { background: #f59e0b; }
        .l-dot.high { background: #f43f5e; }
        .l-dot.crit { background: var(--primary); }

        .map-placeholder {
          height: calc(100% - 60px);
          background: var(--surface);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ap-map-svg { width: 100%; height: 100%; }
        .map-district { cursor: pointer; transition: all 0.3s ease; }
        .map-district:hover circle { fill-opacity: 0.8; stroke: white; stroke-width: 1; }

        .hotspot-pulse {
          animation: hotspot-pulse 3s infinite;
        }

        @keyframes hotspot-pulse {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.4; }
        }

        .district-table-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 1.8rem;
        }

        .intel-table table { width: 100%; border-collapse: collapse; }
        .intel-table th { text-align: left; padding: 12px; font-size: 0.8rem; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .intel-table td { padding: 14px 12px; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.03); }
        
        .intel-table tr { cursor: pointer; transition: all 0.2s ease; }
        .intel-table tr:hover { background: var(--surface); }
        .intel-table tr.selected { background: rgba(14, 165, 233, 0.1); }

        .dist-name { font-weight: 700; color: var(--text); }
        .dist-cases { font-weight: 800; color: var(--primary); }
        .risk-pill { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .risk-pill.high { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .risk-pill.critical { background: rgba(139, 92, 246, 0.1); color: var(--primary); }
        .risk-pill.medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .risk-pill.low { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .trend-up { color: #f43f5e; font-weight: 700; }
        .trend-down { color: #10b981; font-weight: 700; }

        .intel-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }

        .district-detail-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 2rem;
          flex: 1;
        }

        .detail-header { display: flex; gap: 15px; align-items: center; margin-bottom: 2rem; }
        .d-icon { width: 50px; height: 50px; background: var(--primary); color: var(--text); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; }
        .d-title h3 { font-size: 1.3rem; margin-bottom: 4px; }
        .d-title span { font-size: 0.85rem; color: var(--text-muted); }

        .stat-grid-intel { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 2rem; }
        .i-stat { background: var(--surface-light); padding: 15px; border-radius: 16px; border: 1px solid var(--border); }
        .i-val { font-size: 1.6rem; font-weight: 800; display: block; margin-bottom: 4px; }
        .i-lbl { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        .disease-split-viz h4, .trend-analysis-card h4 { font-size: 0.95rem; margin-bottom: 1.2rem; border-left: 3px solid var(--primary); padding-left: 10px; }

        .disease-legend-intel { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1rem; }
        .l-item-split { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted); }
        .l-item-split .dot { width: 8px; height: 8px; border-radius: 50%; }

        .primary-intel-btn {
          width: 100%;
          background: var(--primary);
          color: var(--text);
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
        }

        .primary-intel-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(14, 165, 233, 0.4); }

        .predictive-alert-card {
          background: rgba(245, 158, 11, 0.05);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 24px;
          padding: 1.5rem;
        }

        .alert-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .alert-top h4 { color: #f59e0b; font-size: 1rem; }
        .predictive-alert-card p { font-size: 0.85rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 12px; }
        .alert-meta { font-size: 0.75rem; color: #f59e0b; font-weight: 600; display: flex; align-items: center; gap: 6px; }
      `}</style>
    </div>
  );
};

export default DistrictDiseaseIntelligence;
