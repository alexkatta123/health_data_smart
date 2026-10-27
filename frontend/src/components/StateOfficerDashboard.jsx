import React, { useState } from 'react';
import { 
  Building2, Activity, AlertTriangle, TrendingUp, 
  ShieldAlert, FileText, Send, Map as MapIcon, 
  Users, Search, Filter, ArrowUpRight, 
  Bell, ChevronRight, CheckCircle2, BarChart3, 
  PieChart, Info, MoreVertical, Zap, 
  Calendar, Clock, Download, Globe,
  Briefcase, Landmark, ShieldCheck, Share2
} from 'lucide-react';

const StateOfficerDashboard = () => {
  const [activeTab, setActiveTab] = useState('command-center');

  const menuItems = [
    { id: 'command-center', label: 'State Command', icon: <Globe size={20} />, group: 'CONTROL' },
    { id: 'hotspots', label: 'State-wide Alerts', icon: <MapIcon size={20} />, badge: '12', group: 'CONTROL' },
    { id: 'districts', label: 'District Performance', icon: <Building2 size={20} />, group: 'ANALYSIS' },
    { id: 'forecasts', label: 'Strategic Forecasts', icon: <TrendingUp size={20} />, group: 'ANALYSIS' },
    { id: 'resources', label: 'Resource Allocation', icon: <Briefcase size={20} />, group: 'STRATEGY' },
    { id: 'infrastructure', label: 'Infrastructure Hub', icon: <Building2 size={20} />, group: 'STRATEGY' },
    { id: 'lab-network', label: 'Lab Network', icon: <Activity size={20} />, group: 'STRATEGY' },
    { id: 'vaccination', label: 'Vaccination Pulse', icon: <ShieldCheck size={20} />, group: 'OUTPUT' },
    { id: 'advisories', label: 'State Advisories', icon: <ShieldAlert size={20} />, group: 'OUTPUT' },
    { id: 'reports', label: 'Consolidated Reports', icon: <FileText size={20} />, group: 'OUTPUT' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'command-center': return <StateCommandCenter />;
      case 'hotspots': return <StateHotspots />;
      case 'districts': return <DistrictComparison />;
      case 'forecasts': return <StateForecasts />;
      case 'resources': return <StateResources />;
      case 'infrastructure': return <InfrastructureModule />;
      case 'lab-network': return <LabModule />;
      case 'vaccination': return <VaccinationModule />;
      case 'advisories': return <StateAdvisories />;
      case 'reports': return <StateReports />;
      default: return <StateCommandCenter />;
    }
  };

  return (
    <div className="state-portal animate-fade">
      {/* State Identity Header */}
      <div className="state-header">
        <div className="state-brand">
          <div className="brand-emblem"><Landmark size={24} /></div>
          <div>
            <h3>Government of Andhra Pradesh</h3>
            <p>State Health Command & Control Center (SHC-3)</p>
          </div>
        </div>
        <div className="state-meta">
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            Real-time Surveillance Active
          </div>
          <div className="officer-badge">
            <ShieldCheck size={16} />
            STATE OFFICER ACCESS
          </div>
        </div>
      </div>

      {/* State Navigation Tabs */}
      <div className="state-nav">
        {menuItems.map(item => (
          <button 
            key={item.id}
            className={`state-tab ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && <span className="tab-badge">{item.badge}</span>}
          </button>
        ))}
      </div>

      {/* Main Content Viewport */}
      <main className="state-main">
        {renderContent()}
      </main>

      <style>{`
        .state-portal { padding: 1.5rem; color: var(--text); background: var(--surface); min-height: 100vh; }
        
        .state-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 2rem; padding: 1.5rem 2.5rem;
          background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: 30px; backdrop-filter: blur(20px);
        }

        .state-brand { display: flex; gap: 1.25rem; align-items: center; }
        .brand-emblem {
          width: 50px; height: 50px; background: rgba(99, 102, 241, 0.15);
          color: #6366f1; border-radius: 14px; display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(99, 102, 241, 0.3); box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
        }
        .state-brand h3 { font-size: 1.2rem; margin: 0; font-weight: 900; letter-spacing: 0.02em; }
        .state-brand p { font-size: 0.8rem; color: #a5b4fc; margin: 4px 0 0 0; font-weight: 600; opacity: 0.8; }

        .state-meta { display: flex; gap: 2rem; align-items: center; }
        .status-indicator { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; font-weight: 800; color: #10b981; }
        .pulse-dot { width: 10px; height: 10px; background: var(--surface-light); border-radius: 50%; animation: state-pulse 2s infinite; }
        @keyframes state-pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }

        .officer-badge {
          display: flex; align-items: center; gap: 8px; background: var(--surface);
          padding: 8px 16px; border-radius: 100px; font-size: 0.7rem; font-weight: 900;
          color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .state-nav {
          display: flex; gap: 0.75rem; margin-bottom: 2rem; overflow-x: auto;
          padding: 5px; background: var(--surface); border-radius: 20px; border: 1px solid var(--border);
        }
        .state-tab {
          white-space: nowrap; display: flex; align-items: center; gap: 10px;
          padding: 12px 20px; background: transparent; border: none;
          color: rgba(255,255,255,0.5); border-radius: 16px; cursor: pointer; transition: all 0.2s;
        }
        .state-tab:hover { color: var(--text); background: var(--surface); }
        .state-tab.active { background: #6366f1; color: var(--text); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3); }
        .tab-badge { background: #f43f5e; color: var(--text); font-size: 0.65rem; padding: 1px 8px; border-radius: 100px; }

        .state-main { background: var(--surface); border: 1px solid var(--border); border-radius: 36px; min-height: 600px; overflow: hidden; }
        
        .state-card { background: var(--surface); padding: 2rem; border-radius: 28px; border: 1px solid var(--border); }
        .state-table { width: 100%; border-collapse: collapse; }
        .state-table th { text-align: left; padding: 1.25rem; font-size: 0.75rem; color: #a5b4fc; border-bottom: 1px solid var(--border); text-transform: uppercase; letter-spacing: 0.05em; }
        .state-table td { padding: 1.5rem 1.25rem; border-bottom: 1px solid var(--border); font-size: 0.95rem; }
      `}</style>
    </div>
  );
};

/* --- State Modules --- */

const StateCommandCenter = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '1.5rem', marginBottom: '2.5rem' }}>
       {[
         { label: 'State Caseload (24h)', val: '14,842', trend: '+5.2%', color: '#6366f1' },
         { label: 'Districts Reporting', val: '13/13', trend: '100%', color: '#10b981' },
         { label: 'Active State Alerts', val: '12', trend: 'High', color: '#f59e0b' },
         { label: 'Strategic Resources', val: '88%', trend: 'Stable', color: '#0ea5e9' }
       ].map((s, i) => (
         <div key={i} className="state-stat-card" style={{ background: 'var(--surface)', padding: '1.75rem', borderRadius: '24px', border: '1px solid var(--border)', borderTop: `4px solid ${s.color}` }}>
            <span style={{ fontSize: '0.75rem', color: "var(--text-muted)", fontWeight: 800, textTransform: 'uppercase' }}>{s.label}</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
               <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 900 }}>{s.val}</h2>
               <span style={{ fontSize: '0.8rem', fontWeight: 800, color: s.color }}>{s.trend}</span>
            </div>
         </div>
       ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: '2rem' }}>
       <div className="state-card">
          <div style={{ display: 'flex', justify: 'space-between', marginBottom: '1.5rem' }}>
             <h3>State Disease Intelligence Map</h3>
             <Share2 size={20} />
          </div>
          <div style={{ height: '350px', background: 'rgba(255,255,255,0.01)', borderRadius: '20px', border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Globe size={80} opacity={0.05} />
             <p style={{ position: 'absolute', color: "var(--text-muted)", fontWeight: 700 }}>Consolidated AP Health Layer Active</p>
          </div>
       </div>
       <div className="state-card">
          <h3>Top District Alerts</h3>
          <div style={{ marginTop: '1.5rem' }}>
             {['Visakhapatnam - Outbreak Alert', 'Guntur - Resource Critical', 'Krishna - Spike Predicted'].map((a, i) => (
               <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', marginBottom: '12px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>{a}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#f43f5e' }}>Action Required</span>
                  </div>
                  <ChevronRight size={18} />
               </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

const StateHotspots = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <div style={{ display: 'flex', justify: 'space-between', marginBottom: '2rem' }}>
          <h3>State Outbreak Monitoring</h3>
          <span style={{ background: '#f43f5e', color: "var(--text)", padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>12 CRITICAL ZONES</span>
       </div>
       <table className="state-table">
          <thead>
             <tr><th>District</th><th>Hotspot Zone</th><th>Disease</th><th>Caseload Intensity</th><th>Action Status</th></tr>
          </thead>
          <tbody>
             {['Visakhapatnam', 'Guntur', 'Anantapur'].map((d, i) => (
               <tr key={i}>
                  <td style={{ fontWeight: 900 }}>{d}</td>
                  <td>Sector {i + 1} Cluster</td>
                  <td style={{ color: '#f59e0b', fontWeight: 800 }}>{i === 1 ? 'Dengue' : 'Febrile Illness'}</td>
                  <td><div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}><div style={{ width: `${70 + i * 10}%`, height: '100%', background: '#f43f5e', borderRadius: '10px' }}></div></div></td>
                  <td><button style={{ background: '#6366f1', border: 'none', color: "var(--text)", padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>Issue State Directive</button></td>
               </tr>
             ))}
          </tbody>
       </table>
    </div>
  </div>
);

const DistrictComparison = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <h3>Inter-District Performance Benchmarking</h3>
       <p style={{ color: "var(--text-muted)", fontSize: '0.9rem', marginBottom: '2rem' }}>Comparing surveillance accuracy and reporting compliance across 13 districts.</p>
       <table className="state-table">
          <thead>
             <tr><th>District Rank</th><th>District Name</th><th>Surveillance Score</th><th>Compliance</th><th>Trend</th></tr>
          </thead>
          <tbody>
             {['Visakhapatnam', 'Krishna', 'Guntur', 'Chittoor'].map((d, i) => (
               <tr key={i}>
                  <td style={{ color: '#6366f1', fontWeight: 900 }}>#{i + 1}</td>
                  <td style={{ fontWeight: 800 }}>{d}</td>
                  <td>{98 - i * 2}%</td>
                  <td><span style={{ color: '#10b981' }}>Excellent</span></td>
                  <td><ArrowUpRight size={18} color="#10b981" /></td>
               </tr>
             ))}
          </tbody>
       </table>
    </div>
  </div>
);

const StateForecasts = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <div style={{ display: 'flex', justify: 'space-between', marginBottom: '2.5rem' }}>
          <h3>State-level AI Strategic Forecasting</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
             <button className="s-btn active">Weekly</button>
             <button className="s-btn">Monthly</button>
          </div>
       </div>
       <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '25px', padding: '0 50px' }}>
          {[40, 60, 55, 80, 100, 85, 70, 90, 110, 95].map((h, i) => (
            <div key={i} style={{ flex: 1, position: 'relative' }}>
               <div style={{ height: `${h}%`, background: i > 7 ? 'linear-gradient(to top, #6366f1, #8b5cf6)' : 'rgba(99, 102, 241, 0.2)', borderRadius: '8px 8px 0 0' }}></div>
               {i === 7 && <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#000', padding: '2px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900 }}>TODAY</div>}
            </div>
          ))}
       </div>
       <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Zap size={24} color="#6366f1" />
          <p style={{ margin: 0, fontSize: '0.95rem', color: "var(--text-muted)" }}><strong>STRATEGIC INSIGHT:</strong> AP is entering the Monsoon peak. AI models suggest a 22% increase in Vector-borne cases state-wide over the next 21 days. Strategic medicine stockpiling recommended in coastal districts.</p>
       </div>
    </div>
    <style>{`
      .s-btn { background: transparent; border: 1px solid var(--border); color: #a5b4fc; padding: 6px 16px; border-radius: 10px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
      .s-btn.active { background: #6366f1; color: var(--text); border: none; }
    `}</style>
  </div>
);

const StateResources = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
       <div className="state-card">
          <h3>State Inventory Strategic Reserve</h3>
          <div style={{ marginTop: '2rem' }}>
             {['Antibiotics Hub A', 'Diagnostic Kits (State)', 'Mobile Testing Units'].map((r, i) => (
               <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justify: 'space-between', marginBottom: '8px' }}>
                     <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{r}</span>
                     <span style={{ fontSize: '0.85rem', color: '#10b981' }}>{90 - i * 5}% STOCK</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}><div style={{ width: `${90 - i * 5}%`, height: '100%', background: '#6366f1', borderRadius: '10px' }}></div></div>
               </div>
             ))}
          </div>
       </div>
       <div className="state-card">
          <h3>Resource Allocation Requests</h3>
          <div style={{ marginTop: '1.5rem' }}>
             {[
               { from: 'Visakhapatnam', item: 'Diagnostic Kits', qty: '5,000' },
               { from: 'Guntur', item: 'Fever Clinic Kits', qty: '1,200' }
             ].map((req, i) => (
               <div key={i} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 900 }}>FROM: {req.from.toUpperCase()}</div>
                  <div style={{ fontSize: '0.9rem', margin: '6px 0', fontWeight: 700 }}>{req.item} (Req: {req.qty})</div>
                  <button style={{ width: '100%', background: '#10b981', border: 'none', color: "var(--text)", padding: '6px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, marginTop: '8px' }}>Approve & Ship</button>
               </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

const InfrastructureModule = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <h3>State Health Infrastructure Monitoring</h3>
       <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '1.5rem', marginTop: '2rem' }}>
          <div className="infra-card"><span>Total ICU Beds</span><strong>1,240</strong><small>82% Occupied</small></div>
          <div className="infra-card"><span>Oxygen Plants</span><strong>48/48</strong><small style={{ color: '#10b981' }}>Operational</small></div>
          <div className="infra-card"><span>Ventilators</span><strong>850</strong><small>Available: 120</small></div>
       </div>
    </div>
    <style>{`
      .infra-card { background: var(--surface); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); }
      .infra-card span { font-size: 0.7rem; color: #a5b4fc; font-weight: 800; text-transform: uppercase; }
      .infra-card strong { display: block; font-size: 1.5rem; margin: 5px 0; }
      .infra-card small { font-size: 0.75rem; font-weight: 700; color: #f43f5e; }
    `}</style>
  </div>
);

const LabModule = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <h3>Lab Diagnostic Surveillance Network</h3>
       <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '20px' }}>
             <h4>Regional Viral Labs (VRDL)</h4>
             <div className="lab-item" style={{ marginTop: '1rem', display: 'flex', justify: 'space-between' }}>
                <span>Vizag Med College</span>
                <span className="status-badge online">Active</span>
             </div>
          </div>
          <div style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: '20px' }}>
             <h4>Pathogen Tracking</h4>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sequencing 120 samples/week for variant tracking.</p>
          </div>
       </div>
    </div>
    <style>{`
      .status-badge.online { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 2px 10px; border-radius: 100px; font-size: 0.7rem; font-weight: 800; }
    `}</style>
  </div>
);

const VaccinationModule = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3>State Vaccination Coverage (Pulse)</h3>
          <button className="s-btn active">Live Coverage</button>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
          <div className="v-card">
             <span>Routine Immunization</span>
             <h2>94.2%</h2>
             <div className="v-bar"><div style={{ width: '94.2%' }}></div></div>
          </div>
          <div className="v-card">
             <span>Diphtheria (Targeted)</span>
             <h2>88.5%</h2>
             <div className="v-bar"><div style={{ width: '88.5%', background: '#f59e0b' }}></div></div>
          </div>
          <div className="v-card">
             <span>Seasonal Flu</span>
             <h2>62.0%</h2>
             <div className="v-bar"><div style={{ width: '62%', background: '#6366f1' }}></div></div>
          </div>
       </div>
    </div>
    <style>{`
      .v-card { background: var(--surface); padding: 1.5rem; border-radius: 24px; border: 1px solid var(--border); }
      .v-card span { font-size: 0.75rem; color: #a5b4fc; font-weight: 800; }
      .v-card h2 { margin: 10px 0; font-size: 2rem; font-weight: 900; }
      .v-bar { height: 6px; background: var(--surface); border-radius: 10px; overflow: hidden; }
      .v-bar div { height: 100%; background: var(--surface-light); border-radius: 10px; }
    `}</style>
  </div>
);

const StateAdvisories = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <h3>State Health Advisory Console</h3>
       <div style={{ marginTop: '2rem' }}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
             <label style={{ fontSize: '0.75rem', fontWeight: 900, color: "var(--text-muted)", textTransform: 'uppercase' }}>TARGET RECIPIENTS</label>
             <select style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '14px', borderRadius: '14px', color: "var(--text)", marginTop: '10px' }}>
                <option>All District Health Officers (DHOs)</option>
                <option>All Medical Officers (PHC/CHC)</option>
                <option>Public Health Media Outlets</option>
             </select>
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
             <label style={{ fontSize: '0.75rem', fontWeight: 900, color: "var(--text-muted)", textTransform: 'uppercase' }}>ADVISORY / POLICY CONTENT</label>
             <textarea style={{ width: '100%', height: '180px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '14px', borderRadius: '14px', color: "var(--text)", marginTop: '10px', resize: 'none' }} placeholder="Enter official state health advisory or situational directive..."></textarea>
          </div>
          <button style={{ width: '100%', background: '#6366f1', border: 'none', color: "var(--text)", padding: '16px', borderRadius: '14px', fontWeight: 900, fontSize: '1rem', display: 'flex', alignItems: 'center', justify: 'center', gap: '15px', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)' }}>
             <Send size={22} /> PUBLISH STATE ADVISORY
          </button>
       </div>
    </div>
  </div>
);

const StateReports = () => (
  <div className="module-padding animate-fade" style={{ padding: '2rem' }}>
    <div className="state-card">
       <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h3>Consolidated State Surveillance Reports</h3>
          <button style={{ background: '#10b981', border: 'none', color: "var(--text)", padding: '10px 22px', borderRadius: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Download size={20} /> Export State Master Log
          </button>
       </div>
       <div className="report-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {[
            'State Weekly IDSP Summary (W16)', 
            'Inter-District Resource Audit - Q2',
            'Epidemiological Forecast Summary (May)',
            'State Health Policy Compliance Log'
          ].map((r, i) => (
            <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <FileText color="#6366f1" />
                  <span style={{ fontWeight: 700 }}>{r}</span>
               </div>
               <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: "var(--text)", padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem' }}>PDF</button>
            </div>
          ))}
       </div>
    </div>
  </div>
);

export default StateOfficerDashboard;
