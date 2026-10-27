import React from 'react';
import { MapPin, ShieldAlert } from 'lucide-react';

const districtCoordinates = [
  { name: 'Visakhapatnam', x: 80, y: 20, count: 450, risk: 'High' },
  { name: 'Guntur', x: 45, y: 60, count: 280, risk: 'Medium' },
  { name: 'Krishna', x: 55, y: 55, count: 120, risk: 'Low' },
  { name: 'Chittoor', x: 30, y: 85, count: 560, risk: 'Critical' },
  { name: 'Kurnool', x: 20, y: 65, count: 310, risk: 'High' },
];

const HeatMap = () => {
  return (
    <div className="chart-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3>Geospatial Outbreak Clusters</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></div> Critical
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div> High
          </div>
        </div>
      </div>

      <div style={{ 
        height: '400px', 
        background: 'var(--background)', 
        borderRadius: '12px', 
        position: 'relative',
        border: '1px solid var(--border)',
        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        {/* Abstract representation of Andhra Pradesh Map */}
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', opacity: 0.3 }}>
          <path d="M70,10 L90,20 L85,40 L60,60 L40,90 L20,80 L10,60 L30,40 Z" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
        </svg>

        {districtCoordinates.map((d, i) => (
          <div 
            key={i}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${d.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            {/* Pulsing Hotspot */}
            <div style={{
              width: '12px',
              height: '12px',
              background: d.risk === 'Critical' ? 'var(--danger)' : d.risk === 'High' ? 'var(--accent)' : 'var(--primary)',
              borderRadius: '50%',
              boxShadow: `0 0 20px ${d.risk === 'Critical' ? 'var(--danger)' : 'var(--accent)'}`,
              animation: 'pulse 2s infinite'
            }}></div>
            
            {/* Label on Hover */}
            <div className="map-label" style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--surface)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.65rem',
              whiteSpace: 'nowrap',
              marginTop: '4px',
              border: '1px solid var(--border)',
              pointerEvents: 'none'
            }}>
              {d.name}: {d.count}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .map-label { opacity: 0; transition: opacity 0.2s; }
        div:hover > .map-label { opacity: 1; }
      `}</style>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid var(--danger)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--danger)' }}>
            <ShieldAlert size={14} /> Chittoor Alert
          </div>
          <p style={{ fontSize: '0.7rem', opacity: 0.8 }}>Dengue cluster detected near PHC Tirupati.</p>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
