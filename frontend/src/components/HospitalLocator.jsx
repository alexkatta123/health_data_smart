import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Navigation as NavIcon, 
  Phone, 
  Clock, 
  Hospital, 
  Activity,
  Filter,
  Maximize2,
  List,
  Layers,
  Download,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Crosshair,
  Info
} from 'lucide-react';

const HospitalLocator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [radius, setRadius] = useState(10);
  const [isRouting, setIsRouting] = useState(false);

  const hospitals = [
    { id: 1, name: "GGH Visakhapatnam", type: "Government General", beds: 120, status: "Stable", distance: 1.2, x: '45%', y: '40%', phone: "+91 891 2558222" },
    { id: 2, name: "Care Hospitals", type: "Multispeciality", beds: 45, status: "High Load", distance: 2.8, x: '65%', y: '30%', phone: "+91 891 3333333" },
    { id: 3, name: "Seven Hills Hospital", type: "Emergency Care", beds: 12, status: "Critical", distance: 3.5, x: '30%', y: '65%', phone: "+91 891 2708090" },
    { id: 4, name: "Kims Icon Hospital", type: "Institute", beds: 88, status: "Stable", distance: 5.1, x: '80%', y: '70%', phone: "+91 891 2854000" },
    { id: 5, name: "Appollo Health City", type: "Teaching Hospital", beds: 156, status: "Stable", distance: 6.4, x: '20%', y: '25%', phone: "+91 891 2727272" }
  ];

  useEffect(() => {
    if (!selectedHospital) setSelectedHospital(hospitals[0]);
  }, []);

  const handleInitiateRoute = () => {
    setIsRouting(true);
    setTimeout(() => setIsRouting(false), 3000);
  };

  return (
    <div className="hospital-locator-portal animate-fade">
      <div className="locator-grid">
        
        {/* Map Viewport - High Fidelity GIS Styling */}
        <div className="map-column">
          <div className="locator-map-container mo-card-p">
             <div className="map-header-tactical">
                <div className="mh-left">
                   <div className="live-signal-p"></div>
                   <span>SURV-AP GIS REAL-TIME FEED</span>
                </div>
                <div className="mh-right">
                   <button className="tactical-btn-mini"><Maximize2 size={14} /></button>
                   <button className="tactical-btn-mini"><Layers size={14} /></button>
                </div>
             </div>

             <div className="gis-canvas">
                <div className="gis-grid"></div>
                
                {/* User Location Node */}
                <div className="user-node-p" style={{ top: '50%', left: '50%' }}>
                   <div className="user-pulse"></div>
                   <div className="user-core"><Crosshair size={18} /></div>
                   <span className="user-label">YOUR LOCATION</span>
                </div>

                {/* Hospital Nodes */}
                {hospitals.map(h => (
                   <div 
                      key={h.id} 
                      className={`hospital-node-p ${selectedHospital?.id === h.id ? 'active' : ''}`}
                      style={{ top: h.y, left: h.x }}
                      onClick={() => setSelectedHospital(h)}
                   >
                      <div className="node-bloom" style={{ background: h.status === 'Critical' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(14, 165, 233, 0.2)' }}></div>
                      <div className="node-core" style={{ background: h.status === 'Critical' ? '#f43f5e' : '#0ea5e9' }}>
                         <Hospital size={14} />
                      </div>
                      <div className="node-tooltip">
                         <strong>{h.name}</strong>
                         <span>{h.distance} KM • {h.beds} BEDS</span>
                      </div>
                   </div>
                ))}

                {/* Dynamic Routing Line */}
                {selectedHospital && (
                  <svg className="route-vector-svg">
                     <line 
                        x1="50%" y1="50%" 
                        x2={selectedHospital.x} y2={selectedHospital.y} 
                        className={`route-line ${isRouting ? 'animating' : ''}`}
                     />
                  </svg>
                )}
             </div>

             <div className="map-footer-intelligence">
                <div className="fi-item">
                   <Activity size={14} color="#10b981" />
                   <span>NEAREST HUB: <strong>1.2 KM</strong></span>
                </div>
                <div className="fi-divider"></div>
                <div className="fi-item">
                   <Zap size={14} color="#f59e0b" />
                   <span>NETWORK LOAD: <strong>STABLE</strong></span>
                </div>
             </div>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="intelligence-column sidebar-scroll">
           
           {/* Search & Filter Header */}
           <div className="intel-search-box mo-card-p">
              <Search size={18} color="#475569" />
              <input 
                type="text" 
                placeholder="Search hospitals, PHCs or specialties..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="tactical-filter-btn"><Filter size={16} /></button>
           </div>

           {/* Selected Hospital Detail */}
           {selectedHospital && (
             <div className="hospital-intel-card mo-card-p animate-slide-in">
                <div className="hi-header">
                   <div className="hi-icon-box" style={{ background: selectedHospital.status === 'Critical' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(14, 165, 233, 0.1)' }}>
                      <Hospital size={28} color={selectedHospital.status === 'Critical' ? '#f43f5e' : '#0ea5e9'} />
                   </div>
                   <div className="hi-title">
                      <h3>{selectedHospital.name}</h3>
                      <span className="hi-badge">{selectedHospital.type}</span>
                   </div>
                </div>

                <div className="hi-metrics-grid">
                   <div className="hi-metric">
                      <small>BED CAPACITY</small>
                      <strong>{selectedHospital.beds}</strong>
                   </div>
                   <div className="hi-metric">
                      <small>STATUS</small>
                      <strong style={{ color: selectedHospital.status === 'Critical' ? '#f43f5e' : '#10b981' }}>{selectedHospital.status.toUpperCase()}</strong>
                   </div>
                </div>

                <div className="hi-info-list">
                   <div className="hi-item">
                      <MapPin size={16} color="var(--primary)" />
                      <span>{selectedHospital.distance} KM FROM YOUR LOCATION</span>
                   </div>
                   <div className="hi-item">
                      <Clock size={16} color="var(--primary)" />
                      <span>ETA: {Math.round(selectedHospital.distance * 3)} MINS (OPTIMAL)</span>
                   </div>
                   <div className="hi-item">
                      <Phone size={16} color="#10b981" />
                      <span style={{ color: '#10b981', fontWeight: 800 }}>EMERGENCY: {selectedHospital.phone}</span>
                   </div>
                </div>

                <button className="h-btn-primary full-width" onClick={handleInitiateRoute}>
                   {isRouting ? 'ACQUIRING ROUTE...' : 'Initiate Route Guidance'}
                   <ArrowUpRight size={18} />
                </button>
             </div>
           )}

           {/* Nearby List */}
           <div className="nearby-hubs-list">
              <h4 className="section-label-p">NEARBY CLINICAL HUBS</h4>
              {hospitals.map(h => (
                <div 
                  key={h.id} 
                  className={`hub-item-p ${selectedHospital?.id === h.id ? 'active' : ''}`}
                  onClick={() => setSelectedHospital(h)}
                >
                   <div className="hub-info">
                      <strong>{h.name}</strong>
                      <small>{h.type} • {h.distance} KM</small>
                   </div>
                   <div className="hub-stat">
                      <div className="hs-val">{h.beds}</div>
                      <small>BEDS</small>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <style>{`
        .hospital-locator-portal {
          padding: 1rem 0;
        }

        .locator-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
          height: 750px;
        }

        .map-column { height: 100%; }
        .mo-card-p {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .locator-map-container { height: 100%; padding: 0; }
        .map-header-tactical {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--surface);
          backdrop-filter: blur(20px);
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .mh-left { display: flex; align-items: center; gap: 12px; }
        .live-signal-p { width: 8px; height: 8px; background: #f43f5e; border-radius: 50%; box-shadow: 0 0 10px #f43f5e; animation: pulseSignal 2s infinite; }
        .mh-left span { font-size: 0.75rem; font-weight: 900; letter-spacing: 1px; color: var(--text-muted); }
        .tactical-btn-mini { width: 32px; height: 32px; border-radius: 8px; background: var(--surface); border: 1px solid rgba(255,255,255,0.1); color: var(--text); cursor: pointer; display: flex; align-items: center; justify-content: center; }

        .gis-canvas { position: absolute; inset: 0; background: var(--surface); overflow: hidden; }
        .gis-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 50px 50px; }

        .user-node-p { position: absolute; transform: translate(-50%, -50%); z-index: 50; }
        .user-pulse { position: absolute; inset: -20px; background: rgba(14, 165, 233, 0.1); border-radius: 50%; border: 1px solid rgba(14, 165, 233, 0.2); animation: mapPulseP 3s infinite; }
        .user-core { width: 44px; height: 44px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text); border: 3px solid #05070a; box-shadow: 0 0 20px rgba(14, 165, 233, 0.5); }
        .user-label { position: absolute; top: 55px; left: 50%; transform: translateX(-50%); font-size: 0.65rem; font-weight: 900; letter-spacing: 2px; white-space: nowrap; color: var(--primary); }

        .hospital-node-p { position: absolute; transform: translate(-50%, -50%); z-index: 40; cursor: pointer; transition: 0.3s; }
        .node-bloom { position: absolute; inset: -15px; border-radius: 50%; opacity: 0.5; transition: 0.3s; }
        .node-core { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--text); border: 2px solid #05070a; transition: 0.3s; }
        .node-tooltip { position: absolute; top: -50px; left: 50%; transform: translateX(-50%); background: white; color: black; padding: 6px 14px; border-radius: 12px; font-size: 0.7rem; opacity: 0; transition: 0.3s; pointer-events: none; }
        .node-tooltip strong { display: block; white-space: nowrap; }
        .node-tooltip span { font-weight: 900; color: var(--text-muted); font-size: 0.6rem; }

        .hospital-node-p:hover .node-tooltip { opacity: 1; top: -60px; }
        .hospital-node-p:hover .node-core, .hospital-node-p.active .node-core { transform: scale(1.2); box-shadow: 0 0 20px rgba(255,255,255,0.2); }

        .route-vector-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .route-line { stroke: var(--primary); stroke-width: 2; stroke-dasharray: 8; opacity: 0.3; }
        .route-line.animating { stroke-dashoffset: 50; animation: routeFlow 2s linear infinite; opacity: 0.8; stroke-width: 3; }

        .map-footer-intelligence { position: absolute; bottom: 30px; left: 30px; background: var(--surface); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); padding: 12px 24px; border-radius: 100px; display: flex; align-items: center; gap: 20px; z-index: 100; }
        .fi-item { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; font-weight: 900; letter-spacing: 0.5px; }
        .fi-divider { width: 1px; height: 15px; background: rgba(255,255,255,0.1); }

        .intel-search-box { display: flex; align-items: center; gap: 15px; padding: 1.25rem 2rem; margin-bottom: 1.5rem; }
        .intel-search-box input { background: transparent; border: none; color: var(--text); font-size: 0.9rem; font-weight: 600; width: 100%; outline: none; }
        .tactical-filter-btn { background: var(--surface); border: none; color: var(--text-muted); padding: 8px; border-radius: 8px; cursor: pointer; }

        .hospital-intel-card { margin-bottom: 2rem; }
        .hi-header { display: flex; gap: 1.5rem; align-items: center; margin-bottom: 2rem; }
        .hi-icon-box { width: 64px; height: 64px; border-radius: 18px; display: flex; align-items: center; justify-content: center; }
        .hi-title h3 { font-size: 1.5rem; font-weight: 900; margin: 0 0 5px; }
        .hi-badge { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); background: var(--surface); padding: 4px 10px; border-radius: 8px; }

        .hi-metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .hi-metric { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); padding: 16px; border-radius: 20px; text-align: center; }
        .hi-metric small { display: block; font-size: 0.6rem; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; letter-spacing: 1px; }
        .hi-metric strong { font-size: 1.3rem; font-weight: 900; }

        .hi-info-list { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem; }
        .hi-item { display: flex; align-items: center; gap: 12px; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }

        .nearby-hubs-list { display: flex; flex-direction: column; gap: 10px; }
        .section-label-p { font-size: 0.75rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 1.5rem; }
        .hub-item-p { display: flex; justify-content: space-between; align-items: center; background: var(--surface); border: 1px solid rgba(255,255,255,0.05); padding: 16px 20px; border-radius: 20px; cursor: pointer; transition: 0.3s; }
        .hub-item-p:hover { transform: translateX(8px); border-color: var(--primary); background: rgba(14, 165, 233, 0.05); }
        .hub-item-p.active { border-color: var(--primary); background: rgba(14, 165, 233, 0.1); }
        .hub-info strong { display: block; font-size: 0.95rem; margin-bottom: 4px; }
        .hub-info small { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .hub-stat { text-align: right; }
        .hs-val { font-size: 1.1rem; font-weight: 900; }
        .hub-stat small { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); }

        @keyframes pulseSignal { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
        @keyframes mapPulseP { 0% { transform: scale(1); opacity: 0.3; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes routeFlow { to { stroke-dashoffset: 0; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default HospitalLocator;
