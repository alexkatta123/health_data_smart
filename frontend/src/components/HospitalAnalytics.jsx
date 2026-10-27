import React, { useState } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, 
  Download, FileText, FileSpreadsheet,
  Calendar, Filter, ArrowUpRight, ArrowDownRight,
  Info, ChevronRight, Activity, Users, CheckCircle2,
  AlertCircle, Shield, Zap, ShieldAlert
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const HospitalAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d'); // '7d' or '30d'
  const [isExporting, setIsExporting] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('All');
  const [isSynthesizingDaily, setIsSynthesizingDaily] = useState(false);
  const [isSynthesizingAction, setIsSynthesizingAction] = useState(false);
  const [isInitializingContainment, setIsInitializingContainment] = useState(false);
  const [showFinanceModal, setShowFinanceModal] = useState(false);
  const [perfFilter, setPerfFilter] = useState('efficiency'); // 'efficiency' or 'satisfaction'

  const doctors = ['Dr. Khan', 'Dr. Sharma', 'Dr. Rao', 'Dr. Wilson', 'Dr. Priya'];

  const performanceData = {
    'All': [
      { name: 'Emergency Care', efficiency: 94, satisfaction: 4.8, patients: 124, trend: 'up' },
      { name: 'Cardiology Unit', efficiency: 88, satisfaction: 4.6, patients: 45, trend: 'up' },
      { name: 'Orthopedics Center', efficiency: 82, satisfaction: 4.2, patients: 32, trend: 'down' },
      { name: 'Pediatric Wing', efficiency: 96, satisfaction: 4.9, patients: 68, trend: 'up' },
      { name: 'Radiology Lab', efficiency: 90, satisfaction: 4.5, patients: 54, trend: 'up' }
    ],
    'Dr. Khan': [
      { name: 'Emergency Care', efficiency: 98, satisfaction: 4.9, patients: 42, trend: 'up' },
      { name: 'General Medicine', efficiency: 95, satisfaction: 4.7, patients: 15, trend: 'up' }
    ],
    'Dr. Sharma': [
      { name: 'Cardiology Unit', efficiency: 92, satisfaction: 4.8, patients: 30, trend: 'up' },
      { name: 'Emergency Care', efficiency: 85, satisfaction: 4.3, patients: 12, trend: 'down' }
    ]
  };

  const performance = performanceData[selectedDoctor] || performanceData['All'];

  const patientVolumeData = [
    { name: 'MON', volume: selectedDoctor === 'All' ? 30 : 12 },
    { name: 'TUE', volume: selectedDoctor === 'All' ? 50 : 18 },
    { name: 'WED', volume: selectedDoctor === 'All' ? 40 : 14 },
    { name: 'THU', volume: selectedDoctor === 'All' ? 70 : 22 },
    { name: 'FRI', volume: selectedDoctor === 'All' ? 90 : 35 },
    { name: 'SAT', volume: selectedDoctor === 'All' ? 60 : 25 },
    { name: 'SUN', volume: selectedDoctor === 'All' ? 80 : 30 },
  ];

  const handleReportExport = (type) => {
    const isDaily = type === 'daily';
    if (isDaily) setIsSynthesizingDaily(true);
    else setIsExporting(true);

    setTimeout(() => {
      const headers = ['PHC Name', 'Mandal', 'District', 'Date Range', 'Patient Load', 'Efficiency %', 'Top Disease', 'Status'];
      const data = isDaily ? [
        ['Guntur Urban PHC', 'Guntur Urban', 'Guntur', new Date().toLocaleDateString(), '45', '96', 'Dengue', 'Optimal'],
        ['Pedakakani PHC', 'Pedakakani', 'Guntur', new Date().toLocaleDateString(), '28', '92', 'Typhoid', 'Monitoring']
      ] : [
        ['Guntur Urban PHC', 'Guntur Urban', 'Guntur', 'Monthly/Yearly Pulse', '1240', '94', 'Dengue', 'Optimal'],
        ['Pedakakani PHC', 'Pedakakani', 'Guntur', 'Monthly/Yearly Pulse', '850', '88', 'Typhoid', 'Monitoring'],
        ['Tenali PHC', 'Tenali', 'Guntur', 'Monthly/Yearly Pulse', '1500', '92', 'Influenza', 'Critical']
      ];
      
      const csvContent = [headers, ...data].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `VidyaAI_${isDaily ? 'Daily' : 'Whole'}_Report_${selectedDoctor}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (isDaily) setIsSynthesizingDaily(false);
      else setIsExporting(false);
    }, 3500);
  };

  return (
    <div className="hospital-analytics animate-fade">
      {/* Official PHC Government Print Template (Visible only in PDF/Print) */}
      <div className="official-print-header" style={{ display: 'none' }}>
         <div style={{ textAlign: 'center', borderBottom: '2.5px solid #000', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Government of Andhra Pradesh</h1>
            <h2 style={{ margin: '5px 0', fontSize: '1.1rem', fontWeight: 800 }}>Health, Medical & Family Welfare Department</h2>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#475569' }}>DISTRICT SURVEILLANCE UNIT | GUNTUR PILOT</h3>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', fontWeight: 700, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
               <span>FACILITY ID: PHC-GNT-{Math.floor(Math.random()*9999)}</span>
               <span>MANDAL: Guntur Urban</span>
               <span>TYPE: Primary Health Center (PHC)</span>
               <span style={{ color: '#0ea5e9' }}>TARGET: {selectedDoctor === 'All' ? 'Whole District' : selectedDoctor}</span>
            </div>
         </div>

         {/* IDSP Form P (Weekly Surveillance Summary) Simulation */}
         <div className="phc-form-p" style={{ marginBottom: '2rem' }}>
            <div style={{ background: '#f1f5f9', padding: '10px 15px', border: '1px solid #cbd5e1', fontWeight: 900, fontSize: '0.9rem', marginBottom: '1rem' }}>
               IDSP FORM P: WEEKLY SURVEILLANCE DATA SUMMARY ({selectedDoctor})
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
               <thead>
                  <tr style={{ background: '#f8fafc' }}>
                     <th style={{ border: '1.5px solid #cbd5e1', padding: '10px', textAlign: 'left' }}>DISEASE CLASSIFICATION</th>
                     <th style={{ border: '1.5px solid #cbd5e1', padding: '10px', textAlign: 'center' }}>TOTAL CASES</th>
                     <th style={{ border: '1.5px solid #cbd5e1', padding: '10px', textAlign: 'center' }}>ADMISSIONS</th>
                     <th style={{ border: '1.5px solid #cbd5e1', padding: '10px', textAlign: 'left' }}>ACTION TAKEN</th>
                  </tr>
               </thead>
               <tbody>
                  {/* Dynamically mapped from current performance state */}
                  {performance.map((p, idx) => (
                    <tr key={idx}>
                       <td style={{ border: '1.5px solid #cbd5e1', padding: '10px', fontWeight: 700 }}>{p.name}</td>
                       <td style={{ border: '1.5px solid #cbd5e1', padding: '10px', textAlign: 'center' }}>{p.patients}</td>
                       <td style={{ border: '1.5px solid #cbd5e1', padding: '10px', textAlign: 'center' }}>{Math.floor(p.patients * 0.15)}</td>
                       <td style={{ border: '1.5px solid #cbd5e1', padding: '10px', fontSize: '0.7rem' }}>
                          Surveillance active. Efficiency: {p.efficiency}%. Trend: {p.trend === 'up' ? 'Increase detected' : 'Stabilizing'}.
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="page-header-h">
        <div className="title-area-h">
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '-1px' }}>Hospital Intelligence Hub</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-muted)' }}>Analytical insights into clinical operations, revenue, and departmental performance.</p>
        </div>
        <div className="header-btns-h" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="filter-pivot" style={{ background: 'var(--surface)', padding: '10px 20px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: 'var(--card-shadow)' }}>
             <Users size={20} color="var(--primary)" />
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px' }}>TARGET ANALYSIS</span>
                <select 
                   value={selectedDoctor}
                   onChange={e => setSelectedDoctor(e.target.value)}
                   style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', padding: 0 }}
                >
                   <option value="All">Whole Hospital</option>
                   {doctors.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
             </div>
          </div>
          <button 
             className="h-btn-secondary" 
             style={{ background: 'white', color: 'var(--text)', border: '1.5px solid #e2e8f0', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '1rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
             onClick={() => handleReportExport('daily')}
          >
             <FileText size={20} /> Daily Report
          </button>
          <button 
             className="h-btn-primary"
             style={{ background: 'var(--primary)', color: "var(--text)", border: 'none', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 900, fontSize: '1rem', borderRadius: '16px', boxShadow: '0 8px 25px var(--primary-glow)' }}
             onClick={() => handleReportExport('whole')}
          >
             <Download size={20} /> Whole Report
          </button>
        </div>
      </div>

      {/* Analytics Hero */}
      <div className="analytics-hero">
         {/* Patient Volume Trends */}
         <div className="a-hero-card patient-trends-v2" style={{ background: 'var(--surface)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)', borderRadius: '40px', padding: '3rem' }}>
            <div className="card-header-p">
               <div className="header-left-p">
                  <div className="icon-pulse-box" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}><Activity size={32} /></div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>Patient Volume Trends</h3>
               </div>
               <div className="period-pills" style={{ background: 'var(--surface-light)', padding: '6px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                  <button className={`pill-btn ${timeRange === '7d' ? 'active' : ''}`} style={{ fontSize: '0.9rem', padding: '10px 20px', borderRadius: '12px' }} onClick={() => setTimeRange('7d')}>Last 7 Days</button>
                  <button className={`pill-btn ${timeRange === '30d' ? 'active' : ''}`} style={{ fontSize: '0.9rem', padding: '10px 20px', borderRadius: '12px' }} onClick={() => setTimeRange('30d')}>Monthly Pulse</button>
               </div>
            </div>
            
            <div className="chart-viewport-p" style={{ height: '300px', width: '100%', marginTop: '2rem' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={patientVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                   <XAxis 
                     dataKey="name" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 12, fontWeight: 700, fill: 'var(--text-muted)' }} 
                   />
                   <YAxis 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{ fontSize: 12, fontWeight: 700, fill: 'var(--text-muted)' }} 
                   />
                   <Tooltip 
                     cursor={{ fill: 'var(--surface-light)' }}
                     contentStyle={{ 
                       background: 'var(--surface)', 
                       border: '1px solid var(--border)', 
                       borderRadius: '16px',
                       fontSize: '14px',
                       fontWeight: 800
                     }}
                   />
                   <Bar 
                     dataKey="volume" 
                     radius={[8, 8, 0, 0]} 
                     barSize={50}
                   >
                     {patientVolumeData.map((entry, index) => (
                       <Cell 
                         key={`cell-${index}`} 
                         fill={index === 4 ? 'var(--primary)' : 'var(--primary-glow)'} 
                         fillOpacity={index === 4 ? 1 : 0.6}
                       />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Revenue Overview */}
         <div className="a-hero-card revenue-overview-v2" style={{ background: 'var(--surface)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)', borderRadius: '40px', padding: '3rem' }}>
            <div className="card-header-p">
               <div className="header-left-p">
                  <div className="icon-pulse-box rev" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}><TrendingUp size={32} /></div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>Revenue Intelligence</h3>
               </div>
            </div>
            
            <div className="revenue-content-p" style={{ gap: '2.5rem' }}>
               <div className="rev-sector">
                  <span className="rev-label-p" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '2px' }}>GROSS SETTLEMENT</span>
                  <h2 className="rev-value-p" style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text)' }}>₹18.4L</h2>
                  <div className="rev-badge-p up" style={{ fontSize: '1rem', padding: '6px 16px', borderRadius: '100px' }}>
                     <ArrowUpRight size={18} /> 12.4%
                  </div>
               </div>

               <div className="rev-sector">
                  <span className="rev-label-p" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '2px' }}>OUTSTANDING CLAIMS</span>
                  <h2 className="rev-value-p" style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text)' }}>₹2.1L</h2>
                   <div className="rev-badge-p" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '1rem', padding: '6px 16px', borderRadius: '100px', fontWeight: 800 }}>
                      ₹4.2L Pending
                   </div>
                 </div>
              </div>
              <button 
                 className="financial-details-btn"
                 onClick={() => setShowFinanceModal(true)}
                 style={{ marginTop: 'auto', background: 'var(--surface-light)', border: '1px solid var(--border)', color: 'var(--text)', padding: '1.2rem', borderRadius: '20px', fontWeight: 900, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}
              >
                 <Shield size={20} color="var(--primary)" /> View Financial Intelligence
              </button>
           </div>
        </div>

       {/* Disease Intelligence & Strategic Action Section */}
       <div className="disease-intel-row" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div className="mo-card" style={{ background: 'var(--surface)', padding: '3rem', borderRadius: '40px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={24} /></div>
                   <div>
                      <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900 }}>Disease Intelligence Matrix</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Actionable Pathogen Surveillance & Trends</p>
                   </div>
                </div>
                <button 
                   className="h-btn-secondary" 
                   style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '14px', background: 'var(--surface-light)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
                   onClick={() => {
                      setIsSynthesizingAction(true);
                      setTimeout(() => {
                         setIsSynthesizingAction(false);
                         window.print();
                      }, 2500);
                   }}
                >
                   <FileSpreadsheet size={18} color="var(--primary)" /> Generate Action Report
                </button>
             </div>
             
             <div style={{ height: 320, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={[
                     { name: 'Dengue', cases: 42, color: '#f43f5e' },
                     { name: 'Typhoid', cases: 28, color: '#f59e0b' },
                     { name: 'Malaria', cases: 15, color: '#3b82f6' },
                     { name: 'Influenza', cases: 54, color: '#10b981' },
                     { name: 'Diarrhea', cases: 12, color: '#8b5cf6' }
                   ]}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--text-muted)' }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: 'var(--text-muted)' }} />
                     <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', fontWeight: 800 }} />
                     <Bar dataKey="cases" radius={[8, 8, 0, 0]} barSize={45}>
                       {[
                         { name: 'Dengue', cases: 42, color: '#f43f5e' },
                         { name: 'Typhoid', cases: 28, color: '#f59e0b' },
                         { name: 'Malaria', cases: 15, color: '#3b82f6' },
                         { name: 'Influenza', cases: 54, color: '#10b981' },
                         { name: 'Diarrhea', cases: 12, color: '#8b5cf6' }
                       ].map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                       ))}
                     </Bar>
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="mo-card" style={{ background: 'var(--surface)', padding: '3rem', borderRadius: '40px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>Strategic Intelligence Protocol</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { title: 'Pathogen Clustering', desc: 'Identified 3 linked Dengue cases in Sector-4. Recommendation: Ward Isolation.', status: 'CRITICAL', color: '#f43f5e' },
                  { title: 'Trend Anomaly', desc: '15% surge in respiratory reports vs last week. Potential Influenza peak.', status: 'MONITORING', color: '#f59e0b' },
                  { title: 'Lab Readiness', desc: 'All rapid diagnostic tests (RDTs) for Malaria stocked at 100%.', status: 'OPTIMAL', color: '#10b981' }
                ].map((action, i) => (
                  <div key={i} style={{ borderLeft: `6px solid ${action.color}`, padding: '15px 20px', background: 'var(--surface-light)', borderRadius: '0 20px 20px 0' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '1.05rem' }}>{action.title}</strong>
                        <span style={{ fontSize: '0.65rem', fontWeight: 900, color: action.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{action.status}</span>
                     </div>
                     <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 600 }}>{action.desc}</p>
                  </div>
                ))}
             </div>
             <button 
                className="mo-button-primary" 
                style={{ marginTop: 'auto', background: 'var(--primary)', border: 'none', padding: '20px', borderRadius: '18px', fontWeight: 900, color: "var(--text)", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 25px var(--primary-glow)' }}
                onClick={() => {
                   setIsInitializingContainment(true);
                   setTimeout(() => setIsInitializingContainment(false), 3000);
                }}
             >
                <Activity size={20} /> Initialize Strategic Containment
             </button>
          </div>
       </div>

      {/* Department Performance */}
      <div className="perf-card" style={{ background: 'var(--surface)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)', borderRadius: '40px', padding: '3.5rem' }}>
         <div className="card-header" style={{ marginBottom: '3rem' }}>
            <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>Department Performance Matrix</h3>
            <div className="filter-group" style={{ background: '#f1f5f9', padding: '6px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px' }}>
               <button 
                  className={`f-btn ${perfFilter === 'efficiency' ? 'active' : ''}`} 
                  style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 800, border: 'none', background: perfFilter === 'efficiency' ? 'white' : 'transparent', color: perfFilter === 'efficiency' ? 'var(--primary)' : '#64748b', cursor: 'pointer', boxShadow: perfFilter === 'efficiency' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
                  onClick={() => setPerfFilter('efficiency')}
               >
                  Clinical Efficiency
               </button>
               <button 
                  className={`f-btn ${perfFilter === 'satisfaction' ? 'active' : ''}`} 
                  style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 800, border: 'none', background: perfFilter === 'satisfaction' ? 'white' : 'transparent', color: perfFilter === 'satisfaction' ? 'var(--primary)' : '#64748b', cursor: 'pointer', boxShadow: perfFilter === 'satisfaction' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}
                  onClick={() => setPerfFilter('satisfaction')}
               >
                  Patient Satisfaction
               </button>
            </div>
         </div>
         <div className="h-table-card" style={{ background: 'transparent', border: 'none' }}>
            <table className="h-table" style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
               <thead>
                  <tr>
                     <th style={{ padding: '1.5rem', fontSize: '1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', border: 'none' }}>Department Unit</th>
                     <th style={{ padding: '1.5rem', fontSize: '1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', border: 'none' }}>Patient Load</th>
                     <th style={{ padding: '1.5rem', fontSize: '1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', border: 'none' }}>{perfFilter === 'efficiency' ? 'Clinical Efficiency' : 'Satisfaction Rating'}</th>
                     <th style={{ padding: '1.5rem', fontSize: '1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', border: 'none' }}>Growth Delta</th>
                     <th style={{ padding: '1.5rem', fontSize: '1rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right', border: 'none' }}>Operations</th>
                  </tr>
               </thead>
               <tbody>
                  {performance.map((p, i) => (
                    <tr key={i} style={{ background: '#f8fafc', borderRadius: '24px', transition: 'var(--transition)' }}>
                       <td style={{ padding: '2rem 1.5rem', border: 'none', borderRadius: '24px 0 0 24px' }}><strong style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 900 }}>{p.name}</strong></td>
                       <td style={{ padding: '2rem 1.5rem', border: 'none', fontWeight: 900, fontSize: '1.3rem', color: '#1e293b' }}>{p.patients} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>CASES</span></td>
                       <td style={{ padding: '2rem 1.5rem', border: 'none' }}>
                          {perfFilter === 'efficiency' ? (
                             <div className="perf-bar-group" style={{ gap: '20px' }}>
                                <div className="perf-bar-bg" style={{ background: 'white', height: '12px', borderRadius: '20px', border: '1px solid #e2e8f0', width: '150px' }}>
                                   <div className="perf-bar-fill" style={{ width: `${p.efficiency}%`, background: p.efficiency > 90 ? '#10b981' : 'var(--primary)', boxShadow: `0 0 15px ${p.efficiency > 90 ? 'rgba(16, 185, 129, 0.3)' : 'var(--primary-glow)'}` }}></div>
                                </div>
                                <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a' }}>{p.efficiency}%</span>
                             </div>
                          ) : (
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.5rem', color: '#f59e0b' }}>★</span>
                                <span style={{ fontWeight: 900, fontSize: '1.3rem', color: '#0f172a' }}>{p.satisfaction}</span>
                                <span style={{ color: '#64748b', fontWeight: 700 }}>/ 5.0</span>
                             </div>
                          )}
                       </td>
                       <td style={{ padding: '2rem 1.5rem', border: 'none' }}>
                          <div className={`trend-flex ${p.trend === 'up' ? 'text-success' : 'text-danger'}`} style={{ fontWeight: 900, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                             {p.trend === 'up' ? <TrendingUp size={24} /> : <ArrowDownRight size={24} />}
                             <span>{p.trend === 'up' ? '+8.2%' : '-2.1%'}</span>
                          </div>
                       </td>
                       <td style={{ padding: '2rem 1.5rem', textAlign: 'right', border: 'none', borderRadius: '0 24px 24px 0' }}>
                          <button 
                             className="h-btn-mini" 
                             style={{ padding: '12px 24px', borderRadius: '14px', border: '1px solid var(--primary)', background: 'transparent', color: 'var(--primary)', fontWeight: 900, cursor: 'pointer', transition: 'var(--transition)' }}
                             onClick={() => {
                                setSelectedDept(p);
                                setShowAuditModal(true);
                             }}
                          >
                             RECONCILE
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Daily Snapshot Synthesis Overlay */}
      {isSynthesizingDaily && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 120, height: 120, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Activity size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>GENERATING DAILY SNAPSHOT...</h2>
           <p style={{ marginTop: '1rem', color: 'var(--text)', fontWeight: 800 }}>ORCHESTRATING: {selectedDoctor === 'All' ? 'Whole Hospital' : selectedDoctor} DATA SUMMARY</p>
        </div>
      )}

      {/* Whole Report Dossier Synthesis Overlay */}
      {isExporting && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.98)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ width: '500px', padding: '4rem', background: 'white', border: '1px solid var(--border)', borderRadius: '48px', textAlign: 'center', boxShadow: '0 40px 100px rgba(14, 165, 233, 0.15)' }}>
              <div className="radar-animation" style={{ width: 140, height: 140, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3rem' }}>
                 <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
                 <FileSpreadsheet size={64} color="var(--primary)" className="animate-pulse" />
              </div>
              <h2 style={{ margin: 0, letterSpacing: '4px', fontWeight: 900, color: '#0f172a' }}>SYNTHESIZING HUB DOSSIER</h2>
              <p style={{ margin: '15px 0 3rem', color: '#64748b', fontSize: '1.1rem', fontWeight: 600 }}>Compiling Comprehensive Performance Reports for {selectedDoctor === 'All' ? 'Whole District' : selectedDoctor}...</p>
              
              <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '20px', overflow: 'hidden', position: 'relative', border: '1px solid #e2e8f0' }}>
                 <div className="export-progress-fill" style={{ height: '100%', background: 'var(--primary)', borderRadius: '20px', animation: 'progressFill 3.5s ease-out forwards', boxShadow: '0 0 15px var(--primary-glow)' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                 <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)' }}>RECONCILING REVENUE MATRICES</span>
                 <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#64748b' }}>DPDP SECURE</span>
              </div>
           </div>
        </div>
      )}

      {/* Departmental Audit Intelligence Modal */}
      {showAuditModal && (
        <div className="mo-modal-overlay" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }} onClick={() => setShowAuditModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '800px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                       <Activity size={32} />
                    </div>
                    <div>
                       <h2 style={{ margin: 0, color: '#0f172a' }}>Audit Intelligence: {selectedDept?.name}</h2>
                       <p style={{ margin: '4px 0 0', color: '#64748b' }}>Operations Performance Audit • Q2 2026</p>
                    </div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, color: '#64748b', letterSpacing: '1px' }}>EFFICIENCY SCORE</span>
                    <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--primary)' }}>{selectedDept?.efficiency}%</strong>
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '1.5rem', marginBottom: '2.5rem' }}>
                 {[
                    { label: 'STAFF UTILIZATION', value: '92%', status: '✓ OPTIMAL' },
                    { label: 'PATIENT SATISFACTION', value: '4.8/5', status: '✓ HIGH' },
                    { label: 'RESOURCE ALLOCATION', value: '₹12.4L', status: '✓ SYNCED' }
                 ].map((stat, i) => (
                    <div key={i} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                       <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b', letterSpacing: '1px' }}>{stat.label}</span>
                       <p style={{ margin: '8px 0 0', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{stat.value}</p>
                       <p style={{ margin: '4px 0 0', color: '#10b981', fontSize: '0.7rem', fontWeight: 900 }}>{stat.status}</p>
                    </div>
                 ))}
              </div>

              <div style={{ background: '#f1f5f9', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
                 <h4 style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', fontWeight: 900, color: '#64748b' }}>CRITICAL RECONCILIATION ITEMS</h4>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                       <span style={{ fontSize: '0.85rem', color: '#1e293b' }}>Operating Theater Throughput</span>
                       <span style={{ color: '#10b981', fontWeight: 800 }}>+4.2%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                       <span style={{ fontSize: '0.85rem', color: '#1e293b' }}>Supply Chain Procurement Lead</span>
                       <span style={{ color: '#10b981', fontWeight: 800 }}>-12h</span>
                    </div>
                 </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                 <button className="mo-button-outline" style={{ flex: 1, border: '1px solid #e2e8f0', color: '#64748b' }} onClick={() => setShowAuditModal(false)}>Cancel Audit</button>
                 <button 
                    className="mo-button-primary" 
                    style={{ flex: 2, background: 'var(--primary)', border: 'none', color: 'white' }}
                    onClick={() => {
                       setShowAuditModal(false);
                       setIsAuditing(true);
                       setTimeout(() => {
                          setIsAuditing(false);
                          setShowReport(true);
                       }, 3500);
                    }}
                 >
                    FINALIZE PERFORMANCE RECONCILIATION
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Departmental Intelligence Sweep Overlay */}
      {isAuditing && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(15px)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 160, height: 160, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <Zap size={48} color="var(--primary)" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: 'var(--primary)' }}>DEPARTMENTAL INTELLIGENCE SWEEP...</h2>
           <p style={{ marginTop: '1rem', color: '#475569', fontWeight: 800 }}>RECONCILING: {selectedDept?.name} • COMPLIANCE AUDIT IN PROGRESS</p>
        </div>
      )}

      {/* Final Reconciliation Report Modal */}
      {showReport && (
         <div className="mo-modal-overlay" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(15px)' }} onClick={() => setShowReport(false)}>
            <div className="mo-modal-content tactical" style={{ maxWidth: '900px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 50px 150px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '2rem' }}>
                  <div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981', marginBottom: '8px' }}>
                        <CheckCircle2 size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '2px' }}>AUDIT FINALIZED & VERIFIED</span>
                     </div>
                     <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a' }}>Reconciliation Report: {selectedDept?.name}</h2>
                     <p style={{ margin: '8px 0 0', color: '#64748b' }}>Station ID: VIZAG-HOSP-82441-A • Dispatch Reference: #AUD-2026-9921</p>
                  </div>
                  <button className="h-btn-secondary" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b' }} onClick={() => setShowReport(false)}>
                     <Download size={16} /> Download PDF Report
                  </button>
               </div>

               <div className="report-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                  <div className="r-section">
                     <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', marginBottom: '1.5rem', letterSpacing: '1px' }}>CLINICAL COMPLIANCE</h4>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                           { label: 'Patient EMR Integrity', value: '100%', status: 'verified' },
                           { label: 'Diagnostic Turnaround', value: 'Optimal', status: 'verified' },
                           { label: 'Prescription Compliance', value: 'High', status: 'verified' }
                        ].map((item, i) => (
                           <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{item.label}</span>
                              <strong style={{ color: "#1e293b" }}>{item.value}</strong>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="r-section">
                     <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', marginBottom: '1.5rem', letterSpacing: '1px' }}>RESOURCE OPTIMIZATION</h4>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                           { label: 'OT Utilization', value: '88%', trend: '+4%' },
                           { label: 'Bed Cycle Efficiency', value: '92%', trend: '+2%' },
                           { label: 'Staff Efficiency', value: '94%', trend: 'Stable' }
                        ].map((item, i) => (
                           <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{item.label}</span>
                              <div style={{ textAlign: 'right' }}>
                                 <strong style={{ display: 'block', color: "#1e293b" }}>{item.value}</strong>
                                 <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 900 }}>{item.trend}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '20px', border: '1px solid rgba(14, 165, 233, 0.2)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <Shield size={32} color="var(--primary)" />
                  <div>
                     <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 900 }}>STATEWIDE INTELLIGENCE SYNCHRONIZATION</h4>
                     <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>This departmental audit has been encrypted and propagated to the State Health Cloud. DPDP privacy compliance verified for all patient identifiers.</p>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Financial Intelligence Drilldown Modal */}
      {showFinanceModal && (
        <div className="mo-modal-overlay" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(15px)' }} onClick={() => setShowFinanceModal(false)}>
           <div className="mo-modal-content tactical" style={{ maxWidth: '700px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                       <TrendingUp size={32} />
                    </div>
                    <div>
                       <h2 style={{ margin: 0, color: '#0f172a' }}>Revenue Intelligence Drilldown</h2>
                       <p style={{ margin: '4px 0 0', color: '#64748b' }}>Financial Reconciliation • Fiscal Year 2026</p>
                    </div>
                 </div>
                 <button className="close-btn" onClick={() => setShowFinanceModal(false)} style={{ background: 'none', border: 'none', fontSize: '2rem', color: '#94a3b8', cursor: 'pointer' }}>&times;</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                 {[
                    { label: 'GROSS SETTLEMENT', val: '₹18.4L', trend: '+12.4%' },
                    { label: 'OUTSTANDING CLAIMS', val: '₹2.1L', trend: '₹4.2L Pending' },
                    { label: 'AR RECOVERY RATE', val: '94.2%', trend: 'OPTIMAL' },
                    { label: 'MDR COMPLIANCE', val: '100%', trend: 'SECURE' }
                 ].map((rev, i) => (
                    <div key={i} style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                       <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#64748b', letterSpacing: '1px' }}>{rev.label}</span>
                       <h3 style={{ margin: '8px 0', fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{rev.val}</h3>
                       <span style={{ fontSize: '0.75rem', fontWeight: 800, color: rev.trend.includes('+') || rev.trend === 'SECURE' ? '#10b981' : '#64748b' }}>{rev.trend}</span>
                    </div>
                 ))}
              </div>

              <div style={{ padding: '1.5rem', background: '#f1f5f9', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '2.5rem' }}>
                 <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: 600, textAlign: 'center' }}>All financial data is reconciled against the State Treasury Portal (CFMS) in real-time. DPDP secure transmission active.</p>
              </div>

              <button className="mo-button-primary" style={{ width: '100%', background: 'var(--primary)', padding: '18px', color: 'white' }} onClick={() => setShowFinanceModal(false)}>Close Financial Intelligence</button>
           </div>
        </div>
      )}

      {/* Strategic Containment Initialization Overlay */}
      {isInitializingContainment && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', zIndex: 5000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 140, height: 140, borderRadius: '50%', border: '4px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 1.5s linear infinite' }}></div>
              <ShieldAlert size={64} color="var(--primary)" />
           </div>
           <h1 style={{ letterSpacing: '6px', fontWeight: 900, color: '#0f172a', textAlign: 'center' }}>INITIALIZING TACTICAL CONTAINMENT</h1>
           <p style={{ marginTop: '1rem', color: '#475569', fontWeight: 800, fontSize: '1.2rem' }}>PROPAGATING DIRECTIVES TO DISTRICT FIELD TEAMS...</p>
        </div>
      )}

      {/* Action Report Synthesis Overlay */}
      {isSynthesizingAction && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(10px)', zIndex: 4000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="radar-animation" style={{ width: 120, height: 120, borderRadius: '50%', border: '2px solid #10b981', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, #10b981 0%, transparent 20%)', animation: 'sweep 2s linear infinite' }}></div>
              <FileSpreadsheet size={48} color="#10b981" />
           </div>
           <h2 style={{ letterSpacing: '4px', fontWeight: 900, color: '#10b981' }}>SYNTHESIZING ACTION DOSSIER...</h2>
           <p style={{ marginTop: '1rem', color: '#475569', fontWeight: 800 }}>MAPPING PATHOGEN TRENDS TO IDSP PROTOCOLS</p>
        </div>
      )}


      <style>{`
        .hospital-analytics { padding: 1rem 0; }
        .analytics-hero { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; margin-bottom: 3rem; }
        
        .a-hero-card { 
          background: var(--surface); 
          border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 32px; 
          padding: 2.5rem; 
          display: flex; 
          flex-direction: column;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .a-hero-card:hover { border-color: var(--primary); transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

        .card-header-p { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .header-left-p { display: flex; align-items: center; gap: 1rem; }
        .icon-pulse-box { 
          width: 48px; height: 48px; 
          background: rgba(14, 165, 233, 0.1); 
          color: var(--primary); 
          border-radius: 14px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.1);
        }
        .icon-pulse-box.rev { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .header-left-p h3 { font-size: 1.25rem; font-weight: 900; color: var(--text); margin: 0; }

        .period-pills { display: flex; background: var(--surface); padding: 4px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .pill-btn { border: none; background: transparent; color: var(--text-muted); padding: 8px 16px; border-radius: 10px; font-weight: 900; font-size: 0.75rem; cursor: pointer; transition: 0.3s; }
        .pill-btn.active { background: rgba(14, 165, 233, 0.1); color: var(--primary); }

        .chart-viewport-p { height: 240px; display: flex; align-items: flex-end; padding-bottom: 2rem; }
        .mock-analytics-chart { width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; }
        .bar-group-p { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .bar-p { width: 100%; border-radius: 10px; position: relative; transition: 1s cubic-bezier(0.4, 0, 0.2, 1); min-height: 20px; }
        .bar-label-p { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); }
        .bar-glow { position: absolute; inset: 0; background: inherit; filter: blur(10px); opacity: 0.2; }

        .revenue-content-p { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2.5rem; }
        .rev-sector { display: flex; flex-direction: column; gap: 8px; }
        .rev-label-p { font-size: 0.65rem; font-weight: 900; color: var(--text-muted); letter-spacing: 1.5px; }
        .rev-value-p { font-size: 2.2rem; font-weight: 900; color: var(--text); margin: 0; }
        .rev-badge-p { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 900; width: fit-content; }
        .rev-badge-p.up { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .rev-badge-p.down { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }

        .financial-details-btn { 
          background: var(--surface); 
          border: 1px solid rgba(255,255,255,0.05); 
          color: var(--text); 
          padding: 1.25rem; 
          border-radius: 16px; 
          font-weight: 900; 
          font-size: 0.9rem; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 12px; 
          cursor: pointer; 
          transition: 0.3s;
        }
        .financial-details-btn:hover { background: white; color: black; border-color: var(--text); transform: translateY(-4px); }
        
        @media print {
           body * { visibility: hidden; }
           .hospital-analytics, .hospital-analytics * { visibility: visible; }
           .hospital-analytics { position: absolute; left: 0; top: 0; width: 100%; padding: 0; margin: 0; background: white !important; }
           
           .official-print-header { display: block !important; }
           .header-btns-h, .sidebar, .sidebar-h, .top-nav, .search-modules, .chat-widget, .pill-btn, .f-btn, .h-btn-mini, .deploy-overlay, .mo-modal-overlay, .close-btn, .mo-button-primary, .mo-button-outline { display: none !important; }
           
           .analytics-hero { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
           .a-hero-card { border-radius: 12px !important; padding: 1.5rem !important; box-shadow: none !important; border: 1.5px solid #e2e8f0 !important; page-break-inside: avoid; }
           .disease-intel-row { grid-template-columns: 1fr !important; gap: 2rem !important; }
           .mo-card { border-radius: 12px !important; padding: 1.5rem !important; box-shadow: none !important; border: 1.5px solid #e2e8f0 !important; page-break-inside: avoid; }
           
           .perf-card { border-radius: 12px !important; padding: 1.5rem !important; box-shadow: none !important; page-break-before: always; }
           .h-table tr { background: white !important; border-bottom: 1px solid #e2e8f0 !important; }
           .perf-bar-bg { border: 1.5px solid #e2e8f0 !important; }
           
           h2 { font-size: 2rem !important; color: #0f172a !important; }
           h3 { font-size: 1.2rem !important; color: #0f172a !important; }
           p { color: #475569 !important; }
           
           .recharts-responsive-container { width: 100% !important; height: 300px !important; }
        }
      `}</style>
    </div>
  );
};

export default HospitalAnalytics;
