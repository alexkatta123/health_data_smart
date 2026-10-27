import React from 'react';
import { 
  Users, 
  Bed, 
  UserCircle, 
  Ambulance, 
  ArrowUpRight, 
  TrendingUp, 
  Activity,
  Clock, 
  Calendar, 
  HeartPulse, 
  ChevronRight,
  TrendingDown,
  AlertTriangle,
  Stethoscope,
  Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

const HospitalHome = ({ role, onNavigate }) => {
  const stats = [
    { 
      id: 'hospital-patients',
      label: 'TOTAL PATIENTS TODAY', 
      val: '248', 
      trend: '+12%', 
      trendText: 'vs yesterday',
      icon: <Users size={24} />, 
      color: '#0ea5e9' 
    },
    { 
      id: 'hospital-beds',
      label: 'AVAILABLE BEDS', 
      val: '18/150', 
      trend: 'Low Stock', 
      trendText: 'vs yesterday',
      icon: <Bed size={24} />, 
      color: '#f43f5e' 
    },
    { 
      id: 'hospital-doctors',
      label: 'DOCTORS ON DUTY', 
      val: '12', 
      trend: 'Full Staff', 
      trendText: 'vs yesterday',
      icon: <UserCircle size={24} />, 
      color: '#10b981' 
    },
    { 
      id: 'hospital-emergency',
      label: 'EMERGENCY CASES', 
      val: '05', 
      trend: 'Critical', 
      trendText: 'vs yesterday',
      icon: <Ambulance size={24} />, 
      color: '#f59e0b' 
    }
  ];

  const inflowData = [
    { time: '0h', value: 30 }, { time: '4h', value: 65 }, { time: '8h', value: 85 },
    { time: '12h', value: 95 }, { time: '16h', value: 45 }, { time: '20h', value: 85 },
    { time: '24h', value: 55 }
  ];

  return (
    <div className="hospital-home-portal animate-fade">
      
      {/* Tactical Intelligence Row (The Tools) */}
      <div className="tactical-stats-row">
         {stats.map((stat, i) => (
           <div key={i} className="ts-card" onClick={() => onNavigate(stat.id)} style={{ cursor: 'pointer' }}>
              <div className="ts-icon-box" style={{ background: `${stat.color}10`, color: stat.color }}>
                 {stat.icon}
              </div>
              <div className="ts-content">
                 <span className="ts-label">{stat.label}</span>
                 <h2 className="ts-value">{stat.val}</h2>
                 <div className="ts-footer">
                    <span className="ts-trend" style={{ color: stat.color }}>{stat.trend}</span>
                    <span className="ts-period">{stat.trendText}</span>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="h-home-grid">
         {/* Patient Inflow Analytics */}
         <div className="h-section-p">
            <div className="h-sec-header">
               <div className="h-sec-left">
                  <div className="h-sec-icon"><Activity size={20} /></div>
                  <h3>Clinical Inflow Volume</h3>
               </div>
               <div className="h-sec-right">
                  <div className="time-filters">
                     <button className="tf-btn active">Real-time</button>
                     <button className="tf-btn">Historical</button>
                  </div>
               </div>
            </div>
            
            <div className="h-chart-viewport">
               <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={inflowData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 900 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 900 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: "1px solid var(--border)", borderRadius: '12px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Facility Status Feed */}
         <div className="h-section-p">
            <div className="h-sec-header">
               <div className="h-sec-left">
                  <div className="h-sec-icon"><Zap size={20} color="#f59e0b" /></div>
                  <h3>Active Facility Signals</h3>
               </div>
            </div>
            <div className="signals-list-p">
               <div className="signal-item-p">
                  <div className="si-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}><AlertTriangle size={16} /></div>
                  <div className="si-text">
                     <strong>Oxygen Low: Ward 4</strong>
                     <p>Supply dropped below 15% threshold.</p>
                  </div>
                  <span className="si-time">2m ago</span>
               </div>
               <div className="signal-item-p">
                  <div className="si-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><Stethoscope size={16} /></div>
                  <div className="si-text">
                     <strong>Emergency Team B</strong>
                     <p>Unit-A4 successfully deployed to Trauma Bay.</p>
                  </div>
                  <span className="si-time">12m ago</span>
               </div>
            </div>
         </div>
      </div>

      <style>{`
        .hospital-home-portal { padding: 1rem 0; }

        .tactical-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .ts-card {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 28px;
          padding: 2.5rem 2rem;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ts-card:hover { border-color: var(--primary); transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

        .ts-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .ts-label { display: block; font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1.5px; margin-bottom: 6px; }
        .ts-value { font-size: 1.8rem; font-weight: 900; color: var(--text); margin: 0 0 4px; }
        .ts-footer { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 700; }
        .ts-trend { font-weight: 900; }
        .ts-period { color: #334155; }

        .h-home-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; }
        .h-section-p { background: var(--surface); border: 1px solid var(--border); border-radius: 32px; padding: 2.5rem; }

        .h-sec-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .h-sec-left { display: flex; align-items: center; gap: 15px; }
        .h-sec-icon { width: 40px; height: 40px; background: rgba(14, 165, 233, 0.1); color: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .h-sec-left h3 { font-size: 1.2rem; font-weight: 900; margin: 0; }

        .time-filters { display: flex; gap: 8px; background: var(--surface); padding: 4px; border-radius: 10px; }
        .tf-btn { padding: 6px 14px; font-size: 0.75rem; font-weight: 900; color: var(--text-muted); border: none; background: transparent; cursor: pointer; border-radius: 8px; }
        .tf-btn.active { background: var(--surface); color: var(--text); }

        .h-chart-viewport { height: 280px; margin-top: 1rem; }

        .signals-list-p { display: flex; flex-direction: column; gap: 1.25rem; }
        .signal-item-p { display: flex; align-items: center; gap: 1.5rem; background: var(--surface); padding: 1.25rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); }
        .si-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .si-text strong { display: block; font-size: 0.9rem; color: var(--text); margin-bottom: 2px; }
        .si-text p { font-size: 0.8rem; color: var(--text-muted); margin: 0; font-weight: 600; }
        .si-time { margin-left: auto; font-size: 0.7rem; font-weight: 800; color: #334155; }
      `}</style>
    </div>
  );
};

export default HospitalHome;
