import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, ArrowUpRight, BarChart3, Map, Building2, MapPin, Layers } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const MedicalOverview = ({ onAction }) => {
  const [stats, setStats] = useState(null);
  const [viewScope, setViewScope] = useState('State'); // 'State', 'District', 'PHC'

  useEffect(() => {
    // In a real app, this would fetch data based on the selected scope and user's role.
    // axios.get(`http://localhost:8000/api/dashboard/stats?scope=${viewScope}`)
  }, [viewScope]);

  // Dynamic data generation based on selected scope
  const getScopeMultiplier = () => {
    if (viewScope === 'State') return 100;
    if (viewScope === 'District') return 10;
    return 1;
  };

  const m = getScopeMultiplier();

  const widgets = [
    { label: "Today's OP Cases", value: stats ? stats.op_count : Math.floor(45 * m), trend: "+12% vs Yesterday", color: "#10b981" },
    { label: "IP Admissions", value: stats ? stats.ip_count : Math.floor(12 * m), trend: "+4% vs Yesterday", color: "#3b82f6" },
    { label: "AI Flagged Cases", value: stats ? stats.ml_classified : Math.floor(8 * m), trend: "Requires Validation", color: "#f59e0b" },
    { label: "Total Active Cases", value: stats ? stats.total_cases : Math.floor(145 * m), trend: "Current Load", color: "#f43f5e" }
  ];

  const trendData = [
    { name: 'May 1', communicable: Math.floor(30 * m), nonCommunicable: Math.floor(15 * m) },
    { name: 'May 2', communicable: Math.floor(35 * m), nonCommunicable: Math.floor(17 * m) },
    { name: 'May 3', communicable: Math.floor(25 * m), nonCommunicable: Math.floor(13 * m) },
    { name: 'May 4', communicable: Math.floor(45 * m), nonCommunicable: Math.floor(20 * m) },
    { name: 'May 5', communicable: Math.floor(38 * m), nonCommunicable: Math.floor(18 * m) },
    { name: 'May 6', communicable: Math.floor(52 * m), nonCommunicable: Math.floor(22 * m) },
    { name: 'May 7', communicable: Math.floor(40 * m), nonCommunicable: Math.floor(19 * m) }
  ];

  const topDiseases = [
    { name: 'Viral Fever', count: Math.floor(45 * m) },
    { name: 'Acute Diarrhea', count: Math.floor(30 * m) },
    { name: 'Dengue', count: Math.floor(15 * m) },
    { name: 'Typhoid', count: Math.floor(10 * m) },
    { name: 'Respiratory Infection', count: Math.floor(25 * m) }
  ].sort((a, b) => b.count - a.count);

  return (
    <div className="overview-tab animate-fade">
      {/* Scope Selector Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900 }}>Epidemiological Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0', fontWeight: 600 }}>Real-time disease trends and facility monitoring</p>
        </div>
        
        <div className="scope-selector" style={{ display: 'flex', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '16px', padding: '6px' }}>
          <button 
            className={`scope-btn ${viewScope === 'State' ? 'active' : ''}`}
            onClick={() => setViewScope('State')}
          >
            <Map size={16} /> STATE LEVEL
          </button>
          <button 
            className={`scope-btn ${viewScope === 'District' ? 'active' : ''}`}
            onClick={() => setViewScope('District')}
          >
            <Building2 size={16} /> DISTRICT LEVEL
          </button>
          <button 
            className={`scope-btn ${viewScope === 'PHC' ? 'active' : ''}`}
            onClick={() => setViewScope('PHC')}
          >
            <MapPin size={16} /> PHC LEVEL
          </button>
        </div>
      </div>

      <div className="module-grid" style={{ marginBottom: '2rem' }}>
        {widgets.map((w, i) => (
          <div key={i} className="mo-card widget-card" style={{ borderLeft: `4px solid ${w.color}` }}>
            <span className="w-label">{w.label}</span>
            <div className="w-main">
              <h3>{w.value.toLocaleString()}</h3>
              <span className="w-trend" style={{ color: w.color }}>{w.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="mo-card">
          <div className="card-header">
            <h4>{viewScope} Disease Trajectory</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#f43f5e'}}></div> Communicable</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)'}}></div> Non-Communicable</span>
            </div>
          </div>
          <div className="chart-wrapper" style={{ height: '320px', width: '100%', marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-muted)' }} 
                  dy={10}
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
                    boxShadow: 'var(--card-shadow)',
                    fontSize: '12px',
                    fontWeight: 800
                  }}
                />
                <Line type="monotone" dataKey="communicable" stroke="#f43f5e" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="nonCommunicable" stroke="var(--primary)" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mo-card">
          <div className="card-header">
             <h4>Top Outbreak Vectors</h4>
             <Layers size={16} color="var(--text-muted)" />
          </div>
          <div className="disease-list" style={{ marginTop: '1rem' }}>
            {topDiseases.map((d, i) => (
              <div key={i} className="d-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i === topDiseases.length - 1 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--surface-light)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>
                      #{i + 1}
                   </div>
                   <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 900, color: i === 0 ? '#f43f5e' : 'var(--text-muted)' }}>{d.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', marginTop: '1.5rem', padding: '12px', background: 'var(--primary-glow)', color: 'var(--primary)', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}>
             View Full Report
          </button>
        </div>
      </div>

      <style>{`
        .overview-tab { display: flex; flex-direction: column; }
        .module-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; box-shadow: var(--card-shadow); }
        .widget-card { display: flex; flex-direction: column; gap: 8px; transition: 0.3s; }
        .widget-card:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.05); }
        .w-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .w-main { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 10px; }
        .w-main h3 { font-size: 2.2rem; margin: 0; font-weight: 900; color: var(--text); }
        .w-trend { font-size: 0.7rem; font-weight: 800; background: var(--surface-light); padding: 4px 10px; border-radius: 100px; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .card-header h4 { margin: 0; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 900; }
        
        .scope-btn { padding: 10px 20px; border: none; background: transparent; color: var(--text-muted); font-size: 0.8rem; font-weight: 900; border-radius: 12px; cursor: pointer; display: flex; alignItems: center; gap: 8px; transition: 0.3s; }
        .scope-btn:hover { color: var(--text); }
        .scope-btn.active { background: var(--surface); color: var(--primary); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        
        @media (max-width: 992px) {
           .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default MedicalOverview;
