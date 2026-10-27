import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, MapPin, 
  TrendingUp, TrendingDown, Eye, Layers, 
  Zap, Globe, Database, Calendar,
  ArrowRight, Search, Filter, Download,
  Thermometer, Wind, Droplets
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

const SpatialTemporalIntelligence = () => {
  const [activeTab, setActiveTab] = useState('spatial'); // spatial, temporal, correlation
  const [loading, setLoading] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);

  // Mock ML-Identified Cluster Data
  const clusters = [
    { id: 1, name: 'Cluster-Alpha', type: 'Vector-Borne (Dengue)', x: 120, y: 150, intensity: 85, cases: 142, trend: '+18%', status: 'Active', prob: 92 },
    { id: 2, name: 'Cluster-Beta', type: 'Water-Borne (Typhoid)', x: 450, y: 220, intensity: 60, cases: 88, trend: '+12%', status: 'Expanding', prob: 88 },
    { id: 3, name: 'Cluster-Gamma', type: 'Respiratory (Flu)', x: 300, y: 380, intensity: 45, cases: 56, trend: '-4%', status: 'Stabilizing', prob: 76 },
  ];

  // Mock Temporal Progression Data (OP vs IP)
  const temporalData = [
    { day: 'Day 1', op: 40, ip: 5, risk: 20 },
    { day: 'Day 2', op: 65, ip: 8, risk: 35 },
    { day: 'Day 3', op: 88, ip: 12, risk: 50 },
    { day: 'Day 4', op: 110, ip: 18, risk: 70 },
    { day: 'Day 5', op: 145, ip: 25, risk: 85 },
    { day: 'Day 6', op: 130, ip: 32, risk: 90 },
    { day: 'Day 7', op: 120, ip: 38, risk: 95 },
  ];

  return (
    <div className="st-intelligence-matrix animate-fade">
      <header className="st-header">
        <div className="title-section">
          <div className="st-badge"><Zap size={14} /> ML-DRIVEN PATTERN RECOGNITION</div>
          <h1>Spatial-Temporal Intelligence</h1>
          <p>Analyzing the intersection of geographic case density and temporal progression across OP/IP registries.</p>
        </div>
        
        <div className="tab-switcher">
          <button className={activeTab === 'spatial' ? 'active' : ''} onClick={() => setActiveTab('spatial')}>
            <Globe size={18} /> Spatial Engine
          </button>
          <button className={activeTab === 'temporal' ? 'active' : ''} onClick={() => setActiveTab('temporal')}>
            <Calendar size={18} /> Temporal Pipeline
          </button>
          <button className={activeTab === 'correlation' ? 'active' : ''} onClick={() => setActiveTab('correlation')}>
            <Activity size={18} /> OP/IP Correlation
          </button>
        </div>
      </header>

      <div className="st-content-grid">
        {/* Main Visualization View */}
        <div className="st-main-viz h-card">
          {activeTab === 'spatial' && (
            <div className="spatial-visualization animate-fade">
              <div className="viz-header">
                <h3>Geospatial Pathogen Mapping</h3>
                <div className="viz-controls">
                  <button className="v-btn"><Layers size={14} /> Heatmap</button>
                  <button className="v-btn"><MapPin size={14} /> Saturation</button>
                </div>
              </div>
              
              <div className="map-simulation">
                <svg width="100%" height="100%" viewBox="0 0 800 500" style={{ background: 'var(--surface-light)', borderRadius: '20px' }}>
                   {/* Mock District Outlines */}
                   <path d="M100,50 L300,30 L500,80 L700,40 L750,200 L600,400 L400,450 L200,420 L50,300 Z" fill="rgba(255,255,255,0.02)" stroke="var(--border)" strokeWidth="2" />
                   
                   {/* ML-Identified Clusters */}
                   {clusters.map(c => (
                     <g key={c.id} className="map-cluster" onClick={() => setSelectedCluster(c)} style={{ cursor: 'pointer' }}>
                        <circle cx={c.x} cy={c.y} r={c.intensity / 2} fill={`url(#gradient-${c.id})`} opacity="0.6">
                           <animate attributeName="r" values={`${c.intensity/2};${c.intensity/2 + 5};${c.intensity/2}`} dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={c.x} cy={c.y} r="4" fill="white" />
                        <defs>
                          <radialGradient id={`gradient-${c.id}`}>
                            <stop offset="0%" stopColor={c.intensity > 80 ? '#f43f5e' : '#0ea5e9'} />
                            <stop offset="100%" stopColor="transparent" />
                          </radialGradient>
                        </defs>
                     </g>
                   ))}
                </svg>
                
                <div className="map-legend">
                   <div className="legend-item"><span className="dot crit"></span> High Intensity Cluster</div>
                   <div className="legend-item"><span className="dot warn"></span> Emerging Concentration</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'temporal' && (
            <div className="temporal-visualization animate-fade">
              <div className="viz-header">
                <h3>7-Day Outbreak Progression</h3>
                <div className="viz-controls">
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)' }}>PREDICTIVE CONFIDENCE: 94.2%</span>
                </div>
              </div>
              
              <div style={{ height: '400px', width: '100%', marginTop: '2rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temporalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorIp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--text-muted)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--text-muted)' }} />
                    <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', fontWeight: 800 }} />
                    <Area type="monotone" dataKey="op" name="Outpatient Surge" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorOp)" />
                    <Area type="monotone" dataKey="ip" name="Inpatient Admissions" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorIp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'correlation' && (
            <div className="correlation-visualization animate-fade">
              <div className="viz-header">
                <h3>OP-IP Lag Correlation Matrix</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Analyzing the temporal delta between symptom onset (OP) and severity escalation (IP).</p>
              </div>
              
              <div style={{ height: '380px', width: '100%', marginTop: '2rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis type="number" dataKey="op" name="OP Surge" unit=" cases" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--text-muted)' }} />
                    <YAxis type="number" dataKey="ip" name="IP Admission" unit=" cases" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--text-muted)' }} />
                    <ZAxis type="number" dataKey="risk" range={[100, 1000]} name="Risk Intensity" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', fontWeight: 800 }} />
                    <Scatter name="Pathogen Escalation" data={temporalData} fill="#0ea5e9">
                       {temporalData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.risk > 80 ? '#f43f5e' : '#0ea5e9'} fillOpacity={0.6} />
                       ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Intelligence Attribution */}
        <div className="st-sidebar">
          {selectedCluster ? (
            <div className="cluster-drilldown h-card animate-slide-up">
              <div className="drilldown-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="type-tag">{selectedCluster.type}</span>
                  <button className="close-btn" onClick={() => setSelectedCluster(null)}>&times;</button>
                </div>
                <h2>{selectedCluster.name}</h2>
                <div className="attribution-row">
                  <div className="a-score">
                    <span className="lbl">ML PROBABILITY</span>
                    <span className="val">{selectedCluster.prob}%</span>
                  </div>
                  <div className="a-score">
                    <span className="lbl">CASE LOAD</span>
                    <span className="val">{selectedCluster.cases}</span>
                  </div>
                </div>
              </div>
              
              <div className="drilldown-analysis">
                <h4>Attribution Logic</h4>
                <p>Model detected high correlation between fever-survey anomalies and OP registry surges in this sector. ICD-10 J11.1 (Flu) and A90 (Dengue) present in 84% of cases.</p>
                
                <div className="analysis-metrics">
                   <div className="am-item">
                      <Thermometer size={16} /> <span>Fever Surge: +42%</span>
                   </div>
                   <div className="am-item">
                      <Droplets size={16} /> <span>Rainfall Lag: 48h</span>
                   </div>
                   <div className="am-item">
                      <Wind size={16} /> <span>Air Quality: Stable</span>
                   </div>
                </div>
              </div>
              
              <button className="st-action-btn">Initialize Tactical Containment <ArrowRight size={16} /></button>
            </div>
          ) : (
            <div className="intelligence-overview h-card">
              <h3>Active Insights</h3>
              <p>ML Engine is currently monitoring 128 PHC nodes for temporal-spatial anomalies.</p>
              
              <div className="insight-list">
                 {[
                   { title: 'Pathogen Clustering', desc: 'Identified 3 linked Dengue cases in Sector-4.', urgency: 'HIGH' },
                   { title: 'OP-IP Delta Alert', desc: 'Admissions lag OP surges by 72h.', urgency: 'MED' },
                   { title: 'Data Silence', desc: '3 nodes reporting 0 cases in 24h.', urgency: 'LOW' }
                 ].map((ins, i) => (
                   <div key={i} className="ins-card">
                      <div className="ins-header">
                        <strong>{ins.title}</strong>
                        <span className={`urg-tag ${ins.urgency.toLowerCase()}`}>{ins.urgency}</span>
                      </div>
                      <p>{ins.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .st-intelligence-matrix { padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
        .st-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 2rem; }
        .st-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--primary-glow); color: var(--primary); padding: 6px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 900; letter-spacing: 1px; }
        .st-header h1 { font-size: 2.8rem; font-weight: 900; margin: 0.5rem 0; letter-spacing: -1.5px; }
        .st-header p { color: var(--text-muted); font-weight: 600; font-size: 1.1rem; max-width: 600px; margin: 0; }

        .tab-switcher { display: flex; background: var(--surface); padding: 6px; border-radius: 20px; border: 1px solid var(--border); }
        .tab-switcher button { border: none; background: transparent; padding: 12px 24px; border-radius: 16px; font-weight: 800; font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; }
        .tab-switcher button.active { background: var(--surface-light); color: var(--primary); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }

        .st-content-grid { display: grid; grid-template-columns: 1fr 350px; gap: 2rem; }
        
        .st-main-viz { padding: 2.5rem; border-radius: 32px; min-height: 500px; }
        .viz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .viz-header h3 { margin: 0; font-size: 1.5rem; font-weight: 900; }
        
        .viz-controls { display: flex; gap: 10px; }
        .v-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 8px 16px; border-radius: 10px; font-weight: 800; font-size: 0.75rem; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .map-simulation { position: relative; width: 100%; height: 400px; }
        .map-legend { position: absolute; bottom: 20px; right: 20px; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(5px); }
        .legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: 800; color: white; margin-bottom: 8px; }
        .legend-item:last-child { margin-bottom: 0; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.crit { background: #f43f5e; box-shadow: 0 0 10px #f43f5e; }
        .dot.warn { background: #0ea5e9; box-shadow: 0 0 10px #0ea5e9; }

        .st-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        
        .cluster-drilldown { background: var(--surface); padding: 2rem; border-radius: 28px; border-left: 6px solid var(--primary); }
        .type-tag { font-size: 0.65rem; font-weight: 900; color: var(--primary); background: var(--primary-glow); padding: 4px 10px; border-radius: 6px; letter-spacing: 1px; }
        .close-btn { background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; }
        .cluster-drilldown h2 { margin: 0.5rem 0 1.5rem; font-size: 1.6rem; font-weight: 900; }
        
        .attribution-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .a-score { background: var(--surface-light); padding: 12px; border-radius: 15px; display: flex; flex-direction: column; gap: 4px; }
        .a-score .lbl { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; }
        .a-score .val { font-size: 1.2rem; font-weight: 900; color: var(--text); }

        .drilldown-analysis h4 { font-size: 0.8rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); margin: 0 0 1rem; }
        .drilldown-analysis p { font-size: 0.9rem; font-weight: 600; line-height: 1.6; color: var(--text); margin-bottom: 1.5rem; }
        
        .analysis-metrics { display: flex; flex-direction: column; gap: 10px; margin-bottom: 2rem; }
        .am-item { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 800; color: var(--text-muted); }
        .am-item span { color: var(--text); }

        .st-action-btn { width: 100%; background: var(--primary); border: none; color: white; padding: 18px; border-radius: 16px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 10px 25px var(--primary-glow); }

        .intelligence-overview { padding: 2rem; }
        .insight-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .ins-card { background: var(--surface-light); padding: 15px; border-radius: 18px; border: 1px solid var(--border); }
        .ins-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .ins-header strong { font-size: 0.85rem; font-weight: 800; }
        .urg-tag { font-size: 0.6rem; font-weight: 900; padding: 4px 8px; border-radius: 4px; }
        .urg-tag.high { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .urg-tag.med { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .urg-tag.low { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .ins-card p { margin: 0; font-size: 0.8rem; color: var(--text-muted); font-weight: 600; line-height: 1.4; }

        @media (max-width: 1024px) {
          .st-content-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default SpatialTemporalIntelligence;
