import React, { useState } from 'react';
import { 
  TrendingUp, BarChart3, Calendar, 
  ArrowUpRight, ArrowDownRight, Activity,
  Info, ChevronDown, Download, Zap
} from 'lucide-react';

const DistrictTrends = () => {
  const [diseaseFilter, setDiseaseFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('30d');

  // High-fidelity time-series data
  const trendData = [35, 42, 38, 55, 68, 62, 75, 82, 78, 88, 95, 92];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div className="district-trends animate-fade">
      <div className="mo-card" style={{ background: '#07090f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '2.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
           <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Epidemiological Trends</h3>
           <div style={{ display: 'flex', gap: '12px' }}>
              <div className="tactical-select-h">
                 <select 
                    value={diseaseFilter} 
                    onChange={(e) => setDiseaseFilter(e.target.value)}
                    style={{ background: '#0f172a', border: "1px solid var(--border)", color: "var(--text)", padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', appearance: 'none', outline: 'none', paddingRight: '40px' }}
                 >
                    <option value="all">All Diseases</option>
                    <option value="dengue">Dengue Fever</option>
                    <option value="malaria">Malaria</option>
                    <option value="typhoid">Typhoid</option>
                 </select>
                 <ChevronDown size={16} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
              </div>
              <div className="tactical-select-h">
                 <select 
                    value={timeFilter} 
                    onChange={(e) => setTimeFilter(e.target.value)}
                    style={{ background: '#0f172a', border: "1px solid var(--border)", color: "var(--text)", padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', appearance: 'none', outline: 'none', paddingRight: '40px' }}
                 >
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                 </select>
                 <ChevronDown size={16} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
              </div>
           </div>
        </div>

        <div className="trend-visualization-h" style={{ position: 'relative', height: '350px', marginBottom: '3rem', padding: '0 2rem' }}>
           {/* SVG Trend Line */}
           <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <defs>
                 <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(14, 165, 233, 0.4)" />
                    <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
                 </linearGradient>
              </defs>
              <path 
                 d={`M 0 300 ${trendData.map((d, i) => `L ${i * (1000 / (trendData.length - 1))} ${300 - d * 2.5}`).join(' ')} L 1000 300 Z`}
                 fill="url(#trendGradient)"
              />
              <path 
                 d={trendData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (1000 / (trendData.length - 1))} ${300 - d * 2.5}`).join(' ')}
                 fill="none"
                 stroke="var(--primary)"
                 strokeWidth="4"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 style={{ filter: 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.5))' }}
              />
           </svg>

           {/* Data Points */}
           <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
              {trendData.map((d, i) => (
                 <div key={i} className="trend-point-group" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
                    <div className="trend-tooltip" style={{ background: 'white', color: 'black', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 900, marginBottom: '10px', opacity: i === trendData.length - 1 ? 1 : 0 }}>{d} Cases</div>
                    <div 
                       className="trend-point" 
                       style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%', border: '3px solid var(--primary)', marginBottom: `${d * 2.5 - 6}px`, boxShadow: '0 0 15px var(--primary)' }}
                    ></div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)' }}>{months[i]}</span>
                 </div>
              ))}
           </div>

           {/* Grid Lines */}
           <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0, opacity: 0.1 }}>
              {[...Array(5)].map((_, i) => (
                 <div key={i} style={{ borderBottom: '1px solid white', width: '100%' }}></div>
              ))}
           </div>
        </div>

        <div className="trend-metrics-grid-h" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '3rem' }}>
           <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>CURRENT VS LAST MONTH</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f43f5e', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                 <ArrowUpRight size={32} /> +18%
              </div>
           </div>
           <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>SEASONAL TREND</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                 Stable
              </div>
           </div>
        </div>
      </div>

      {/* Strategic AI Forecast */}
      <div className="trends-insights mo-card" style={{ marginTop: '2rem', background: 'rgba(14, 165, 233, 0.05)', borderColor: 'rgba(14, 165, 233, 0.2)', padding: '2rem', borderRadius: '28px', border: '1px solid' }}>
         <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
               <Zap size={32} />
            </div>
            <div style={{ flex: 1 }}>
               <h4 style={{ margin: 0, color: "var(--text)", fontSize: '1.1rem', fontWeight: 900 }}>AI Predictive Forecast: High Accuracy (94.2%)</h4>
               <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 }}>
                  Synthesizing regional climate data and historical morbidity patterns. Current trajectory indicates a <strong>12% risk increase</strong> in vector-borne clusters across Vizag North by late Q2. 
                  <span style={{ color: 'var(--primary)', marginLeft: '10px', fontWeight: 800, cursor: 'pointer' }}>View Detailed Risk Heatmap →</span>
               </p>
            </div>
            <button className="h-btn-secondary" style={{ background: 'white', color: 'black', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}>
               <Download size={18} /> Export Full Analysis
            </button>
         </div>
      </div>

      <style>{`
        .mo-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem; }
        .tactical-select-h { position: relative; }
        .tactical-select-h select:hover { border-color: var(--primary) !important; background: #1e293b !important; }
        
        .trend-point-group:hover .trend-tooltip { opacity: 1 !important; transform: translateY(-5px); }
        .trend-point-group:hover .trend-point { transform: scale(1.3); background: var(--primary) !important; }
        
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DistrictTrends;
