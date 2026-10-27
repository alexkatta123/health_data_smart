import React, { useEffect, useState } from 'react';
import { Target, Activity, ShieldAlert, Zap, Plus, Minus, Navigation } from 'lucide-react';

const StrategicSpatialMap = () => {
  const [activePulse, setActivePulse] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleLocate = () => setZoomLevel(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const hotspots = [
    { id: 1, x: '75%', y: '25%', name: 'Vizag Cluster', risk: 'Critical', cases: 142 },
    { id: 2, x: '45%', y: '65%', name: 'Guntur Node', risk: 'High', cases: 89 },
    { id: 3, x: '25%', y: '80%', name: 'Chittoor Alert', risk: 'Moderate', cases: 34 }
  ];

  return (
    <div className="strategic-map-container">
      {/* Dynamic Hex Grid Background */}
      <div className="hex-grid"></div>

      {/* Map Content Wrapper (Zoomable) */}
      <div className="map-content-wrapper" style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        {/* Abstract AP Map Outline (SVG) */}
        <svg className="ap-outline" viewBox="0 0 1000 800">
          <path 
            className="map-path"
            d="M850,150 L920,220 L880,350 L750,550 L650,700 L450,750 L300,720 L150,650 L100,500 L180,300 L350,150 L550,100 Z" 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="2"
            strokeOpacity="0.3"
          />
          
          {/* Scanning Beam Effect */}
          <line className="scan-line" x1="0" y1="0" x2="1000" y2="0" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.5" />
        </svg>

        {/* Interactive Hotspots */}
        <div className="hotspots-layer">
          {hotspots.map((spot, idx) => (
            <div 
              key={spot.id} 
              className={`hotspot-node ${spot.risk.toLowerCase()} ${activePulse === idx ? 'pulse' : ''}`}
              style={{ 
                left: spot.x, 
                top: spot.y,
                transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`
              }}
            >
              <div className="node-core">
                <Target size={14} />
              </div>
              <div className="node-rings">
                <div className="ring"></div>
                <div className="ring"></div>
              </div>
              
              <div className="node-tooltip">
                <div className="tooltip-header">
                  <strong>{spot.name}</strong>
                  <span className="risk-level">{spot.risk}</span>
                </div>
                <div className="tooltip-data">
                  <span><Activity size={10} /> {spot.cases} Active Cases</span>
                  <span><Zap size={10} /> Trend: +12%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coordinate Overlay */}
      <div className="coordinate-overlay">
        <div className="coord-h"></div>
        <div className="coord-v"></div>
      </div>

      {/* Map Controls */}
      <div className="map-controls">
        <button className="ctrl-btn" onClick={handleZoomIn} title="Zoom In"><Plus size={18} /></button>
        <button className="ctrl-btn" onClick={handleZoomOut} title="Zoom Out"><Minus size={18} /></button>
        <button className="ctrl-btn locate" onClick={handleLocate} title="Reset View"><Navigation size={18} /></button>
      </div>

      <style>{`
        .strategic-map-container {
          width: 100%;
          height: 100%;
          background: var(--surface);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
          cursor: crosshair;
        }

        .hex-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--border) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.15;
          z-index: 1;
        }

        .map-content-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .ap-outline {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 20px rgba(14, 165, 233, 0.2));
        }

        .map-path {
          stroke-dasharray: 10 5;
          animation: mapFlow 20s linear infinite;
        }

        @keyframes mapFlow {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }

        .scan-line {
          animation: scan 4s ease-in-out infinite;
        }

        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(800px); opacity: 0; }
        }

        .hotspots-layer {
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .hotspot-node {
          position: absolute;
          transform: translate(-50%, -50%);
        }

        .node-core {
          width: 28px;
          height: 28px;
          background: var(--surface);
          border: 2px solid currentColor;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          z-index: 5;
          position: relative;
          transition: all 0.3s ease;
        }

        .hotspot-node.critical { color: #f43f5e; }
        .hotspot-node.high { color: #f59e0b; }
        .hotspot-node.moderate { color: #10b981; }

        .node-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 2px solid currentColor;
          border-radius: 50%;
          opacity: 0;
        }

        .hotspot-node.pulse .ring:nth-child(1) {
          animation: pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .hotspot-node.pulse .ring:nth-child(2) {
          animation: pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s infinite;
        }

        @keyframes pulseRing {
          0% { width: 20px; height: 20px; opacity: 1; }
          100% { width: 80px; height: 80px; opacity: 0; }
        }

        .node-tooltip {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(11, 18, 36, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 12px;
          width: 180px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }

        .hotspot-node:hover .node-tooltip,
        .hotspot-node.pulse .node-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .tooltip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 4px;
        }

        .tooltip-header strong { font-size: 0.85rem; }
        .risk-level {
          font-size: 0.65rem;
          font-weight: 900;
          text-transform: uppercase;
          background: rgba(255,255,255,0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .tooltip-data {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tooltip-data span {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .coordinate-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .coord-h { position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--primary); opacity: 0.05; }
        .coord-v { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: var(--primary); opacity: 0.05; }

        .map-controls {
          position: absolute;
          right: 20px;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 100;
        }

        .ctrl-btn {
          width: 48px;
          height: 48px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          color: #e2e8f0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
          transition: all 0.2s ease;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .ctrl-btn:hover {
          background: var(--surface);
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .ctrl-btn.locate { 
          color: var(--secondary);
        }
      `}</style>
    </div>
  );
};

export default StrategicSpatialMap;
