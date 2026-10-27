import React, { useState } from 'react';
import { Globe, ShieldCheck, Activity, TrendingUp, Map as MapIcon, Crosshair } from 'lucide-react';
import StateMap from './StateMap';

const StateOverview = () => {
  const [activeRegion, setActiveRegion] = useState('Statewide');
  const [hoveredBar, setHoveredBar] = useState(null);

  const stateStats = [
    { label: 'Active Alerts (Statewide)', val: '24', trend: '+4', color: '#f43f5e', icon: <Activity /> },
    { label: 'Avg. AI Confidence', val: '94.8%', trend: '+0.2%', color: '#10b981', icon: <ShieldCheck /> },
    { label: 'Hospital Sync Status', val: '100%', trend: 'Stable', color: '#0ea5e9', icon: <Globe /> },
    { label: 'Forecasted Risk', val: 'Moderate', trend: 'Seasonal', color: '#f59e0b', icon: <TrendingUp /> }
  ];

  return (
    <div className="state-overview animate-fade">
      <div className="module-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '1.5rem', marginBottom: '2rem' }}>
        {stateStats.map((s, i) => (
          <div key={i} className="mo-card stat-card" style={{ borderBottom: `4px solid ${s.color}` }}>
            <div className="icon-box" style={{ background: `${s.color}15`, color: s.color, marginBottom: '1rem' }}>{s.icon}</div>
            <span className="w-label" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>{s.label}</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginTop: '5px' }}>
              <h2 style={{ fontSize: '2.2rem', margin: 0 }}>{s.val}</h2>
              <span style={{ fontSize: '0.85rem', color: s.color, fontWeight: 800, marginBottom: '5px' }}>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="strategic-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
         <div className="mo-card">
            <h3>District Performance Matrix</h3>
            <div className="district-list" style={{ marginTop: '1.5rem' }}>
               {['Visakhapatnam', 'Guntur', 'Kurnool', 'Chittoor'].map((d, i) => (
                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.25rem' }}>
                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                          <strong>{d}</strong>
                          <span>{95 - i * 4}% Compliance</span>
                       </div>
                       <div style={{ height: '6px', background: 'var(--bg)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ width: `${95 - i * 4}%`, height: '100%', background: 'var(--primary)' }}></div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="mo-card">
            <h3>Statewide Disease Split</h3>
            <div style={{ display: 'flex', alignItems: 'center', height: '200px', justifyContent: 'center' }}>
               <div style={{ width: 150, height: 150, borderRadius: '50%', border: '15px solid var(--primary)', borderRightColor: '#f43f5e', borderBottomColor: '#f59e0b', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                     <strong>Top 3</strong>
                     <span style={{ fontSize: '0.7rem' }}>Diseases</span>
                  </div>
               </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.75rem', marginTop: '1rem' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%' }}></div> Viral Fever</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 8, height: 8, background: '#f43f5e', borderRadius: '50%' }}></div> Dengue</span>
            </div>
         </div>
      </div>

      <div className="mo-card geospatial-command-center" style={{ padding: '2.5rem' }}>
         <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
               <div style={{ width: 44, height: 44, background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapIcon size={24} />
               </div>
               <div>
                  <h3 style={{ margin: 0 }}>Geospatial Command Center</h3>
                  <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>Live Statewide Epidemiological Intelligence</p>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
               <button className="tactical-btn-s"><Crosshair size={18} /> Focus Capital</button>
               <button className="tactical-btn-s active">Statewide View</button>
            </div>
         </div>

         <StateMap />
      </div>

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2rem; }
        .icon-box { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .tactical-btn-s { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
        .tactical-btn-s.active { background: var(--primary); color: var(--text); border-color: var(--primary); box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3); }
        .tactical-btn-s:hover:not(.active) { background: var(--surface); color: var(--text); }
      `}</style>
    </div>
  );
};

export default StateOverview;
