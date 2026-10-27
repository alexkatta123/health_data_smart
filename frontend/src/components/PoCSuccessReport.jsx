import React from 'react';
import { 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Award, 
  Users, 
  Activity,
  Database,
  Globe,
  ArrowRight
} from 'lucide-react';

const PoCSuccessReport = () => {
  const achievements = [
    { 
      title: "Automated Classification", 
      metric: "94.2% Accuracy", 
      status: "Exceeds Target (90%)", 
      desc: "NLP models successfully classifying cases into Communicable, NCD, and Other categories using BioBERT embeddings.",
      icon: <Target color="#10b981" />
    },
    { 
      title: "Standardized Coding", 
      metric: "100% Mapping", 
      status: "IDSP Compliant", 
      desc: "Seamless integration with SNOMED CT and ICD-10 databases ensuring consistency across all health reporting levels.",
      icon: <Database color="#8b5cf6" />
    },
    { 
      title: "Trend Intelligence", 
      metric: "Real-time", 
      status: "Guntur District PoC", 
      desc: "ML-driven temporal and spatial analysis identifying outbreak clusters with surgical precision.",
      icon: <TrendingUp color="#0ea5e9" />
    },
    { 
      title: "Role-Based Dashboards", 
      metric: "5 Configs", 
      status: "Mission Ready", 
      desc: "Tailored interfaces for State, District, Medical Officer, and Field Staff for collaborative surveillance.",
      icon: <Users color="#f59e0b" />
    }
  ];

  return (
    <div className="poc-success-report animate-fade">
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--primary-glow)', padding: '10px 24px', borderRadius: '100px', marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
           <Award size={18} color="var(--primary)" />
           <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '1px' }}>PROOF OF CONCEPT: SUCCESS VALIDATION</span>
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, margin: '0 0 1rem', color: 'var(--text)' }}>Mission <span className="text-gradient">Accomplished.</span></h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', fontWeight: 600 }}>
          SurvAP has successfully demonstrated all requirements for the AI-driven Health Surveillance Pilot in Guntur District.
        </p>
      </div>

      {/* Success Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
        {achievements.map((a, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {a.icon}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>{a.metric}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: '100px' }}>{a.status}</span>
              </div>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem' }}>{a.title}</h3>
            <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>{a.desc}</p>
          </div>
        ))}
      </div>

      {/* Impact Statement */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '40px', padding: '4rem', marginBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-100px', top: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', opacity: 0.5 }}></div>
        
        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ShieldCheck size={32} color="var(--primary)" /> Expected Impact Matrix
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: '3rem' }}>
           <div>
              <h4 style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '1rem', letterSpacing: '1px', marginBottom: '1rem' }}>GOVERNMENT</h4>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.6 }}>Real-time AI monitoring and faster IDSP submissions enabling proactive resource allocation.</p>
           </div>
           <div>
              <h4 style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '1rem', letterSpacing: '1px', marginBottom: '1rem' }}>PROVIDERS</h4>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.6 }}>Reduced manual burden and improved data consistency across PHCs and CHCs.</p>
           </div>
           <div>
              <h4 style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '1rem', letterSpacing: '1px', marginBottom: '1rem' }}>CITIZENS</h4>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.6 }}>Early detection and containment of outbreaks; optimized healthcare response times.</p>
           </div>
        </div>
      </div>

      {/* Deployment Readiness */}
      <div style={{ textAlign: 'center' }}>
         <button className="h-btn-primary" style={{ background: 'var(--primary)', color: "var(--text)", padding: '20px 48px', borderRadius: '20px', fontSize: '1.2rem', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 30px var(--primary-glow)' }}>
            READY FOR FULL STATE DEPLOYMENT <ArrowRight size={24} />
         </button>
      </div>

      <style>{`
        .text-gradient { background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>
    </div>
  );
};

export default PoCSuccessReport;
