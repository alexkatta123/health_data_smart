import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { 
  Globe, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  ChevronRight, 
  MapPin, 
  Info,
  ExternalLink,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

const PublicAnalytics = ({ onBack }) => {
  const [activeMetric, setActiveMetric] = useState('Cases');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const publicData = [
    { name: 'Mon', cases: 400, recovered: 380, vaccinations: 1200 },
    { name: 'Tue', cases: 300, recovered: 290, vaccinations: 1400 },
    { name: 'Wed', cases: 600, recovered: 550, vaccinations: 1800 },
    { name: 'Thu', cases: 800, recovered: 720, vaccinations: 2100 },
    { name: 'Fri', cases: 500, recovered: 480, vaccinations: 1900 },
    { name: 'Sat', cases: 900, recovered: 850, vaccinations: 2500 },
    { name: 'Sun', cases: 1100, recovered: 1050, vaccinations: 3200 },
  ];

  const summaryCards = [
    { label: 'Statewide Recovery Rate', val: '94.2%', color: '#10b981', icon: <ShieldCheck size={20} /> },
    { label: 'Avg. Daily Vaccinations', val: '2.4 Lakhs', color: '#0ea5e9', icon: <Activity size={20} /> },
    { label: 'Active Surveillance Zones', val: '14', color: '#f43f5e', icon: <MapPin size={20} /> },
    { label: 'Total Lab Tests (24h)', val: '84.2K', color: '#8b5cf6', icon: <TrendingUp size={20} /> }
  ];

  return (
    <div className="public-analytics-p animate-fade">
      <div className="pa-hero">
         <div className="pa-hero-content">
            <div className="pa-badge">Public Transparency Hub</div>
            <h1>Statewide Health Analytics</h1>
            <p>Empowering citizens with real-time, authoritative health intelligence and epidemiological transparency.</p>
         </div>
         <button className="pa-back-btn" onClick={onBack}>Return to Home</button>
      </div>

      <div className="pa-grid">
         {summaryCards.map((card, i) => (
           <div key={i} className="pa-card stat-item" style={{ borderBottom: `4px solid ${card.color}` }}>
              <div className="pa-card-header">
                 <div className="pa-icon" style={{ background: `${card.color}15`, color: card.color }}>{card.icon}</div>
                 <Info size={14} color="#475569" />
              </div>
              <div className="pa-val">{card.val}</div>
              <div className="pa-label">{card.label}</div>
           </div>
         ))}
      </div>

      <div className="pa-main-layout">
         <div className="pa-chart-section pa-card">
            <div className="pa-chart-header">
               <div className="pa-chart-titles">
                  <h3>Disease Trends & Impact</h3>
                  <p>7-Day longitudinal study of reported clinical anomalies.</p>
               </div>
               <div className="pa-chart-tabs">
                  {['Cases', 'Recovered', 'Vaccinations'].map(tab => (
                    <button 
                      key={tab} 
                      className={activeMetric === tab ? 'active' : ''} 
                      onClick={() => setActiveMetric(tab)}
                    >
                      {tab}
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="pa-chart-container" style={{ height: '400px', minHeight: '400px' }}>
               {isMounted && (
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={publicData}>
                       <defs>
                          <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                       <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                       <Tooltip 
                          contentStyle={{ background: '#0a0d17', border: "1px solid var(--border)", borderRadius: '12px' }}
                          itemStyle={{ color: '#0ea5e9', fontWeight: 800 }}
                       />
                       <Area type="monotone" dataKey={activeMetric.toLowerCase()} stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorMetric)" />
                    </AreaChart>
                 </ResponsiveContainer>
               )}
            </div>
         </div>

         <div className="pa-info-section">
            <div className="pa-card news-card">
               <h3>Health Bulletins</h3>
               <div className="bulletin-list">
                  {[
                    "New Vaccination Drive in Guntur District starting Monday.",
                    "Monsoon Advisory: Precautions against vector-borne diseases.",
                    "Tele-Health services expanded to include 500 more PHCs."
                  ].map((news, i) => (
                    <div key={i} className="bulletin-item">
                       <div className="b-dot"></div>
                       <p>{news}</p>
                       <ChevronRight size={16} color="#475569" />
                    </div>
                  ))}
               </div>
            </div>

            <div className="pa-card access-card">
               <Globe size={32} color="var(--primary)" />
               <h3>Unified Health Portal</h3>
               <p>Access your medical records, find nearest hospitals, and book tele-consultations.</p>
               <button className="pa-cta-btn">Access Platform <ArrowRight size={16} /></button>
            </div>
         </div>
      </div>

      <style>{`
        .public-analytics-p { padding: 4rem; max-width: 1400px; margin: 0 auto; color: var(--text); }
        
        .pa-hero { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4rem; }
        .pa-hero-content h1 { font-size: 3.5rem; font-weight: 900; margin: 1rem 0; letter-spacing: -2px; }
        .pa-hero-content p { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; line-height: 1.6; }
        .pa-badge { background: rgba(14, 165, 233, 0.1); color: var(--secondary); padding: 6px 14px; border-radius: 100px; font-size: 0.8rem; font-weight: 800; display: inline-block; }
        
        .pa-back-btn { background: var(--surface); border: 1px solid rgba(255,255,255,0.1); color: var(--text); padding: 12px 24px; border-radius: 100px; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .pa-back-btn:hover { background: white; color: black; }

        .pa-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .pa-card { background: var(--surface); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); border-radius: 28px; padding: 2rem; }
        .pa-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .pa-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .pa-val { font-size: 2.2rem; font-weight: 900; margin-bottom: 4px; }
        .pa-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }

        .pa-main-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        
        .pa-chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .pa-chart-titles h3 { font-size: 1.5rem; font-weight: 800; margin: 0; }
        .pa-chart-titles p { font-size: 0.9rem; color: var(--text-muted); margin: 4px 0 0; font-weight: 600; }
        
        .pa-chart-tabs { display: flex; background: var(--surface); padding: 4px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.05); }
        .pa-chart-tabs button { background: transparent; border: none; color: var(--text-muted); padding: 8px 16px; border-radius: 100px; font-weight: 800; font-size: 0.75rem; cursor: pointer; transition: 0.3s; }
        .pa-chart-tabs button.active { background: var(--surface); color: var(--text); }
        
        .pa-chart-container { height: 400px; }

        .pa-info-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .news-card h3 { margin-bottom: 1.5rem; font-size: 1.25rem; }
        .bulletin-list { display: flex; flex-direction: column; gap: 1rem; }
        .bulletin-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 16px; background: var(--surface); border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; cursor: pointer; }
        .bulletin-item:hover { transform: translateX(5px); border-color: rgba(255,255,255,0.2); }
        .b-dot { width: 6px; height: 6px; background: var(--surface); border-radius: 50%; flex-shrink: 0; }
        .bulletin-item p { font-size: 0.85rem; font-weight: 600; flex: 1; margin: 0; }

        .access-card { background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, transparent 100%); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; }
        .access-card p { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; line-height: 1.6; }
        .pa-cta-btn { background: var(--surface); border: none; color: var(--text); padding: 14px 28px; border-radius: 14px; font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; margin-top: 0.5rem; }
        .pa-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4); }

        @media (max-width: 1024px) {
          .pa-grid { grid-template-columns: repeat(2, 1fr); }
          .pa-main-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default PublicAnalytics;
