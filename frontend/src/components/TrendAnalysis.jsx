import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { 
  TrendingUp, 
  Map, 
  ShieldAlert, 
  Zap, 
  Loader2, 
  Download, 
  AlertCircle,
  Activity, 
  ArrowUpRight, 
  ChevronRight,
  ShieldCheck, 
  Radio, 
  Bell,
  FileText,
  Terminal,
  Scan,
  Database,
  Search,
  Layers,
  Cpu,
  Share2,
  MessageCircle,
  ExternalLink,
  Globe
} from 'lucide-react';

const TrendAnalysis = () => {
  const [trends, setTrends] = useState([
    { disease: "Dengue Fever", status: "Critical Spike", increase: "140%", risk_level: "High", protocol: "Phase 1 Mobilization" },
    { disease: "Malaria", status: "Steady Cluster", increase: "12%", risk_level: "Medium", protocol: "Targeted Screening" }
  ]);
  const [isExporting, setIsExporting] = useState(false);
  const [isMobilizing, setIsMobilizing] = useState(false);
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [synthesisLines, setSynthesisLines] = useState([]);
  const [synthesisStep, setSynthesisStep] = useState(0);
  const [historicalTrends, setHistoricalTrends] = useState([]);
  const [loadingHistorical, setLoadingHistorical] = useState(true);

  const exportSteps = [
    "ACQUIRING REGIONAL MORBIDITY VECTORS...",
    "SYNTHESIZING GEOSPATIAL TREND DATA: [VIZAG DISTRICT]",
    "NORMALIZING PREDICTIVE ACCURACY CURVES (94.2%)...",
    "ENCRYPTING STRATEGIC REPORT PAYLOAD (AES-256)...",
    "COMPILED: STATEWIDE HEALTH INTELLIGENCE SUMMARY",
    "EXPORT SUCCESSFUL: REDIRECTING TO SECURE DOWNLOAD"
  ];

  useEffect(() => {
    fetchHistorical();
  }, []);

  const fetchHistorical = async () => {
    setLoadingHistorical(true);
    try {
      const response = await axios.get('http://localhost:8000/api/analytics/historical');
      setHistoricalTrends(response.data.map(d => ({
        name: d.month,
        cases: d.case_count
      })));
    } catch (err) {
      console.error("Error fetching historical trends:", err);
    } finally {
      setLoadingHistorical(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isExporting) {
      setSynthesisLines([]);
      setSynthesisStep(0);
      interval = setInterval(() => {
        setSynthesisStep(prev => {
          if (prev < exportSteps.length) {
            setSynthesisLines(lines => [...lines, exportSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 750);
    }
    return () => clearInterval(interval);
  }, [isExporting]);

  const handleDownload = (type) => {
    const reportData = {
      timestamp: new Date().toISOString(),
      district: "Visakhapatnam",
      morbidityMatrix: [
        { hub: "Visakhapatnam City", cases: 1240, trend: "+14.2%", risk: "Critical" },
        { hub: "Nellore Regional", cases: 840, trend: "+8.4%", risk: "Rising" }
      ],
      aiInsights: "Predicted spike in Dengue expected in Sector 4 within 72 hours."
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SurvAP_Clinical_Intel_W16_${type.toUpperCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMobilization = (warning) => {
    setSelectedWarning(warning);
    setIsMobilizing(true);
    setTimeout(() => {
       setIsMobilizing(false);
    }, 3500);
  };

  return (
    <div className="trend-analysis animate-fade">
      <div className="view-header" style={{ marginBottom: '3rem' }}>
        <div className="header-text">
           <h1 className="premium-title" style={{ fontSize: '2.8rem' }}>AI Early Warning Intelligence</h1>
           <p className="header-subtitle">Predictive epidemiological curve & strategic mobilization suite.</p>
        </div>
        <div className="header-actions">
            <button 
               className="h-btn h-btn-secondary" 
               onClick={() => setIsExporting(true)}
            >
               <FileText size={20} /> Export Analysis
            </button>
           <button className="h-btn h-btn-primary">
              <Bell size={20} /> Configure Alerts
           </button>
        </div>
      </div>

      <div className="dashboard-content-grid">
         <div className="h-card" style={{ padding: '2.5rem' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                     <Activity size={32} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>Epidemiological Curve</h3>
               </div>
               <div style={{ display: 'flex', gap: '25px', fontSize: '0.9rem', fontWeight: 900 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}><div style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: '50%' }} /> ACTUAL SURGE</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}><div style={{ width: 12, height: 12, border: '3px solid var(--primary)', borderRadius: '50%' }} /> PREDICTED SPIKE</span>
               </div>
            </div>

            <div style={{ height: '450px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: 'Week 1', actual: 400, predicted: 400 },
                  { name: 'Week 2', actual: 450, predicted: 460 },
                  { name: 'Week 3', actual: 600, predicted: 620 },
                  { name: 'Week 4', actual: 800, predicted: 850 },
                  { name: 'Week 5', actual: null, predicted: 1100 },
                  { name: 'Week 6', actual: null, predicted: 1450 },
                ]}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={15} fontWeight={700} tickLine={false} axisLine={false} dy={20} />
                  <YAxis stroke="var(--text-muted)" fontSize={15} fontWeight={700} tickLine={false} axisLine={false} dx={-15} />
                  <Tooltip 
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', color: 'var(--text)', fontWeight: 800, padding: '20px', boxShadow: 'var(--card-shadow)' }}
                  />
                  <Area type="monotone" dataKey="actual" stroke="var(--primary)" fillOpacity={1} fill="url(#colorActual)" strokeWidth={6} />
                  <Area type="monotone" dataKey="predicted" stroke="var(--primary)" strokeDasharray="10 10" fillOpacity={1} fill="url(#colorPredicted)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="h-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3.5rem' }}>
               <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(255, 139, 113, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Zap size={32} />
               </div>
               <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>Early Warning Signals</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               {trends.map((trend, i) => (
                 <div key={i} style={{ background: 'var(--surface-light)', padding: '2.5rem', borderRadius: '32px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', transition: 'var(--transition)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '8px', background: trend.risk_level === 'High' ? 'var(--primary)' : 'var(--accent-glow)' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                       <div>
                          <span style={{ fontSize: '0.9rem', fontWeight: 900, color: trend.risk_level === 'High' ? 'var(--primary)' : 'var(--accent-glow)', letterSpacing: '3px' }}>{trend.status.toUpperCase()}</span>
                          <h4 style={{ margin: '8px 0 0', fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)' }}>{trend.disease}</h4>
                       </div>
                    </div>
                    <p style={{ margin: '0 0 2.5rem', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>
                       AI models detect a {trend.increase} surge in cluster activity. Predicted load exceeds threshold in Vizag North.
                    </p>
                    <button 
                       className="h-btn-primary" 
                       style={{ width: '100%', background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', padding: '18px', borderRadius: '20px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', transition: 'var(--transition)', fontSize: '1.1rem' }}
                       onClick={() => handleMobilization(trend)}
                    >
                       MOBILIZE PROTOCOL <ChevronRight size={24} />
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="h-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
               <Database size={32} />
            </div>
            <div>
               <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>Historical HMIS Review (2019-2020)</h3>
               <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Analysis of baseline patient load across all districts during the pilot baseline period.</p>
            </div>
         </div>

         <div style={{ height: '300px' }}>
            {loadingHistorical ? (
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Loader2 className="animate-spin" size={40} color="var(--primary)" />
               </div>
            ) : (
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalTrends}>
                     <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                     <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                     <YAxis stroke="var(--text-muted)" fontSize={12} fontWeight={700} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '15px', color: 'var(--text)', fontWeight: 800 }}
                     />
                     <Line type="monotone" dataKey="cases" stroke="var(--primary)" strokeWidth={4} dot={{ r: 6, fill: 'var(--primary)' }} activeDot={{ r: 8 }} />
                  </LineChart>
               </ResponsiveContainer>
            )}
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '2.5rem', marginBottom: '3rem' }}>
         {[
            { label: 'VECTOR CONTROL SYNC', value: '88%', icon: <Radio size={32} /> },
            { label: 'SCREENING COMPLIANCE', value: '92%', icon: <ShieldCheck size={32} /> },
            { label: 'PREDICTIVE ACCURACY', value: '94.2%', icon: <TrendingUp size={32} /> }
         ].map((stat, i) => (
           <div key={i} style={{ background: 'var(--surface)', padding: '3rem', borderRadius: '40px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '30px', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '22px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                 {stat.icon}
              </div>
              <div>
                 <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '10px' }}>{stat.label}</span>
                 <strong style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text)' }}>{stat.value}</strong>
              </div>
           </div>
         ))}
      </div>

      <div className="h-card" style={{ padding: '2.5rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <div>
               <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: 'var(--text)' }}>Regional Morbidity Matrix</h3>
               <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 600 }}>Detailed spatial surveillance across 26 clinical districts.</p>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
               <button className="h-btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: '14px', background: 'var(--surface-light)', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 800 }}>Export CSV</button>
               <button className="h-btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: '14px', background: 'var(--primary)', border: 'none', color: "var(--text)", fontWeight: 800 }}>Filter Map</button>
            </div>
         </div>

         <div className="matrix-table" style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                     <th style={{ padding: '2.5rem', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px' }}>DISTRICT HUB</th>
                     <th style={{ padding: '2.5rem', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px' }}>CASE LOAD</th>
                     <th style={{ padding: '2.5rem', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px' }}>TREND VESTIGE</th>
                     <th style={{ padding: '2.5rem', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px' }}>RISK STATUS</th>
                     <th style={{ padding: '2.5rem', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px' }}>ACTIONS</th>
                  </tr>
               </thead>
               <tbody>
                  {[
                    { hub: "Visakhapatnam City", cases: "1,240", trend: "+14.2%", risk: "Critical", color: "var(--primary)" },
                    { hub: "Nellore Regional", cases: "840", trend: "+8.4%", risk: "Rising", color: "var(--accent-glow)" },
                    { hub: "Kurnool Central", cases: "420", trend: "-2.1%", risk: "Stable", color: "#7A635F" },
                    { hub: "Guntur Medical Hub", cases: "910", trend: "+5.8%", risk: "Rising", color: "var(--accent-glow)" },
                    { hub: "Tirupati District", cases: "1,105", trend: "+12.4%", risk: "Critical", color: "var(--primary)" }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                       <td style={{ padding: '2.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                             <div style={{ width: 56, height: 56, borderRadius: '16px', background: `${row.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: row.color }}>
                                <Map size={28} />
                             </div>
                             <strong style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{row.hub}</strong>
                          </div>
                       </td>
                       <td style={{ padding: '2.5rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                             <strong style={{ fontSize: '1.6rem', color: 'var(--text)' }}>{row.cases}</strong>
                             <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 800 }}>ACTIVE VECTORS</span>
                          </div>
                       </td>
                       <td style={{ padding: '2.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: row.trend.startsWith('+') ? 'var(--primary)' : '#7A635F' }}>
                             <ArrowUpRight size={24} style={{ transform: row.trend.startsWith('+') ? 'none' : 'rotate(90deg)' }} />
                             <strong style={{ fontSize: '1.4rem' }}>{row.trend}</strong>
                          </div>
                       </td>
                       <td style={{ padding: '2.5rem' }}>
                          <span style={{ 
                             padding: '10px 24px', 
                             borderRadius: '100px', 
                             fontSize: '1rem', 
                             fontWeight: 900, 
                             background: `${row.color}15`, 
                             color: row.color,
                             border: `1px solid ${row.color}30`
                          }}>
                             {row.risk.toUpperCase()}
                          </span>
                       </td>
                       <td style={{ padding: '2.5rem' }}>
                          <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '12px 24px', borderRadius: '14px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', transition: 'var(--transition)' }}>View Details</button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {isExporting && (
         <div className="synthesis-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(7, 9, 15, 0.99)', backdropFilter: 'blur(30px)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ maxWidth: '850px', width: '100%', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', opacity: 0.15 }}>
                  <Globe size={280} className="animate-spin-slow" color="var(--primary)" />
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                     <div style={{ width: 80, height: 80, borderRadius: '22px', background: 'rgba(14, 165, 233, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                        <Terminal size={40} />
                     </div>
                     <div>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>Intelligence Synthesis Hub</h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>Aggregating statewide epidemiological vectors...</p>
                     </div>
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', padding: '14px 32px', borderRadius: '100px', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                     {Math.round((synthesisStep / exportSteps.length) * 100)}% COMPILED
                  </div>
               </div>

               <div style={{ background: 'rgba(255,255,255,0.01)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', padding: '4rem', minHeight: '420px', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
                  <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px', background: 'linear-gradient(to right, transparent, var(--primary), transparent)', opacity: 0.3, animation: 'scanMove 2s linear infinite' }}></div>
                  
                  {synthesisStep < exportSteps.length ? (
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                        {synthesisLines.map((line, i) => (
                           <div key={i} className="animate-slide-up" style={{ display: 'flex', gap: '25px', alignItems: 'center', opacity: i === synthesisLines.length - 1 ? 1 : 0.3 }}>
                              <div style={{ width: 12, height: 12, borderRadius: '50%', background: line.includes('SUCCESS') ? '#10b981' : 'var(--primary)', boxShadow: `0 0 20px ${line.includes('SUCCESS') ? '#10b981' : 'var(--primary)'}` }} />
                              <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: line.includes('SUCCESS') ? '#10b981' : 'white', letterSpacing: '1px' }}>{line}</span>
                           </div>
                        ))}
                        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                           <Loader2 size={18} className="animate-spin" color="var(--primary)" />
                           <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', opacity: 0.2, fontWeight: 700 }}>SYNCHRONIZING REGIONAL HUB DATA...</span>
                        </div>
                     </div>
                  ) : (
                     <div className="animate-fade" style={{ textAlign: 'center', paddingTop: '2rem' }}>
                        <div style={{ width: 100, height: 100, borderRadius: '32px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3rem' }}>
                           <ShieldCheck size={64} />
                        </div>
                        <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>Epidemiological Intel Finalized</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '550px', margin: '0 auto 4rem', fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 600 }}>The statewide epidemiological synthesis for Week 16 is complete. All morbidity vectors have been cryptographically signed for Government of AP clinical audits.</p>
                        
                        <div style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
                           <button 
                             className="h-btn-primary" 
                             onClick={() => handleDownload('XLS')}
                             style={{ padding: '20px 45px', borderRadius: '22px', background: 'var(--primary)', color: "var(--text)", border: 'none', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.4)' }}
                           >
                              <FileText size={28} /> Download Weekly Intel (XLS)
                           </button>
                           <button 
                             className="h-btn-secondary" 
                             onClick={() => handleDownload('PDF')}
                             style={{ padding: '20px 45px', borderRadius: '22px', background: 'white', color: 'black', border: 'none', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}
                           >
                              <Download size={28} /> PDF Summary
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {isMobilizing && selectedWarning && (
         <div className="mobilization-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(7, 9, 15, 0.99)', backdropFilter: 'blur(30px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
               <div style={{ width: 140, height: 140, borderRadius: '40px', background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3.5rem', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <ShieldAlert size={72} className="animate-pulse" />
               </div>
               <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-2px' }}>Strategic Protocol Activation</h2>
               <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', marginBottom: '5rem', fontWeight: 600 }}>Propagating {selectedWarning.protocol} for {selectedWarning.disease}...</p>
               
               <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '3rem', marginBottom: '6rem' }}>
                  <div style={{ textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2.5px', marginBottom: '12px' }}>RRT UNITS</span>
                     <strong style={{ fontSize: '2rem', color: '#f43f5e' }}>DEPLOYED</strong>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2.5px', marginBottom: '12px' }}>SURVEILLANCE</span>
                     <strong style={{ fontSize: '2rem', color: 'var(--primary)' }}>ACTIVE</strong>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                     <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2.5px', marginBottom: '12px' }}>DATA SYNC</span>
                     <strong style={{ fontSize: '2rem' }}>100%</strong>
                  </div>
               </div>
               
               <div className="progress-track" style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', maxWidth: '600px', margin: '0 auto' }}>
                  <div className="progress-fill" style={{ width: '100%', height: '100%', background: '#f43f5e', animation: 'loadProgress 3.5s linear' }}></div>
               </div>
            </div>
         </div>
      )}

      {/* WhatsApp Sharing Floating Command */}
      <div 
         style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: 1000 }}
         className="animate-slide-up"
      >
         <button 
            style={{ width: 72, height: 72, borderRadius: '50%', background: '#25d366', color: "var(--text)", border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 12px 40px rgba(37, 211, 102, 0.4)', transition: '0.3s transform' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Share Strategic Report via WhatsApp"
         >
            <MessageCircle size={36} fill="white" />
         </button>
      </div>

      <style>{`
        @keyframes loadProgress { from { width: 0; } to { width: 100%; } }
        .mo-card { transition: 0.3s; }
        .mo-card:hover { border-color: var(--primary) !important; transform: translateY(-5px); }
        @keyframes scanMove { 0% { top: 0; } 100% { top: 100%; } }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default TrendAnalysis;
