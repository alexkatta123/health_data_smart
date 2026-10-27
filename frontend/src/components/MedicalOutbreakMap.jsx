import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Layers, 
  Filter, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  ChevronRight,
  Crosshair,
  ShieldAlert,
  Maximize2,
  Search,
  Globe,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  BrainCircuit,
  FileText
} from 'lucide-react';

// Fix Leaflet icons issue
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MedicalOutbreakMap = () => {
  const [mapMode, setMapMode] = useState('street'); // 'street', 'satellite'
  const [selectedDistrict, setSelectedDistrict] = useState('Guntur');
  
  const [activeMandal, setActiveMandal] = useState({ 
    name: 'Guntur City Central', 
    cases: 112, 
    risk: 'High', 
    district: 'Guntur',
    coords: [16.3067, 80.4365],
    diseaseType: 'Communicable',
    confidence: '94%',
    nlpKeywords: ['fever', 'joint pain', 'rash']
  });

  const [activeLayers, setActiveLayers] = useState({ highRisk: true, emerging: true, heatMap: false });
  
  const [isRapidResponseActive, setIsRapidResponseActive] = useState(false);
  const [responseStep, setResponseStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);

  const hotspots = [
    { id: 1, name: 'Gajuwaka North', district: 'Visakhapatnam', coords: [17.6868, 83.2185], type: 'High Risk Cluster', color: '#f43f5e', size: 30, diseaseType: 'Communicable', confidence: '96%' },
    { id: 2, name: 'Tirupati Urban', district: 'Tirupati', coords: [13.6288, 79.4192], type: 'High Risk Cluster', color: '#f43f5e', size: 25, diseaseType: 'Non-Communicable', confidence: '92%' },
    { id: 3, name: 'Nellore Central', district: 'Nellore', coords: [14.4426, 79.9865], type: 'Emerging Hotspot', color: '#f59e0b', size: 15, diseaseType: 'Communicable', confidence: '88%' },
    { id: 4, name: 'Kurnool Town', district: 'Kurnool', coords: [15.8281, 78.0373], type: 'Emerging Hotspot', color: '#f59e0b', size: 20, diseaseType: 'Other', confidence: '85%' },
    { id: 5, name: 'Guntur City', district: 'Guntur', coords: [16.3067, 80.4365], type: 'High Risk Cluster', color: '#f43f5e', size: 28, diseaseType: 'Communicable', confidence: '94%' },
  ];

  const healthFacilities = [
    { id: 'h1', name: 'Mangalagiri PHC', coords: [16.4312, 80.5583], status: 'Operational', cases: 24, beds: 12 },
    { id: 'h2', name: 'Tenali CHC', coords: [16.2427, 80.6465], status: 'Caution', cases: 42, beds: 30 },
    { id: 'h3', name: 'Bapatla CHC', coords: [15.9048, 80.4674], status: 'Operational', cases: 18, beds: 25 },
    { id: 'h4', name: 'Ponnur PHC', coords: [16.0694, 80.5517], status: 'Critical', cases: 65, beds: 15 },
    { id: 'h5', name: 'Repalle PHC', coords: [15.8885, 80.8406], status: 'Operational', cases: 12, beds: 10 },
    { id: 'h6', name: 'Amaravati PHC', coords: [16.5746, 80.3582], status: 'Caution', cases: 31, beds: 12 },
    { id: 'h7', name: 'Narasaraopet CHC', coords: [16.2361, 80.0528], status: 'Operational', cases: 22, beds: 40 },
    { id: 'h8', name: 'Chilakaluripet PHC', coords: [16.0894, 80.1627], status: 'Operational', cases: 15, beds: 12 },
    { id: 'h9', name: 'Sattenapalli CHC', coords: [16.3958, 80.1492], status: 'Operational', cases: 28, beds: 25 },
    { id: 'h10', name: 'Vinukonda PHC', coords: [16.0551, 79.7424], status: 'Operational', cases: 14, beds: 12 },
    { id: 'h11', name: 'Macherla CHC', coords: [16.4800, 79.4312], status: 'Caution', cases: 38, beds: 30 },
    { id: 'h12', name: 'Gurazala PHC', coords: [16.5833, 79.5667], status: 'Operational', cases: 11, beds: 10 },
    { id: 'h13', name: 'Pedakakani PHC', coords: [16.3400, 80.5000], status: 'Critical', cases: 54, beds: 12 },
    { id: 'h14', name: 'Tadikonda PHC', coords: [16.4250, 80.4500], status: 'Operational', cases: 9, beds: 10 },
    { id: 'h15', name: 'Vatticherukuru PHC', coords: [16.2200, 80.3900], status: 'Operational', cases: 13, beds: 12 }
  ];

  const handleHotspotClick = (h) => {
    setActiveMandal({
      name: h.name,
      cases: Math.floor(Math.random() * 100) + 20,
      risk: h.type === 'High Risk Cluster' ? 'High' : 'Moderate',
      district: h.district,
      coords: h.coords,
      diseaseType: h.diseaseType,
      confidence: h.confidence,
      nlpKeywords: ['fever', 'fatigue', 'localized pain'].sort(() => 0.5 - Math.random()).slice(0, 3)
    });
    setSelectedDistrict(h.district);
  };

  const handleInitiateResponse = () => {
    setIsRapidResponseActive(true);
  };

  const executeDeployment = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setResponseStep(4);
    }, 4000);
  };

  const closeResponse = () => {
    setIsRapidResponseActive(false);
    setResponseStep(1);
    setIsDeploying(false);
  };

  return (
    <div className="outbreak-map-portal animate-fade">
      <div className="map-command-center">
        <div className="map-viewport">
          
          <MapContainer center={[16.3067, 80.4365]} zoom={9} style={{ height: '100%', width: '100%', zIndex: 1 }}>
            <ChangeView center={activeMandal.coords} zoom={11} />
            
            {mapMode === 'street' ? (
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
            ) : (
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              />
            )}

            {/* Heatmap Layer */}
            {activeLayers.heatMap && hotspots.map((h, index) => (
              <React.Fragment key={`heat-${index}`}>
                <CircleMarker center={h.coords} radius={h.size * 3} pathOptions={{ color: 'transparent', fillColor: h.color, fillOpacity: 0.1 }} />
                <CircleMarker center={h.coords} radius={h.size * 2} pathOptions={{ color: 'transparent', fillColor: h.color, fillOpacity: 0.15 }} />
                <CircleMarker center={h.coords} radius={h.size * 1.2} pathOptions={{ color: 'transparent', fillColor: h.color, fillOpacity: 0.2 }} />
              </React.Fragment>
            ))}

            {/* PHC/CHC Markers */}
            {healthFacilities.map((h) => (
              <CircleMarker
                key={h.id}
                center={h.coords}
                radius={8}
                pathOptions={{ 
                  color: h.status === 'Critical' ? '#f43f5e' : h.status === 'Caution' ? '#f59e0b' : '#10b981', 
                  fillColor: h.status === 'Critical' ? '#f43f5e' : h.status === 'Caution' ? '#f59e0b' : '#10b981', 
                  fillOpacity: 0.8,
                  weight: 2
                }}
                eventHandlers={{ 
                  click: () => {
                    setActiveMandal({
                      name: h.name,
                      cases: h.cases,
                      risk: h.status === 'Critical' ? 'High' : h.status === 'Caution' ? 'Moderate' : 'Low',
                      district: 'Guntur',
                      coords: h.coords,
                      diseaseType: h.cases > 30 ? 'Communicable' : 'Seasonal',
                      confidence: '98%',
                      nlpKeywords: ['PHC Tracking', 'Facility Alert', 'Bed Capacity']
                    });
                  }
                }}
              >
                <Popup>
                  <div style={{ fontWeight: 800 }}>{h.name}</div>
                  <div style={{ fontSize: '0.8rem', color: h.status === 'Critical' ? '#f43f5e' : '#666' }}>Status: {h.status}</div>
                </Popup>
              </CircleMarker>
            ))}

            {/* Main Hotspots */}
            {hotspots.filter(h => h.type === 'High Risk Cluster' ? activeLayers.highRisk : activeLayers.emerging).map((h) => (
              <CircleMarker
                key={h.id}
                center={h.coords}
                radius={h.size}
                pathOptions={{ 
                  color: h.color, 
                  fillColor: h.color, 
                  fillOpacity: activeMandal.name === h.name ? 0.6 : 0.3,
                  weight: activeMandal.name === h.name ? 4 : 2
                }}
                eventHandlers={{ click: () => handleHotspotClick(h) }}
              >
                <Popup>
                  <div style={{ fontWeight: 800 }}>{h.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{h.type}</div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Overlays */}
          <div className="map-overlay-top-left" style={{ zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="focus-pill-tactical" style={{ background: '#f43f5e', color: "var(--text)", border: 'none' }}>
              <AlertTriangle size={18} />
              <span>ACTIVE PILOT: GUNTUR DISTRICT POC</span>
            </div>
            <div className="focus-pill-tactical">
              <Crosshair size={18} color="var(--primary)" />
              <span>CENTERED: {selectedDistrict.toUpperCase()} HUB</span>
            </div>
          </div>

          <div className="map-overlay-top-right" style={{ zIndex: 1000 }}>
            <button 
              className={`tactical-btn-round ${mapMode === 'satellite' ? 'active' : ''}`} 
              onClick={() => setMapMode(mapMode === 'satellite' ? 'street' : 'satellite')}
              title="Toggle Satellite View"
            >
              <Globe size={22} />
            </button>
            <button className="tactical-btn-round" title="Surveillance Layers"><Layers size={22} /></button>
            <button className="tactical-btn-round" title="Advanced Filters"><Filter size={22} /></button>
          </div>

          <div className="map-overlay-bottom-left" style={{ zIndex: 1000 }}>
            <div className="legend-card-tactical mo-card-p">
              <h5>SURVEILLANCE LAYERS</h5>
              <div className="legend-items">
                <div className="l-item" onClick={() => setActiveLayers(l => ({ ...l, highRisk: !l.highRisk }))} style={{ opacity: activeLayers.highRisk ? 1 : 0.4 }}>
                  <div className="dot" style={{ background: '#f43f5e', boxShadow: '0 0 10px #f43f5e' }}></div>
                  <span>High Risk Clusters</span>
                </div>
                <div className="l-item" onClick={() => setActiveLayers(l => ({ ...l, emerging: !l.emerging }))} style={{ opacity: activeLayers.emerging ? 1 : 0.4 }}>
                  <div className="dot" style={{ background: '#f59e0b', boxShadow: '0 0 10px #f59e0b' }}></div>
                  <span>Emerging Hotspots</span>
                </div>
                <div className="l-item" onClick={() => setActiveLayers(l => ({ ...l, heatMap: !l.heatMap }))} style={{ opacity: activeLayers.heatMap ? 1 : 0.4 }}>
                  <div className="dot" style={{ background: 'linear-gradient(45deg, #f43f5e, #f59e0b)', boxShadow: '0 0 10px #f43f5e' }}></div>
                  <span>Heatmap Density</span>
                </div>
                <div className="l-item">
                  <div className="dot" style={{ background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                  <span>PHC/CHC Network</span>
                </div>
              </div>
            </div>
          </div>

          <div className="intel-card-p animate-slide-up" style={{ zIndex: 1000 }}>
            <div className="i-header">
              <div className="i-title">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '6px', fontWeight: 900 }}>
                    <BrainCircuit size={12} /> AI CLASSIFIED
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '6px', fontWeight: 900 }}>
                    <FileText size={12} /> EMR/NLP VERIFIED
                  </span>
                </div>
                <h4>{activeMandal.name}</h4>
                <span style={{ color: activeMandal.risk === 'High' ? '#f43f5e' : '#f59e0b', fontWeight: 900 }}>{activeMandal.risk.toUpperCase()} RISK VECTOR</span>
              </div>
            </div>
            
            <div className="i-stats-grid">
              <div className="is-item"><small>TOTAL CASES</small><strong>{activeMandal.cases}</strong></div>
              <div className="is-item"><small>TRAJECTORY</small><strong style={{ color: '#f43f5e' }}>+14.2%</strong></div>
              <div className="is-item" style={{ gridColumn: 'span 2' }}>
                <small>AUTOMATED CLASSIFICATION (NLP)</small>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <strong style={{ color: activeMandal.diseaseType === 'Communicable' ? '#f43f5e' : 'var(--text)' }}>
                    {activeMandal.diseaseType}
                  </strong>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>{activeMandal.confidence} CONFIDENCE</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  {activeMandal.nlpKeywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: '0.55rem', background: 'var(--border)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>{kw}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="next-actions-p" style={{ marginBottom: '2rem' }}>
              <small style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '1px' }}>PROPOSED NEXT ACTIONS</small>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeMandal.risk === 'High' ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 700, color: '#f43f5e' }}><AlertTriangle size={14} /> Immediate Quarantine Mobilization</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)' }}><CheckCircle2 size={14} /> Strategic Bed Reservation (15 Units)</div>
                  </>
                ) : activeMandal.risk === 'Moderate' ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}><Activity size={14} /> Accelerated Blood Sample Collection</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)' }}><ShieldCheck size={14} /> Contact Tracing via Field Staff</div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}><CheckCircle2 size={14} /> Routine Surveillance Monitoring</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)' }}><FileText size={14} /> Daily Epidemiological Report</div>
                  </>
                )}
              </div>
            </div>
            
            <button className="h-btn-primary full-width" onClick={handleInitiateResponse} style={{ background: activeMandal.risk === 'High' ? '#f43f5e' : 'var(--primary)', border: 'none' }}>
              {activeMandal.risk === 'High' ? 'Execute Rapid Response' : 'Initiate Surveillance Protocol'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Rapid Response Modal */}
      {isRapidResponseActive && (
        <div className="modal-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(15px)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="mo-card rapid-response-card" style={{ maxWidth: '850px', width: '100%', border: '1px solid var(--border)', background: 'var(--surface)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <div className="rr-header">
               <div className="rr-badge">STRATEGIC COMMAND: PHASE {responseStep}</div>
               <h2 style={{ color: 'var(--text)' }}>Rapid Response Mobilization</h2>
               <p style={{ color: 'var(--text-muted)' }}>Containment protocol for <strong>{activeMandal.name}</strong> ({activeMandal.district})</p>
            </div>

            <div className="rr-stepper">
               {[1, 2, 3].map(s => (
                 <div key={s} className={`rr-step ${responseStep >= s ? 'active' : ''} ${responseStep === s ? 'current' : ''}`}>
                    <div className="step-num">{s}</div>
                    <span>{s === 1 ? 'Resource Allocation' : s === 2 ? 'Unit Deployment' : 'Policy Lock'}</span>
                 </div>
               ))}
            </div>

            <div className="rr-content-area">
               {responseStep === 1 && (
                 <div className="animate-fade">
                    <h4 className="section-label">SELECT ASSET ALLOCATION</h4>
                    <div className="asset-grid">
                       {['Ventilators', 'Oxygen Supply', 'Mobile PHC Units', 'Isolation Kits'].map(asset => (
                         <div key={asset} className="asset-card active" style={{ background: 'var(--surface-light)', border: '1px solid #10b981' }}>
                            <div className="asset-check"><CheckCircle2 size={16} /></div>
                            <strong style={{ color: 'var(--text)' }}>{asset}</strong>
                            <small>PRIORITY: HIGH</small>
                         </div>
                       ))}
                    </div>
                    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                       <button className="h-btn-primary" onClick={() => setResponseStep(2)}>Confirm Assets & Proceed <ChevronRight size={16} /></button>
                    </div>
                 </div>
               )}

               {responseStep === 2 && (
                 <div className="animate-fade">
                    <h4 className="section-label">UNIT DEPLOYMENT OVERVIEW</h4>
                    <div className="deployment-viz" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)' }}>
                       <div className="dv-map" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                          <div className="dv-hotspot" style={{ left: '50%', top: '50%' }}></div>
                          <div className="dv-unit" style={{ left: '30%', top: '30%', animationDelay: '0s' }}><ShieldAlert size={14} /></div>
                          <div className="dv-unit" style={{ right: '30%', bottom: '30%', animationDelay: '0.5s' }}><ShieldAlert size={14} /></div>
                       </div>
                       <div className="dv-info">
                          <div className="dv-stat"><small>RRT TEAMS</small><strong style={{ color: 'var(--text)' }}>04 UNITS</strong></div>
                          <div className="dv-stat"><small>ETA TO HOTSPOT</small><strong style={{ color: 'var(--text)' }}>14 MINS</strong></div>
                       </div>
                    </div>
                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                       <button className="mo-button-outline" onClick={() => setResponseStep(1)}>Back</button>
                       <button className="h-btn-primary" onClick={() => setResponseStep(3)} style={{ background: '#f43f5e' }}>Authorize Deployment</button>
                    </div>
                 </div>
               )}

               {responseStep === 3 && (
                 <div className="animate-fade" style={{ textAlign: 'center' }}>
                    {!isDeploying ? (
                      <>
                        <div className="warning-box" style={{ background: 'var(--surface-light)', border: '1px solid var(--border)' }}>
                           <AlertTriangle size={48} color="#f59e0b" />
                           <h3 style={{ color: '#f59e0b' }}>Final Security Authorization</h3>
                           <p style={{ color: 'var(--text-muted)' }}>By proceeding, you are activating a Level 4 containment protocol for the {activeMandal.district} hub.</p>
                        </div>
                        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                           <button className="mo-button-outline" onClick={() => setResponseStep(2)}>Cancel</button>
                           <button className="h-btn-primary" onClick={executeDeployment} style={{ background: '#f43f5e', padding: '18px 40px' }}>EXECUTE DEPLOYMENT</button>
                        </div>
                      </>
                    ) : (
                      <div className="deployment-loading">
                         <Loader2 size={64} className="animate-spin" color="#f43f5e" />
                         <h3 style={{ color: 'var(--text)' }}>SYNCHRONIZING WITH REGIONAL HUB...</h3>
                         <div className="progress-bar-p" style={{ background: 'var(--border)' }}><div className="p-fill"></div></div>
                      </div>
                    )}
                 </div>
               )}

               {responseStep === 4 && (
                 <div className="animate-fade" style={{ textAlign: 'center' }}>
                    <div className="success-icon-p" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}><ShieldCheck size={64} /></div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text)' }}>Protocol Successfully Propagated</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Rapid Response Units have been mobilized for {activeMandal.name}.</p>
                    <button className="h-btn-primary" onClick={closeResponse} style={{ margin: '0 auto' }}>Return to Map View</button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .outbreak-map-portal { padding: 1rem 0; height: 100%; display: flex; flex-direction: column; }
        .map-command-center { flex: 1; min-height: 700px; background: var(--surface); border: 1px solid var(--border); border-radius: 40px; position: relative; overflow: hidden; box-shadow: var(--card-shadow); }
        .map-viewport { position: absolute; inset: 0; }
        
        .map-overlay-top-left { position: absolute; top: 30px; left: 30px; }
        .focus-pill-tactical { background: var(--surface); backdrop-filter: blur(20px); border: 1px solid var(--border); padding: 10px 24px; border-radius: 100px; display: flex; align-items: center; gap: 15px; font-size: 0.9rem; font-weight: 900; color: var(--text); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        
        .map-overlay-top-right { position: absolute; top: 30px; right: 30px; display: flex; flex-direction: column; gap: 12px; }
        .tactical-btn-round { width: 52px; height: 52px; border-radius: 16px; background: var(--surface); backdrop-filter: blur(20px); border: 1px solid var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .tactical-btn-round:hover, .tactical-btn-round.active { border-color: var(--primary); background: var(--surface); color: var(--primary); transform: scale(1.05); }

        .map-overlay-bottom-left { position: absolute; bottom: 30px; left: 30px; }
        .legend-card-tactical { padding: 1.5rem 2rem; background: var(--surface); backdrop-filter: blur(30px); border-radius: 24px; border: 1px solid var(--border); box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
        .legend-card-tactical h5 { font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 1.5rem; }
        .legend-items { display: flex; flex-direction: column; gap: 15px; }
        .l-item { display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.3s; }
        .l-item .dot { width: 10px; height: 10px; border-radius: 50%; }
        .l-item span { font-size: 0.85rem; font-weight: 700; color: var(--text); }

        .intel-card-p { position: absolute; bottom: 30px; right: 30px; width: 400px; background: var(--surface); backdrop-filter: blur(40px); border: 1px solid var(--border); border-radius: 32px; padding: 2rem; box-shadow: 0 20px 50px rgba(0,0,0,0.1); color: var(--text); }
        .i-header { margin-bottom: 2rem; }
        .i-title h4 { font-size: 1.6rem; font-weight: 900; margin: 0 0 5px; color: var(--text); }
        .i-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .is-item { background: var(--surface-light); border: 1px solid var(--border); padding: 16px; border-radius: 20px; }
        .is-item small { display: block; font-size: 0.6rem; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; }
        .is-item strong { font-size: 1.2rem; font-weight: 900; color: var(--text); }
        .full-width { width: 100%; }

        /* Rapid Response Styles */
        .rapid-response-card { border-radius: 40px; padding: 4rem; color: var(--text); }
        .rr-header { text-align: center; margin-bottom: 3rem; }
        .rr-badge { display: inline-block; padding: 6px 14px; background: rgba(244, 63, 94, 0.1); color: #f43f5e; border-radius: 100px; font-size: 0.7rem; font-weight: 900; margin-bottom: 1rem; border: 1px solid rgba(244, 63, 94, 0.2); }
        
        .rr-stepper { display: flex; justify-content: center; gap: 4rem; margin-bottom: 4rem; }
        .rr-step { display: flex; flex-direction: column; align-items: center; gap: 10px; opacity: 0.4; transition: 0.3s; color: var(--text-muted); }
        .rr-step.active { opacity: 1; color: var(--text); }
        .rr-step .step-num { width: 32px; height: 32px; border-radius: 50%; border: 2px solid currentColor; display: flex; align-items: center; justify-content: center; font-weight: 900; }
        .rr-step span { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .rr-step.current { color: #f43f5e; transform: scale(1.1); }

        .section-label { font-size: 0.75rem; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; margin-bottom: 2rem; }
        .asset-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .asset-card { padding: 2rem; border-radius: 24px; position: relative; }
        .asset-check { position: absolute; top: 20px; right: 20px; color: #10b981; }
        .asset-card strong { display: block; font-size: 1.1rem; margin-bottom: 5px; }
        .asset-card small { font-size: 0.7rem; font-weight: 900; color: #10b981; }

        .deployment-viz { display: grid; grid-template-columns: 1fr 250px; gap: 3rem; padding: 2rem; border-radius: 32px; }
        .dv-map { height: 250px; border-radius: 20px; position: relative; overflow: hidden; }
        .dv-hotspot { position: absolute; width: 60px; height: 60px; background: rgba(244, 63, 94, 0.2); border-radius: 50%; transform: translate(-50%, -50%); animation: mapPulseP 2s infinite; }
        .dv-unit { position: absolute; color: #f43f5e; animation: unitMove 4s infinite alternate ease-in-out; }
        @keyframes unitMove { from { transform: translate(0, 0); } to { transform: translate(20px, 20px); } }
        
        .dv-stat { margin-bottom: 2rem; }
        .dv-stat small { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); margin-bottom: 5px; }
        .dv-stat strong { font-size: 1.8rem; font-weight: 900; }

        .warning-box { padding: 3rem; border-radius: 32px; }
        .warning-box h3 { font-size: 1.8rem; margin: 1.5rem 0 1rem; }
        .warning-box p { font-weight: 600; line-height: 1.6; }

        .deployment-loading { padding: 4rem 0; }
        .deployment-loading h3 { font-size: 1.2rem; font-weight: 900; margin: 2rem 0; letter-spacing: 1px; }
        .progress-bar-p { height: 6px; border-radius: 10px; width: 300px; margin: 0 auto; overflow: hidden; }
        .p-fill { height: 100%; background: #f43f5e; width: 0; animation: loadFill 4s linear forwards; }
        @keyframes loadFill { to { width: 100%; } }

        .success-icon-p { width: 120px; height: 120px; border-radius: 40px; display: flex; align-items: center; justify-content: center; margin: 0 auto 3rem; }

        @keyframes mapPulseP { 0% { transform: scale(0.8); opacity: 0.4; } 50% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(0.8); opacity: 0.4; } }

        /* Leaflet Overrides */
        .leaflet-container { background: transparent !important; }
        .leaflet-control-attribution { display: none !important; }

        @media (max-width: 1200px) {
          .intel-card-p { width: 320px; padding: 1.5rem; }
          .i-title h4 { font-size: 1.2rem; }
        }

        @media (max-width: 992px) {
          .map-command-center { min-height: 500px; border-radius: 20px; display: block; overflow-y: auto; }
          .map-viewport { position: relative; height: 50vh; width: 100%; border-radius: 20px; overflow: hidden; }
          .intel-card-p { position: relative; bottom: 0; right: 0; width: 100%; margin-top: 1.5rem; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid var(--border); padding: 1.5rem; }
          .map-overlay-bottom-left { display: none; }
          .legend-card-tactical { position: relative; bottom: 0; left: 0; width: 100%; margin-top: 1.5rem; box-shadow: none; border: 1px solid var(--border); }
          .map-overlay-top-left { top: 15px; left: 15px; }
          .map-overlay-top-right { top: 15px; right: 15px; }
          .focus-pill-tactical { padding: 6px 16px; font-size: 0.75rem; }
          
          .asset-grid { grid-template-columns: 1fr; }
          .deployment-viz { grid-template-columns: 1fr; gap: 1.5rem; }
          .rr-stepper { gap: 1rem; flex-wrap: wrap; }
          .rapid-response-card { padding: 2rem; border-radius: 24px; }
          .rr-header h2 { font-size: 1.5rem; }
          .rr-step span { font-size: 0.6rem; }
        }

        @media (max-width: 480px) {
          .map-viewport { height: 40vh; }
          .intel-card-p { padding: 1rem; }
          .is-item strong { font-size: 1rem; }
          .i-title h4 { font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
};

export default MedicalOutbreakMap;
