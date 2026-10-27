import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Cpu, 
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  ShieldAlert,
  Send,
  MessageSquare,
  UserCheck,
  BarChart,
  PieChart
} from 'lucide-react';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const MissionOperations = () => {
  const [missionStatus, setMissionStatus] = useState('Operational');
  const [activeNodes, setActiveNodes] = useState(26);
  const [selectedMission, setSelectedMission] = useState(null);
  const mapRef = useRef(null);
  const leafletMap = useRef(null);

  const missionMetrics = [
    { label: 'SYSTEM READINESS', value: '100%', status: 'Secure', color: '#10b981', glow: 'rgba(16, 185, 129, 0.2)' },
    { label: 'AI CLASSIFICATION', value: '94.2%', status: 'Active', color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.2)' },
    { label: 'DATA INGESTION', value: '8.4 GB', status: 'Optimal', color: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.2)' },
    { label: 'ACTIVE ALERTS', value: '03', status: 'Priority', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.2)' }
  ];

  const activeMissions = [
    { id: 'M-101', title: 'Containment Alpha', target: 'Guntur South', progress: 78, type: 'Outbreak', severity: 'High' },
    { id: 'M-102', title: 'Vaccine Pulse', target: 'Vizag Urban', progress: 92, type: 'Logistics', severity: 'Medium' },
    { id: 'M-103', title: 'Screening Delta', target: 'Kurnool East', progress: 45, type: 'Surveillance', severity: 'Critical' }
  ];

  const missionAnalysisData = [
    { name: 'Node 1', cases: 120, screened: 450, target: 400 },
    { name: 'Node 2', cases: 85, screened: 380, target: 400 },
    { name: 'Node 3', cases: 140, screened: 520, target: 400 },
    { name: 'Node 4', cases: 90, screened: 310, target: 400 },
    { name: 'Node 5', cases: 110, screened: 420, target: 400 },
  ];

  const phcActionNodes = [
    { id: 1, name: 'Guntur PHC-1', lat: 16.32, lng: 80.45, action: 'Containment', status: 'Active' },
    { id: 2, name: 'Tenali CHC', lat: 16.24, lng: 80.64, action: 'Vaccination', status: 'Active' },
    { id: 3, name: 'Vizag North PHC', lat: 17.72, lng: 83.25, action: 'Testing', status: 'Alert' }
  ];

  const officerNotifications = [
    { id: 1, officer: 'Dr. Ramesh (MO)', target: 'Guntur South', msg: 'Initiate protocol A-12', time: '5m ago', ack: true },
    { id: 2, officer: 'Dr. Priya (DHO)', target: 'Vizag North', msg: 'Mobilize MTU-4 unit', time: '12m ago', ack: false }
  ];

  useEffect(() => {
    if (!window.L || !mapRef.current) return;
    if (!leafletMap.current) {
      leafletMap.current = window.L.map(mapRef.current, { zoomControl: false }).setView([16.3, 80.4], 9);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap.current);
    }
    
    // Add markers for PHCs in action
    phcActionNodes.forEach(node => {
      const color = node.status === 'Alert' ? '#f43f5e' : '#10b981';
      window.L.marker([node.lat, node.lng], {
        icon: window.L.divIcon({
          className: 'mission-phc-marker',
          html: `<div style="background: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}"></div>`
        })
      }).addTo(leafletMap.current).bindPopup(`<b>${node.name}</b><br/>Action: ${node.action}`);
    });
  }, []);

  return (
    <div className="mission-operations animate-fade">
      
      {/* Top Mission Command Bar */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', boxShadow: 'var(--card-shadow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 15px #10b981', animation: 'pulse 2s infinite' }}></div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)' }}>Mission Operations Center</h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>State-wide Real-time Intelligence Hub</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '3rem' }}>
          <div style={{ textAlign: 'right' }}>
            <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>MISSION STATUS</small>
            <strong style={{ fontSize: '1.1rem', color: '#10b981' }}>{missionStatus.toUpperCase()}</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>ACTIVE NODES</small>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{activeNodes} DISTRICTS</strong>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '1.5rem', marginBottom: '2.5rem' }}>
        {missionMetrics.map((m, i) => (
          <div key={i} style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '32px', 
            padding: '2rem', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: `0 10px 30px ${m.glow}`
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1.5px', marginBottom: '1.2rem' }}>{m.label}</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text)', marginBottom: '0.8rem', letterSpacing: '-1px' }}>{m.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 900, color: m.color }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, boxShadow: `0 0 10px ${m.color}` }}></div>
              {m.status}
            </div>
            {/* Decoration */}
            <div style={{ position: 'absolute', right: '-15px', bottom: '-15px', opacity: 0.1, color: m.color }}>
               <Zap size={80} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2.5rem' }}>
        
        {/* Mission Intelligence Deck */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
           
           <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Target size={20} color="var(--primary)" /> Active Tactical Missions
                 </h3>
                 <button className="h-btn-secondary" style={{ padding: '8px 16px', borderRadius: '10px' }}><Zap size={14} /> New Directive</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {activeMissions.map((m, i) => (
                    <div key={i} className="mission-card-h" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem', cursor: 'pointer', transition: '0.3s' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <div>
                             <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '1px' }}>{m.id} • {m.type.toUpperCase()}</span>
                             <h4 style={{ margin: '4px 0 0', fontSize: '1.1rem', fontWeight: 900 }}>{m.title}</h4>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                             <span style={{ fontSize: '0.8rem', fontWeight: 800, color: m.severity === 'Critical' ? '#f43f5e' : 'var(--text)' }}>{m.severity} RISK</span>
                             <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.target}</p>
                          </div>
                       </div>
                       <div style={{ height: '12px', background: 'var(--surface-light)', borderRadius: '100px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                          <div style={{ 
                            width: `${m.progress}%`, 
                            height: '100%', 
                            background: `linear-gradient(90deg, var(--primary), ${m.severity === 'Critical' ? '#f43f5e' : '#10b981'})`, 
                            borderRadius: '100px', 
                            boxShadow: '0 0 15px var(--primary-glow)' 
                          }}></div>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.75rem', fontWeight: 800 }}>
                          <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                          <span>{m.progress}% Complete</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Tactical Analysis Hub */}
           <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem' }}>
              <h3 style={{ margin: '0 0 2rem', fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <BarChart size={20} color="#8b5cf6" /> Mission Analysis
              </h3>
              <div style={{ height: '300px', width: '100%' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={missionAnalysisData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                       <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                       <Legend />
                       <Bar dataKey="screened" fill="var(--primary-glow)" radius={[6, 6, 0, 0]} />
                       <Bar dataKey="cases" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                       <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                    </ComposedChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Live Command Center (Map + Comms) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
           
           {/* Live PHC Action Map */}
           <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Layers size={20} color="var(--primary)" /> PHC Action Grid
                 </h3>
                 <div className="badge" style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900 }}>LIVE MAP</div>
              </div>
              
              <div style={{ height: '350px', background: 'var(--surface-light)', borderRadius: '24px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                 <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }}></div>
                 
                 <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'var(--surface)', padding: '12px 20px', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: 800, zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                       <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div> PHC Active
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f43f5e' }}></div> Alert Node
                    </div>
                 </div>
              </div>
           </div>

           {/* Officer Notification Hub */}
           <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2rem', boxShadow: 'var(--card-shadow)' }}>
              <h3 style={{ margin: '0 0 2rem', fontSize: '1.2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <ShieldAlert size={20} color="#f43f5e" /> Officer Notification Hub
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                 {officerNotifications.map((n, i) => (
                    <div key={i} style={{ 
                      background: 'var(--surface-light)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '24px', 
                      padding: '1.5rem', 
                      display: 'flex', 
                      gap: '18px', 
                      alignItems: 'center',
                      transition: '0.3s'
                    }} className="notification-card-h">
                       <div style={{ 
                         width: 52, height: 52, borderRadius: '16px', 
                         background: 'var(--surface)', 
                         display: 'flex', align_items: 'center', justify_content: 'center', 
                         color: 'var(--primary)',
                         boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                         border: '1px solid var(--border)'
                       }}>
                          <UserCheck size={24} />
                       </div>
                       <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                             <strong style={{ fontSize: '1.05rem', fontWeight: 900 }}>{n.officer}</strong>
                             <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>{n.time}</span>
                          </div>
                          <p style={{ margin: '0 0 10px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.4 }}>{n.msg}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                             {n.ack ? (
                                <span style={{ 
                                  fontSize: '0.75rem', fontWeight: 900, color: '#10b981', 
                                  display: 'flex', alignItems: 'center', gap: '6px',
                                  background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '8px'
                                }}><ShieldCheck size={14} /> ACKNOWLEDGED</span>
                             ) : (
                                <span style={{ 
                                  fontSize: '0.75rem', fontWeight: 900, color: '#f59e0b',
                                  background: 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '8px'
                                }}>PENDING ACKNOWLEDGMENT</span>
                             )}
                          </div>
                       </div>
                       {!n.ack && <button className="h-btn-primary" style={{ padding: '10px 18px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900 }}><Send size={14} /> Ping</button>}
                    </div>
                 ))}
              </div>
              <button style={{ 
                width: '100%', marginTop: '2rem', 
                background: 'linear-gradient(135deg, var(--primary), #059669)', 
                color: "var(--text)", border: 'none', 
                padding: '18px', borderRadius: '20px', 
                fontSize: '1rem', fontWeight: 900, 
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center',
                boxShadow: '0 10px 25px var(--primary-glow)'
              }}>
                 <MessageSquare size={20} /> BROADCAST TACTICAL DIRECTIVE
              </button>
           </div>
        </div>
      </div>

      <style>{`
        .mo-filter-btn { background: var(--surface-light); border: 1px solid var(--border); color: var(--text-muted); padding: 8px 16px; borderRadius: 10px; fontSize: 0.75rem; fontWeight: 900; cursor: pointer; transition: 0.2s; }
        .mo-filter-btn.active { background: var(--primary); color: var(--text); border-color: var(--primary); }
        .mission-pulse { width: 12px; height: 12px; border-radius: 50%; animation: pulsePoint 2s infinite; }
        @keyframes pulsePoint { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(2.5); opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
        .feed-card-h:hover { border-color: var(--primary); transform: translateX(5px); }
        .mission-card-h:hover { border-color: var(--primary); background: var(--surface); transform: translateY(-5px); box-shadow: var(--card-shadow); }
        .notification-card-h:hover { border-color: var(--primary); transform: translateY(-3px); box-shadow: var(--card-shadow); }
        .mission-phc-marker { border-radius: 50%; transition: 0.3s; }
        .mission-phc-marker:hover { transform: scale(1.5); z-index: 1000 !important; }
      `}</style>
    </div>
  );
};

export default MissionOperations;
