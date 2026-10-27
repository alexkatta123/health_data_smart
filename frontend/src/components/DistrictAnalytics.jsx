import React from 'react';
import { 
  BarChart3, PieChart, TrendingUp, 
  Download, FileText, FileSpreadsheet,
  Calendar, Filter, ArrowUpRight, ArrowDownRight,
  Info, ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const DistrictAnalytics = () => {
  const departments = [
    { name: 'Public Works', resolved: 92, efficiency: 88, trend: 'up' },
    { name: 'Sanitation', resolved: 78, efficiency: 72, trend: 'down' },
    { name: 'Electrical', resolved: 85, efficiency: 90, trend: 'up' },
    { name: 'Horticulture', resolved: 96, efficiency: 95, trend: 'up' },
    { name: 'Health Dept', resolved: 88, efficiency: 84, trend: 'up' }
  ];

  const velocityData = [
    { name: 'Jan', velocity: 30 },
    { name: 'Feb', velocity: 45 },
    { name: 'Mar', velocity: 35 },
    { name: 'Apr', velocity: 60 },
    { name: 'May', velocity: 75 },
    { name: 'Jun', velocity: 55 },
    { name: 'Jul', velocity: 80 },
    { name: 'Aug', velocity: 95 },
    { name: 'Sep', velocity: 85 },
    { name: 'Oct', velocity: 70 },
    { name: 'Nov', velocity: 90 },
    { name: 'Dec', velocity: 100 },
  ];

  return (
    <div className="analytics-container animate-fade">
      <div className="page-header">
        <div className="header-title">
          <h2>Reports & Data Analytics</h2>
          <p>Gain deep insights into district operations and department efficiency.</p>
        </div>
        <div className="header-actions">
           <button className="export-group-btn"><FileText size={18} /> Export PDF</button>
           <button className="export-group-btn primary"><FileSpreadsheet size={18} /> Export Excel</button>
        </div>
      </div>

      {/* Analytics Hero Row */}
      <div className="analytics-hero-grid">
         <div className="analytics-card main-chart">
            <div className="card-header">
               <div className="title-group">
                  <h3>Complaint Resolution Velocity</h3>
                  <span>Average time to resolve public grievances</span>
               </div>
               <div className="period-selector">
                  <button className="active">Monthly</button>
                  <button>Yearly</button>
               </div>
            </div>
            <div className="velocity-chart-wrapper" style={{ height: '240px', width: '100%', marginTop: '1.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    cursor={{ fill: 'var(--surface-light)' }}
                    contentStyle={{ 
                      background: 'var(--surface)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 800
                    }}
                  />
                  <Bar 
                    dataKey="velocity" 
                    fill="var(--primary)" 
                    radius={[4, 4, 0, 0]} 
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="analytics-card stats-summary">
            <h3>Key Performance Indicators</h3>
            <div className="kpi-list">
               <div className="kpi-item">
                  <div className="kpi-info">
                     <span>Avg. Resolution Time</span>
                     <strong>4.2 Days</strong>
                  </div>
                  <div className="kpi-trend up"><ArrowUpRight size={14} /> 12%</div>
               </div>
               <div className="kpi-item">
                  <div className="kpi-info">
                     <span>Public Satisfaction</span>
                     <strong>88.4%</strong>
                  </div>
                  <div className="kpi-trend up"><ArrowUpRight size={14} /> 4.2%</div>
               </div>
               <div className="kpi-item">
                  <div className="kpi-info">
                     <span>Budget Utilization</span>
                     <strong>64.2%</strong>
                  </div>
                  <div className="kpi-trend down"><ArrowDownRight size={14} /> 2.1%</div>
               </div>
            </div>
            <button className="view-details-btn">View Detailed Audit <ChevronRight size={16} /></button>
         </div>
      </div>

      {/* Department Efficiency Matrix */}
      <div className="analytics-card full-width">
         <div className="card-header">
            <h3>Department Efficiency Matrix</h3>
            <div className="filter-pill-group">
               <button className="filter-pill active">Efficiency</button>
               <button className="filter-pill">Resolution</button>
               <button className="filter-pill">Budget</button>
            </div>
         </div>
         <div className="efficiency-table">
            <div className="et-head">
               <span>Department</span>
               <span>Resolution Rate</span>
               <span>Efficiency Score</span>
               <span>Trend</span>
               <span>Actions</span>
            </div>
            <div className="et-body">
               {departments.map((d, i) => (
                 <div key={i} className="et-row">
                    <div className="dept-name-cell">
                       <div className="dept-icon">{d.name[0]}</div>
                       <strong>{d.name}</strong>
                    </div>
                    <div className="rate-cell">
                       <div className="rate-bar-bg">
                          <div className="rate-bar-fill" style={{ width: `${d.resolved}%`, background: d.resolved > 85 ? '#10b981' : '#f59e0b' }}></div>
                       </div>
                       <span className="rate-val">{d.resolved}%</span>
                    </div>
                    <div className="score-cell">
                       <span className={`score-badge ${d.efficiency > 90 ? 'high' : 'mid'}`}>{d.efficiency}%</span>
                    </div>
                    <div className={`trend-cell ${d.trend}`}>
                       {d.trend === 'up' ? <TrendingUp size={18} /> : <ArrowDownRight size={18} />}
                    </div>
                    <div className="action-cell">
                       <button className="report-btn">Get Report</button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <style>{`
        .analytics-container { display: flex; flex-direction: column; gap: 2rem; }
        
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .header-title h2 { margin: 0; font-size: 1.6rem; font-weight: 800; }
        .header-title p { margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem; }
        
        .header-actions { display: flex; gap: 12px; }
        .export-group-btn { 
          display: flex; align-items: center; gap: 8px; padding: 10px 18px; 
          border-radius: 12px; background: var(--surface); border: 1px solid var(--border); 
          color: var(--text); font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;
        }
        .export-group-btn.primary { background: var(--primary); color: var(--text); border-color: var(--primary); }
        .export-group-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

        .analytics-hero-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .analytics-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2rem; }
        
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
        .title-group h3 { margin: 0; font-size: 1.2rem; font-weight: 800; }
        .title-group span { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-top: 4px; display: block; }
        
        .period-selector { display: flex; background: var(--bg); padding: 4px; border-radius: 10px; border: 1px solid var(--border); }
        .period-selector button { padding: 6px 14px; border-radius: 8px; border: none; background: transparent; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .period-selector button.active { background: var(--surface); color: var(--primary); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

        .velocity-chart-mock { height: 200px; display: flex; align-items: flex-end; gap: 15px; padding: 0 10px; border-bottom: 1px solid var(--border); }
        .v-bar-container { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .v-bar { width: 100%; background: var(--primary); border-radius: 6px 6px 2px 2px; position: relative; overflow: hidden; transition: height 1s ease-out; }
        .v-bar-glow { position: absolute; top: 0; left: 0; width: 100%; height: 40px; background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent); }
        .v-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 800; }

        .kpi-list { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; }
        .kpi-item { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: var(--bg); border-radius: 20px; border: 1px solid var(--border); }
        .kpi-info span { font-size: 0.7rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; }
        .kpi-info strong { display: block; font-size: 1.4rem; font-weight: 900; margin-top: 4px; }
        .kpi-trend { font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; }
        .kpi-trend.up { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .kpi-trend.down { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .view-details-btn { width: 100%; margin-top: 2rem; padding: 12px; border-radius: 12px; background: transparent; border: 1px solid var(--border); color: var(--text); font-size: 0.85rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .view-details-btn:hover { background: var(--surface-light); }

        .filter-pill-group { display: flex; gap: 8px; }
        .filter-pill { padding: 6px 14px; border-radius: 100px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .filter-pill.active { background: rgba(59, 130, 246, 0.1); color: var(--primary); border-color: var(--primary); }

        .efficiency-table { display: flex; flex-direction: column; }
        .et-head { display: grid; grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr; padding: 0 1.5rem 1rem 1.5rem; border-bottom: 1px solid var(--border); font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; }
        .et-row { display: grid; grid-template-columns: 1.5fr 2fr 1fr 1fr 1fr; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.03); align-items: center; }
        .et-row:hover { background: var(--surface); }

        .dept-name-cell { display: flex; align-items: center; gap: 12px; }
        .dept-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--surface-light); display: flex; align-items: center; justify-content: center; font-weight: 900; color: var(--primary); font-size: 0.8rem; border: 1px solid var(--border); }
        
        .rate-cell { display: flex; align-items: center; gap: 15px; }
        .rate-bar-bg { flex: 1; height: 6px; background: var(--bg); border-radius: 10px; }
        .rate-bar-fill { height: 100%; border-radius: 10px; }
        .rate-val { font-size: 0.85rem; font-weight: 800; min-width: 40px; }

        .score-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 800; }
        .score-badge.high { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .score-badge.mid { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

        .trend-cell.up { color: #10b981; }
        .trend-cell.down { color: #ef4444; }

        .report-btn { padding: 6px 12px; border-radius: 8px; background: transparent; border: 1px solid var(--border); color: var(--text-muted); font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .report-btn:hover { color: var(--text); border-color: var(--text); }
      `}</style>
    </div>
  );
};

export default DistrictAnalytics;
