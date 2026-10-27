import React from 'react';
import { Building2, Activity, Users, Truck } from 'lucide-react';

const StateInfrastructure = () => {
  const regions = [
    { name: 'North Coastal', facilities: 420, staff: '12.4k', capacity: '82%', status: 'Stable' },
    { name: 'Godavari Region', facilities: 380, staff: '10.2k', capacity: '74%', status: 'Optimal' },
    { name: 'Krishna-Guntur', facilities: 510, staff: '15.8k', capacity: '91%', status: 'High Load' },
    { name: 'Rayalaseema South', facilities: 440, staff: '11.5k', capacity: '68%', status: 'Optimal' }
  ];

  return (
    <div className="state-infrastructure animate-fade">
      <div className="infra-stats" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '1.5rem', marginBottom: '2.5rem' }}>
         <div className="mo-card">
            <div style={{ color: 'var(--primary)', marginBottom: '10px' }}><Building2 size={24} /></div>
            <h3>1,750</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total PHCs Syncing</span>
         </div>
         <div className="mo-card">
            <div style={{ color: '#10b981', marginBottom: '10px' }}><Users size={24} /></div>
            <h3>52,400</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Clinical Staff Active</span>
         </div>
         <div className="mo-card">
            <div style={{ color: '#f43f5e', marginBottom: '10px' }}><Activity size={24} /></div>
            <h3>8,420</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Critical Care Units</span>
         </div>
         <div className="mo-card">
            <div style={{ color: '#8b5cf6', marginBottom: '10px' }}><Truck size={24} /></div>
            <h3>420</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mobile Testing Units</span>
         </div>
      </div>

      <div className="mo-card">
         <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3>Regional Health Readiness</h3>
            <button className="mo-button-outline">State Resource Map</button>
         </div>
         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
               <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '1.25rem' }}>Region</th>
                  <th style={{ padding: '1.25rem' }}>Total Facilities</th>
                  <th style={{ padding: '1.25rem' }}>Active Staff</th>
                  <th style={{ padding: '1.25rem' }}>Avg. Capacity</th>
                  <th style={{ padding: '1.25rem' }}>Status</th>
               </tr>
            </thead>
            <tbody>
               {regions.map((r, i) => (
                 <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1.25rem' }}><strong>{r.name}</strong></td>
                    <td style={{ padding: '1.25rem' }}>{r.facilities}</td>
                    <td style={{ padding: '1.25rem' }}>{r.staff}</td>
                    <td style={{ padding: '1.25rem' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{r.capacity}</span>
                          <div style={{ flex: 1, height: '6px', background: 'var(--bg)', borderRadius: '10px' }}>
                             <div style={{ width: r.capacity, height: '100%', background: parseInt(r.capacity) > 90 ? '#f43f5e' : 'var(--primary)' }}></div>
                          </div>
                       </div>
                    </td>
                    <td style={{ padding: '1.25rem' }}>
                       <span className={`status-pill ${r.status.replace(' ', '-').toLowerCase()}`}>{r.status}</span>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2rem; }
        .status-pill { padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; }
        .status-pill.stable { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .status-pill.optimal { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill.high-load { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default StateInfrastructure;
