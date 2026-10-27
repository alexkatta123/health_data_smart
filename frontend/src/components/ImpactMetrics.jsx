import React from 'react';
import { 
  Zap, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  ArrowUpRight,
  Target,
  Clock,
  Sparkles
} from 'lucide-react';

const ImpactMetrics = () => {
  const impacts = [
    {
      title: "Enhanced Reporting Precision",
      description: "Improved data quality, accuracy, and timeliness of health reporting through automated validation pipelines.",
      icon: <Target size={24} />,
      color: "#0ea5e9",
      stat: "+94% Accuracy"
    },
    {
      title: "AI-Driven Insights",
      description: "Automated generation of actionable disease trend insights using machine learning time-series models.",
      icon: <Sparkles size={24} />,
      color: "#6366f1",
      stat: "Real-time Processing"
    },
    {
      title: "Operational Efficiency",
      description: "Reduced manual workload for medical officers and health data entry staff by over 60%.",
      icon: <Users size={24} />,
      color: "#f59e0b",
      stat: "60% Less Manual Entry"
    },
    {
      title: "Rapid Risk Detection",
      description: "Faster detection of regional health risks for proactive interventions and epidemiological surveillance.",
      icon: <Clock size={24} />,
      color: "#f43f5e",
      stat: "2h Response Time"
    }
  ];

  return (
    <div className="impact-container animate-fade">
      <div className="impact-header">
        <h2 className="premium-title">Strategic Impact Metrics</h2>
        <p className="header-subtitle">Quantifiable outcomes of the SurvAP AI implementation</p>
      </div>

      <div className="impact-grid">
        {impacts.map((item, index) => (
          <div key={index} className="impact-card">
            <div className="card-accent" style={{ background: item.color }}></div>
            <div className="card-inner">
              <div className="icon-box" style={{ background: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="stat-row">
                  <span className="stat-pill" style={{ color: item.color }}>
                    <Zap size={14} /> {item.stat}
                  </span>
                  <ArrowUpRight size={18} className="arrow-icon" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .impact-container {
          padding: 1rem;
        }

        .impact-header {
          margin-bottom: 2.5rem;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .impact-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .impact-card:hover {
          transform: translateY(-8px);
          border-color: var(--primary);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .card-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0.5;
        }

        .card-inner {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .icon-box {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text);
        }

        .content p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          background: var(--surface);
          padding: 6px 12px;
          border-radius: 100px;
        }

        .arrow-icon {
          color: var(--text-muted);
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .impact-card:hover .arrow-icon {
          opacity: 1;
          color: var(--primary);
          transform: translate(2px, -2px);
        }
      `}</style>
    </div>
  );
};

export default ImpactMetrics;
