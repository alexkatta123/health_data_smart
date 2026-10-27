import React, { useState } from 'react';
import { TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Calendar, Filter, BrainCircuit, Map, Database, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';

const MedicalTrends = () => {
  const [datasetFilter, setDatasetFilter] = useState('Combined'); // 'Combined', 'OP', 'IP'
  const [timeFilter, setTimeFilter] = useState('Last 30 Days');

  // Base Data Generators
  const generateData = (range, type) => {
    const days = range === 'Last 30 Days' ? 7 : range === 'Last 90 Days' ? 12 : 15;
    const labels = range === 'Last 30 Days' ? ['01 May', '05 May', '10 May', '15 May', '20 May', '25 May', '30 May'] : 
                 range === 'Last 90 Days' ? ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] :
                 ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    let multiplier = type === 'OP' ? 0.8 : type === 'IP' ? 0.2 : 1.0;
    
    return labels.map((label, i) => {
      const base = 40 + (i * 5);
      const noise = Math.sin(i) * 15;
      const spike = (range === 'Last 30 Days' && (label === '20 May' || label === '25 May')) ? 80 : 0;
      
      return {
        day: label,
        respiratory: Math.floor((base + noise + spike + 10) * multiplier),
        enteric: Math.floor((base * 0.7 + noise * 0.5 + 5) * multiplier),
        viral: Math.floor((base * 0.4 + 10) * multiplier)
      };
    });
  };

  const chartData = generateData(timeFilter, datasetFilter);

  return (
    <div className="medical-trends-portal animate-fade">
      <div className="trends-header-p">
        <div className="h-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
             <BrainCircuit size={24} color="var(--primary)" />
             <h2 style={{ margin: 0 }}>ML Trend Detection Engine</h2>
          </div>
          <p>Identify temporal and spatial patterns across OP/IP datasets using predictive analytics.</p>
        </div>
        <div className="h-right">
          <div className="mo-filter-group">
            <div className="filter-item">
              <Database size={14} color="var(--primary)" />
              <select className="mo-select-p" value={datasetFilter} onChange={(e) => setDatasetFilter(e.target.value)}>
                <option value="Combined">Combined OP/IP</option>
                <option value="OP">Outpatient (OP) Data</option>
                <option value="IP">Inpatient (IP) Data</option>
              </select>
            </div>
            <div className="filter-item">
              <Calendar size={14} />
              <select className="mo-select-p" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
                <option value="Active Season">Active Season</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="main-chart-card mo-card-p">
        <div className="chart-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
             <div className="m-item">
               <div className="m-indicator" style={{ background: '#0ea5e9' }}></div>
               <span>Respiratory Syndromes</span>
             </div>
             <div className="m-item">
               <div className="m-indicator" style={{ background: '#10b981' }}></div>
               <span>Enteric Infections</span>
             </div>
             <div className="m-item">
               <div className="m-indicator" style={{ background: '#8b5cf6' }}></div>
               <span>Viral Vector (Unknown)</span>
             </div>
          </div>
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
             <AlertCircle size={14} /> ML SPATIAL ANOMALY DETECTED
          </div>
        </div>

        <div className="visualizer-area" style={{ marginTop: '2rem' }}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorResp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEnt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorViral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: 'var(--surface)', border: "1px solid var(--border)", borderRadius: '16px', color: "var(--text)", padding: '12px', boxShadow: 'var(--card-shadow)' }}
                itemStyle={{ fontSize: '0.8rem', fontWeight: 700 }}
              />
              
              {timeFilter === 'Last 30 Days' && (
                <>
                  <ReferenceArea x1="20 May" x2="25 May" strokeOpacity={0.3} fill="#f43f5e" fillOpacity={0.05} />
                  <ReferenceLine x="20 May" stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'top', value: 'Temporal Spike', fill: '#f43f5e', fontSize: 10, fontWeight: 900 }} />
                </>
              )}

              <Area type="monotone" dataKey="respiratory" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorResp)" strokeWidth={3} />
              <Area type="monotone" dataKey="enteric" stroke="#10b981" fillOpacity={1} fill="url(#colorEnt)" strokeWidth={3} />
              <Area type="monotone" dataKey="viral" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViral)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="trends-stats-row">
        <div className="t-card-mini mo-card-p">
          <div className="tc-icon" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}><Map size={24} /></div>
          <div className="tc-info">
            <small>SPATIAL CLUSTERING</small>
            <div className="tc-val-group">
              <strong>High Density</strong>
              <span className="spike-indicator">Visakhapatnam Hub</span>
            </div>
          </div>
        </div>
        <div className="t-card-mini mo-card-p">
          <div className="tc-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}><TrendingUp size={24} /></div>
          <div className="tc-info">
            <small>TEMPORAL VELOCITY</small>
            <div className="tc-val-group">
              <strong>{timeFilter === 'Last 30 Days' ? '+18.4%' : timeFilter === 'Last 90 Days' ? '+6.2%' : '+12.1%'}</strong>
              <span className="spike-indicator"><ArrowUpRight size={14} /> {timeFilter === 'Last 30 Days' ? '7-Day' : 'Moving'} Avg</span>
            </div>
          </div>
        </div>
        <div className="t-card-mini mo-card-p">
          <div className="tc-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Activity size={24} /></div>
          <div className="tc-info">
            <small>IP ADMISSION CORRELATION</small>
            <div className="tc-val-group">
              <strong>{datasetFilter === 'IP' ? '0.98' : '0.84'}</strong>
              <span style={{ color: '#10b981' }}>Strong ML Pearson</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .medical-trends-portal { padding: 1rem 0; }

        .trends-header-p {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .h-left h2 { font-size: 1.8rem; font-weight: 900; letter-spacing: -0.5px; }
        .h-left p { color: var(--text-muted); font-weight: 600; font-size: 0.95rem; margin: 4px 0 0 0; }

        .mo-filter-group { display: flex; gap: 1rem; }
        .filter-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 8px 16px;
          border-radius: 12px;
          color: var(--text-muted);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .mo-select-p {
          background: transparent;
          border: none;
          color: var(--text);
          font-size: 0.8rem;
          font-weight: 800;
          outline: none;
          cursor: pointer;
        }

        .mo-card-p {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: var(--card-shadow);
        }

        .main-chart-card { margin-bottom: 2rem; }
        .m-item { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .m-indicator { width: 10px; height: 10px; border-radius: 3px; }

        .trends-stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .t-card-mini { display: flex; align-items: center; gap: 20px; transition: 0.3s; }
        .t-card-mini:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.05); }
        .tc-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        
        .tc-info small { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1px; margin-bottom: 4px; }
        .tc-val-group { display: flex; align-items: baseline; gap: 12px; }
        .tc-val-group strong { font-size: 1.5rem; font-weight: 900; color: var(--text); }
        .tc-val-group span { font-size: 0.75rem; font-weight: 800; }
        .spike-indicator { color: #f43f5e; display: flex; align-items: center; gap: 4px; }
      `}</style>
    </div>
  );
};

export default MedicalTrends;
