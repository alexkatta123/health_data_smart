import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Map as MapIcon, 
  ShieldCheck, 
  Filter, 
  Search, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap,
  Globe,
  Database,
  Cpu,
  Layers,
  ChevronRight,
  Target,
  BarChart3,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';

const StateCommandDashboard = () => {
  const [activeSector, setActiveSector] = useState('All Sectors');
  const [timeRange, setTimeRange] = useState('WEEKLY');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'CLASSIFICATION ACCURACY', value: '94.2%', trend: '+0.4%', status: 'Stable', icon: <Cpu /> },
    { label: 'EMERGING ANOMALIES', value: '08', trend: '+2', status: 'Rising', icon: <AlertTriangle /> },
    { label: 'ACTIVE SURVEILLANCE', value: '26', trend: '100%', status: 'Secure', icon: <Globe /> },
    { label: 'DAILY DATA INGEST', value: '142K', trend: '+12%', status: 'Optimal', icon: <Database /> }
  ];

  const trendDatasets = {
    'WEEKLY': [
      { name: 'Mon', cases: 4200, anomalies: 12 },
      { name: 'Tue', cases: 5100, anomalies: 18 },
      { name: 'Wed', cases: 4800, anomalies: 15 },
      { name: 'Thu', cases: 6200, anomalies: 24 },
      { name: 'Fri', cases: 5900, anomalies: 20 },
      { name: 'Sat', cases: 7500, anomalies: 32 },
    ],
    'MONTHLY': [
      { name: 'Week 1', cases: 18000, anomalies: 45 },
      { name: 'Week 2', cases: 22000, anomalies: 60 },
      { name: 'Week 3', cases: 21000, anomalies: 55 },
      { name: 'Week 4', cases: 28000, anomalies: 90 },
    ],
    'QUARTERLY': [
      { name: 'Jan', cases: 85000, anomalies: 120 },
      { name: 'Feb', cases: 92000, anomalies: 140 },
      { name: 'Mar', cases: 105000, anomalies: 180 },
    ]
  };

  const allHotspots = [
    { id: 1, name: 'VISAKHAPATNAM', status: 'CRITICAL', sector: 'Coastal', top: '25%', left: '75%' },
    { id: 2, name: 'TIRUPATI', status: 'RISING', sector: 'Rayalaseema', top: '80%', left: '40%' },
    { id: 3, name: 'GUNTUR', status: 'STABLE', sector: 'Central', top: '55%', left: '60%' },
    { id: 4, name: 'KURNOOL', status: 'RISING', sector: 'Rayalaseema', top: '65%', left: '25%' },
    { id: 5, name: 'VIJAYAWADA', status: 'STABLE', sector: 'Central', top: '50%', left: '55%' },
    { id: 6, name: 'NELLORE', status: 'STABLE', sector: 'Coastal', top: '75%', left: '50%' },
    { id: 7, name: 'ANANTAPUR', status: 'RISING', sector: 'Rayalaseema', top: '70%', left: '15%' },
    { id: 8, name: 'KAKINADA', status: 'STABLE', sector: 'Coastal', top: '35%', left: '70%' },
    { id: 9, name: 'RAJAHMUNDRY', status: 'RISING', sector: 'Coastal', top: '40%', left: '65%' },
    { id: 10, name: 'KADAPA', status: 'STABLE', sector: 'Rayalaseema', top: '75%', left: '30%' }
  ];

  const filteredHotspots = allHotspots.filter(h => 
    (activeSector === 'All Sectors' || h.sector === activeSector) &&
    (h.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="state-command-hub animate-fade">
      
      {/* Tactical Intelligence Row */}
      <div className="intelligence-row-p">
         {stats.map((stat, i) => (
           <div key={i} className="intel-card-modern">
              <div className="ic-header">
                 <div className="ic-icon-box">{stat.icon}</div>
                 <div className="ic-trend" style={{ color: stat.status === 'Rising' ? '#f43f5e' : '#10b981' }}>
                    {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.trend}
                 </div>
              </div>
              <div className="ic-body">
                 <small>{stat.label}</small>
                 <strong>{stat.value}</strong>
              </div>
              <div className="ic-footer">
                 <div className="status-dot" style={{ background: stat.status === 'Rising' ? '#f43f5e' : '#10b981' }}></div>
                 {stat.status}
              </div>
           </div>
         ))}
      </div>

      {/* Main Command Formation */}
      <div className="command-grid-p">
         
         {/* Sector 1: Spatio-Temporal Intelligence (Map) */}
         <div className="command-sector-p mo-card-p">
            <div className="sector-header-p">
               <div className="sh-left">
                  <MapIcon size={20} color="var(--primary)" />
                  <h3>Statewide Morbidity Matrix</h3>
               </div>
                <div className="sh-right">
                   <div className="sector-select-p" style={{ display: 'flex', gap: '8px', marginRight: '10px' }}>
                      {['All Sectors', 'Coastal', 'Central', 'Rayalaseema'].map(s => (
                        <button 
                          key={s} 
                          onClick={() => setActiveSector(s)}
                          style={{ 
                            padding: '6px 12px', 
                            fontSize: '0.7rem', 
                            fontWeight: 800, 
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            background: activeSector === s ? 'var(--primary)' : 'var(--surface-light)',
                            color: activeSector === s ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer'
                          }}
                        >
                          {s}
                        </button>
                      ))}
                   </div>
                   <div className="map-search-p">
                      <Search size={14} />
                      <input 
                        type="text" 
                        placeholder="Locate district hub..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>
                </div>
            </div>
            
            <div className="map-viewport-p">
               <div className="map-grid-overlay"></div>
               {filteredHotspots.map(h => (
                  <div key={h.id} className={`hotspot-p ${h.status.toLowerCase()}`} style={{ top: h.top, left: h.left }}>
                    <div className="h-pulse" style={{ background: h.status === 'CRITICAL' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)' }}></div>
                    <div className="h-core" style={{ background: h.status === 'CRITICAL' ? '#f43f5e' : '#10b981' }}></div>
                    <span className="h-label">{h.name} [{h.status}]</span>
                  </div>
                ))}
               
               {/* Map Data Overlay */}
               <div className="map-legend-p">
                  <div className="legend-item"><span className="dot critical"></span> CRITICAL SURGE</div>
                  <div className="legend-item"><span className="dot moderate"></span> MODERATE RISK</div>
                  <div className="legend-item"><span className="dot stable"></span> STABLE SECTOR</div>
               </div>
            </div>

            <div className="sector-footer-p">
               <div className="sf-item">
                  <Target size={14} />
                  <span>SURVEILLANCE ACCURACY: <strong>96.8%</strong></span>
               </div>
               <button className="h-btn-secondary"><Download size={14} /> Export GIS Data</button>
            </div>
         </div>

         {/* Sector 2: AI Classification Insights */}
         <div className="command-sector-p mo-card-p">
            <div className="sector-header-p">
               <div className="sh-left">
                  <TrendingUp size={20} color="#8b5cf6" />
                  <h3>Autonomous Trend Analysis</h3>
               </div>
                <div className="sector-filters">
                   {['WEEKLY', 'MONTHLY', 'QUARTERLY'].map(t => (
                     <button 
                       key={t} 
                       className={`sf-btn ${timeRange === t ? 'active' : ''}`}
                       onClick={() => setTimeRange(t)}
                     >
                       {t}
                     </button>
                   ))}
                </div>
            </div>

            <div className="trend-viz-p" style={{ height: '280px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendDatasets[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-muted)' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-muted)' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--surface)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 800
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cases" 
                    stroke="var(--primary)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorCases)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="insight-feed-p">
               <div className="insight-item-p">
                  <div className="ii-icon"><Zap size={16} /></div>
                  <div className="ii-text">
                     <strong>Anomaly Detected: MVP Colony</strong>
                     <p>Sudden 18% spike in enteric cases over 24h baseline.</p>
                  </div>
                  <ChevronRight size={16} color="#475569" />
               </div>
               <div className="insight-item-p">
                  <div className="ii-icon"><ShieldCheck size={16} color="#10b981" /></div>
                  <div className="ii-text">
                     <strong>Vector Control Optimized</strong>
                     <p>Guntur hub reporting 12% decline in dengue vectors.</p>
                  </div>
                  <ChevronRight size={16} color="#475569" />
               </div>
            </div>
         </div>
      </div>

      <style>{`
        .state-command-hub {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding: 1rem 0;
        }

        .intelligence-row-p {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .intel-card-modern {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: 0.3s;
        }
        .intel-card-modern:hover { border-color: var(--primary); transform: translateY(-5px); }

        .ic-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .ic-icon-box { width: 52px; height: 52px; border-radius: 14px; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .ic-trend { font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; gap: 4px; }

        .ic-body small { display: block; font-size: 0.8rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 8px; }
        .ic-body strong { font-size: 2.5rem; font-weight: 900; color: var(--text); }

        .ic-footer { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 900; color: var(--text-muted); margin-top: 1.5rem; text-transform: uppercase; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }

        .command-grid-p { display: grid; grid-template-columns: 1.6fr 1fr; gap: 2.5rem; min-height: 600px; }
        .mo-card-p { background: var(--surface); border: 1px solid var(--border); border-radius: 40px; padding: 2.5rem; }

        .sector-header-p { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .sh-left { display: flex; align-items: center; gap: 15px; }
        .sh-left h3 { font-size: 1.4rem; font-weight: 900; margin: 0; }
        .sh-right { display: flex; gap: 15px; }

        .map-search-p { display: flex; align-items: center; gap: 12px; background: var(--surface-light); padding: 12px 20px; border-radius: 12px; border: 1px solid var(--border); }
        .map-search-p input { background: transparent; border: none; color: var(--text); font-size: 0.95rem; outline: none; font-weight: 600; }
        .tactical-filter-btn { width: 44px; height: 44px; border-radius: 10px; background: var(--surface-light); border: 1px solid var(--border); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; }

        .map-viewport-p { height: 400px; background: var(--surface-light); border-radius: 32px; border: 1px solid var(--border); position: relative; overflow: hidden; }
        .map-grid-overlay { position: absolute; inset: 0; background-image: radial-gradient(var(--border) 1px, transparent 1px); background-size: 40px 40px; }

        .hotspot-p { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .h-pulse { position: absolute; inset: -15px; background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 50%; animation: pulseMap 3s infinite; }
        .h-core { width: 12px; height: 12px; background: #f43f5e; border-radius: 50%; border: 2px solid var(--surface); box-shadow: 0 0 20px #f43f5e; }
        .h-label { font-size: 0.75rem; font-weight: 900; color: var(--text); letter-spacing: 1px; white-space: nowrap; background: var(--primary); padding: 6px 12px; border-radius: 8px; box-shadow: 0 4px 12px var(--primary-glow); }

        .map-legend-p { position: absolute; bottom: 20px; right: 20px; background: var(--surface); padding: 16px 24px; border-radius: 20px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 12px; box-shadow: var(--card-shadow); }
        .legend-item { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); display: flex; align-items: center; gap: 10px; }
        .legend-item .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.critical { background: #f43f5e; }
        .dot.moderate { background: #f59e0b; }
        .dot.stable { background: #40916C; }

        .sector-footer-p { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .sf-item { display: flex; align-items: center; gap: 10px; font-size: 0.95rem; font-weight: 700; color: var(--text-muted); }
        .sf-item strong { color: var(--text); }

        .sector-filters { display: flex; gap: 8px; background: var(--surface-light); padding: 6px; border-radius: 12px; border: 1px solid var(--border); }
        .sf-btn { padding: 8px 16px; font-size: 0.85rem; font-weight: 900; color: var(--text-muted); border: none; background: transparent; cursor: pointer; border-radius: 8px; transition: 0.2s; }
        .sf-btn.active { background: var(--primary); color: var(--text); box-shadow: 0 4px 12px var(--primary-glow); }

        .trend-viz-p { height: 220px; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 1rem 2rem; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
        .mock-chart-p { display: flex; align-items: flex-end; gap: 20px; width: 100%; height: 100%; }
        .chart-bar-p { flex: 1; background: var(--primary-glow); border-radius: 12px 12px 0 0; transition: 0.5s; position: relative; }
        .chart-bar-p:hover { background: var(--primary); }

        .insight-feed-p { display: flex; flex-direction: column; gap: 1.5rem; }
        .insight-item-p { display: flex; align-items: center; gap: 1.5rem; background: var(--surface-light); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); transition: 0.2s; cursor: pointer; }
        .insight-item-p:hover { border-color: var(--primary); transform: translateX(5px); box-shadow: var(--card-shadow); }
        .ii-icon { width: 48px; height: 48px; border-radius: 14px; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--primary); border: 1px solid var(--border); }
        .ii-text strong { display: block; font-size: 1.1rem; color: var(--text); margin-bottom: 4px; font-weight: 900; }
        .ii-text p { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; margin: 0; }

        @keyframes pulseMap { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>
    </div>
  );
};

export default StateCommandDashboard;
