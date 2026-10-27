import React, { useState } from 'react';
import { 
  Maximize2, 
  Layers, 
  MapPin, 
  Activity, 
  Navigation, 
  Target,
  ShieldAlert,
  Search,
  Filter,
  Compass
} from 'lucide-react';

const StateMap = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  
  const hotspots = [
    { id: 1, name: 'Visakhapatnam District', lat: '17.6868° N', lng: '83.2185° E', risk: 'Critical', color: '#f43f5e', x: '75%', y: '35%' },
    { id: 2, name: 'Guntur District', lat: '16.3067° N', lng: '80.4365° E', risk: 'Rising', color: '#f59e0b', x: '55%', y: '55%' },
    { id: 3, name: 'Kurnool District', lat: '15.8222° N', lng: '78.0350° E', risk: 'Stable', color: '#10b981', x: '25%', y: '65%' },
  ];

  return (
    <div className="state-map-premium animate-fade">
      <div className="map-frame">
         {/* Strategic Background Layer (Simulated Google Map Satellite Dark) */}
         <div className="map-base">
            <div className="map-grid"></div>
            <div className="map-topography"></div>
            
            {/* Jurisdictional Boundaries Simulation */}
            <svg className="map-boundaries" viewBox="0 0 1000 1000">
               <path d="M700 300 L750 350 L800 450 L750 600 L600 700 L500 650 Z" fill="rgba(14, 165, 233, 0.05)" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
               <path d="M200 600 L300 650 L400 750 L350 850 L200 800 Z" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Hotspot Markers */}
            {hotspots.map((h) => (
              <div 
                key={h.id} 
                className={`map-marker ${activeHotspot?.id === h.id ? 'active' : ''}`}
                style={{ top: h.y, left: h.x }}
                onMouseEnter={() => setActiveHotspot(h)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                 <div className="marker-ping" style={{ background: h.color }}></div>
                 <div className="marker-core" style={{ background: h.color, boxShadow: `0 0 20px ${h.color}` }}>
                    <Activity size={12} color="white" />
                 </div>
                 {activeHotspot?.id === h.id && (
                    <div className="marker-info-card">
                       <div className="mi-header" style={{ borderBottom: `1px solid ${h.color}33` }}>
                          <strong>{h.name}</strong>
                          <span style={{ color: h.color }}>{h.risk}</span>
                       </div>
                       <div className="mi-body">
                          <div className="mi-coord">
                             <span>{h.lat}</span>
                             <span>{h.lng}</span>
                          </div>
                          <button className="mi-action-btn">Intercept Intelligence</button>
                       </div>
                    </div>
                 )}
              </div>
            ))}
         </div>

         {/* Command Overlays */}
         <div className="map-overlay top-left">
            <div className="search-bar-map">
               <Search size={16} />
               <input type="text" placeholder="Locate District/Facility..." />
            </div>
         </div>

         <div className="map-overlay top-right">
            <div className="map-actions">
               <button className="map-btn"><Layers size={18} /></button>
               <button className="map-btn"><Navigation size={18} /></button>
               <button className="map-btn"><Maximize2 size={18} /></button>
            </div>
         </div>

         <div className="map-overlay bottom-left">
            <div className="map-compass">
               <Compass size={32} />
               <span>N</span>
            </div>
         </div>

         <div className="map-overlay bottom-right">
            <div className="map-legend">
               <div className="legend-item"><div className="l-dot critical"></div> Critical Cluster</div>
               <div className="legend-item"><div className="l-dot rising"></div> Rising Hotspot</div>
               <div className="legend-item"><div className="l-dot stable"></div> Monitored Zone</div>
            </div>
         </div>
      </div>

      <style>{`
        .state-map-premium { width: 100%; height: 600px; border-radius: 32px; overflow: hidden; position: relative; border: 1px solid rgba(255,255,255,0.05); }
        .map-frame { width: 100%; height: 100%; background: var(--surface); position: relative; }
        
        .map-base { width: 100%; height: 100%; position: relative; cursor: crosshair; }
        .map-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px; }
        .map-topography { position: absolute; inset: 0; background: url('https://www.transparenttextures.com/patterns/dark-matter.png'); opacity: 0.2; }
        .map-boundaries { position: absolute; inset: 0; width: 100%; height: 100%; }

        .map-marker { position: absolute; transform: translate(-50%, -50%); z-index: 100; transition: 0.3s; }
        .marker-core { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; border: 2px solid white; }
        .marker-ping { position: absolute; inset: -15px; border-radius: 50%; opacity: 0; animation: markerPulse 2s infinite; }
        
        .marker-info-card { 
          position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); 
          background: rgba(10, 13, 23, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); 
          border-radius: 16px; padding: 1.25rem; width: 220px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); 
          z-index: 200; animation: slideUpFade 0.3s forwards;
        }
        .mi-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; margin-bottom: 8px; }
        .mi-header strong { font-size: 0.9rem; color: var(--text); }
        .mi-header span { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; }
        .mi-coord { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
        .mi-coord span { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; font-family: monospace; }
        .mi-action-btn { width: 100%; background: var(--primary); border: none; color: var(--text); padding: 8px; border-radius: 8px; font-weight: 800; font-size: 0.75rem; cursor: pointer; transition: 0.3s; }
        .mi-action-btn:hover { transform: scale(1.02); box-shadow: 0 5px 15px rgba(14, 165, 233, 0.3); }

        .map-overlay { position: absolute; z-index: 150; }
        .top-left { top: 20px; left: 20px; }
        .top-right { top: 20px; right: 20px; }
        .bottom-left { bottom: 20px; left: 20px; }
        .bottom-right { bottom: 20px; right: 20px; }

        .search-bar-map { background: var(--surface); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 8px 16px; display: flex; align-items: center; gap: 12px; backdrop-filter: blur(12px); width: 260px; }
        .search-bar-map input { background: transparent; border: none; color: var(--text); font-size: 0.8rem; font-weight: 600; width: 100%; outline: none; }

        .map-actions { display: flex; flex-direction: column; gap: 8px; }
        .map-btn { width: 44px; height: 44px; background: var(--surface); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: var(--text); cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(12px); transition: 0.3s; }
        .map-btn:hover { background: var(--primary); border-color: var(--primary); }

        .map-compass { display: flex; flex-direction: column; align-items: center; color: var(--text-muted); gap: 4px; }
        .map-compass span { font-weight: 900; font-size: 0.8rem; }

        .map-legend { background: var(--surface); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px; backdrop-filter: blur(12px); display: flex; flex-direction: column; gap: 8px; }
        .legend-item { display: flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: 800; color: var(--text-muted); }
        .l-dot { width: 8px; height: 8px; border-radius: 50%; }
        .l-dot.critical { background: #f43f5e; box-shadow: 0 0 10px #f43f5e; }
        .l-dot.rising { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }
        .l-dot.stable { background: var(--surface-light); box-shadow: 0 0 10px #10b981; }

        @keyframes markerPulse { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes slideUpFade { from { transform: translate(-50%, 10px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default StateMap;
