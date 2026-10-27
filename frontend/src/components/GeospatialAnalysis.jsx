import React, { useState, useEffect, useRef } from 'react';
import { 
  Map as MapIcon, 
  Layers, 
  Filter, 
  Search, 
  Info, 
  Download,
  Bug,
  Wind,
  Droplet,
  Biohazard,
  Navigation,
  Activity,
  Hospital,
  Eye,
  Globe
} from 'lucide-react';

const districtDataRaw = [
  { id: 1, name: 'Srikakulam', lat: 18.2949, lng: 83.8938, counts: { Dengue: 120, Malaria: 300, Typhoid: 45, Zoonotic: 10 } },
  { id: 2, name: 'Vizianagaram', lat: 18.1067, lng: 83.3978, counts: { Dengue: 150, Malaria: 200, Typhoid: 60, Zoonotic: 12 } },
  { id: 3, name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, counts: { Dengue: 450, Malaria: 150, Typhoid: 120, Zoonotic: 40 } },
  { id: 4, name: 'Kakinada', lat: 16.9891, lng: 82.2475, counts: { Dengue: 190, Malaria: 210, Typhoid: 80, Zoonotic: 15 } },
  { id: 5, name: 'Konaseema', lat: 16.6350, lng: 81.9860, counts: { Dengue: 80, Malaria: 60, Typhoid: 40, Zoonotic: 5 } },
  { id: 6, name: 'East Godavari', lat: 17.0005, lng: 81.8040, counts: { Dengue: 210, Malaria: 180, Typhoid: 95, Zoonotic: 8 } },
  { id: 7, name: 'West Godavari', lat: 16.7107, lng: 81.0952, counts: { Dengue: 160, Malaria: 140, Typhoid: 70, Zoonotic: 6 } },
  { id: 8, name: 'Eluru', lat: 16.7107, lng: 81.1000, counts: { Dengue: 130, Malaria: 110, Typhoid: 50, Zoonotic: 4 } },
  { id: 9, name: 'Krishna', lat: 16.1817, lng: 81.1354, counts: { Dengue: 140, Malaria: 120, Typhoid: 60, Zoonotic: 5 } },
  { id: 10, name: 'NTR (Vijayawada)', lat: 16.5062, lng: 80.6480, counts: { Dengue: 220, Malaria: 90, Typhoid: 150, Zoonotic: 25 } },
  { id: 11, name: 'Guntur', lat: 16.3067, lng: 80.4365, counts: { Dengue: 280, Malaria: 160, Typhoid: 180, Zoonotic: 30 } },
  { id: 12, name: 'Bapatla', lat: 15.9047, lng: 80.4674, counts: { Dengue: 90, Malaria: 70, Typhoid: 40, Zoonotic: 2 } },
  { id: 13, name: 'Palnadu', lat: 16.2000, lng: 79.9000, counts: { Dengue: 110, Malaria: 80, Typhoid: 50, Zoonotic: 3 } },
  { id: 14, name: 'Prakasam', lat: 15.5057, lng: 79.9068, counts: { Dengue: 160, Malaria: 130, Typhoid: 70, Zoonotic: 6 } },
  { id: 15, name: 'Nellore', lat: 14.4426, lng: 79.9865, counts: { Dengue: 250, Malaria: 140, Typhoid: 110, Zoonotic: 15 } },
  { id: 16, name: 'Tirupati', lat: 13.6285, lng: 79.4192, counts: { Dengue: 360, Malaria: 150, Typhoid: 190, Zoonotic: 35 } },
  { id: 17, name: 'Chittoor', lat: 13.2172, lng: 79.1003, counts: { Dengue: 180, Malaria: 110, Typhoid: 80, Zoonotic: 8 } },
  { id: 18, name: 'Annamayya', lat: 14.0000, lng: 79.0000, counts: { Dengue: 120, Malaria: 90, Typhoid: 50, Zoonotic: 4 } },
  { id: 19, name: 'YSR Kadapa', lat: 14.4673, lng: 78.8242, counts: { Dengue: 150, Malaria: 100, Typhoid: 70, Zoonotic: 5 } },
  { id: 20, name: 'Nandyal', lat: 15.4800, lng: 78.4800, counts: { Dengue: 140, Malaria: 120, Typhoid: 60, Zoonotic: 4 } },
  { id: 21, name: 'Kurnool', lat: 15.8281, lng: 78.0373, counts: { Dengue: 310, Malaria: 220, Typhoid: 140, Zoonotic: 20 } },
  { id: 22, name: 'Anantapur', lat: 14.6819, lng: 77.6006, counts: { Dengue: 190, Malaria: 150, Typhoid: 90, Zoonotic: 10 } },
  { id: 23, name: 'Sri Sathya Sai', lat: 14.1667, lng: 77.8000, counts: { Dengue: 130, Malaria: 90, Typhoid: 50, Zoonotic: 3 } },
  { id: 24, name: 'Anakapalli', lat: 17.6800, lng: 83.0000, counts: { Dengue: 160, Malaria: 180, Typhoid: 70, Zoonotic: 5 } },
  { id: 25, name: 'Parvathipuram Manyam', lat: 18.7800, lng: 83.4300, counts: { Dengue: 110, Malaria: 250, Typhoid: 50, Zoonotic: 15 } },
  { id: 26, name: 'Alluri Sitharama Raju', lat: 18.3300, lng: 82.8600, counts: { Dengue: 140, Malaria: 320, Typhoid: 80, Zoonotic: 25 } },
];

const hospitalData = [
  { id: 101, name: 'King George Hospital (KGH)', city: 'Visakhapatnam', lat: 17.7041, lng: 83.3012, beds: 1200, status: 'Occupied' },
  { id: 102, name: 'GGH Guntur', city: 'Guntur', lat: 16.2997, lng: 80.4437, beds: 1500, status: 'Available' },
  { id: 103, name: 'GGH Vijayawada', city: 'Vijayawada', lat: 16.5186, lng: 80.6324, beds: 1100, status: 'Available' },
  { id: 104, name: 'SVRR Hospital', city: 'Tirupati', lat: 13.6373, lng: 79.4055, beds: 1000, status: 'Occupied' },
  { id: 105, name: 'GGH Kurnool', city: 'Kurnool', lat: 15.8219, lng: 78.0326, beds: 900, status: 'Available' },
  { id: 106, name: 'RIMS Kadapa', city: 'Kadapa', lat: 14.4714, lng: 78.8351, beds: 750, status: 'Occupied' }
];

const GeospatialAnalysis = () => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapType, setMapType] = useState('street'); // street or satellite
  const [activeLayer, setActiveLayer] = useState('heat');
  const [diseaseFilter, setDiseaseFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    // Process the data based on filters
    const processedData = districtDataRaw.map(d => {
      const cases = diseaseFilter === 'All' 
        ? Object.values(d.counts).reduce((a, b) => a + b, 0)
        : (d.counts[diseaseFilter] || 0);
      
      const topDisease = Object.keys(d.counts).reduce((a, b) => d.counts[a] > d.counts[b] ? a : b);
      const risk = cases > 300 ? 'Critical' : cases > 150 ? 'High' : 'Stable';
      
      return { ...d, cases, risk, topDisease };
    }).filter(d => d.cases > 0);

    setDistrictData(processedData);

    if (!window.L || !mapRef.current) return;
    
    if (!leafletMap.current) {
      // Initialize Leaflet Map
      leafletMap.current = window.L.map(mapRef.current).setView([15.9129, 79.7400], 6.5);
    } else {
      // Clear existing layers to re-render
      leafletMap.current.eachLayer((layer) => {
        if (!layer._url) leafletMap.current.removeLayer(layer); // keep tile layers
      });
    }

    // Tile Layers
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

    if (activeLayer === 'heat' || activeLayer === 'capacity') {
      // Add District Markers dynamically based on filtered cases
      processedData.forEach(d => {
        const color = d.risk === 'Critical' ? '#f43f5e' : d.risk === 'High' ? '#f59e0b' : '#3b82f6';
        const circle = window.L.circle([d.lat, d.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.5,
          radius: d.cases * 150 // Scaled dynamically
        }).addTo(leafletMap.current);

        circle.bindPopup(`<b>${d.name}</b><br/>Cases: ${d.cases}<br/>Risk: ${d.risk}<br/>Focus: ${d.topDisease}`);
      });
    }

    if (activeLayer === 'hospitals' || activeLayer === 'capacity') {
      // Add Hospitals
      hospitalData.forEach(h => {
        const marker = window.L.marker([h.lat, h.lng], {
          icon: window.L.divIcon({
            className: 'hospital-marker',
            html: `<div style="background: white; border: 2px solid #0ea5e9; border-radius: 50%; padding: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.2)"><img src="https://cdn-icons-png.flaticon.com/512/4320/4320371.png" width="20"/></div>`,
            iconSize: [30, 30]
          })
        }).addTo(leafletMap.current);
        marker.bindPopup(`<b>${h.name}</b><br/>Beds: ${h.beds}<br/>Status: ${h.status}`);
      });
    }

  }, [mapType, diseaseFilter, activeLayer]);

  const toggleMapType = (type) => {
    setMapType(type);
  };

  return (
    <div className="geospatial-light-theme animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>AP GIS Health Intelligence</h2>
          <p style={{ color: 'var(--text-muted)' }}>Real-time epidemiological mapping & Healthcare Capacity (AP GIS Integrated)</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="view-toggle" style={{ background: 'var(--surface-light)', padding: '5px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', gap: '5px' }}>
            <button 
              className={`toggle-btn ${mapType === 'street' ? 'active' : ''}`} 
              onClick={() => toggleMapType('street')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: mapType === 'street' ? 'var(--primary)' : 'transparent', color: mapType === 'street' ? 'white' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
            >
              <Globe size={16} /> Street
            </button>
            <button 
              className={`toggle-btn ${mapType === 'satellite' ? 'active' : ''}`} 
              onClick={() => toggleMapType('satellite')}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: mapType === 'satellite' ? 'var(--primary)' : 'transparent', color: mapType === 'satellite' ? 'white' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
            >
              <Eye size={16} /> Satellite
            </button>
          </div>
          <button className="h-btn h-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.9rem' }}>
            <Download size={18} /> Export GIS Data
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', height: 'calc(100vh - 250px)' }}>
        <div className="sidebar-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '10px' }}>
          
          <div className="mo-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--primary)' }}>
              <Layers size={20} /> GIS Overlays
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'heat', label: 'Outbreak Clusters', icon: <Bug size={18} /> },
                { id: 'hospitals', label: 'Hospital Network', icon: <Hospital size={18} /> },
                { id: 'capacity', label: 'Bed Availability', icon: <Activity size={18} /> },
              ].map(layer => (
                <div 
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`layer-btn ${activeLayer === layer.id ? 'active' : ''}`}
                >
                  <span style={{ color: activeLayer === layer.id ? 'white' : 'var(--primary)' }}>{layer.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: activeLayer === layer.id ? 700 : 500 }}>{layer.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mo-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>
              <Filter size={20} /> Pathogen Filter
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['All', 'Dengue', 'Malaria', 'Typhoid', 'Zoonotic'].map(f => (
                <span 
                  key={f}
                  onClick={() => setDiseaseFilter(f)}
                  className={`disease-tag ${diseaseFilter === f ? 'active' : ''}`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mo-card" style={{ padding: '1.5rem', flex: 1 }}>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Active Surveillance Feed</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {districtData.map(district => (
                <div key={district.id} className="district-item-mini">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: district.risk === 'Critical' ? '#f43f5e' : '#3b82f6' }}></div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{district.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{district.topDisease} Cluster</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, color: 'var(--primary)' }}>{district.cases}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mo-card" style={{ margin: 0, padding: 0, position: 'relative', overflow: 'hidden' }}>
          <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />
          
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10, background: 'var(--surface)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.8rem', fontWeight: 700 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f43f5e' }}></div> Critical</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div> High</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div> Stable</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><img src="https://cdn-icons-png.flaticon.com/512/4320/4320371.png" width="14" /> GGH/Hospitals</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .geospatial-light-theme { padding: 1rem 0; }
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; box-shadow: var(--card-shadow); }
        .layer-btn { padding: 15px; border-radius: 12px; border: 1px solid var(--border); cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.2s; margin-bottom: 8px; }
        .layer-btn:hover { border-color: var(--primary); transform: translateX(5px); }
        .layer-btn.active { background: var(--primary); color: var(--text); border-color: var(--primary); }
        .disease-tag { padding: 6px 12px; border-radius: 20px; border: 1px solid var(--border); cursor: pointer; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); transition: 0.2s; }
        .disease-tag.active { background: var(--primary-glow); color: var(--primary); border-color: var(--primary); }
        .district-item-mini { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-radius: 12px; background: var(--surface-light); }
        .h-btn h-btn-primary { background: var(--primary); color: var(--text); border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .h-btn h-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px var(--primary-glow); }
        
        .leaflet-container { font-family: inherit; }
        .hospital-marker { transition: transform 0.2s; }
        .hospital-marker:hover { transform: scale(1.2) translateY(-5px); z-index: 1000 !important; }
      `}</style>
    </div>
  );
};

export default GeospatialAnalysis;
