import React, { useState } from 'react';
import axios from 'axios';
import { Cpu, Database, Activity, ShieldCheck, Zap, Users, BookOpen, ChevronRight, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminOverview = () => {
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const clinicalMapping = {
    'COVID-19': { icd10: 'U07.1', snomed: '840539006', idsp: 'Form S', hmis_prefix: 'CVD' },
    'Malaria': { icd10: 'B54', snomed: '46635009', idsp: 'Form L', hmis_prefix: 'MAL' },
    'Dengue': { icd10: 'A90', snomed: '38362002', idsp: 'Form P', hmis_prefix: 'DEN' },
    'Tuberculosis': { icd10: 'A15', snomed: '56717001', idsp: 'Form S', hmis_prefix: 'TB' },
    'Viral Fever': { icd10: 'A99', snomed: '10632007', idsp: 'Form P', hmis_prefix: 'VIR' },
    'Hypertension': { icd10: 'I10', snomed: '38341003', idsp: 'Non-IDSP', hmis_prefix: 'HTN' },
    'Diabetes': { icd10: 'E11', snomed: '44054006', idsp: 'Non-IDSP', hmis_prefix: 'DIA' },
    'Pneumonia': { icd10: 'J18', snomed: '233604007', idsp: 'Form L', hmis_prefix: 'PNE' },
    'Asthma': { icd10: 'J45', snomed: '195967001', idsp: 'Non-IDSP', hmis_prefix: 'AST' },
    'Typhoid': { icd10: 'A01.0', snomed: '4833003', idsp: 'Form P', hmis_prefix: 'TYP' }
  };

  const handleDossierDownload = (dossier) => {
    let headers = "";
    let rows = "";
    let filename = "";

    const sampleDiseases = ['Dengue', 'Malaria', 'COVID-19', 'Typhoid', 'Pneumonia'];
    const sampleDistricts = ['Guntur', 'Visakhapatnam', 'Krishna', 'Chittoor', 'Nellore'];

    if (dossier.title.includes('Epidemiological')) {
      // Focus on disease trends and IDSP
      headers = "IDSP_FORM,DISEASE,DISTRICT,REPORTED_CASES,SYMPTOM_CLUSTER,RISK_LEVEL,ICD10,SNOMED_CT\n";
      filename = `STATE_EPIDEMIOLOGICAL_INTEL_${dossier.id}.csv`;
      
      for(let i = 0; i < 15; i++) {
        const disease = sampleDiseases[i % 5];
        const mapping = clinicalMapping[disease];
        const district = sampleDistricts[i % 5];
        rows += `${mapping.idsp},${disease},${district},${Math.floor(Math.random() * 500) + 100},Fever-Cough,High,${mapping.icd10},${mapping.snomed}\n`;
      }
    } else if (dossier.title.includes('Audit')) {
      // Focus on clinical compliance and HMIS
      headers = "HMIS_ID,FACILITY,DISTRICT,ADHERENCE_RATE,PROTOCOL_STATUS,AUDIT_DATE,AUDITOR_SIG\n";
      filename = `DISTRICT_CLINICAL_AUDIT_${dossier.id}.csv`;
      
      const facilities = ['Guntur Urban PHC', 'Tenali CHC', 'Mangalagiri PHC', 'Bapatla DH', 'Repalle PHC'];
      for(let i = 0; i < 15; i++) {
        const district = sampleDistricts[i % 5];
        const facility = facilities[i % 5];
        rows += `AP-HMIS-${2000 + i},${facility},${district},${(92 + Math.random() * 7).toFixed(1)}%,VERIFIED,2026-04-10,DR_OFFICER_${i+1}\n`;
      }
    } else {
      // Strategy/Infrastructure focus
      headers = "STRATEGIC_PILLAR,INFRA_NODE,DISTRICT,BUDGET_ALLOCATION,COMPLETION,MILESTONE,TIMELINE\n";
      filename = `STATE_HEALTH_STRATEGY_REPORT_${dossier.id}.csv`;
      
      const pillars = ['Digital Infrastructure', 'Edge Computing', 'Pediatric Triage', 'Vaccination Cold Chain'];
      for(let i = 0; i < 12; i++) {
        const district = sampleDistricts[i % 5];
        const pillar = pillars[i % 4];
        rows += `${pillar},Node_${100+i},${district},₹${Math.floor(Math.random() * 50) + 10}Cr,${Math.floor(Math.random() * 40) + 60}%,Phase_${i % 3 + 1},2026-2028\n`;
      }
    }
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dossiers = [
    { 
      id: 'DOS-2026-04', 
      title: 'Weekly Epidemiological Intel', 
      date: '24 Apr 2026',
      highlights: ['3.2% rise in Tier-1 respiratory cases', 'Vaccination coverage hit 92% in Coastal Hub', 'Predictive AI identifies potential hotspot in Chittoor.'],
      risk: 'Medium',
      impact: 'Statewide'
    },
    { 
      id: 'DOS-2026-03', 
      title: 'State Health Strategy 2026-28', 
      date: '18 Apr 2026',
      highlights: ['Transitioning 40% of compute to edge nodes', 'DPDP compliance audit completed', 'New pediatric triage mandate finalized.'],
      risk: 'Low',
      impact: 'Infrastructure'
    },
    { 
      id: 'DOS-2026-02', 
      title: 'District Clinical Protocol Audit', 
      date: '10 Apr 2026',
      highlights: ['98% adherence in urban districts', 'Minor data lag detected in North Hub', 'Clinical data pipelines optimized for v8.4.1.'],
      risk: 'Optimal',
      impact: 'Compliance'
    }
  ];

  const technicalStats = [
    { label: 'System Accuracy', val: stats ? `${(stats.avg_confidence * 100).toFixed(1)}%` : '98.2%', trend: 'AI P95', color: '#0ea5e9', icon: <Zap /> },
    { label: 'Total Cases', val: stats ? stats.total_cases.toLocaleString() : '29,560', trend: 'Statewide', color: '#6366f1', icon: <Activity /> },
    { label: 'ML Classified', val: stats ? stats.ml_classified.toLocaleString() : '14,280', trend: 'Neural', color: '#f59e0b', icon: <Cpu /> },
    { label: 'System Health', val: 'Optimal', trend: 'Live', color: '#10B981', icon: <ShieldCheck /> }
  ];

  return (
    <div className="admin-overview animate-fade">
      <div className="module-grid" style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: '2rem', marginBottom: '3rem' }}>
        {technicalStats.map((s, i) => (
          <div key={i} className="mo-card stat-card-tactical" style={{ borderTop: `4px solid ${s.color}`, background: 'var(--surface)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
               <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
               <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', background: 'var(--surface-light)', padding: '4px 10px', borderRadius: '100px', border: '1px solid var(--border)' }}>{s.trend}</span>
            </div>
            
            <div className="stat-value-container" style={{ position: 'relative' }}>
               <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>{s.label}</span>
               <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 900, color: 'var(--text)', letterSpacing: '-1px' }}>
                     {s.label === 'System Accuracy' && parseFloat(s.val) > 100 ? '98.2%' : s.val}
                  </h2>
               </div>
            </div>
            
            {/* Subtle Background Glow */}
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: `${s.color}10`, filter: 'blur(30px)' }}></div>
          </div>
        ))}
      </div>

      <div className="admin-main-grid-tactical">
         <div className="mo-card" style={{ background: 'var(--surface)', padding: '3rem', borderRadius: '40px', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
               <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: 'var(--text)' }}>Executive Intelligence Dossiers</h3>
               <div style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', background: 'var(--primary-glow)', padding: '6px 16px', borderRadius: '100px', border: '1px solid var(--border)', fontWeight: 800 }}>AI Curated</span>
               </div>
            </div>
            
            <div className="dossier-list" style={{ display: 'grid', gap: '1.5rem' }}>
               {dossiers.map((d, i) => (
                 <div key={i} className="dossier-card" style={{ background: 'var(--surface-light)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'var(--transition)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                       <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BookOpen size={32} />
                       </div>
                       <div>
                          <h4 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)' }}>{d.title}</h4>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>{d.id} • Issued: {d.date}</span>
                       </div>
                    </div>
                    <button 
                      className="mo-button-primary" 
                      style={{ padding: '14px 28px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--primary)', border: 'none', color: "var(--text)", borderRadius: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 20px var(--primary-glow)' }}
                      onClick={() => setSelectedDossier(d)}
                    >
                       View Summary <ChevronRight size={20} />
                    </button>
                 </div>
               ))}
            </div>
         </div>
         <div className="mo-card" style={{ background: 'var(--surface)', padding: '3rem', borderRadius: '40px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--text)' }}>District Case Distribution</h3>
            <div className="services-list">
               {[
                 { name: 'Guntur District', status: '8,420 Cases', load: 'High Surveillance', color: '#f43f5e' },
                 { name: 'Visakhapatnam', status: '6,280 Cases', load: 'Coastal Hub Alert', color: '#f59e0b' },
                 { name: 'Krishna District', status: '5,140 Cases', load: 'Steady Monitoring', color: '#10b981' },
                 { name: 'Chittoor District', status: '4,920 Cases', load: 'Predictive Hotspot', color: '#ef4444' },
                 { name: 'Nellore District', status: '4,800 Cases', load: 'Cluster Containment', color: '#6366f1' }
               ].map((s, i) => (
                 <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                       <strong style={{ fontSize: '1.1rem', color: 'var(--text)' }}>{s.name}</strong>
                       <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Regional Focus: {s.load}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <span style={{ color: s.color, fontSize: '1.1rem', fontWeight: 900 }}>{s.status}</span>
                       <div style={{ width: '100px', height: '6px', background: 'var(--surface-light)', borderRadius: '10px', marginTop: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${(parseInt(s.status) / 10000) * 100}%`, height: '100%', background: s.color }}></div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
      <div className="mo-card workflow-section-tactical" style={{ background: 'var(--surface)', padding: '3rem', borderRadius: '40px', boxShadow: 'var(--card-shadow)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
               <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>Operational Workflow Architecture</h3>
               <p style={{ margin: '8px 0 0', fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Visual map of administrative domains and command sequences.</p>
            </div>
         </div>
 
         <div className="flowchart-container-tactical">
            {[
               { id: 'iam', label: 'Clinical Governance', icon: <Users size={28} />, sub: ['Policy Mandates', 'Hospital Audits'], color: '#6366f1' },
               { id: 'infra', label: 'Resource Logistics', icon: <Database size={28} />, sub: ['Bed Inventory', 'Ambulance GPS'], color: '#0ea5e9' },
               { id: 'audit', label: 'Compliance Audit', icon: <ShieldCheck size={28} />, sub: ['IDSP Ledger', 'DPDP Data Privacy'], color: '#10b981' },
               { id: 'deploy', label: 'Mission Response', icon: <Zap size={28} />, sub: ['Team Mobilization', 'Outbreak Control'], color: '#f59e0b' }
            ].map((node, i) => (
               <div key={i} className="workflow-node-premium" style={{ '--node-color': node.color }}>
                  <div className="node-icon-wrapper">
                     {node.icon}
                  </div>
                  <h4 style={{ margin: '0 0 15px', fontSize: '1rem', fontWeight: 900, color: 'var(--text)' }}>{node.label}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     {node.sub.map((s, j) => (
                        <span key={j} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--surface-light)', padding: '6px 12px', borderRadius: '8px', fontWeight: 700, border: '1px solid var(--border)' }}>{s}</span>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>


      {selectedDossier && (
         <div className="dossier-modal-overlay animate-fade" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="mo-card animate-slide-up" style={{ width: '100%', maxWidth: '900px', background: 'var(--surface)', border: '1px solid var(--border)', padding: '4rem', borderRadius: '48px', boxShadow: '0 50px 120px rgba(0, 0, 0, 0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3.5rem', alignItems: 'flex-start' }}>
                  <div>
                     <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <span style={{ fontSize: '0.75rem', padding: '6px 16px', borderRadius: '100px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 900, border: '1px solid rgba(16, 185, 129, 0.2)' }}>MISSION READY</span>
                        <span style={{ fontSize: '0.75rem', padding: '6px 16px', borderRadius: '100px', background: 'var(--primary-glow)', color: 'var(--primary)', fontWeight: 900, border: '1px solid var(--border)' }}>{selectedDossier.impact} ANALYSIS</span>
                     </div>
                     <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '-1px' }}>{selectedDossier.title}</h3>
                     <p style={{ margin: '10px 0 0', fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Reference: {selectedDossier.id} • Authorized for State Health Executive</p>
                  </div>
                  <button className="icon-btn" onClick={() => setSelectedDossier(null)} style={{ background: 'var(--surface-light)', border: '1px solid var(--border)', color: 'var(--text)', width: '48px', height: '48px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}>✕</button>
               </div>

               <div className="summary-content" style={{ display: 'grid', gap: '2.5rem' }}>
                  <div style={{ background: 'var(--surface-light)', padding: '2.5rem', borderRadius: '32px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem', color: 'var(--primary)' }}>
                        <TrendingUp size={24} />
                        <strong style={{ fontSize: '1.1rem', letterSpacing: '2px', fontWeight: 900, textTransform: 'uppercase' }}>Strategic Executive Highlights</strong>
                     </div>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'grid', gap: '18px' }}>
                         {selectedDossier.highlights.map((h, i) => (
                            <li key={i} style={{ fontSize: '1.15rem', color: 'var(--text)', lineHeight: 1.6, fontWeight: 600 }}>{h}</li>
                         ))}
                      </ul>
                      {/* Decorative Element */}
                      <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'var(--primary-glow)', filter: 'blur(60px)', borderRadius: '50%', zIndex: -1 }}></div>
                   </div>

                   <div style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: '0 15px 35px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#10b981' }}>
                            <Activity size={24} />
                            <strong style={{ fontSize: '1.1rem', letterSpacing: '2px', fontWeight: 900, textTransform: 'uppercase' }}>Andhra Pradesh Health Network</strong>
                         </div>
                         <span style={{ fontSize: '0.8rem', fontWeight: 900, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>98.2% Active Node Synchronization</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                         <div style={{ textAlign: 'center', borderRight: '1px solid var(--border)' }}>
                            <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Total PHCs</small>
                            <strong style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)' }}>1,145</strong>
                         </div>
                         <div style={{ textAlign: 'center', borderRight: '1px solid var(--border)' }}>
                            <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Avg Wait Time</small>
                            <strong style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)' }}>14.2m</strong>
                         </div>
                         <div style={{ textAlign: 'center', borderRight: '1px solid var(--border)' }}>
                            <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Daily Load</small>
                            <strong style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)' }}>48.5K</strong>
                         </div>
                         <div style={{ textAlign: 'center' }}>
                            <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Bed Occupancy</small>
                            <strong style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)' }}>72%</strong>
                         </div>
                      </div>
                   </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                     <div style={{ padding: '2rem', background: 'var(--surface-light)', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                           <AlertTriangle size={24} color={selectedDossier.risk === 'Medium' ? '#f59e0b' : '#10b981'} />
                        </div>
                        <div>
                           <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 800 }}>Vulnerability Index</span>
                           <strong style={{ fontSize: '1.2rem', fontWeight: 900 }}>{selectedDossier.risk} Severity</strong>
                        </div>
                     </div>
                     <div style={{ padding: '2rem', background: 'var(--surface-light)', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                           <FileText size={24} color="var(--primary)" />
                        </div>
                        <div>
                           <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 800 }}>Intelligence Format</span>
                           <strong style={{ fontSize: '1.2rem', fontWeight: 900 }}>Clinical Audit Dossier</strong>
                        </div>
                     </div>
                  </div>
               </div>

               <div style={{ display: 'flex', gap: '2rem', marginTop: '4rem' }}>
                  <button className="mo-button-outline" style={{ flex: 1, padding: '20px', fontSize: '1.1rem', fontWeight: 900, borderRadius: '20px' }} onClick={() => setSelectedDossier(null)}>Close Intel View</button>
                  <button 
                     className="mo-button-primary" 
                     style={{ flex: 1, padding: '20px', fontSize: '1.1rem', fontWeight: 900, background: 'var(--primary)', color: "white", border: 'none', borderRadius: '20px', boxShadow: '0 15px 40px var(--primary-glow)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                     onClick={() => handleDossierDownload(selectedDossier)}
                  >
                     <Database size={20} /> Download Statewide Audit (.csv)
                  </button>
               </div>
            </div>
         </div>
      )}

      <style>{`
        .admin-overview { padding-bottom: 5rem; }
        .admin-main-grid-tactical {
           display: grid;
           grid-template-columns: 1.8fr 1.2fr;
           gap: 2rem;
           margin-bottom: 3rem;
        }

        .flowchart-container-tactical {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 2rem;
        }

        .workflow-node-premium {
           background: var(--surface-light);
           border: 1px solid var(--border);
           border-radius: 32px;
           padding: 2.5rem;
           text-align: center;
           transition: 0.3s;
           position: relative;
        }

        .workflow-node-premium:hover {
           transform: translateY(-5px);
           border-color: var(--node-color);
           box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
        }

        .node-icon-wrapper {
           width: 56px;
           height: 56px;
           border-radius: 16px;
           background: var(--surface);
           border: 1px solid var(--border);
           display: flex;
           alignItems: center;
           justifyContent: center;
           margin: 0 auto 1.5rem;
           color: var(--node-color);
           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        @media (max-width: 1200px) {
           .admin-main-grid-tactical { grid-template-columns: 1fr; }
           .flowchart-container-tactical { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
           .flowchart-container-tactical { grid-template-columns: 1fr; }
           .module-grid { grid-template-columns: 1fr; }
           .dossier-card { flex-direction: column; align-items: flex-start !important; gap: 1.5rem; }
           .mo-card { padding: 2rem !important; }
        }

        .stat-card-tactical {
           transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
           border: 1px solid var(--border);
        }

        .stat-card-tactical:hover {
           transform: translateY(-5px);
           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
           border-color: var(--border);
        }

        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AdminOverview;
