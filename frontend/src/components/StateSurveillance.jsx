import React, { useState } from 'react';
import { Map as MapIcon, Layers, Maximize2, Compass, AlertCircle, Activity, ShieldCheck, Filter, Globe, ChevronRight, Search, BarChart2, Map as MapTypeIcon, Zap } from 'lucide-react';

const StateSurveillance = () => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mapType, setMapType] = useState('street'); // 'street' or 'satellite'
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive AP District Data (Simulated from 29,560 Records)
  const districtData = [
    { id: 'GNT', name: 'Guntur', cases: 8420, status: 'Critical', color: '#ef4444', top: '48%', left: '42%' },
    { id: 'VZG', name: 'Visakhapatnam', cases: 5280, status: 'Rising', color: '#f59e0b', top: '22%', left: '72%' },
    { id: 'KRI', name: 'Krishna', cases: 4140, status: 'Stable', color: '#10b981', top: '45%', left: '52%' },
    { id: 'CHT', name: 'Chittoor', cases: 3920, status: 'Critical', color: '#ef4444', top: '78%', left: '45%' },
    { id: 'NLR', name: 'Nellore', cases: 2800, status: 'Rising', color: '#f59e0b', top: '65%', left: '48%' },
    { id: 'EG', name: 'East Godavari', cases: 1950, status: 'Stable', color: '#10b981', top: '35%', left: '65%' },
    { id: 'WG', name: 'West Godavari', cases: 1220, status: 'Stable', color: '#10b981', top: '40%', left: '58%' },
    { id: 'KUR', name: 'Kurnool', cases: 840, status: 'Rising', color: '#f59e0b', top: '55%', left: '25%' },
    { id: 'ANA', name: 'Anantapur', cases: 480, status: 'Stable', color: '#10b981', top: '68%', left: '22%' },
    { id: 'KAD', name: 'Kadapa', cases: 250, status: 'Rising', color: '#f59e0b', top: '65%', left: '35%' },
    { id: 'PRA', name: 'Prakasam', cases: 140, status: 'Stable', color: '#10b981', top: '55%', left: '42%' },
    { id: 'VZN', name: 'Vizianagaram', cases: 80, status: 'Stable', color: '#10b981', top: '15%', left: '78%' },
    { id: 'SRI', name: 'Srikakulam', cases: 40, status: 'Stable', color: '#10b981', top: '10%', left: '85%' },
  ];

  const filteredDistricts = districtData.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStateCases = 29560;

  return (
    <div className={`state-surveillance animate-fade ${isMaximized ? 'maximized' : ''}`} style={{ display: 'grid', gridTemplateColumns: isMaximized ? '1fr' : '1fr 400px', gap: '2rem' }}>
      
      {/* Primary Geospatial Command Center */}
      <div className="mo-card surveillance-container" style={{ 
        height: isMaximized ? 'calc(100vh - 100px)' : '800px', 
        padding: 0, 
        overflow: 'hidden', 
        position: 'relative', 
        background: mapType === 'street' ? '#f8fafc' : '#0f172a', 
        border: '1px solid var(--border)',
        borderRadius: '40px',
        boxShadow: 'var(--card-shadow)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
         
         {/* Map Layer Simulation */}
         <div className="map-layer" style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: 1, 
            zIndex: 1,
            background: mapType === 'street' 
              ? 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("https://www.transparenttextures.com/patterns/clean-gray-paper.png")'
              : 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url("https://www.transparenttextures.com/patterns/stardust.png")'
         }}>
            {/* Simulation of Satellite Terrain or Street Grid */}
            {mapType === 'satellite' ? (
               <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)', opacity: 0.5 }}></div>
            ) : (
               <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
            )}
         </div>

         {/* AP State Map Silhouette */}
         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: mapType === 'street' ? 0.08 : 0.15, zIndex: 2 }}>
            <svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M400 50C420 70 450 100 480 120C510 140 550 150 580 180C610 210 580 250 560 280C540 310 520 350 530 380C540 410 570 440 550 480C530 520 480 550 450 580C420 610 380 650 350 680C320 710 280 750 250 780C220 810 180 800 150 770C120 740 80 700 60 670C40 640 50 600 80 570C110 540 150 500 180 470C210 440 240 400 230 360C220 320 180 280 150 250C120 220 100 180 120 150C140 120 180 100 220 80C260 60 300 30 340 40C370 50 380 40 400 50Z" fill={mapType === 'street' ? 'var(--primary)' : '#10b981'} />
            </svg>
         </div>

         {/* Hotspot Visualization Layer */}
         <div className="hotspots-layer" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            {districtData.map((spot) => (
              <div 
                key={spot.id} 
                style={{ position: 'absolute', top: spot.top, left: spot.left, cursor: 'pointer' }}
                onMouseEnter={() => setSelectedHotspot(spot)}
                onMouseLeave={() => setSelectedHotspot(null)}
              >
                 <div className="tactical-pulse-container">
                    <div className="core-node" style={{ background: spot.color, boxShadow: `0 0 30px ${spot.color}` }}></div>
                    <div className="pulse-aura" style={{ border: `2px solid ${spot.color}` }}></div>
                    <div className="node-label-tactical" style={{ position: 'absolute', top: '25px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: '0.7rem', fontWeight: 900, color: mapType === 'street' ? 'var(--text)' : 'white', background: mapType === 'street' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '100px', border: `1px solid ${spot.color}50`, backdropFilter: 'blur(4px)' }}>
                       {spot.name}
                    </div>
                 </div>
              </div>
            ))}
         </div>

         {/* Strategic Command Header */}
         <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 30 }}>
            <div style={{ background: mapType === 'street' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 13, 23, 0.8)', padding: '14px 28px', borderRadius: '100px', border: "1px solid var(--border)", backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
               <Globe size={20} color="var(--primary)" />
               <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '1px', color: mapType === 'street' ? 'var(--text)' : 'white' }}>STATEWIDE SURVEILLANCE</span>
                  <small style={{ display: 'block', fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 800 }}>{mapType.toUpperCase()} INTELLIGENCE v2.5</small>
               </div>
            </div>
         </div>

         {/* Layer Switcher & Tools */}
         <div style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 30, display: 'flex', gap: '12px' }}>
            <div className="layer-switcher" style={{ background: mapType === 'street' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 13, 23, 0.8)', padding: '6px', borderRadius: '18px', border: '1px solid var(--border)', display: 'flex', gap: '4px', backdropFilter: 'blur(12px)' }}>
               <button 
                  className={`layer-btn ${mapType === 'street' ? 'active' : ''}`} 
                  onClick={() => setMapType('street')}
                  style={{ padding: '8px 16px', borderRadius: '12px', border: 'none', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '6px' }}
               >
                  <MapTypeIcon size={14} /> OpenStreet
               </button>
               <button 
                  className={`layer-btn ${mapType === 'satellite' ? 'active' : ''}`} 
                  onClick={() => setMapType('satellite')}
                  style={{ padding: '8px 16px', borderRadius: '12px', border: 'none', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '6px' }}
               >
                  <Globe size={14} /> Satellite
               </button>
            </div>
            <button className="tactical-tool" onClick={() => setIsMaximized(!isMaximized)} style={{ background: mapType === 'street' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 13, 23, 0.8)', color: mapType === 'street' ? 'var(--text)' : 'white' }}><Maximize2 size={20} /></button>
         </div>

         {/* Active Selection Info Card */}
         <div className="active-intelligence-panel animate-slide-up" style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 30 }}>
            <div style={{ background: mapType === 'street' ? 'rgba(255, 255, 255, 0.9)' : 'var(--surface-light)', padding: '24px 32px', borderRadius: '32px', border: "1px solid var(--border)", backdropFilter: 'blur(24px)', minWidth: '300px', boxShadow: '0 25px 60px rgba(0,0,0,0.1)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', background: 'var(--primary-glow)', padding: '6px 12px', borderRadius: '100px' }}>DISTRICT NODE</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedHotspot ? selectedHotspot.color : '#ef4444' }}></div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: selectedHotspot ? selectedHotspot.color : '#ef4444' }}>{selectedHotspot ? selectedHotspot.status : 'CRITICAL'}</span>
                  </div>
               </div>
               <h4 style={{ margin: '0 0 4px', fontSize: '1.6rem', fontWeight: 900, color: "var(--text)", letterSpacing: '-0.8px' }}>
                  {selectedHotspot ? selectedHotspot.name : 'Guntur District'}
               </h4>
               <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0 20px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text)' }}>{selectedHotspot ? selectedHotspot.cases.toLocaleString() : '8,420'}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>REPORTED CASES</span>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                  <div>
                     <small style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Facility Sync</small>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={12} color="#10b981" />
                        <strong style={{ fontSize: '1rem' }}>98.2%</strong>
                     </div>
                  </div>
                  <div>
                     <small style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Risk Factor</small>
                     <strong style={{ fontSize: '1rem', color: '#ef4444' }}>ELEVATED</strong>
                  </div>
               </div>
            </div>
         </div>

         {/* Surveillance Legend */}
         <div style={{ position: 'absolute', bottom: '30px', left: '30px', zIndex: 30 }}>
            <div style={{ background: mapType === 'street' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 13, 23, 0.8)', padding: '18px 24px', borderRadius: '24px', border: "1px solid var(--border)", backdropFilter: 'blur(20px)', display: 'flex', gap: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
               {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, boxShadow: `0 0 10px ${c}` }}></div>
                     <span style={{ fontSize: '0.75rem', fontWeight: 800, color: mapType === 'street' ? 'var(--text)' : 'rgba(255,255,255,0.8)' }}>{['CRITICAL', 'RISING', 'STABLE'][i]}</span>
                  </div>
               ))}
            </div>
         </div>

      </div>

      {/* District Intelligence Matrix (Side Panel) */}
      {!isMaximized && (
        <div className="matrix-panel animate-fade-right">
           <div className="mo-card" style={{ padding: '2.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '40px', boxShadow: 'var(--card-shadow)', height: '800px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <div>
                    <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900 }}>District Matrix</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Cases: {totalStateCases.toLocaleString()}</p>
                 </div>
                 <BarChart2 size={24} color="var(--primary)" />
              </div>

              <div className="search-pill-mini" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: '16px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                 <Search size={18} color="var(--text-muted)" />
                 <input 
                    type="text" 
                    placeholder="Search district node..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '0.95rem', width: '100%', fontWeight: 600 }}
                 />
              </div>

              <div className="district-scroll-list" style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                 {filteredDistricts.map((d) => (
                    <div 
                      key={d.id} 
                      className="district-item-tactical" 
                      style={{ 
                        padding: '18px', 
                        borderRadius: '20px', 
                        background: 'var(--surface-light)', 
                        border: '1px solid var(--border)', 
                        marginBottom: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: '0.3s'
                      }}
                      onMouseEnter={() => setSelectedHotspot(d)}
                      onMouseLeave={() => setSelectedHotspot(null)}
                    >
                       <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }}></div>
                          <div>
                             <div style={{ fontSize: '1rem', fontWeight: 800 }}>{d.name}</div>
                             <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>{d.status.toUpperCase()}</div>
                          </div>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{d.cases.toLocaleString()}</div>
                          <ChevronRight size={16} color="var(--text-muted)" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .state-surveillance { transition: all 0.5s ease; }
        .surveillance-container { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        
        .layer-btn { background: transparent; color: var(--text-muted); }
        .layer-btn.active { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--primary-glow); }
        
        .tactical-pulse-container { position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }
        .core-node { width: 14px; height: 14px; border-radius: 50%; z-index: 2; border: 2px solid rgba(255,255,255,0.4); }
        .pulse-aura { position: absolute; inset: -20px; border-radius: 50%; animation: auraPulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        
        @keyframes auraPulse {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }

        .tactical-tool {
          width: 52px; height: 52px; border-radius: 16px; border: 1px solid var(--border);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(20px); transition: all 0.3s;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .tactical-tool:hover { transform: translateY(-3px) scale(1.05); border-color: var(--primary); }

        .district-item-tactical:hover { border-color: var(--primary) !important; transform: translateX(5px); background: var(--surface) !important; }
        .district-scroll-list::-webkit-scrollbar { width: 5px; }
        .district-scroll-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

        .animate-fade-right { animation: fadeRight 0.8s ease-out forwards; }
        @keyframes fadeRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      ` }} />
    </div>
  );
};

export default StateSurveillance;
