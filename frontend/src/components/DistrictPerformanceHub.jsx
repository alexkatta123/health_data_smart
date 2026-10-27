import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  MapPin, 
  Users, 
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  Zap,
  Building2,
  Stethoscope
} from 'lucide-react';
import axios from 'axios';

const DistrictPerformanceHub = () => {
  const [districtStats, setDistrictStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/analytics/districts');
      setDistrictStats(response.data);
    } catch (err) {
      console.error("Error fetching district analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDistricts = districtStats.filter(d => 
    d.district_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalCritical = districtStats.reduce((acc, curr) => acc + curr.critical_cases, 0);
  const avgAccuracy = districtStats.length > 0 
    ? (districtStats.reduce((acc, curr) => acc + curr.accuracy_rate, 0) / districtStats.length).toFixed(1)
    : 0;

  return (
    <div className="district-performance-hub animate-fade">
      <header className="hub-header" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
             <div className="badge" style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={14} /> Intelligence Tracking
             </div>
             <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>District Performance Hub</h1>
             <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '1rem' }}>Comparative epidemiological analytics & infrastructure health across all 26 districts.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             <button className="secondary-btn" onClick={fetchData} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} /> Refresh Metrics
             </button>
             <button className="h-btn h-btn-primary" style={{ background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' }}>
                Export Action Report
             </button>
          </div>
        </div>
      </header>

      {/* High-Level Pulse */}
      <div className="pulse-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="pulse-card mo-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
           <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Statewide Criticality</span>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>{totalCritical.toLocaleString()}</h3>
              <span style={{ color: '#f43f5e', fontWeight: 800, fontSize: '0.8rem' }}>High Priority</span>
           </div>
        </div>
        <div className="pulse-card mo-card" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
           <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg AI Accuracy</span>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>{avgAccuracy}%</h3>
              <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem' }}>Optimized</span>
           </div>
        </div>
        <div className="pulse-card mo-card" style={{ padding: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
           <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>PHCs Under Precaution</span>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>{districtStats.filter(d => d.phc_status !== 'Active').length}</h3>
              <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.8rem' }}>Active Alerts</span>
           </div>
        </div>
        <div className="pulse-card mo-card" style={{ padding: '1.5rem', borderLeft: '4px solid #8b5cf6' }}>
           <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active MECOs</span>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>1,248</h3>
              <span style={{ color: '#8b5cf6', fontWeight: 800, fontSize: '0.8rem' }}>Field Ready</span>
           </div>
        </div>
      </div>

      <div className="hub-content" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: '2rem' }}>
        
        {/* District Ranking & Filters */}
        <div className="district-tracking mo-card" style={{ padding: '2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ margin: 0, fontWeight: 900 }}>District Surveillance Matrix</h3>
              <div style={{ position: 'relative' }}>
                 <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                 <input 
                    type="text" 
                    placeholder="Search district..." 
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ padding: '8px 12px 8px 36px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'var(--text)', outline: 'none', fontSize: '0.85rem' }}
                 />
              </div>
           </div>

           <div className="table-wrapper" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                       <th style={{ padding: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>District Hub</th>
                       <th style={{ padding: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Cases</th>
                       <th style={{ padding: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Critical Signal</th>
                       <th style={{ padding: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>PHC Health</th>
                       <th style={{ padding: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Action</th>
                    </tr>
                 </thead>
                 <tbody>
                    {filteredDistricts.map((d, i) => (
                       <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: '0.2s' }}>
                          <td style={{ padding: '1rem' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--surface-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                   <MapPin size={16} />
                                </div>
                                <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{d.district_name}</span>
                             </div>
                          </td>
                          <td style={{ padding: '1rem', fontWeight: 700 }}>{d.total_cases.toLocaleString()}</td>
                          <td style={{ padding: '1rem' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: d.critical_cases > 500 ? '#f43f5e' : '#10b981' }}>
                                <ShieldAlert size={14} />
                                <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{d.critical_cases}</span>
                             </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                             <span style={{ 
                                padding: '4px 10px', 
                                borderRadius: '100px', 
                                fontSize: '0.7rem', 
                                fontWeight: 900, 
                                background: d.phc_status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                color: d.phc_status === 'Active' ? '#10b981' : '#f59e0b',
                                border: `1px solid ${d.phc_status === 'Active' ? '#10b98120' : '#f59e0b20'}`
                             }}>
                                {d.phc_status.toUpperCase()}
                             </span>
                          </td>
                          <td style={{ padding: '1rem' }}>
                             <button className="view-link-btn" onClick={() => setSelectedDistrict(d)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                Inspect <ArrowUpRight size={14} />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Selected District Deep Dive / Precautions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div className="mo-card" style={{ padding: '2rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                 <div>
                    <h3 style={{ margin: 0, fontWeight: 900 }}>{selectedDistrict ? selectedDistrict.district_name : 'State Overview'}</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>PHC Precautionary Protocols & MECO Alerts</p>
                 </div>
                 {selectedDistrict && (
                    <div style={{ textAlign: 'right' }}>
                       <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{selectedDistrict.active_phcs}</div>
                       <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)' }}>MONITORED PHCs</div>
                    </div>
                 )}
              </div>

              {!selectedDistrict ? (
                 <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                    <Building2 size={48} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                    <p style={{ fontWeight: 700 }}>Select a district from the matrix to view specific clinical precautions and officer activity.</p>
                 </div>
              ) : (
                 <div className="precaution-list animate-slide-up">
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px' }}>Precautionary Directives</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                       {[
                          { title: 'Vector Control Protocol', status: 'Mandatory', icon: <ShieldAlert size={18} color="#f43f5e" /> },
                          { title: 'OPD Capacity Expansion', status: 'Ongoing', icon: <Building2 size={18} color="#f59e0b" /> },
                          { title: 'MECO Validation Frequency', status: 'High (T-4h)', icon: <Stethoscope size={18} color="var(--primary)" /> }
                       ].map((p, i) => (
                          <div key={i} style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                {p.icon}
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.title}</span>
                             </div>
                             <span style={{ fontSize: '0.7rem', fontWeight: 900, background: 'var(--surface)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border)' }}>{p.status}</span>
                          </div>
                       ))}
                    </div>

                    <div style={{ marginTop: '2.5rem' }}>
                       <h4 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '1px' }}>Active MECO Performance</h4>
                       <div className="meco-pulse" style={{ background: 'var(--primary-glow)', borderRadius: '20px', padding: '1.5rem', border: '1px solid var(--primary-glow)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>{selectedDistrict.accuracy_rate}%</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', opacity: 0.8 }}>AVG CLASSIFICATION ACCURACY</div>
                             </div>
                             <Users size={24} color="var(--primary)" />
                          </div>
                          <div style={{ marginTop: '1rem', height: '6px', background: 'rgba(14, 165, 233, 0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                             <div style={{ height: '100%', background: 'var(--primary)', width: `${selectedDistrict.accuracy_rate}%` }}></div>
                          </div>
                       </div>
                    </div>
                 </div>
              )}
           </div>

           <div className="mo-card" style={{ padding: '1.5rem', background: 'var(--surface-light)', border: '1px dashed var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '10px', borderRadius: '12px' }}>
                    <AlertTriangle size={20} color="var(--primary)" />
                 </div>
                 <div>
                    <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 900 }}>Strategic Alert</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Anantapur and Guntur hubs showing T-24h trend surge.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .district-performance-hub { padding: 2.5rem; color: var(--text); }
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; box-shadow: var(--card-shadow); transition: 0.3s; }
        .mo-card:hover { border-color: rgba(14, 165, 233, 0.3); }
        .secondary-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text); padding: 12px 24px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .secondary-btn:hover { background: var(--border); }
        tr:hover { background: var(--surface-light) !important; }
        .view-link-btn:hover { text-decoration: underline; }
        @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DistrictPerformanceHub;
