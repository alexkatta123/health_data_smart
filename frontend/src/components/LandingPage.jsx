import React from 'react';
import { 
  Zap, 
  Brain, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Database, 
  Cpu, 
  Activity,
  Globe,
  FileText,
  Building2,
  Stethoscope,
  Users,
  Compass,
  Rocket,
  LayoutDashboard,
  Activity as ActivityIcon,
  MapPin,
  Lock as LockIcon
} from 'lucide-react';
import StrategicVisionFormation from './StrategicVisionFormation';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="landing-page animate-fade">
      <div className="mesh-gradient-hero"></div>
      
      <div className="tactical-side-rail">
        <div className="rail-item active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Brain size={20} />
          <span className="rail-tooltip">Command Core</span>
        </div>
        <div className="rail-divider"></div>
        <div className="rail-item" onClick={() => document.getElementById('intel-preview')?.scrollIntoView({ behavior: 'smooth' })}>
          <TrendingUp size={20} />
          <span className="rail-tooltip">Intelligence Preview</span>
        </div>
        <div className="rail-item" onClick={() => document.getElementById('network-coverage')?.scrollIntoView({ behavior: 'smooth' })}>
          <Globe size={20} />
          <span className="rail-tooltip">Network Coverage</span>
        </div>
        <div className="rail-item" onClick={() => document.getElementById('operational-impact')?.scrollIntoView({ behavior: 'smooth' })}>
          <ShieldCheck size={20} />
          <span className="rail-tooltip">Operational Impact</span>
        </div>
        <div className="rail-item" onClick={() => document.getElementById('platform-stats')?.scrollIntoView({ behavior: 'smooth' })}>
          <Activity size={20} />
          <span className="rail-tooltip">Real-time Stats</span>
        </div>
      </div>

      <nav className="tactical-nav animate-fade">
        <div className="nav-logo">
           <div className="logo-icon"><Activity size={20} /></div>
           <span>Health - Data Smart</span>
        </div>
        <div className="nav-actions">
           <div className="gateway-trigger-container">
              <button className="h-btn-primary gateway-btn" onClick={() => onNavigate('access-platform')}>
                <LockIcon size={16} />
                <span>Initialize Access Platform</span>
                <ArrowRight size={18} className="arrow-pulse" />
              </button>
           </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <div className="gov-badge animate-slide-up">
            <Globe size={16} />
            <span>Health, Medical & Family Welfare Department | Govt. of Andhra Pradesh</span>
          </div>
          
          <h1 className="hero-title animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Health - Data Smart <br />
            <span className="text-gradient">Platform Architecture</span>
          </h1>
          
          <p className="hero-description animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Transforming health governance through an AI-based Disease Tracking and Classification System. 
            Automated NLP interpretation of unstructured clinical data into standardized ICD & SNOMED CT codes for real-time IDSP surveillance.
          </p>
          
          <div className="hero-actions-tactical animate-slide-up" style={{ animationDelay: '0.3s' }}>
             <button className="h-btn-primary large" onClick={() => onNavigate('login', 'Admin')}>
               Initialize Command Deck
             </button>
             <button className="h-btn-outline large" onClick={() => onNavigate('public')}>
               📊 View Public Analytics
             </button>
          </div>
        </div>
      </div>

      <div className="features-grid-tactical">
        {[
          { icon: <ActivityIcon size={24} />, title: 'NLP Data Extraction', desc: 'Automatically interprets unstructured symptoms, diagnoses, and treatment notes from EMRs.' },
          { icon: <MapPin size={24} />, title: 'Standardized Coding', desc: 'Instant mapping of unstructured clinical text to standardized ICD-10 and SNOMED CT codes.' },
          { icon: <Activity size={24} />, title: 'IDSP Integration', desc: 'Strengthening preventive health measures under the Integrated Disease Surveillance Program.' },
          { icon: <Cpu size={24} />, title: 'Trend Detection Engine', desc: 'Identifying emerging disease patterns across PHCs, CHCs, and District Hospitals using ML.' },
          { icon: <ShieldCheck size={24} />, title: 'Statewide Unification', desc: 'Replacing fragmented and inconsistent data systems with a unified health intelligence grid.' }
        ].map((f, i) => (
          <div key={i} className="feature-card-premium">
            <div className="f-icon-p">{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div id="intel-preview" className="live-preview-section">
         <div className="preview-header">
            <div className="p-badge">LIVE SURVEILLANCE FEED</div>
            <h2>Statewide Intelligence Preview</h2>
         </div>
         <div className="preview-container mo-card">
            <div className="p-sidebar">
               <div className="p-item active">
                  <strong>District Heatmap</strong>
                  <span>Temporal Spatial Spread</span>
               </div>
               <div className="p-item">
                  <strong>Outbreak Alerts</strong>
                  <span>3 Active Red Zones</span>
               </div>
            </div>
            <div className="p-main">
               <div className="p-graph-placeholder">
                  <TrendingUp size={48} opacity={0.1} />
                  <span>Interactive Geospatial Engine Active</span>
               </div>
            </div>
         </div>
      </div>

      <div id="network-coverage" className="coverage-section">
         <h2 className="section-title-centered">Network Coverage</h2>
         <div className="coverage-grid">
            {[
              { icon: <Building2 size={24} />, val: '1,145+', label: 'PHC' },
              { icon: <Building2 size={24} />, val: '192+', label: 'CHC' },
              { icon: <Building2 size={24} />, val: '26', label: 'District Hospitals' },
              { icon: <Activity size={24} />, val: 'STATEWIDE', label: 'Command Center' }
            ].map((c, i) => (
              <div key={i} className="coverage-card animate-slide-up">
                 <div className="c-icon">{c.icon}</div>
                 <div className="c-info">
                    <strong>{c.val}</strong>
                    <span>{c.label}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div id="operational-impact" className="impact-section-tactical">
        <h2 className="section-title-centered">Operational Impact</h2>
        <div className="impact-grid-p">
           <table className="impact-table">
              <thead>
                 <tr>
                    <th>Stakeholder</th>
                    <th>Strategic Benefit</th>
                 </tr>
              </thead>
              <tbody>
                 <tr className="animate-slide-up">
                    <td>Govt Officials</td>
                    <td>Faster outbreak response & evidence-based policy making</td>
                 </tr>
                 <tr className="animate-slide-up">
                    <td>Medical Officers</td>
                    <td>Reduced administrative workload via automated classification</td>
                 </tr>
                 <tr className="animate-slide-up">
                    <td>State Citizens</td>
                    <td>Early detection of risks and improved health security</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </div>

      <div id="platform-stats" className="platform-stats">
        <div className="p-stat">
          <span className="p-val">100%</span>
          <span className="p-label">Statewide Integration</span>
        </div>
        <div className="p-stat">
          <span className="p-val">REAL-TIME</span>
          <span className="p-label">Decision Support</span>
        </div>
        <div className="p-stat">
          <span className="p-val">AI-DRIVEN</span>
          <span className="p-label">Surveillance</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tactical-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 100;
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; font-weight: 900; font-size: 1.2rem; }
        .logo-icon { width: 32px; height: 32px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--text); }
        
        .nav-actions { display: flex; align-items: center; gap: 2rem; }
        .nav-link { background: transparent; border: none; color: var(--text-muted); font-weight: 800; cursor: pointer; transition: color 0.3s; }
        .nav-link:hover { color: var(--primary); }

        .tactical-side-rail {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          padding: 12px 30px;
          border-radius: 100px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 25px;
          z-index: 1000;
          box-shadow: 0 15px 40px rgba(255, 139, 113, 0.15);
          animation: dock-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes dock-slide-up {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .rail-item {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
        }

        .rail-item:hover {
          color: var(--primary);
          background: var(--surface-light);
          transform: translateY(-8px) scale(1.1);
        }

        .rail-item.active {
          color: var(--text);
          background: var(--primary);
          box-shadow: 0 10px 25px var(--primary-glow);
          transform: translateY(-10px) scale(1.15);
        }

        .rail-item.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          width: 4px;
          height: 4px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
        }

        .rail-tooltip {
          position: absolute;
          bottom: 70px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #fff;
          color: #000;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 900;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: 0.3s;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .rail-item:hover .rail-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .rail-divider {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.1);
        }

        .gateway-trigger-container { position: relative; }
        .gateway-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          border-radius: 100px;
          background: var(--primary);
          color: var(--text);
          font-weight: 900;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 10px 30px var(--primary-glow);
        }
        .gateway-btn:hover {
          background: var(--secondary);
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 40px var(--secondary-glow);
        }
        .arrow-pulse { animation: h-pulse 2s infinite; }
        @keyframes h-pulse { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }

        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
        }

        .gov-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--surface);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 2.5rem;
        }

        .hero-title {
          font-size: 6rem;
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -4px;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, var(--text) 30%, var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          max-width: 900px;
          font-size: 1.5rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 4rem;
          font-weight: 600;
        }

        .hero-actions-tactical { display: flex; gap: 1.5rem; margin-top: 3rem; justify-content: center; }
        .h-btn-outline.large { background: var(--surface); border: 1px solid var(--primary); padding: 16px 32px; border-radius: 16px; color: var(--primary); font-weight: 900; cursor: pointer; transition: var(--transition); }
        .h-btn-outline.large:hover { background: var(--primary); color: var(--text); box-shadow: 0 10px 30px var(--primary-glow); }

        .features-grid-tactical {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto 6rem;
        }
        .feature-card-premium {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: 24px;
          transition: all 0.3s;
        }
        .feature-card-premium:hover { transform: translateY(-5px); border-color: var(--primary); }
        .f-icon-p { color: var(--primary); margin-bottom: 1.5rem; }
        .feature-card-premium h4 { font-weight: 900; margin-bottom: 0.5rem; }
        .feature-card-premium p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }

        .live-preview-section { max-width: 1200px; margin: 0 auto 6rem; }
        .preview-header { text-align: center; margin-bottom: 3rem; }
        .p-badge { display: inline-block; padding: 6px 14px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border-radius: 100px; font-size: 0.7rem; font-weight: 900; margin-bottom: 1rem; border: 1px solid rgba(239, 68, 68, 0.2); }
        .preview-header h2 { font-size: 2.5rem; font-weight: 900; }

        .preview-container { display: grid; grid-template-columns: 280px 1fr; min-height: 400px; padding: 0 !important; overflow: hidden; }
        .p-sidebar { border-right: 1px solid var(--border); padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .p-item { padding: 1.2rem; border-radius: 14px; border: 1px solid transparent; cursor: pointer; }
        .p-item.active { background: rgba(14, 165, 233, 0.05); border-color: var(--primary); }
        .p-item strong { display: block; font-size: 0.95rem; margin-bottom: 4px; }
        .p-item span { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }
        .p-main { background: var(--surface-light); display: flex; align-items: center; justify-content: center; position: relative; }
        .p-graph-placeholder { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: var(--primary); font-weight: 900; font-size: 1rem; }

        .coverage-section { max-width: 1200px; margin: 0 auto 6rem; }
        .coverage-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .coverage-card { background: var(--surface); border: 1px solid var(--border); padding: 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 1.5rem; }
        .c-icon { width: 44px; height: 44px; background: var(--surface); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .c-info strong { display: block; font-size: 1.3rem; font-weight: 900; }
        .c-info span { font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; }

        .impact-section-tactical { max-width: 1200px; margin: 0 auto 6rem; }
        .impact-table { width: 100%; border-collapse: separate; border-spacing: 0 10px; }
        .impact-table th { text-align: left; padding: 1rem 2rem; color: var(--text-muted); font-size: 0.75rem; font-weight: 900; text-transform: uppercase; }
        .impact-table td { padding: 1.5rem 2rem; background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .impact-table td:first-child { border-left: 1px solid var(--border); border-radius: 16px 0 0 16px; }
        .impact-table td:last-child { border-right: 1px solid var(--border); border-radius: 0 16px 16px 0; }

        @media (max-width: 1024px) {
          .coverage-grid { grid-template-columns: repeat(2, 1fr); }
          .preview-container { grid-template-columns: 1fr; }
          .p-sidebar { border-right: none; border-bottom: 1px solid var(--border); }
        }

        .platform-stats {
          display: flex;
          justify-content: center;
          gap: 6rem;
          border-top: 1px solid var(--border);
          padding-top: 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .p-stat { text-align: center; }
        .p-val { display: block; font-size: 2.5rem; font-weight: 900; color: var(--primary); margin-bottom: 4px; letter-spacing: -1px; }
        .p-label { font-size: 0.9rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 1024px) {
          .hero-section { text-align: center; }
          .gov-badge, .hero-description { margin: 0 auto 2rem; }
          .platform-stats { gap: 2rem; flex-wrap: wrap; }
          .hero-title { font-size: 3rem; }
        }
      ` }} />
    </div>
  );
};

export default LandingPage;
