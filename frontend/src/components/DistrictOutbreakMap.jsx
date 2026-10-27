import React from 'react';
import { MapPin, Layers, Filter } from 'lucide-react';

const DistrictOutbreakMap = () => (
  <div className="district-map-tab animate-fade">
    <div className="mo-card map-container" style={{ position: 'relative', height: '600px', background: '#0a0d17', overflow: 'hidden' }}>
       {/* Mock Map UI */}
       <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'url(https://www.transparenttextures.com/patterns/dark-matter.png)' }}></div>
       
       {/* Hotspots */}
       <div style={{ position: 'absolute', top: '30%', left: '40%', width: '120px', height: '120px', background: 'rgba(244, 63, 94, 0.2)', borderRadius: '50%', border: '2px solid #f43f5e', animation: 'pulse 2s infinite' }}></div>
       <div style={{ position: 'absolute', top: '60%', left: '70%', width: '80px', height: '80px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '50%', border: '2px solid #f59e0b' }}></div>
       
       <div className="map-controls" style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="ctrl-btn"><Layers size={20} /></button>
          <button className="ctrl-btn"><Filter size={20} /></button>
       </div>

       <div className="map-legend" style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(10, 13, 23, 0.8)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', backdropFilter: 'blur(10px)' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Surveillance Layers</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 10, height: 10, background: '#f43f5e', borderRadius: '50%' }}></div> High Risk Clusters</div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 10, height: 10, background: '#f59e0b', borderRadius: '50%' }}></div> Emerging Hotspots</div>
          </div>
       </div>
    </div>
    <style>{`
      .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1rem; }
      .ctrl-btn { width: 44px; height: 44px; background: var(--surface); border: 1px solid var(--border); color: var(--text); border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      @keyframes pulse {
        0% { transform: scale(0.9); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(0.9); opacity: 0.5; }
      }
    `}</style>
  </div>
);

export default DistrictOutbreakMap;
