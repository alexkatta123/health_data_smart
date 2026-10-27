import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Activity, 
  BarChart3, 
  PieChart, 
  Calendar,
  ShieldCheck,
  ChevronRight,
  Zap,
  Clock,
  Database,
  Filter,
  Search,
  Plus
} from 'lucide-react';

const DistrictReports = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLines, setGenerationLines] = useState([]);
  const [generationStep, setGenerationStep] = useState(0);

  const reports = [
    { id: 'REP-824', title: 'Weekly Epidemiological Summary', date: '22 Apr 2026', type: 'Statutory', status: 'Approved', size: '2.4 MB' },
    { id: 'REP-711', title: 'District Surveillance Performance', date: '20 Apr 2026', type: 'Strategic', status: 'Finalized', size: '1.8 MB' },
    { id: 'REP-502', title: 'Outbreak Containment Log - Vizag', date: '18 Apr 2026', type: 'Operational', status: 'Pending', size: '4.2 MB' }
  ];

  const generationSteps = [
    "ACQUIRING REGIONAL CLINICAL DATASETS...",
    "SYNTHESIZING DISTRICT MORBIDITY VECTORS...",
    "NORMALIZING IDSP P-FORM PERFORMANCE...",
    "GENERATING GEOSPATIAL TREND SUMMARIES...",
    "ENCRYPTING STRATEGIC REPORT PAYLOAD...",
    "DISTRICT REPORT FINALIZED SUCCESSFULLY."
  ];

  useEffect(() => {
    let interval;
    if (isGenerating) {
      setGenerationLines([]);
      setGenerationStep(0);
      interval = setInterval(() => {
        setGenerationStep(prev => {
          if (prev < generationSteps.length) {
            setGenerationLines(lines => [...lines, generationSteps[prev]]);
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
       setIsGenerating(false);
    }, 5500);
  };

  return (
    <div className="district-reports-hub animate-fade">
      <div className="hub-header-h" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
           <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900 }}>District Reporting & Analytics</h2>
           <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Strategic synthesis & archival of regional health intelligence reports.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
           <button 
              onClick={handleGenerate}
              className="h-btn-primary" 
              style={{ background: '#0ea5e9', color: "var(--text)", border: 'none', padding: '14px 28px', borderRadius: '16px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)' }}
           >
              <FileText size={20} /> Generate Custom Report
           </button>
        </div>
      </div>

      <div className="reports-analytics-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '2rem', marginBottom: '3rem' }}>
         {[
            { label: 'REPORTS GENERATED', value: '142', trend: '+12%', icon: <FileText size={22} /> },
            { label: 'DATA ACCURACY', value: '98.4%', trend: '+0.2%', icon: <ShieldCheck size={22} /> },
            { label: 'COMPLIANCE RATE', value: '100%', trend: 'Steady', icon: <Activity size={22} /> }
         ].map((stat, i) => (
           <div key={i} style={{ background: '#07090f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '28px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                 <div style={{ width: 50, height: 50, borderRadius: '14px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    {stat.icon}
                 </div>
                 <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10b981' }}>{stat.trend}</span>
              </div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '4px' }}>{stat.label}</span>
              <strong style={{ fontSize: '1.8rem', fontWeight: 900 }}>{stat.value}</strong>
           </div>
         ))}
      </div>

      <div className="reports-archival-h">
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>Report Registry</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
               <button style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: "var(--text)", padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 800 }}>Statutory</button>
               <button style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: "var(--text)", padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 800 }}>Strategic</button>
            </div>
         </div>

         <div className="reports-list-h" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {reports.map((r, i) => (
              <div key={i} className="report-row-h" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: '0.4fr 2fr 1fr 1fr 1fr 1fr', alignItems: 'center', gap: '20px', transition: '0.2s' }}>
                 <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(14, 165, 233, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <FileText size={22} />
                 </div>
                 <div>
                    <strong style={{ display: 'block', fontSize: '1.05rem', fontWeight: 900 }}>{r.title}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)' }}>{r.id} • {r.type}</span>
                 </div>
                 <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>{r.date}</div>
                 <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{r.size}</div>
                 <div>
                    <span style={{ display: 'inline-block', background: r.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: r.status === 'Approved' ? '#10b981' : '#f59e0b', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900 }}>{r.status.toUpperCase()}</span>
                 </div>
                 <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button className="tactical-action-btn-h" style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: "var(--text)", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Download size={16} /></button>
                    <button className="tactical-action-btn-h" style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: "var(--text)", display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Share2 size={16} /></button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Strategic Actionable Insights Section */}
      <div className="strategic-insights-row" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '2rem', marginBottom: '3rem' }}>
         {[
           { title: 'Disease Hotspot Detect', desc: 'Cluster identified in Guntur East. 12 cases of A90 (Dengue) within 2km radius.', action: 'Deploy Task Force', color: '#f43f5e', icon: <Zap size={22} /> },
           { title: 'Vaccination Coverage', desc: 'Chittoor rural hubs reporting <75% coverage for MMR. Action required.', action: 'Initiate Drive', color: '#f59e0b', icon: <Activity size={22} /> },
           { title: 'Resource Optimization', desc: 'MTU-04 idle in Vizag. Suggested redeployment to Gajuwaka sector.', action: 'Mobilize Unit', color: 'var(--primary)', icon: <ArrowUpRight size={22} /> }
         ].map((insight, i) => (
           <div key={i} className="mo-card" style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: insight.color }}></div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--surface-light)', color: insight.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {insight.icon}
                 </div>
                 <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900 }}>{insight.title}</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '2rem', fontWeight: 600 }}>{insight.desc}</p>
              <button className="mo-button-outline" style={{ width: '100%', borderColor: insight.color, color: insight.color, padding: '12px', fontSize: '0.85rem', fontWeight: 900, borderRadius: '12px', cursor: 'pointer', transition: '0.3s' }}>
                 {insight.action}
              </button>
           </div>
         ))}
      </div>

      {/* Report Generation Formation Overlay */}
      {isGenerating && (
        <div className="deploy-overlay animate-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(7, 9, 15, 0.98)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
           <div className="report-formation-container" style={{ width: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '3.5rem' }}>
                 <div className="radar-animation" style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid var(--primary)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="radar-sweep" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, var(--primary) 0%, transparent 20%)', animation: 'sweep 1s linear infinite' }}></div>
                    <FileText size={44} color="var(--primary)" />
                 </div>
                 <div>
                    <h2 style={{ margin: 0, letterSpacing: '5px', color: "var(--text)", fontWeight: 900 }}>REPORT GENERATION</h2>
                    <p style={{ margin: '4px 0 0', color: 'var(--primary)', fontWeight: 900, fontSize: '0.9rem' }}>SYNTHESIZING DISTRICT INTELLIGENCE</p>
                 </div>
              </div>

              <div className="formation-terminal" style={{ background: '#0a0d17', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '2.5rem', minHeight: '320px', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                 <div className="formation-lines" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {generationLines.map((line, i) => (
                       <div key={i} className="animate-slide-in" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 900, minWidth: '45px' }}>[{i.toString().padStart(2, '0')}]</span>
                          <span style={{ color: "var(--text)", fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px' }}>{line}</span>
                       </div>
                    ))}
                    {generationStep < generationSteps.length && (
                       <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 900, minWidth: '45px' }}>[{generationStep.toString().padStart(2, '0')}]</span>
                          <div style={{ width: 10, height: 20, background: 'var(--primary)', animation: 'pulse 0.5s infinite' }}></div>
                       </div>
                    )}
                 </div>
                 <div className="scan-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--primary), transparent)', opacity: 0.4, animation: 'scanMove 3s linear infinite' }}></div>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck size={24} color="#10b981" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-muted)' }}>MISSION SECURE • ANDHRA PRADESH STATE HUB</span>
                 </div>
                 <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--primary)' }}>REPORT ARCHIVAL PENDING...</div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .report-row-h:hover { border-color: var(--primary) !important; background: rgba(14, 165, 233, 0.02) !important; transform: scale(1.01); }
        .tactical-action-btn-h:hover { border-color: var(--primary) !important; color: var(--primary) !important; background: rgba(14, 165, 233, 0.05) !important; }
        
        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scanMove { from { top: 0; } to { top: 100%; } }
        @keyframes pulse { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        @keyframes slideIn { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default DistrictReports;
