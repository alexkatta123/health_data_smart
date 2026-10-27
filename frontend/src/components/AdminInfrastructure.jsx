import React from 'react';
import { Database, Server, Cpu, Activity, Globe } from 'lucide-react';

const AdminInfrastructure = () => (
  <div className="admin-infra animate-fade">
    <div className="infra-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
       <div className="mo-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
             <h3>Database Health & Ingestion</h3>
             <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 800 }}>SYNC ACTIVE</span>
          </div>
          <div className="db-metrics">
             <div style={{ padding: '1.5rem', background: 'var(--surface-light)', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                   <span>Daily Records Ingested</span>
                   <strong>1.2M</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--bg)', borderRadius: '10px' }}>
                   <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }}></div>
                </div>
             </div>
             <div className="db-nodes" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="node" style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '16px' }}>
                   <Database size={16} color="var(--primary)" />
                   <p style={{ margin: '10px 0 0', fontSize: '0.8rem' }}>Replica Set A: <strong>Online</strong></p>
                </div>
                <div className="node" style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '16px' }}>
                   <Activity size={16} color="#10b981" />
                   <p style={{ margin: '10px 0 0', fontSize: '0.8rem' }}>Write Ops: <strong>1.4k/s</strong></p>
                </div>
             </div>
          </div>
       </div>

       <div className="mo-card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
             <h3>Compute & AI Acceleration</h3>
             <button className="mo-button-outline">Scale Cluster</button>
          </div>
          <div className="compute-stats">
             <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '24px' }}>
                   <Cpu size={32} color="var(--primary)" style={{ marginBottom: '10px' }} />
                   <h3 style={{ margin: 0 }}>42%</h3>
                   <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Avg. CPU Load</span>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '24px' }}>
                   <Server size={32} color="#10b981" style={{ marginBottom: '10px' }} />
                   <h3 style={{ margin: 0 }}>12</h3>
                   <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Active Nodes</span>
                </div>
             </div>
             <div className="region-pings">
                {['North-AP (Primary)', 'Central-AP', 'South-AP'].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                     <span>{r}</span>
                     <span style={{ color: '#10b981' }}>{12 + i * 4}ms</span>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
    <style>{`
      .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2.5rem; }
      .mo-button-outline { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 700; }
    `}</style>
  </div>
);

export default AdminInfrastructure;
