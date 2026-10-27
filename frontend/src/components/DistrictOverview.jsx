import { Activity, AlertTriangle, Users, ArrowUpRight, Filter, ChevronDown } from 'lucide-react';

const DistrictOverview = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Guntur');
  const [filterStatus, setFilterStatus] = useState('All');
  const stats = [
    { label: 'Active Clusters', val: selectedDistrict === 'Guntur' ? '08' : '05', trend: '+2', color: '#f43f5e', icon: <Activity /> },
    { label: 'High Risk Facilities', val: selectedDistrict === 'Guntur' ? '12' : '08', trend: '-1', color: '#f59e0b', icon: <AlertTriangle /> },
    { label: 'Screenings Today', val: selectedDistrict === 'Guntur' ? '4,280' : '3,150', trend: '+12%', color: '#0ea5e9', icon: <Users /> },
    { label: 'Surveillance Efficacy', val: '94.2%', trend: 'Optimal', color: '#10b981', icon: <Activity /> }
  ];

  const allClusters = [
    { name: 'Vizag West - Dengue Spike', district: 'Visakhapatnam', status: 'Critical', time: '2h ago' },
    { name: 'Guntur South - Cholera Alert', district: 'Guntur', status: 'Alert', time: '5h ago' },
    { name: 'Kurnool East - Viral Cluster', district: 'Kurnool', status: 'Stable', time: '1d ago' },
    { name: 'Guntur North - Malaria Risk', district: 'Guntur', status: 'Critical', time: '4h ago' },
    { name: 'Tenali - Enteric Surge', district: 'Guntur', status: 'Alert', time: '6h ago' }
  ];

  const filteredClusters = allClusters.filter(c => 
    (selectedDistrict === 'All Districts' || c.district === selectedDistrict) &&
    (filterStatus === 'All' || c.status === filterStatus)
  );

  return (
    <div className="district-overview animate-fade">
      <div className="overview-filters" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div className="f-left" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="select-wrapper" style={{ position: 'relative' }}>
            <select 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{ appearance: 'none', background: 'var(--surface)', border: '1px solid var(--border)', padding: '12px 40px 12px 20px', borderRadius: '14px', fontSize: '1rem', fontWeight: 800, color: 'var(--text)', cursor: 'pointer' }}
            >
              <option>All Districts</option>
              <option>Guntur</option>
              <option>Visakhapatnam</option>
              <option>Kurnool</option>
              <option>Tirupati</option>
            </select>
            <ChevronDown size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
          </div>
          <div className="status-pills" style={{ display: 'flex', gap: '8px', background: 'var(--surface-light)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border)' }}>
            {['All', 'Critical', 'Alert', 'Stable'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilterStatus(s)}
                style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: filterStatus === s ? 'var(--primary)' : 'transparent', color: filterStatus === s ? 'white' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button className="h-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Filter size={16} /> Advanced Filters</button>
      </div>

      <div className="module-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="mo-card stat-card" style={{ borderTop: `4px solid ${s.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div className="icon-box" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
              <span className="trend-tag" style={{ color: s.color }}>{s.trend}</span>
            </div>
            <h2 style={{ fontSize: '2rem', margin: '5px 0' }}>{s.val}</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '1.5rem' }}>
        <div className="mo-card">
           <div className="card-header">
              <h3>Active Outbreak Clusters</h3>
              <button className="btn-mini">View Protocol</button>
           </div>
            <div className="cluster-list">
               {filteredClusters.length > 0 ? filteredClusters.map((c, i) => (
                 <div key={i} className="cluster-item" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: c.status === 'Critical' ? '#f43f5e' : c.status === 'Alert' ? '#f59e0b' : '#10b981' }}></div>
                     <div>
                       <strong style={{ fontSize: '1rem' }}>{c.name}</strong>
                       <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Detected: {c.time} | District: {c.district}</p>
                     </div>
                   </div>
                   <button className="mo-button-outline" style={{ fontSize: '0.75rem', fontWeight: 800 }}>Initiate Response</button>
                 </div>
               )) : (
                 <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No clusters found matching current filters.</div>
               )}
            </div>
        </div>
        <div className="mo-card">
           <h3>Resource Deployment</h3>
           <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', border: '8px solid var(--primary)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justify_content: 'center' }}>
                 <strong>82%</strong>
              </div>
              <p>Fleet Utilization</p>
              <button className="mo-button-primary" style={{ width: '100%' }}>Deploy Rapid Response</button>
           </div>
        </div>
      </div>

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        .icon-box { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .trend-tag { font-size: 0.75rem; font-weight: 800; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .mo-button-primary { background: var(--primary); color: var(--text); border: none; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 6px 12px; border-radius: 8px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default DistrictOverview;
