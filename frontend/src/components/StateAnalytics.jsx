import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Calendar, 
  ShieldAlert, 
  Layers, 
  Globe, 
  Activity, 
  Target,
  ArrowUpRight
} from 'lucide-react';

const StateAnalytics = () => {
  return (
    <div className="state-analytics animate-fade">
      <div className="analytics-formation-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Predictive Waveform & Strategy Formation */}
        <div className="mo-card" style={{ padding: '2.5rem' }}>
           <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                 <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Statewide Strategic Forecasting</h3>
                 <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Temporal projection of epidemiological transmission & resource load.</p>
              </div>
              <div className="formation-toggles">
                 <button className="tactical-pill active">30D Forecast</button>
                 <button className="tactical-pill">90D Vision</button>
              </div>
           </div>

           <div className="forecast-waveform-container" style={{ height: '320px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '30px', borderBottom: '1px solid var(--border)' }}>
              {/* Dynamic Waveform Bars */}
              {[35, 38, 42, 40, 45, 52, 58, 65, 62, 70, 75, 82, 88, 92, 85, 78, 72, 68, 65, 60].map((h, i) => (
                <div key={i} className="waveform-bar" style={{ 
                  flex: 1, 
                  height: `${h}%`, 
                  background: i > 12 ? 'linear-gradient(180deg, #f43f5e, rgba(244, 63, 94, 0.2))' : 'linear-gradient(180deg, var(--primary), rgba(14, 165, 233, 0.1))', 
                  borderRadius: '6px 6px 0 0',
                  opacity: i > 12 ? 0.9 : 0.6,
                  transition: '0.3s'
                }}></div>
              ))}
              
              {/* Projection Intelligence Overlay */}
              <div className="projection-marker" style={{ position: 'absolute', top: '15%', left: '68%', borderLeft: '2px dashed #f43f5e', height: '85%', paddingLeft: '20px', zIndex: 10 }}>
                 <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '12px 16px', borderRadius: '16px', backdropFilter: 'blur(8px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f43f5e', marginBottom: '4px' }}>
                       <ShieldAlert size={16} />
                       <strong style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>PROJECTED SPIKE</strong>
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: "var(--text)" }}>+24.8%</span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>Confidence Index: 92.4%</p>
                 </div>
              </div>
           </div>

           <div className="time-labels" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800 }}>
              <span>CURRENT STATE</span>
              <span>EPIDEMIOLOGICAL PEAK (PROJECTED)</span>
              <span>NORMALIZATION PHASE</span>
           </div>
        </div>

        {/* Resource Load & Model Calibration */}
        <div className="mo-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
           <h3 style={{ margin: '0 0 2rem', fontSize: '1.2rem' }}>Operational Readiness</h3>
           
           <div className="readiness-metrics" style={{ flex: 1, display: 'grid', gap: '2rem' }}>
              <div className="metric-formation">
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Activity size={18} color="var(--primary)" />
                       <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Hospital Bed Saturation</span>
                    </div>
                    <strong style={{ color: '#f59e0b' }}>72%</strong>
                 </div>
                 <div className="progress-track"><div className="progress-fill" style={{ width: '72%', background: '#f59e0b' }}></div></div>
              </div>

              <div className="metric-formation">
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Zap size={18} color="#10b981" />
                       <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Vaccine Logistics Velocity</span>
                    </div>
                    <strong style={{ color: '#10b981' }}>94%</strong>
                 </div>
                 <div className="progress-track"><div className="progress-fill" style={{ width: '94%', background: '#10b981' }}></div></div>
              </div>

              <div className="metric-formation">
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Target size={18} color="#8b5cf6" />
                       <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>AI Detection Precision</span>
                    </div>
                    <strong style={{ color: '#8b5cf6' }}>98.2%</strong>
                 </div>
                 <div className="progress-track"><div className="progress-fill" style={{ width: '98.2%', background: '#8b5cf6' }}></div></div>
              </div>
           </div>

           <button className="tactical-action-btn" style={{ marginTop: '2.5rem' }}>
              <Zap size={18} fill="currentColor" /> Recalibrate Strategic Forecast
           </button>
        </div>

      </div>

      {/* Outbreak Probability Matrix (Regional Line-by-Line Formation) */}
      <div className="mo-card" style={{ padding: '2.5rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
               <h3 style={{ margin: 0 }}>Regional Outbreak Probability Matrix</h3>
               <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Detailed spatial risk assessment across statewide clinical hubs.</p>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '100px', border: '1px solid var(--border)' }}>Statewide Spatial Assessment</span>
         </div>

         <div className="probability-line-list" style={{ display: 'grid', gap: '0.75rem' }}>
            <div className="matrix-list-header" style={{ display: 'flex', padding: '0 1.5rem', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1.5px', marginBottom: '0.5rem' }}>
               <div style={{ flex: 2 }}>REGIONAL HUB IDENTITY</div>
               <div style={{ flex: 1, textAlign: 'center' }}>PROBABILITY</div>
               <div style={{ flex: 1, textAlign: 'center' }}>PROJECTED LOAD</div>
               <div style={{ flex: 1, textAlign: 'right' }}>TEMPORAL TREND</div>
            </div>
            
            {[
              { district: 'Coastal Hub (Visakhapatnam)', risk: 'High', cases: '1,240', trend: '+12%', color: '#f43f5e' },
              { district: 'Northern Tier (Anakapalli)', risk: 'Medium', cases: '840', trend: '-2%', color: '#f59e0b' },
              { district: 'Western Hub (Kurnool)', risk: 'Low', cases: '420', trend: '-8%', color: '#10b981' },
              { district: 'Southern Central (Tirupati)', risk: 'High', cases: '2,100', trend: '+18%', color: '#f43f5e' },
              { district: 'Eastern Delta (Guntur)', risk: 'Medium', cases: '950', trend: '+4%', color: '#f59e0b' }
            ].map((p, i) => (
              <div key={i} className="matrix-row animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                 <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${p.color}15`, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <Activity size={18} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>{p.district}</span>
                 </div>
                 
                 <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: p.color, background: `${p.color}10`, padding: '4px 12px', borderRadius: '100px', border: `1px solid ${p.color}20` }}>
                       {p.risk.toUpperCase()}
                    </span>
                 </div>

                 <div style={{ flex: 1, textAlign: 'center' }}>
                    <strong style={{ fontSize: '1rem' }}>{p.cases}</strong>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Cases</span>
                 </div>

                 <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                    <div style={{ textAlign: 'right' }}>
                       <strong style={{ fontSize: '0.9rem', color: p.trend.startsWith('+') ? '#f43f5e' : '#10b981' }}>{p.trend}</strong>
                       <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>vs Baseline</span>
                    </div>
                    <ArrowUpRight size={16} color={p.trend.startsWith('+') ? '#f43f5e' : '#10b981'} style={{ transform: p.trend.startsWith('+') ? 'none' : 'rotate(90deg)' }} />
                 </div>
              </div>
            ))}
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; transition: all 0.3s ease; }
        .mo-card:hover { border-color: rgba(14, 165, 233, 0.4); }

        .tactical-pill { 
          background: transparent; 
          border: 1px solid var(--border); 
          color: var(--text-muted); 
          padding: 8px 20px; 
          border-radius: 100px; 
          font-size: 0.85rem; 
          font-weight: 700; 
          cursor: pointer; 
          transition: 0.2s;
        }

        .tactical-pill.active { 
          background: var(--primary); 
          color: var(--text); 
          border: none; 
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
        }

        .waveform-bar:hover { 
          opacity: 1 !important; 
          transform: scaleY(1.05);
        }

        .progress-track { 
          height: 8px; 
          background: var(--surface); 
          border-radius: 10px; 
          overflow: hidden; 
        }

        .progress-fill { 
          height: 100%; 
          border-radius: 10px; 
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tactical-action-btn { 
          background: var(--primary); 
          color: var(--text); 
          border: none; 
          padding: 16px; 
          border-radius: 16px; 
          font-weight: 800; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 12px; 
          transition: 0.3s;
          box-shadow: 0 10px 25px rgba(14, 165, 233, 0.2);
        }

        .tactical-action-btn:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 15px 35px rgba(14, 165, 233, 0.4);
        }

        .matrix-card:hover {
          background: rgba(255,255,255,0.04) !important;
          border-color: var(--primary) !important;
          transform: translateY(-8px);
        }
      ` }} />
    </div>
  );
};

export default StateAnalytics;
