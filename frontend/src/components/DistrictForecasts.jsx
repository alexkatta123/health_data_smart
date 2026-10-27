import React from 'react';
import { 
  TrendingUp, Zap, AlertTriangle, 
  Info, Calendar, ArrowUpRight,
  BarChart, LineChart, BrainCircuit
} from 'lucide-react';

const DistrictForecasts = () => {
  const predictions = [
    { disease: 'Dengue', probability: 'High (82%)', model: 'Prophet + XGBoost', zone: 'Guntur East', action: 'Initialize Vector Control' },
    { disease: 'Malaria', probability: 'Medium (45%)', model: 'Poisson Regression', zone: 'Tenali Rural', action: 'Distribute LLIN Nets' },
    { disease: 'Typhoid', probability: 'Low (12%)', model: 'EWMA Anomaly', zone: 'Bapatla Hub', action: 'Sanitation Audit' },
    { disease: 'AWD Cluster', probability: 'Critical (94%)', model: 'SaTScan (Spatial)', zone: 'Narasaraopet', action: 'Mass Vaccination' }
  ];

  const modelSpecs = [
    { name: 'Prophet (FB)', focus: 'Seasonal Trends', reliability: 94, desc: 'Optimized for seasonal disease patterns like Dengue/Flu.' },
    { name: 'XGBoost', focus: 'Precision Forecast', reliability: 91, desc: 'High-accuracy gradient boosting for multi-feature prediction.' },
    { name: 'SaTScan', focus: 'Spatial Clusters', reliability: 89, desc: 'Gold-standard for identifying geographic disease hotspots.' },
    { name: 'EWMA', focus: 'Early Warning', reliability: 96, desc: 'Exponentially weighted moving average for sudden spike detection.' }
  ];

  return (
    <div className="module-padding animate-fade">
      <div className="forecast-layout">
        {/* AI Insight Header */}
        <div className="ai-insight-banner">
          <div className="ai-icon-pulse">
            <BrainCircuit size={32} />
          </div>
          <div className="ai-text">
            <h3>Strategic AI Forecast: Week 17</h3>
            <p>Our neural models have processed 1.2M data points including weather, historical trends, and current clinical signals.</p>
          </div>
          <div className="ai-badge">AI ANALYTICS LIVE</div>
        </div>

        <div className="forecast-grid">
           {/* Model Selection Hub */}
           <div className="dho-card-v5 chart-section">
              <div className="card-header-v5">
                 <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Layers size={22} /></div>
                    <h3>Mission Prediction Engine</h3>
                 </div>
                 <div className="time-filters">
                    <button className="active">Prophet</button>
                    <button>XGBoost</button>
                    <button>SaTScan</button>
                 </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                 {modelSpecs.map((m, i) => (
                   <div key={i} style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                         <strong style={{ fontSize: '0.95rem', color: 'var(--text)' }}>{m.name}</strong>
                         <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10b981' }}>{m.reliability}% RELIABILITY</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{m.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="forecast-chart-mock">
                 <div className="chart-line-bg">
                    {[40, 60, 45, 80, 100, 85, 70, 90, 110, 95, 120].map((h, i) => (
                      <div key={i} className="chart-bar-v5" style={{ height: `${h}%`, opacity: i > 7 ? 1 : 0.2, background: i > 7 ? 'var(--primary)' : '#6366f1' }}>
                         {i === 10 && <div className="forecast-pointer">Predicted Outbreak</div>}
                      </div>
                    ))}
                 </div>
                 <div className="chart-labels-v5">
                    <span>WEEK 14</span><span>WEEK 15</span><span>WEEK 16</span><span>WEEK 17</span><span>WEEK 18 (FC)</span>
                 </div>
              </div>
           </div>

           {/* Prediction List */}
           <div className="dho-card-v5 prediction-section">
              <div className="card-header-v5">
                 <h3>Anomaly Detection Matrix</h3>
              </div>
              <div className="prediction-list">
                 {predictions.map((p, i) => (
                   <div key={i} className="p-item-v5">
                      <div className="p-top">
                         <span className="p-disease">{p.disease}</span>
                         <span className={`p-prob ${p.probability.split(' ')[0].toLowerCase()}`}>{p.probability}</span>
                      </div>
                       <div className="p-meta">
                          <div className="m-block"><BrainCircuit size={12} /> {p.model}</div>
                          <div className="m-block"><MapPin size={12} /> {p.zone}</div>
                       </div>
                       <div className="p-action" style={{ borderLeft: '3px solid #6366f1', borderRadius: '0 10px 10px 0' }}>
                          <Zap size={14} style={{ color: '#6366f1' }} /> <strong>Protocol:</strong> {p.action}
                       </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Climate Correlation */}
        <div className="climate-card">
           <div className="climate-header">
              <Info size={20} />
              <h4>Climate-Infection Correlation</h4>
           </div>
           <p>Current humidity levels (82%) and recent rainfall (42mm) in the North District are strongly correlated with the predicted Dengue spike. Confidence Interval: 94.2%.</p>
        </div>
      </div>

      <style>{`
        .forecast-layout { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        
        .ai-insight-banner {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 24px;
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 25px;
          position: relative;
          overflow: hidden;
        }

        .ai-icon-pulse {
          width: 64px; height: 64px; background: rgba(99, 102, 241, 0.2); border-radius: 20px;
          display: flex; align-items: center; justify-content: center; color: #6366f1;
          animation: pulse-ai 3s infinite;
        }
        @keyframes pulse-ai { 0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); } 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); } }

        .ai-text h3 { margin: 0; font-size: 1.4rem; font-weight: 900; color: #a5b4fc; }
        .ai-text p { margin: 8px 0 0 0; font-size: 0.95rem; color: var(--text-muted); max-width: 600px; }
        
        .ai-badge { position: absolute; top: 20px; right: 20px; background: #6366f1; color: var(--text); padding: 4px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 900; letter-spacing: 1px; }

        .forecast-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .dho-card-v5 { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; padding: 2rem; }
        
        .card-header-v5 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .time-filters { display: flex; gap: 8px; }
        .time-filters button { background: transparent; border: 1px solid var(--border); color: var(--text-muted); padding: 5px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; }
        .time-filters button.active { background: #6366f1; color: var(--text); border-color: #6366f1; }

        .forecast-chart-mock { height: 300px; display: flex; flex-direction: column; }
        .chart-line-bg { flex: 1; display: flex; align-items: flex-end; gap: 15px; padding: 0 20px; position: relative; border-bottom: 1px solid var(--border); }
        .chart-bar-v5 { flex: 1; background: #6366f1; border-radius: 6px 6px 0 0; position: relative; transition: height 1s ease; }
        .forecast-pointer { position: absolute; top: -35px; left: 50%; transform: translateX(-50%); background: white; color: black; padding: 4px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 900; white-space: nowrap; }

        .chart-labels-v5 { display: flex; justify-content: space-between; padding: 10px 20px; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; }

        .prediction-list { display: flex; flex-direction: column; gap: 12px; }
        .p-item-v5 { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.25rem; transition: all 0.2s; }
        .p-item-v5:hover { background: var(--surface); border-color: #6366f1; }
        
        .p-top { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .p-disease { font-weight: 800; font-size: 1rem; }
        .p-prob { font-size: 0.75rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
        .p-prob.high, .p-prob.critical { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
        .p-prob.medium { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .p-prob.low { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .p-meta { display: flex; gap: 15px; margin-bottom: 12px; }
        .m-block { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        
        .p-action { font-size: 0.8rem; color: #a5b4fc; background: rgba(99, 102, 241, 0.05); padding: 8px 12px; border-radius: 10px; border: 1px dashed rgba(99, 102, 241, 0.3); }

        .climate-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 1.5rem; display: flex; gap: 20px; align-items: center; }
        .climate-header { display: flex; flex-direction: column; align-items: center; color: #6366f1; min-width: 100px; text-align: center; }
        .climate-header h4 { margin: 5px 0 0 0; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .climate-card p { margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }
      `}</style>
    </div>
  );
};

const MapPin = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default DistrictForecasts;
