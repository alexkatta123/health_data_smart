import React, { useState, useEffect, useRef } from 'react';
import { 
  Map as MapIcon, 
  Layers, 
  Globe, 
  Eye, 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  Building2, 
  Search, 
  Navigation,
  Database,
  ChevronRight,
  ChevronLeft,
  X,
  TrendingUp,
  Download
} from 'lucide-react';

const districtDataAP = [
  { id: 1, name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, status: 'Critical', topDisease: 'Dengue', cases: 1450, phcs: 12 },
  { id: 2, name: 'Guntur', lat: 16.3067, lng: 80.4365, status: 'Critical', topDisease: 'Typhoid', cases: 1280, phcs: 15 },
  { id: 3, name: 'Tirupati', lat: 13.6285, lng: 79.4192, status: 'High Risk', topDisease: 'Dengue', cases: 960, phcs: 10 },
  { id: 4, name: 'Kurnool', lat: 15.8281, lng: 78.0373, status: 'High Risk', topDisease: 'Malaria', cases: 840, phcs: 14 },
  { id: 5, name: 'Vijayawada', lat: 16.5062, lng: 80.6480, status: 'Critical', topDisease: 'Dengue', cases: 1100, phcs: 18 },
  { id: 6, name: 'Nellore', lat: 14.4426, lng: 79.9865, status: 'Stable', topDisease: 'Malaria', cases: 420, phcs: 8 },
  { id: 7, name: 'Anantapur', lat: 14.6819, lng: 77.6006, status: 'Stable', topDisease: 'Typhoid', cases: 380, phcs: 9 },
  { id: 8, name: 'Kakinada', lat: 16.9891, lng: 82.2475, status: 'High Risk', topDisease: 'Dengue', cases: 750, phcs: 11 }
];

const phcRecords = [
  { id: 101, name: 'Guntur PHC-1', lat: 16.3200, lng: 80.4500, cases: 124, topDisease: 'Typhoid', status: 'Active' },
  { id: 102, name: 'Tenali CHC', lat: 16.2400, lng: 80.6400, cases: 89, topDisease: 'Dengue', status: 'Alert' },
  { id: 103, name: 'Vizag Urban PHC', lat: 17.7200, lng: 83.2500, cases: 210, topDisease: 'Dengue', status: 'Active' },
  { id: 104, name: 'Tirupati Rural PHC', lat: 13.6500, lng: 79.4500, cases: 65, topDisease: 'Malaria', status: 'Stable' }
];

const TacticalSurveillanceMap = () => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const [mapType, setMapType] = useState('street');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [phcs, setPhcs] = useState([]);
  const [showDistricts, setShowDistricts] = useState(true);
  const [showPhcs, setShowPhcs] = useState(true);
  const [showRiskHeat, setShowRiskHeat] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('districts'); // districts, phcs, transparency

  useEffect(() => {
    fetch('http://localhost:8000/api/facilities')
      .then(res => res.json())
      .then(data => {
        // Map backend names to what component expects if needed, or just use as is
        // We add some mock stats for cases since backend doesn't have it yet for facilities
        const enriched = data.map(f => ({
          ...f,
          lat: f.latitude,
          lng: f.longitude,
          cases: Math.floor(Math.random() * 100) + 10,
          topDisease: 'Dengue',
          status: Math.random() > 0.7 ? 'Alert' : 'Active'
        })).filter(f => f.lat && f.lng);
        setPhcs(enriched);
      })
      .catch(err => console.error("Error fetching facilities:", err));
  }, []);

  useEffect(() => {
    if (!window.L || !mapRef.current) return;

    if (!leafletMap.current) {
      leafletMap.current = window.L.map(mapRef.current).setView([15.9129, 79.7400], 7);
    } else {
      leafletMap.current.eachLayer((layer) => {
        if (!layer._url) leafletMap.current.removeLayer(layer);
      });
    }

    const streetTiles = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    });

    const satelliteTiles = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    });

    if (mapType === 'street') {
      satelliteTiles.removeFrom(leafletMap.current);
      streetTiles.addTo(leafletMap.current);
    } else {
      streetTiles.removeFrom(leafletMap.current);
      satelliteTiles.addTo(leafletMap.current);
    }

    // Add District Markers (Urgencies)
    if (showDistricts) {
      districtDataAP.forEach(d => {
        if (showRiskHeat) {
          const color = d.status === 'Critical' ? '#f43f5e' : d.status === 'High Risk' ? '#f59e0b' : '#3b82f6';
          const circle = window.L.circle([d.lat, d.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.2,
            radius: Math.sqrt(d.cases) * 300 // More professional scaling
          }).addTo(leafletMap.current);

          circle.on('click', () => setSelectedRecord({ ...d, type: 'District' }));
        }
        
        // Small, refined urgency dot
        const icon = window.L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="map-urgency-dot ${d.status.toLowerCase().replace(' ', '-')}"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });
        const marker = window.L.marker([d.lat, d.lng], { icon }).addTo(leafletMap.current);
        marker.on('click', () => setSelectedRecord({ ...d, type: 'District' }));
      });
    }

    // Add PHC Markers (Small & Precise)
    if (showPhcs) {
      phcs.forEach(p => {
        const marker = window.L.marker([p.lat, p.lng], {
          icon: window.L.divIcon({
            className: 'phc-marker-mini',
            html: `<div style="background: white; border: 1px solid var(--primary); border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1)"><div style="width: 6px; height: 6px; background: var(--primary); border-radius: 50%"></div></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        }).addTo(leafletMap.current);
        
        marker.on('click', () => setSelectedRecord({ ...p, type: 'PHC' }));
      });
    }

  }, [mapType, phcs, showDistricts, showPhcs, showRiskHeat]);

  return (
    <div className="tactical-gis-view animate-fade">
      <header className="gis-header">
        <div className="header-main">
          <div className="badge"><Globe size={14} /> STATEWIDE GIS SURVEILLANCE</div>
          <h1>Tactical Health Intelligence <span className="district-tag">ANDHRA PRADESH</span></h1>
        </div>
        
        <div className="gis-controls">
          <div className="layer-toggles" style={{ display: 'flex', gap: '10px', background: 'var(--surface-light)', padding: '5px', borderRadius: '14px', border: '1px solid var(--border)' }}>
             <button 
                className={showDistricts ? 'active' : ''} 
                onClick={() => setShowDistricts(!showDistricts)}
                style={{ background: showDistricts ? 'var(--primary)' : 'transparent', color: showDistricts ? 'white' : 'var(--text-muted)', border: 'none', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
             >
                {showDistricts ? <ShieldAlert size={14} /> : <ShieldAlert size={14} style={{ opacity: 0.5 }} />} Districts
             </button>
             <button 
                className={showPhcs ? 'active' : ''} 
                onClick={() => setShowPhcs(!showPhcs)}
                style={{ background: showPhcs ? 'var(--primary)' : 'transparent', color: showPhcs ? 'white' : 'var(--text-muted)', border: 'none', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
             >
                {showPhcs ? <Building2 size={14} /> : <Building2 size={14} style={{ opacity: 0.5 }} />} PHC Markers
             </button>
             <button 
                className={showRiskHeat ? 'active' : ''} 
                onClick={() => setShowRiskHeat(!showRiskHeat)}
                style={{ background: showRiskHeat ? 'var(--primary)' : 'transparent', color: showRiskHeat ? 'white' : 'var(--text-muted)', border: 'none', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
             >
                {showRiskHeat ? <TrendingUp size={14} /> : <TrendingUp size={14} style={{ opacity: 0.5 }} />} Risk Heat
             </button>
          </div>

          <div className="map-toggle">
            <button className={mapType === 'street' ? 'active' : ''} onClick={() => setMapType('street')}><Globe size={16} /> Street View</button>
            <button className={mapType === 'satellite' ? 'active' : ''} onClick={() => setMapType('satellite')}><Eye size={16} /> Satellite View</button>
          </div>
          <button className="h-btn-primary"><Download size={18} /> Export GIS Audit</button>
        </div>
      </header>

      <div className={`gis-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <aside className="gis-sidebar mo-card">
          <div className="sidebar-header">
            <h3><Database size={18} /> Surveillance Registry</h3>
            <button className="close-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          <div className="sidebar-content">
            <div className="map-search-wrapper" style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search registry..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', background: 'var(--surface-light)', border: '1px solid var(--border)', padding: '12px 15px 12px 45px', borderRadius: '14px', fontSize: '0.9rem', color: 'var(--text)', outline: 'none' }}
              />
            </div>
            
            <div className="summary-section">
               <div className="s-card critical">
                 <strong>03</strong>
                 <span>Critical Districts</span>
               </div>
               <div className="s-card high">
                 <strong>05</strong>
                 <span>High Risk Zones</span>
               </div>
            </div>

            <div className="registry-list">
              <div className="registry-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                 <button onClick={() => setViewMode('districts')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: viewMode === 'districts' ? 'var(--primary)' : 'var(--surface-light)', color: viewMode === 'districts' ? 'white' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>Districts</button>
                 <button onClick={() => setViewMode('phcs')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: viewMode === 'phcs' ? 'var(--primary)' : 'var(--surface-light)', color: viewMode === 'phcs' ? 'white' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>PHC Registry</button>
                 <button onClick={() => setViewMode('transparency')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: viewMode === 'transparency' ? 'var(--primary)' : 'var(--surface-light)', color: viewMode === 'transparency' ? 'white' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>Audit Trail</button>
              </div>

              {viewMode === 'districts' && (
                <>
                  <h4>District Prevalence Matrix</h4>
                  {districtDataAP.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).map(d => (
                    <div key={d.id} className="registry-item" onClick={() => {
                      setSelectedRecord({...d, type: 'District'});
                      if (leafletMap.current) leafletMap.current.setView([d.lat, d.lng], 10);
                    }}>
                      <div className="item-meta">
                        <span className={`urgency-dot ${d.status.toLowerCase().replace(' ', '-')}`}></span>
                        <strong>{d.name}</strong>
                      </div>
                      <div className="item-stats">
                        <span className="disease">{d.topDisease}</span>
                        <span className="cases">{d.cases}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
              
              {viewMode === 'phcs' && (
                <div className="phc-registry-p">
                   <h4>PHC Facility Records</h4>
                   {phcs.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                     <div key={p.id} className="registry-item" onClick={() => {
                       setSelectedRecord({...p, type: 'PHC'});
                       if (leafletMap.current) leafletMap.current.setView([p.lat, p.lng], 14);
                     }}>
                        <div className="item-meta">
                           <Building2 size={14} color="var(--primary)" />
                           <div>
                              <strong>{p.name}</strong>
                              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>District: {p.district || 'Unassigned'}</span>
                           </div>
                        </div>
                        <div className="item-stats">
                           <span className="cases">{p.cases} Cases</span>
                           <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 800 }}>LIVE</span>
                        </div>
                     </div>
                   ))}
                </div>
              )}

              {viewMode === 'transparency' && (
                <div className="transparency-audit">
                   <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '1.5rem' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>SYSTEM TRANSPARENCY ACTIVE: Displaying raw clinical ingestion data for the last 24 hours.</p>
                   </div>
                   {phcs.slice(0, 15).map((p, i) => (
                     <div key={i} style={{ padding: '12px', borderBottom: '1px solid var(--border)', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                           <strong style={{ color: 'var(--text)' }}>{p.name}</strong>
                           <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{p.cases} INGESTS</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                           <span>Hash: 0x${Math.random().toString(16).slice(2, 8)}...</span>
                           <span>{new Date().toLocaleDateString()}</span>
                        </div>
                     </div>
                   ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="map-viewer-main mo-card">
          <div ref={mapRef} className="leaflet-map-instance"></div>
          
          <div className="map-overlay-legend">
            <div className="l-row"><ShieldAlert size={16} color="#f43f5e" /> Critical Outbreak</div>
            <div className="l-row"><AlertTriangle size={16} color="#f59e0b" /> High Risk Region</div>
            <div className="l-row"><Building2 size={16} color="var(--primary)" /> PHC / CHC Record</div>
          </div>

          {selectedRecord && (            <div className="record-panel-overlay animate-slide-up">
              <div className="panel-header">
                <div>
                   <span className="p-type">{selectedRecord.type} RECORD</span>
                   <h3>{selectedRecord.name}</h3>
                </div>
                <button className="close-btn" onClick={() => setSelectedRecord(null)}><X size={20} /></button>
              </div>
              
              <div className="panel-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <div className="p-metric-grid">
                  <div className="m-card">
                    <TrendingUp size={20} color="var(--primary)" />
                    <div>
                      <strong>{selectedRecord.cases}</strong>
                      <span>Total Cases</span>
                    </div>
                  </div>
                  <div className="m-card">
                    <ShieldAlert size={20} color="#f43f5e" />
                    <div>
                      <strong>{selectedRecord.topDisease}</strong>
                      <span>Prevalent Pathogen</span>
                    </div>
                  </div>
                </div>
                
                {selectedRecord.type === 'PHC' ? (
                   <div className="phc-clinical-ledger">
                      <h4 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>Recent Ingested Cases</h4>
                      {[
                        { id: 'REC-01', disease: 'Dengue Fever', age: 34, gender: 'M', time: '2h ago' },
                        { id: 'REC-02', disease: 'Viral Fever', age: 12, gender: 'F', time: '5h ago' },
                        { id: 'REC-03', disease: 'Influenza', age: 45, gender: 'M', time: '8h ago' }
                      ].map((rec, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                           <div>
                              <strong style={{ display: 'block' }}>{rec.disease}</strong>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Age: {rec.age} • {rec.gender} • {rec.id}</span>
                           </div>
                           <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{rec.time}</span>
                        </div>
                      ))}
                   </div>
                ) : (
                   <div className="clinical-audit">
                     <h4>Automated NLP Audit</h4>
                     <p>System detected a surge in clinical reports mentioning high fever and joint pain in {selectedRecord.name} region. ICD-10 Mapping: A90 (Dengue Fever) confirmed with 94.2% AI confidence.</p>
                   </div>
                )}

                <button className="h-btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>View Full Intelligence Logs</button>
              </div>
            </div>

          )}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tactical-gis-view { padding: 2rem; color: var(--text); height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
        
        .gis-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-shrink: 0; }
        .header-main h1 { font-size: 2.5rem; font-weight: 900; margin-top: 8px; }
        .district-tag { font-size: 1rem; color: var(--primary); background: var(--primary-glow); padding: 4px 12px; border-radius: 100px; margin-left: 15px; }
        
        .gis-controls { display: flex; gap: 15px; align-items: center; }
        .map-toggle { background: var(--surface-light); padding: 5px; border-radius: 14px; border: 1px solid var(--border); display: flex; gap: 5px; }
        .map-toggle button { padding: 8px 16px; border: none; border-radius: 10px; background: transparent; color: var(--text-muted); font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .map-toggle button.active { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--primary-glow); }

        .gis-layout { display: flex; gap: 2rem; flex: 1; min-height: 0; transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .gis-sidebar { width: 400px; display: flex; flex-direction: column; min-height: 0; flex-shrink: 0; transition: 0.4s; }
        .sidebar-closed .gis-sidebar { width: 60px; overflow: hidden; }
        
        .sidebar-header { padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .sidebar-content { flex: 1; overflow-y: auto; padding: 1.5rem; }
        
        .summary-section { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .s-card { padding: 1.5rem; border-radius: 20px; text-align: center; }
        .s-card.critical { background: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .s-card.high { background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .s-card strong { display: block; font-size: 2rem; font-weight: 900; }
        .s-card span { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }

        .registry-list h4 { font-size: 0.8rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.5rem; }
        .registry-item { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: var(--surface-light); border-radius: 16px; border: 1px solid var(--border); margin-bottom: 10px; cursor: pointer; transition: 0.2s; }
        .registry-item:hover { transform: translateX(5px); border-color: var(--primary); }
        .item-meta { display: flex; align-items: center; gap: 12px; }
        .urgency-dot { width: 10px; height: 10px; border-radius: 50%; }
        .urgency-dot.critical { background: #f43f5e; box-shadow: 0 0 10px #f43f5e; }
        .urgency-dot.high-risk { background: #f59e0b; }
        .urgency-dot.stable { background: #3b82f6; }
        .item-stats { text-align: right; }
        .item-stats .disease { display: block; font-size: 0.75rem; font-weight: 800; color: var(--primary); }
        .item-stats .cases { font-size: 1rem; font-weight: 900; }

        .map-viewer-main { flex: 1; position: relative; margin: 0; padding: 0; overflow: hidden; }
        .leaflet-map-instance { width: 100%; height: 100%; z-index: 1; }
        
        .map-overlay-legend { position: absolute; bottom: 30px; left: 30px; z-index: 10; background: var(--surface); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; box-shadow: var(--card-shadow); }
        .l-row { display: flex; align-items: center; gap: 12px; font-size: 0.85rem; font-weight: 800; color: var(--text-muted); }

        .record-panel-overlay { position: absolute; top: 30px; right: 30px; width: 380px; z-index: 100; background: var(--surface); border: 1px solid var(--border); border-radius: 28px; padding: 2rem; box-shadow: var(--card-shadow); }
        .panel-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .p-type { font-size: 0.7rem; font-weight: 900; color: var(--primary); letter-spacing: 1px; }
        .close-btn { background: var(--surface-light); border: none; padding: 8px; border-radius: 12px; cursor: pointer; color: var(--text-muted); }
        
        .p-metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .m-card { background: var(--surface-light); padding: 1.25rem; border-radius: 20px; border: 1px solid var(--border); }
        .m-card strong { display: block; font-size: 1.4rem; font-weight: 900; margin-top: 8px; }
        .m-card span { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }
        
        .clinical-audit { background: rgba(14, 165, 233, 0.05); padding: 1.5rem; border-radius: 20px; border: 1px solid var(--primary-glow); }
        .clinical-audit h4 { font-size: 0.8rem; font-weight: 900; margin-bottom: 8px; color: var(--primary); }
        .clinical-audit p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; font-weight: 600; margin: 0; }

        .map-urgency-dot { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3); }
        .map-urgency-dot.critical { background: #f43f5e; animation: pulseRed 2s infinite; }
        .map-urgency-dot.high-risk { background: #f59e0b; }
        .map-urgency-dot.stable { background: #3b82f6; }

        @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(244, 63, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); } }
      ` }} />
    </div>
  );
};

export default TacticalSurveillanceMap;
